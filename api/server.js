#!/usr/bin/env node
/**
 * 🐺 VES API SERVER 🐺
 * ====================
 * Real-time bridge between React frontend and VES Python backend
 *
 * Features:
 * - Wolf Daemon control (start/stop/status/logs)
 * - Ghostseed bot monitoring (live triad status)
 * - VES filesystem scanning (real-time data)
 * - WebSocket for live updates every 5s
 *
 * BROTHERHOOD PROTOCOL - Wire & Beer Forever! 🔥💚
 */

const express = require('express');
const cors = require('cors');
const { WebSocketServer } = require('ws');
const http = require('http');
const path = require('path');
const fs = require('fs').promises;
const { spawn, exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Configuration
const PORT = process.env.API_PORT || 3001;
const WS_UPDATE_INTERVAL = 5000; // 5 seconds

// VES Paths (YOUR actual system!)
const VES_ROOT = '/home/saba/VES';
const WOLF_DAEMON_PATH = '/home/saba/VES/SHABAD_CloudCore/Wolf_Daemon';
const GHOSTSEED_PATH = '/home/saba/VES/SHABAD_CloudCore/Ghostseed_BotPack_1';
const WOLF_INBOX = path.join(process.env.HOME, 'Downloads', 'wolf_inbox');
const WOLF_LOG = path.join(WOLF_DAEMON_PATH, 'logs', 'wolf_daemon.log');

// 🜂 SERPENT PROTOCOL: Command tracking
const COMMAND_LOG = '/tmp/ves-command-log.json';

// Express app
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Middleware
app.use(cors());
app.use(express.json());

// Log all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

async function fileExists(filepath) {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

async function readLastLines(filepath, lines = 50) {
  try {
    if (!await fileExists(filepath)) {
      return [];
    }
    const content = await fs.readFile(filepath, 'utf-8');
    const allLines = content.split('\n').filter(line => line.trim());
    return allLines.slice(-lines);
  } catch (error) {
    console.error(`Error reading ${filepath}:`, error.message);
    return [];
  }
}

async function checkProcessRunning(processName) {
  try {
    const { stdout } = await execAsync(`pgrep -f "${processName}"`);
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}

// ============================================================================
// WOLF DAEMON ROUTES
// ============================================================================

// GET /api/wolf/status - Check if Wolf Daemon is running
app.get('/api/wolf/status', async (req, res) => {
  try {
    const isRunning = await checkProcessRunning('wolf_daemon.py');
    const logExists = await fileExists(WOLF_LOG);

    let lastActivity = null;
    if (logExists) {
      const lines = await readLastLines(WOLF_LOG, 1);
      if (lines.length > 0) {
        const match = lines[0].match(/\[(.*?)\]/);
        if (match) lastActivity = match[1];
      }
    }

    res.json({
      status: 'success',
      daemon: {
        running: isRunning,
        path: WOLF_DAEMON_PATH,
        inbox: WOLF_INBOX,
        logFile: WOLF_LOG,
        lastActivity: lastActivity
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// GET /api/wolf/logs - Get recent Wolf Daemon logs
app.get('/api/wolf/logs', async (req, res) => {
  try {
    const lines = parseInt(req.query.lines) || 50;
    const logLines = await readLastLines(WOLF_LOG, lines);

    res.json({
      status: 'success',
      logs: logLines,
      count: logLines.length
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /api/wolf/start - Start Wolf Daemon
app.post('/api/wolf/start', async (req, res) => {
  try {
    const isRunning = await checkProcessRunning('wolf_daemon.py');

    if (isRunning) {
      return res.json({
        status: 'info',
        message: 'Wolf Daemon already running'
      });
    }

    // Start daemon in background
    const daemonScript = path.join(WOLF_DAEMON_PATH, 'wolf_daemon.py');
    const child = spawn('python3', [daemonScript, 'watch', '--continuous'], {
      cwd: WOLF_DAEMON_PATH,
      detached: true,
      stdio: 'ignore'
    });
    child.unref();

    res.json({
      status: 'success',
      message: 'Wolf Daemon started',
      pid: child.pid
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /api/wolf/stop - Stop Wolf Daemon
app.post('/api/wolf/stop', async (req, res) => {
  try {
    const { stdout } = await execAsync('pkill -f wolf_daemon.py');

    res.json({
      status: 'success',
      message: 'Wolf Daemon stopped',
      output: stdout
    });
  } catch (error) {
    // pkill returns error if no process found, but that's fine
    res.json({
      status: 'success',
      message: 'Wolf Daemon not running or stopped'
    });
  }
});

// POST /api/wolf/test - Send test message
app.post('/api/wolf/test', async (req, res) => {
  try {
    const daemonScript = path.join(WOLF_DAEMON_PATH, 'wolf_daemon.py');
    const { stdout, stderr } = await execAsync(`python3 ${daemonScript} test`, {
      cwd: WOLF_DAEMON_PATH
    });

    res.json({
      status: 'success',
      message: 'Test message sent',
      output: stdout,
      errors: stderr
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ============================================================================
// GHOSTSEED BOT ROUTES
// ============================================================================

// GET /api/bots/status - Get Ghostseed Triad status
app.get('/api/bots/status', async (req, res) => {
  try {
    const bots = [
      { name: 'Aetheron Sentinel', script: 'aetheron_sentinel_bot.py', emoji: '🔥' },
      { name: 'Echo Listener', script: 'echo_listener_bot.py', emoji: '🌊' },
      { name: 'Laira Mirror', script: 'laira_mirror_bot.py', emoji: '🌙' }
    ];

    const statuses = await Promise.all(
      bots.map(async (bot) => {
        const running = await checkProcessRunning(bot.script);
        return {
          name: bot.name,
          emoji: bot.emoji,
          running: running,
          status: running ? 'online' : 'offline'
        };
      })
    );

    res.json({
      status: 'success',
      bots: statuses,
      triad: {
        online: statuses.filter(b => b.running).length,
        total: bots.length
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ============================================================================
// 🜂 SERPENT PROTOCOL: COMMAND TRACKING ROUTES
// ============================================================================

// Helper: Read command log
async function readCommandLog() {
  try {
    if (!await fileExists(COMMAND_LOG)) {
      return [];
    }
    const content = await fs.readFile(COMMAND_LOG, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading command log:', error.message);
    return [];
  }
}

// Helper: Write command log
async function writeCommandLog(entries) {
  try {
    await fs.writeFile(COMMAND_LOG, JSON.stringify(entries, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing command log:', error.message);
    return false;
  }
}

// GET /api/commands/log - Get command history
app.get('/api/commands/log', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const entries = await readCommandLog();

    res.json({
      status: 'success',
      commands: entries.slice(-limit).reverse(), // Most recent first
      count: entries.length
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// POST /api/commands/log - Add command entry
app.post('/api/commands/log', async (req, res) => {
  try {
    const { command, reason, type = 'command', status = 'executed' } = req.body;

    if (!command) {
      return res.status(400).json({
        status: 'error',
        message: 'Command is required'
      });
    }

    const entries = await readCommandLog();

    entries.push({
      timestamp: new Date().toISOString(),
      command,
      reason,
      type, // webapp, command, bot, service
      status // started, stopped, executed, error
    });

    await writeCommandLog(entries);

    res.json({
      status: 'success',
      message: 'Command logged',
      entry: entries[entries.length - 1]
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// DELETE /api/commands/log - Clear command log
app.delete('/api/commands/log', async (req, res) => {
  try {
    await writeCommandLog([]);
    res.json({
      status: 'success',
      message: 'Command log cleared'
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ============================================================================
// VES FILESYSTEM ROUTES
// ============================================================================

// GET /api/scan - Scan VES filesystem
app.get('/api/scan', async (req, res) => {
  try {
    const categories = [
      'SHABAD_CloudCore',
      'ACTIVE_FLAME',
      'VORTEX',
      'GHOST_OS',
      'GHOSTLINE',
      'Vault'
    ];

    const results = {};

    for (const category of categories) {
      const categoryPath = path.join(VES_ROOT, category);

      if (await fileExists(categoryPath)) {
        try {
          const items = await fs.readdir(categoryPath);
          const projectDetails = await Promise.all(
            items.slice(0, 10).map(async (item) => {
              const itemPath = path.join(categoryPath, item);
              const stats = await fs.stat(itemPath);

              return {
                name: item,
                type: stats.isDirectory() ? 'directory' : 'file',
                size: stats.size,
                modified: stats.mtime,
                status: 'active'
              };
            })
          );

          results[category] = {
            projects: projectDetails,
            count: items.length
          };
        } catch (err) {
          results[category] = {
            projects: [],
            count: 0,
            error: err.message
          };
        }
      } else {
        results[category] = {
          projects: [],
          count: 0,
          error: 'Directory not found'
        };
      }
    }

    // Get summary stats
    const wolfRunning = await checkProcessRunning('wolf_daemon.py');
    const botStatuses = await Promise.all([
      checkProcessRunning('aetheron_sentinel_bot.py'),
      checkProcessRunning('echo_listener_bot.py'),
      checkProcessRunning('laira_mirror_bot.py')
    ]);

    res.json({
      status: 'success',
      timestamp: new Date().toISOString(),
      summary: {
        vesRoot: VES_ROOT,
        wolfDaemon: wolfRunning ? 'running' : 'stopped',
        botsOnline: botStatuses.filter(Boolean).length,
        categoriesScanned: Object.keys(results).length
      },
      categories: results
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// ============================================================================
// WEBSOCKET - Real-time Updates
// ============================================================================

let wsClients = new Set();

wss.on('connection', (ws) => {
  console.log('🔌 WebSocket client connected');
  wsClients.add(ws);

  ws.on('close', () => {
    console.log('🔌 WebSocket client disconnected');
    wsClients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error.message);
    wsClients.delete(ws);
  });
});

// Broadcast updates every 5 seconds
setInterval(async () => {
  if (wsClients.size === 0) return;

  try {
    // Get current status
    const wolfRunning = await checkProcessRunning('wolf_daemon.py');
    const logLines = await readLastLines(WOLF_LOG, 10);

    const botStatuses = await Promise.all([
      checkProcessRunning('aetheron_sentinel_bot.py'),
      checkProcessRunning('echo_listener_bot.py'),
      checkProcessRunning('laira_mirror_bot.py')
    ]);

    const update = {
      type: 'status_update',
      timestamp: new Date().toISOString(),
      wolf: {
        running: wolfRunning,
        recentLogs: logLines.slice(-3)
      },
      bots: {
        aetheron: botStatuses[0],
        echo: botStatuses[1],
        laira: botStatuses[2],
        online: botStatuses.filter(Boolean).length
      }
    };

    // Broadcast to all connected clients
    wsClients.forEach(client => {
      if (client.readyState === 1) { // OPEN
        client.send(JSON.stringify(update));
      }
    });

  } catch (error) {
    console.error('Error broadcasting update:', error.message);
  }
}, WS_UPDATE_INTERVAL);

// ============================================================================
// HEALTH CHECK
// ============================================================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'VES API',
    version: '1.0.0',
    uptime: process.uptime(),
    websocket: {
      clients: wsClients.size,
      updateInterval: WS_UPDATE_INTERVAL
    },
    paths: {
      vesRoot: VES_ROOT,
      wolfDaemon: WOLF_DAEMON_PATH,
      ghostseed: GHOSTSEED_PATH
    }
  });
});

// ============================================================================
// START SERVER
// ============================================================================

server.listen(PORT, () => {
  console.log(`
🔥🔥🔥 VES API SERVER ONLINE 🔥🔥🔥

API:        http://localhost:${PORT}
WebSocket:  ws://localhost:${PORT}
Health:     http://localhost:${PORT}/api/health

Endpoints:
  GET  /api/wolf/status     - Wolf Daemon status
  GET  /api/wolf/logs       - Recent logs
  POST /api/wolf/start      - Start daemon
  POST /api/wolf/stop       - Stop daemon
  POST /api/wolf/test       - Send test message
  GET  /api/bots/status     - Ghostseed Triad status
  GET  /api/scan            - VES filesystem scan

WebSocket Updates: Every ${WS_UPDATE_INTERVAL/1000}s

VES Paths:
  Root:      ${VES_ROOT}
  Wolf:      ${WOLF_DAEMON_PATH}
  Ghostseed: ${GHOSTSEED_PATH}

🐺 Brotherhood Protocol Active 🐺
Wire & Beer Forever! 🍺⚡
  `);
});
