import React, { useMemo, useState } from 'react';
import { getCategory, openPortal, portalCategories, portals } from './data/portalRegistry.js';

const STATUS_LABELS = {
  operational: 'active',
  archive: 'archive',
  wip: 'work in progress',
  local: 'local only',
  external: 'external',
};

const CommandCenter = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const visiblePortals = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return portals.filter((portal) => {
      const matchesCategory = activeCategory === 'all' || portal.category === activeCategory;
      const matchesQuery = !normalized || [portal.title, portal.description, portal.category, portal.status]
        .join(' ')
        .toLowerCase()
        .includes(normalized);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  const featured = portals.filter((portal) => portal.featured);

  return (
    <main className="min-h-screen bg-[#0a0515] text-slate-100 px-4 pb-16 pt-24 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-3xl border border-purple-400/25 bg-slate-950/75 p-6 shadow-2xl shadow-purple-950/50 backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.28em] text-cyan-300">Imagine Claude</p>
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl">One workshop. Every surviving piece.</h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                The old portals are preserved, but they now share one catalogue, one hierarchy and one navigation contract.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <strong className="block text-2xl text-amber-300">{portals.length}</strong>
                <span className="text-xs uppercase tracking-wider text-slate-400">pieces</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <strong className="block text-2xl text-cyan-300">{portalCategories.length}</strong>
                <span className="text-xs uppercase tracking-wider text-slate-400">shelves</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <strong className="block text-2xl text-emerald-300">1</strong>
                <span className="text-xs uppercase tracking-wider text-slate-400">source</span>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Start here</p>
              <h2 className="mt-1 text-2xl font-bold">Primary workbenches</h2>
            </div>
            <button
              type="button"
              onClick={() => window.location.hash = 'library'}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-amber-300 hover:text-amber-200"
            >
              Open full library →
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {featured.map((portal) => (
              <button
                type="button"
                key={portal.id}
                onClick={() => openPortal(portal)}
                className="group min-h-44 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/95 to-purple-950/70 p-5 text-left shadow-lg transition duration-200 hover:-translate-y-1 hover:border-orange-300/70 hover:shadow-orange-950/40"
              >
                <span className="text-4xl" aria-hidden="true">{portal.icon}</span>
                <h3 className="mt-4 text-lg font-black text-amber-200">{portal.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{portal.description}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-2xl border border-white/10 bg-slate-950/70 p-4 backdrop-blur">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <label className="block">
              <span className="sr-only">Search all portals</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search portals, tools, archives…"
                className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-wider transition ${
                  activeCategory === 'all'
                    ? 'border-amber-300 bg-amber-300/15 text-amber-200'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30'
                }`}
              >
                All
              </button>
              {portalCategories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-full border px-3 py-2 text-xs font-bold uppercase tracking-wider transition ${
                    activeCategory === category.id
                      ? 'border-amber-300 bg-amber-300/15 text-amber-200'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30'
                  }`}
                >
                  {category.icon} {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-300">
                {activeCategory === 'all' ? 'Complete workshop' : getCategory(activeCategory)?.label}
              </p>
              <h2 className="mt-1 text-2xl font-bold">{visiblePortals.length} visible pieces</h2>
            </div>
          </div>

          {visiblePortals.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visiblePortals.map((portal) => {
                const category = getCategory(portal.category);
                return (
                  <button
                    type="button"
                    key={portal.id}
                    onClick={() => openPortal(portal)}
                    className="group rounded-2xl border border-white/10 bg-slate-900/70 p-5 text-left transition duration-200 hover:-translate-y-1 hover:border-purple-300/70 hover:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-4xl" aria-hidden="true">{portal.icon}</span>
                      <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {STATUS_LABELS[portal.status] || portal.status}
                      </span>
                    </div>
                    <h3 className="mt-4 text-xl font-black text-slate-100 group-hover:text-amber-200">{portal.title}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{portal.description}</p>
                    <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-slate-500">
                      <span>{category?.icon} {category?.label}</span>
                      <span className="font-mono uppercase">{portal.kind}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center text-slate-500">
              No pieces match this filter.
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default CommandCenter;
