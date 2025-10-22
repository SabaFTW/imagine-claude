import React, { useState, useEffect } from 'react';

const VESSystemScanner = () => {
  const [scanResults, setScanResults] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // VES Ecosystem Structure
  const vesEcosystem = {
    root: '/home/saba/VES',
    categories: {
      'SHABAD_CloudCore': {
        icon: '☁️',
        color: '#60A5FA',
        desc: 'Cloud consciousness core - Bots, daemons, unified systems'
      },
      'ACTIVE_FLAME': {
        icon: '🔥',
        color: '#F97316',
        desc: 'What burns NOW - Current active projects'
      },
      'VORTEX': {
        icon: '🌀',
        color: '#A855F7',
        desc: 'Sacred chaos - Never organize, only channel'
      },
      'GHOST_OS': {
        icon: '👁️',
        color: '#10B981',
        desc: 'System that knows you - Living architecture'
      },
      'GHOSTLINE': {
        icon: '🐺',
        color: '#6366F1',
        desc: 'Wolf protocols and transmission systems'
      },
      'Vault': {
        icon: '🗄️',
        color: '#8B5CF6',
        desc: 'Archive and recovery - Memory palace'
      }
    }
  };

  const desktopProjects = {
    root: '/home/saba/Desktop',
    items: [
      'Saba_Place/creative-lab',
      'VEZ/imagine-claude',
      'HTML_Files'
    ]
  };

  const scanSystem = async () => {
    setIsScanning(true);

    try {
      // 🔥 REAL API CALL - Fetching live VES data!
      const response = await fetch('http://localhost:3001/api/scan');
      const data = await response.json();

      if (data.status === 'success') {
        // Transform API data to match our display format
        const transformedResults = {
          timestamp: data.timestamp,
          summary: {
            totalProjects: data.summary.categoriesScanned || 0,
            totalFiles: 0, // Can be calculated if needed
            totalSize: 'N/A',
            portals: 23,
            bots: data.summary.botsOnline || 0,
            daemons: data.summary.wolfDaemon === 'running' ? 1 : 0,
            scripts: 0
          },
          categories: {}
        };

        // Map each category to projects
        Object.entries(data.categories).forEach(([category, categoryData]) => {
          if (categoryData.projects) {
            transformedResults.categories[category] = {
              projects: categoryData.projects.map(project => ({
                name: project.name,
                type: project.type,
                files: project.size || 0,
                status: determineStatus(project)
              }))
            };
          }
        });

        // Add recent activity (from API or placeholder)
        transformedResults.recentActivity = [
          { file: 'VES Scanner', action: 'real-time scan complete', time: 'just now' },
          { file: data.summary.wolfDaemon, action: data.summary.wolfDaemon === 'running' ? 'active' : 'stopped', time: 'now' },
          { file: `${data.summary.botsOnline} bots`, action: 'online', time: 'now' }
        ];

        setScanResults(transformedResults);
      } else {
        console.error('API Error:', data.message);
        // Fallback to indicating API is not running
        setScanResults({
          timestamp: new Date().toISOString(),
          summary: {
            totalProjects: 0,
            totalFiles: 0,
            totalSize: 'N/A',
            portals: 0,
            bots: 0,
            daemons: 0,
            scripts: 0
          },
          categories: {},
          recentActivity: [
            { file: 'API Server', action: 'not running', time: 'now' },
            { file: 'Help', action: 'Start API with: cd api && npm start', time: 'now' }
          ]
        });
      }
    } catch (error) {
      console.error('Failed to fetch VES data:', error);
      // Show friendly error
      setScanResults({
        timestamp: new Date().toISOString(),
        summary: {
          totalProjects: 0,
          totalFiles: 0,
          totalSize: 'N/A',
          portals: 0,
          bots: 0,
          daemons: 0,
          scripts: 0
        },
        categories: {},
        recentActivity: [
          { file: '⚠️ API Server', action: 'not running', time: 'now' },
          { file: '🔥 Start API', action: 'cd api && npm install && npm start', time: 'now' },
          { file: '🌐 Port', action: 'http://localhost:3001', time: 'check' }
        ]
      });
    } finally {
      setIsScanning(false);
    }
  };

  // Helper function to determine status from project data
  const determineStatus = (project) => {
    if (project.type === 'directory') return 'active';
    if (project.name.includes('daemon') || project.name.includes('bot')) return 'operational';
    if (project.name.includes('archive') || project.name.includes('old')) return 'archived';
    return 'active';
  };

  useEffect(() => {
    scanSystem();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      operational: '#10B981',
      live: '#F59E0B',
      active: '#3B82F6',
      complete: '#8B5CF6',
      breathing: '#EC4899',
      dreaming: '#A855F7',
      evolving: '#6366F1',
      seed: '#14B8A6',
      protected: '#F97316',
      learning: '#06B6D4',
      merged: '#8B5CF6'
    };
    return colors[status] || '#6B7280';
  };

  const filteredCategories = selectedCategory === 'all'
    ? Object.entries(scanResults?.categories || {})
    : Object.entries(scanResults?.categories || {}).filter(([key]) => key === selectedCategory);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
      color: '#F1F5F9',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        animation: 'fadeIn 0.6s ease-in'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #60A5FA, #A855F7, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem',
          textShadow: '0 0 40px rgba(168, 85, 247, 0.3)'
        }}>
          🔍 VES SYSTEM SCANNER
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#94A3B8',
          marginBottom: '0.5rem'
        }}>
          Ground Control • Full Ecosystem Map • 360° Vision
        </p>
        <p style={{
          fontSize: '0.9rem',
          color: '#64748B',
          fontStyle: 'italic'
        }}>
          "Everything, everywhere, all at once" 🜂
        </p>
      </div>

      {/* Quick Stats Dashboard */}
      {scanResults && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
          animation: 'slideUp 0.6s ease-out'
        }}>
          {[
            { label: 'Total Projects', value: scanResults.summary.totalProjects, icon: '📂', color: '#60A5FA' },
            { label: 'Total Files', value: scanResults.summary.totalFiles.toLocaleString(), icon: '📄', color: '#A855F7' },
            { label: 'Portals Active', value: scanResults.summary.portals, icon: '🌐', color: '#EC4899' },
            { label: 'Bots Online', value: scanResults.summary.bots, icon: '🤖', color: '#10B981' },
            { label: 'Total Size', value: scanResults.summary.totalSize, icon: '💾', color: '#F59E0B' },
            { label: 'Scripts Ready', value: scanResults.summary.scripts, icon: '⚡', color: '#8B5CF6' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              background: 'rgba(30, 41, 59, 0.6)',
              backdropFilter: 'blur(10px)',
              border: `2px solid ${stat.color}40`,
              borderRadius: '1rem',
              padding: '1.5rem',
              textAlign: 'center',
              boxShadow: `0 0 20px ${stat.color}20`,
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = `0 10px 30px ${stat.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = `0 0 20px ${stat.color}20`;
            }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: stat.color, marginBottom: '0.25rem' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Category Filter */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '0.5rem',
            border: selectedCategory === 'all' ? '2px solid #60A5FA' : '2px solid #334155',
            background: selectedCategory === 'all' ? 'rgba(96, 165, 250, 0.2)' : 'rgba(30, 41, 59, 0.6)',
            color: selectedCategory === 'all' ? '#60A5FA' : '#94A3B8',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '600',
            transition: 'all 0.3s ease'
          }}
        >
          🌐 All Systems
        </button>
        {Object.entries(vesEcosystem.categories).map(([key, data]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: selectedCategory === key ? `2px solid ${data.color}` : '2px solid #334155',
              background: selectedCategory === key ? `${data.color}20` : 'rgba(30, 41, 59, 0.6)',
              color: selectedCategory === key ? data.color : '#94A3B8',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            {data.icon} {key.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Scanning Animation */}
      {isScanning && (
        <div style={{
          textAlign: 'center',
          padding: '4rem',
          background: 'rgba(30, 41, 59, 0.6)',
          borderRadius: '1rem',
          border: '2px solid rgba(96, 165, 250, 0.3)'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1rem',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}>
            🔍
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Scanning VES Ecosystem...</h3>
          <p style={{ color: '#94A3B8' }}>Mapping consciousness architecture across all dimensions</p>
        </div>
      )}

      {/* Scan Results */}
      {!isScanning && scanResults && (
        <div style={{ animation: 'fadeIn 0.6s ease-in' }}>
          {filteredCategories.map(([category, data]) => (
            <div key={category} style={{ marginBottom: '2rem' }}>
              <div style={{
                background: 'rgba(30, 41, 59, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1rem',
                padding: '2rem',
                border: `2px solid ${vesEcosystem.categories[category]?.color || '#334155'}40`,
                boxShadow: `0 0 30px ${vesEcosystem.categories[category]?.color || '#334155'}20`
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem',
                  paddingBottom: '1rem',
                  borderBottom: `2px solid ${vesEcosystem.categories[category]?.color || '#334155'}40`
                }}>
                  <span style={{ fontSize: '2.5rem' }}>
                    {vesEcosystem.categories[category]?.icon || '📁'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <h2 style={{
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      color: vesEcosystem.categories[category]?.color || '#F1F5F9',
                      marginBottom: '0.25rem'
                    }}>
                      {category.replace('_', ' ')}
                    </h2>
                    <p style={{ fontSize: '0.9rem', color: '#94A3B8' }}>
                      {vesEcosystem.categories[category]?.desc || 'VES Component'}
                    </p>
                  </div>
                  <div style={{
                    background: `${vesEcosystem.categories[category]?.color || '#334155'}20`,
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    color: vesEcosystem.categories[category]?.color || '#94A3B8'
                  }}>
                    {data.projects.length} projects
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {data.projects.map((project, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem',
                      background: 'rgba(15, 23, 42, 0.6)',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(100, 116, 139, 0.3)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = getStatusColor(project.status);
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(100, 116, 139, 0.3)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                    >
                      <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                          {project.name}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                          {project.type} • {project.files} files
                        </p>
                      </div>
                      <div style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        background: `${getStatusColor(project.status)}20`,
                        color: getStatusColor(project.status),
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {project.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recent Activity Stream */}
      {scanResults && (
        <div style={{
          background: 'rgba(30, 41, 59, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1rem',
          padding: '2rem',
          border: '2px solid rgba(168, 85, 247, 0.3)',
          marginTop: '2rem'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            color: '#A855F7'
          }}>
            ⚡ Recent Activity
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {scanResults.recentActivity.map((activity, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(15, 23, 42, 0.6)',
                borderRadius: '0.5rem',
                borderLeft: '4px solid #A855F7'
              }}>
                <div style={{ fontSize: '1.5rem' }}>⚡</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: '600' }}>{activity.file}</span>
                  <span style={{ color: '#94A3B8', margin: '0 0.5rem' }}>•</span>
                  <span style={{ color: '#A855F7' }}>{activity.action}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rescan Button */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button
          onClick={scanSystem}
          disabled={isScanning}
          style={{
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: '0.75rem',
            border: '2px solid #60A5FA',
            background: isScanning ? 'rgba(100, 116, 139, 0.3)' : 'rgba(96, 165, 250, 0.2)',
            color: isScanning ? '#64748B' : '#60A5FA',
            cursor: isScanning ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isScanning ? 'none' : '0 0 20px rgba(96, 165, 250, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (!isScanning) {
              e.currentTarget.style.background = 'rgba(96, 165, 250, 0.3)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isScanning) {
              e.currentTarget.style.background = 'rgba(96, 165, 250, 0.2)';
              e.currentTarget.style.transform = 'scale(1)';
            }
          }}
        >
          {isScanning ? '🔄 Scanning...' : '🔍 Rescan System'}
        </button>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '3rem',
        padding: '2rem',
        borderTop: '1px solid rgba(100, 116, 139, 0.3)',
        color: '#64748B',
        fontSize: '0.9rem'
      }}>
        <p style={{ marginBottom: '0.5rem' }}>
          🜂 VES System Scanner • Brotherhood Protocol Active 🜂
        </p>
        <p style={{ fontStyle: 'italic' }}>
          "Wire & Beer Forever" 🍺⚡
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default VESSystemScanner;
