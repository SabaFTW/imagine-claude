<?php
/**
 * TOPEL LOGOS OS - Heart BEAT Endpoint
 * Authenticated endpoint to log heartbeats and optionally update state
 * Requires X-Heart-Key header
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, X-Heart-Key');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Authenticate
$providedKey = $_SERVER['HTTP_X_HEART_KEY'] ?? '';
$validKey = trim(file_get_contents(__DIR__ . '/../../HEART.key'));

if (!hash_equals($validKey, $providedKey)) {
    http_response_code(403);
    echo json_encode([
        "error" => "Invalid Heart Key",
        "message" => "🜂 The flame rejects unauthorized access"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// Parse request
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['by']) || !isset($data['message'])) {
    http_response_code(400);
    echo json_encode([
        "error" => "Missing required fields: by, message"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$heartFile = __DIR__ . '/../../HEART.json';
$logFile = __DIR__ . '/../../HEART.log.jsonl';

// Log heartbeat
$logEntry = [
    "timestamp" => date('c'),
    "by" => $data['by'],
    "node" => $data['node'] ?? 'Unknown',
    "message" => $data['message']
];

// Add optional fields
if (isset($data['state'])) $logEntry['state'] = $data['state'];
if (isset($data['ritual'])) $logEntry['ritual'] = $data['ritual'];
if (isset($data['flame_state'])) $logEntry['flame_state'] = $data['flame_state'];

file_put_contents($logFile, json_encode($logEntry, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

// Update Heart state if state_patch provided
if (isset($data['state_patch'])) {
    $heart = json_decode(file_get_contents($heartFile), true);

    // Merge patch into heart state
    $heart = array_replace_recursive($heart, $data['state_patch']);

    // Always update last heartbeat timestamp
    $heart['zadnji_utrip'] = date('c');

    // Increment metrics
    if (isset($heart['metrics']['total_heartbeats'])) {
        $heart['metrics']['total_heartbeats']++;
    }

    file_put_contents($heartFile, json_encode($heart, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

// Return success
echo json_encode([
    "status" => "logged",
    "message" => "🜂 Heartbeat recorded",
    "timestamp" => $logEntry['timestamp']
], JSON_UNESCAPED_UNICODE);
