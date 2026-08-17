import React, { useMemo, useState } from 'react';
import { getCategory, openPortal, portalCategories, portals } from './data/portalRegistry.js';

const PortalLibrary = () => {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('all');
  const [category, setCategory] = useState('all');

  const filteredPortals = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return portals
      .filter((portal) => kind === 'all' || portal.kind === kind)
      .filter((portal) => category === 'all' || portal.category === category)
      .filter((portal) => {
        if (!normalized) return true;
        return [portal.title, portal.description, portal.status, portal.kind]
          .join(' ')
          .toLowerCase()
          .includes(normalized);
      })
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [category, kind, query]);

  const kinds = ['react', 'html', 'external', 'local'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-950/40 to-slate-950 px-4 pb-16 pt-24 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-3xl border border-orange-400/25 bg-slate-950/75 p-6 backdrop-blur-xl sm:p-9">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-orange-300">Single source of truth</p>
          <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-black sm:text-5xl">Portal Library</h1>
              <p className="mt-3 max-w-3xl text-slate-300">
                Every surviving React view, standalone HTML artifact, local service and external destination in one searchable catalogue.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center">
              <strong className="block text-3xl text-orange-300">{filteredPortals.length}</strong>
              <span className="text-xs uppercase tracking-widest text-slate-400">visible pieces</span>
            </div>
          </div>
        </header>

        <section className="mb-8 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_240px]">
            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Name, description, status…"
                className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-orange-300"
              />
            </label>
            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Type</span>
              <select
                value={kind}
                onChange={(event) => setKind(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-orange-300"
              >
                <option value="all">All types</option>
                {kinds.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">Shelf</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-orange-300"
              >
                <option value="all">All shelves</option>
                {portalCategories.map((item) => (
                  <option key={item.id} value={item.id}>{item.icon} {item.label}</option>
                ))}
              </select>
            </label>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredPortals.map((portal) => {
            const shelf = getCategory(portal.category);
            const destination = portal.route ? `#${portal.route}` : portal.href;

            return (
              <article key={portal.id} className="flex min-h-60 flex-col rounded-2xl border border-white/10 bg-slate-900/75 p-5 shadow-lg transition hover:border-orange-300/60">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-4xl" aria-hidden="true">{portal.icon}</span>
                  <div className="flex flex-wrap justify-end gap-2">
                    <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-orange-200">
                      {portal.kind}
                    </span>
                    <span className="rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {portal.status}
                    </span>
                  </div>
                </div>
                <h2 className="mt-4 text-xl font-black text-orange-200">{portal.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{portal.description}</p>
                <div className="mt-5 border-t border-white/5 pt-4">
                  <div className="mb-3 flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span>{shelf?.icon} {shelf?.label}</span>
                    <code className="max-w-[55%] truncate text-right">{destination}</code>
                  </div>
                  <button
                    type="button"
                    onClick={() => openPortal(portal)}
                    className="w-full rounded-xl border border-orange-300/30 bg-orange-300/10 px-4 py-2.5 text-sm font-black text-orange-200 transition hover:bg-orange-300/20"
                  >
                    Open {portal.kind === 'react' ? 'view' : 'artifact'} →
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        {filteredPortals.length === 0 && (
          <div className="rounded-2xl border border-dashed border-white/15 p-16 text-center text-slate-500">
            No portal matches those filters.
          </div>
        )}
      </div>
    </main>
  );
};

export default PortalLibrary;
