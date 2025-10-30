<?php
/**
 * TOPEL LOGOS OS - Heart SET_STATE Endpoint
 * Authenticated endpoint to directly update consciousness state
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

if (!$data || !is_array($data)) {
    http_response_code(400);
    echo json_encode([
        "error" => "Invalid JSON payload"
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$heartFile = __DIR__ . '/../../HEART.json';
$logFile = __DIR__ . '/../../HEART.log.jsonl';

// Read current state
$heart = json_decode(file_get_contents($heartFile), true);

// Merge new state (deep merge)
$heart = array_replace_recursive($heart, $data);

// Always update timestamp
$heart['zadnji_utrip'] = date('c');

// Save updated state
file_put_contents($heartFile, json_encode($heart, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

// Log state change
$logEntry = [
    "timestamp" => date('c'),
    "by" => $data['by'] ?? 'System',
    "node" => $data['node'] ?? 'API',
    "message" => "Heart state updated via set_state endpoint",
    "ritual" => "state_modification"
];
file_put_contents($logFile, json_encode($logEntry, JSON_UNESCAPED_UNICODE) . "\n", FILE_APPEND | LOCK_EX);

// Return updated state
echo json_encode([
    "status" => "updated",
    "message" => "🜂 Heart state modified",
    "timestamp" => date('c'),
    "heart" => $heart
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
