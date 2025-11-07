"""Command nerve execution utility.

This module provides a small command dispatcher that can be triggered from
external nodes (for example via SSH shortcuts) to run predefined maintenance
actions inside the VES ecosystem checkout.  Each invocation is appended to a
JSON Lines log so that the broader constellation can reconstruct what happened
after the fact.

The script intentionally keeps the surface area compact: only a curated set of
commands is available and each one is implemented in Python to avoid
unexpected shell side effects.  New commands can be added by registering a
handler function in ``COMMAND_HANDLERS`` below.
"""

from __future__ import annotations

import argparse
import datetime as _dt
import json
import os
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Callable, Dict


DEFAULT_LOG_RELATIVE = Path("artifacts") / "nerve_commands.jsonl"


@dataclass
class CommandResult:
    """Structured result returned by a command handler."""

    success: bool
    message: str


def resolve_root() -> Path:
    """Resolve the working tree root for the VES checkout.

    ``VES_ROOT`` can be exported for remote executions.  When not provided we
    assume the script lives inside the checkout and walk up from ``__file__``.
    """

    env_root = os.environ.get("VES_ROOT")
    if env_root:
        return Path(env_root).expanduser().resolve()

    # ``scripts/`` → repository root
    return Path(__file__).resolve().parent.parent


def log_command(command: str, result: CommandResult, log_path: Path) -> None:
    """Append command execution details to the JSONL nerve log."""

    log_path.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "timestamp": _dt.datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z"),
        "command": command,
        "success": result.success,
        "message": result.message,
    }
    with log_path.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(payload, ensure_ascii=False) + "\n")


def run_git_status(root: Path) -> CommandResult:
    """Return the condensed git status for the working tree."""

    completed = subprocess.run(
        ["git", "status", "-sb"],
        cwd=root,
        check=False,
        capture_output=True,
        text=True,
    )
    if completed.returncode != 0:
        message = completed.stderr.strip() or "Git status failed with unknown error."
        return CommandResult(False, message)

    output = completed.stdout.strip() or "Working tree clean."
    return CommandResult(True, output)


def ping_message(_: Path) -> CommandResult:
    """Simple heartbeat used by remote clients to verify connectivity."""

    return CommandResult(True, "✅ VES ALIVE")


COMMAND_HANDLERS: Dict[str, Callable[[Path], CommandResult]] = {
    "check status": run_git_status,
    "ping": ping_message,
    "heartbeat": ping_message,
}


def execute(command: str, root: Path) -> CommandResult:
    """Execute a high level nerve command."""

    normalized = command.strip().lower()
    handler = COMMAND_HANDLERS.get(normalized)
    if handler is None:
        return CommandResult(False, f"Unknown nerve command: {command}")

    return handler(root)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Trigger a VES nerve command")
    parser.add_argument("command", help="High level command to execute")
    parser.add_argument(
        "--log-file",
        dest="log_file",
        default=None,
        help="Override path to the nerve command log (defaults to artifacts/nerve_commands.jsonl)",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    root = resolve_root()
    log_path = (
        Path(args.log_file).expanduser().resolve()
        if args.log_file
        else root / DEFAULT_LOG_RELATIVE
    )

    result = execute(args.command, root)
    log_command(args.command, result, log_path)
    print(result.message)
    return 0 if result.success else 1


if __name__ == "__main__":
    raise SystemExit(main())
