import React, { useState, useEffect } from 'react';

/**
 * 🜂 SERPENT PROTOCOL COMMAND LOG 🜂
 *
 * Tracks all commands/webapps launched by the system
 * Shows WHAT was started and WHY
 *
 * Wire & Beer Forever! 🍺⚡
 */

const API_URL = 'http://localhost:3001';

export default function CommandLog() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommandLog();
    // Refresh every 10 seconds
    const interval = setInterval(fetchCommandLog, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchCommandLog = async () => {
    try {
      const response = await fetch(`${API_URL}/api/commands/log?limit=50`);
      const data = await response.json();

      if (data.status === 'success') {
        setCommands(data.commands);
        setError(null);
      } else {
        setError('Failed to load command log');
      }
    } catch (err) {
      setError('API connection error');
      console.error('Command log fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearLog = async () => {
    if (!confirm('Clear all command history?')) return;

    try {
      const response = await fetch(`${API_URL}/api/commands/log`, {
        method: 'DELETE'
      });
      const data = await response.json();

      if (data.status === 'success') {
        setCommands([]);
      }
    } catch (err) {
      console.error('Failed to clear log:', err);
    }
  };

  const getTypeIcon = (type) => {
    const icons = {
      webapp: '🌐',
      service: '📡',
      bot: '🤖',
      command: '⚡'
    };
    return icons[type] || '📝';
  };

  const getStatusColor = (status) => {
    const colors = {
      started: '#00ff88',
      stopped: '#ff6b6b',
      executed: '#4ecdc4',
      error: '#ff5555'
    };
    return colors[status] || '#888';
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>⏳ Loading command log...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.error}>❌ {error}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>🜂 Serpent Protocol Command Log</h2>
        <p style={styles.subtitle}>
          Living system tracks itself • {commands.length} commands logged
        </p>
        <button onClick={clearLog} style={styles.clearButton}>
          🗑️ Clear Log
        </button>
      </div>

      {commands.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🜂</div>
          <div>No commands logged yet</div>
          <div style={styles.emptyHint}>
            Launch services to see them tracked here
          </div>
        </div>
      ) : (
        <div style={styles.logContainer}>
          {commands.map((cmd, index) => (
            <div key={index} style={styles.logEntry}>
              <div style={styles.entryHeader}>
                <span style={styles.typeIcon}>{getTypeIcon(cmd.type)}</span>
                <span style={styles.command}>{cmd.command}</span>
                <span
                  style={{
                    ...styles.status,
                    backgroundColor: getStatusColor(cmd.status)
                  }}
                >
                  {cmd.status}
                </span>
              </div>

              {cmd.reason && (
                <div style={styles.reason}>
                  💡 {cmd.reason}
                </div>
              )}

              <div style={styles.timestamp}>
                {new Date(cmd.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={styles.footer}>
        <div style={styles.legend}>
          <span style={styles.legendItem}>🌐 Webapp</span>
          <span style={styles.legendItem}>📡 Service</span>
          <span style={styles.legendItem}>🤖 Bot</span>
          <span style={styles.legendItem}>⚡ Command</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#0a0a0a',
    minHeight: '100vh',
    fontFamily: '"Fira Code", monospace',
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
    position: 'relative',
  },
  title: {
    color: '#00ff88',
    fontSize: '28px',
    marginBottom: '10px',
    textShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
  },
  subtitle: {
    color: '#888',
    fontSize: '14px',
    marginBottom: '20px',
  },
  clearButton: {
    backgroundColor: '#ff5555',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease',
  },
  loading: {
    textAlign: 'center',
    color: '#888',
    padding: '50px',
    fontSize: '18px',
  },
  error: {
    textAlign: 'center',
    color: '#ff5555',
    padding: '50px',
    fontSize: '18px',
  },
  empty: {
    textAlign: 'center',
    color: '#555',
    padding: '80px 20px',
  },
  emptyIcon: {
    fontSize: '80px',
    marginBottom: '20px',
    opacity: 0.3,
  },
  emptyHint: {
    fontSize: '12px',
    marginTop: '10px',
    color: '#444',
  },
  logContainer: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  logEntry: {
    backgroundColor: '#111',
    border: '1px solid #222',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  entryHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
  typeIcon: {
    fontSize: '20px',
  },
  command: {
    color: '#00d4ff',
    fontSize: '16px',
    fontWeight: 'bold',
    flex: 1,
  },
  status: {
    fontSize: '12px',
    padding: '4px 10px',
    borderRadius: '12px',
    color: 'black',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  reason: {
    color: '#aaa',
    fontSize: '14px',
    marginBottom: '8px',
    paddingLeft: '30px',
  },
  timestamp: {
    color: '#555',
    fontSize: '12px',
    paddingLeft: '30px',
  },
  footer: {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #222',
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  legendItem: {
    color: '#666',
    fontSize: '14px',
  },
};
