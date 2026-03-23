import React, { useState, useEffect } from 'react';
import { projectCategories, projects, getAllTags } from './data/projects.js';

const normalizeTags = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.filter(Boolean);
  }
  return String(value)
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const MasterDashboard = ({ params = {} }) => {
  const [selectedCategory, setSelectedCategory] = useState(params.category || 'all');
  const [searchQuery, setSearchQuery] = useState(params.search || '');
  const [selectedTags, setSelectedTags] = useState(normalizeTags(params.tags));

  const allTags = getAllTags();

  // Update filters if URL params change (e.g., navigating from CommandCenter presets)
  useEffect(() => {
    setSelectedCategory(params.category || 'all');
    setSearchQuery(params.search || '');
    setSelectedTags(normalizeTags(params.tags));
  }, [params.category, params.search, params.tags]);

  // Keep URL hash in sync with current filters for shareable deep links
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams();
    if (selectedCategory && selectedCategory !== 'all') {
      searchParams.set('category', selectedCategory);
    }
    if (searchQuery) {
      searchParams.set('search', searchQuery);
    }
    if (selectedTags.length > 0) {
      searchParams.set('tags', selectedTags.join(','));
    }

    const baseHash = 'master-dashboard';
    const nextHash = searchParams.toString()
      ? `${baseHash}?${searchParams.toString()}`
      : baseHash;

    if (window.location.hash.slice(1) !== nextHash) {
      window.location.hash = nextHash;
    }
  }, [selectedCategory, searchQuery, selectedTags]);

  // Filter projects based on category, search, and tags
  const filteredProjects = projects.filter(project => {
    // Category filter
    if (selectedCategory !== 'all' && project.category !== selectedCategory) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = project.name.toLowerCase().includes(query);
      const matchesDesc = project.description.toLowerCase().includes(query);
      const matchesTags = project.tags && project.tags.some(tag => tag.toLowerCase().includes(query));
      if (!matchesName && !matchesDesc && !matchesTags) {
        return false;
      }
    }

    // Tag filter
    if (selectedTags.length > 0) {
      const hasTag = project.tags && selectedTags.some(tag => project.tags.includes(tag));
      if (!hasTag) {
        return false;
      }
    }

    return true;
  });

  const toggleTag = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleNavigate = (project) => {
    if (project.path) {
      if (project.external) {
        window.location.href = project.path;
      } else {
        window.location.hash = project.path;
      }
    }
  };

  const getCategoryColor = (categoryId) => {
    const category = Object.values(projectCategories).find(c => c.id === categoryId);
    return category ? category.color : '#7b3fa8';
  };

  return (
    <div style={{
      minHeight: '100dvh',
      background: '#0a0515',
      color: '#e8e8f0',
      overflow: 'auto',
      position: 'relative',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", sans-serif',
      paddingTop: 'calc(env(safe-area-inset-top, 0px) + 60px)',
      paddingBottom: 'calc(env(safe-area-inset-bottom, 20px) + 20px)',
      paddingLeft: 'max(env(safe-area-inset-left, 20px), 20px)',
      paddingRight: 'max(env(safe-area-inset-right, 20px), 20px)'
    }}>
      {/* Breathing Cosmos Background */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 40% 20%, rgba(74, 31, 120, 0.35) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 87, 34, 0.2) 0%, transparent 60%), #0a0515',
        animation: 'cosmos-breathe 10s ease-in-out infinite',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header */}
        <header style={{
          textAlign: 'center',
          padding: '40px 20px',
          marginBottom: '40px',
          background: 'linear-gradient(145deg, rgba(26, 11, 46, 0.85) 0%, rgba(10, 5, 21, 0.95) 100%)',
          borderRadius: '30px',
          border: '2px solid rgba(123, 63, 168, 0.4)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
        }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '15px',
            animation: 'sigil-pulse 5s ease-in-out infinite'
          }}>
            🜂
          </div>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 200,
            letterSpacing: '8px',
            textTransform: 'uppercase',
            background: 'linear-gradient(120deg, #7b3fa8, #ff8a50, #f4c261)',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 6s ease infinite',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '10px'
          }}>
            Master Dashboard
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.7,
            letterSpacing: '3px',
            fontWeight: 300,
            textTransform: 'uppercase'
          }}>
            40+ Projects • 6 Categories • Everything in One Place
          </p>
        </header>

        {/* Category Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '30px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '12px 24px',
              borderRadius: '20px',
              border: selectedCategory === 'all' ? '2px solid #ff8a50' : '2px solid rgba(123, 63, 168, 0.3)',
              background: selectedCategory === 'all' ? 'rgba(255, 138, 80, 0.2)' : 'rgba(26, 11, 46, 0.6)',
              color: '#e8e8f0',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 500,
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            🜂 All Projects ({projects.length})
          </button>
          {Object.values(projectCategories).map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '12px 24px',
                borderRadius: '20px',
                border: selectedCategory === cat.id ? `2px solid ${cat.color}` : '2px solid rgba(123, 63, 168, 0.3)',
                background: selectedCategory === cat.id ? `${cat.color}33` : 'rgba(26, 11, 46, 0.6)',
                color: '#e8e8f0',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
            >
              {cat.icon} {cat.name.split(' ').slice(1).join(' ')}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{
          marginBottom: '30px'
        }}>
          <input
            type="text"
            placeholder="🔍 Search projects, tags, descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 24px',
              borderRadius: '20px',
              border: '2px solid rgba(123, 63, 168, 0.3)',
              background: 'rgba(26, 11, 46, 0.8)',
              color: '#e8e8f0',
              fontSize: '1.1rem',
              backdropFilter: 'blur(10px)',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = '#ff8a50'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(123, 63, 168, 0.3)'}
          />
        </div>

        {/* Tag Filter Pills */}
        {selectedTags.length > 0 && (
          <div style={{
            marginBottom: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            alignItems: 'center'
          }}>
            <span style={{ opacity: 0.7, marginRight: '8px' }}>Active filters:</span>
            {selectedTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '12px',
                  border: '1px solid #ff8a50',
                  background: 'rgba(255, 138, 80, 0.2)',
                  color: '#ff8a50',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {tag} ×
              </button>
            ))}
            <button
              onClick={() => setSelectedTags([])}
              style={{
                padding: '6px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(123, 63, 168, 0.3)',
                background: 'rgba(26, 11, 46, 0.6)',
                color: '#e8e8f0',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results Count */}
        <div style={{
          marginBottom: '20px',
          textAlign: 'center',
          opacity: 0.7,
          fontSize: '1rem'
        }}>
          Showing {filteredProjects.length} of {projects.length} projects
        </div>

        {/* Projects Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px',
          marginBottom: '60px'
        }}>
          {filteredProjects.map(project => {
            const categoryColor = getCategoryColor(project.category);
            return (
              <article
                key={project.id}
                onClick={() => handleNavigate(project)}
                style={{
                  position: 'relative',
                  background: 'linear-gradient(145deg, rgba(26, 11, 46, 0.85) 0%, rgba(10, 5, 21, 0.95) 100%)',
                  border: `1px solid ${categoryColor}33`,
                  borderRadius: '22px',
                  padding: '24px',
                  minHeight: '180px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
                  cursor: project.path ? 'pointer' : 'default',
                  opacity: project.path ? 1 : 0.6
                }}
                onMouseEnter={(e) => {
                  if (project.path) {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.borderColor = categoryColor;
                    e.currentTarget.style.boxShadow = `0 20px 60px ${categoryColor}40`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.borderColor = `${categoryColor}33`;
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.6)';
                }}
              >
                {/* Category Badge */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  background: `${categoryColor}33`,
                  border: `1px solid ${categoryColor}`,
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}>
                  {projectCategories[Object.keys(projectCategories).find(
                    k => projectCategories[k].id === project.category
                  )].icon}
                </div>

                {/* Project Name */}
                <h2 style={{
                  fontSize: '1.4rem',
                  fontWeight: 600,
                  marginBottom: '12px',
                  color: '#f4c261',
                  paddingRight: '50px'
                }}>
                  {project.name}
                </h2>

                {/* Description */}
                <p style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  opacity: 0.85,
                  marginBottom: '16px',
                  color: 'rgba(232, 232, 240, 0.9)'
                }}>
                  {project.description}
                </p>

                {/* Tags */}
                {project.tags && project.tags.length > 0 && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '6px',
                    marginBottom: '12px'
                  }}>
                    {project.tags.slice(0, 4).map(tag => (
                      <span
                        key={tag}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTag(tag);
                        }}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '8px',
                          background: 'rgba(123, 63, 168, 0.2)',
                          border: '1px solid rgba(123, 63, 168, 0.3)',
                          fontSize: '0.75rem',
                          opacity: 0.8,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(255, 138, 80, 0.2)';
                          e.target.style.borderColor = '#ff8a50';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(123, 63, 168, 0.2)';
                          e.target.style.borderColor = 'rgba(123, 63, 168, 0.3)';
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Status & Link Indicators */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '0.85rem'
                }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    background: 'rgba(255, 87, 34, 0.25)',
                    border: '1px solid #ff8a50',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 500
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      background: '#ff8a50',
                      borderRadius: '50%',
                      display: 'inline-block'
                    }} />
                    {project.status}
                  </span>
                  {project.external && (
                    <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>
                      {project.github ? '📁 GitHub' : '🔗 External'}
                    </span>
                  )}
                  {project.localPath && (
                    <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>
                      💾 Local
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            opacity: 0.6
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>No projects found</h2>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes cosmos-breathe {
          0%, 100% {
            background: radial-gradient(circle at 40% 20%, rgba(74, 31, 120, 0.35) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(255, 87, 34, 0.2) 0%, transparent 60%),
                        #0a0515;
          }
          50% {
            background: radial-gradient(circle at 40% 20%, rgba(74, 31, 120, 0.2) 0%, transparent 50%),
                        radial-gradient(circle at 80% 80%, rgba(255, 87, 34, 0.35) 0%, transparent 60%),
                        #0a0515;
          }
        }

        @keyframes sigil-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 24px rgba(123, 63, 168, 0.8));
            transform: scale(1);
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(255, 138, 80, 0.9));
            transform: scale(1.05);
          }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </div>
  );
};

export default MasterDashboard;
