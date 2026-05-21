import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { templateAPI, favoriteAPI } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import TemplateCard from '../components/TemplateCard';
import TemplateCardSkeleton from '../components/TemplateCardSkeleton';
import TemplateDetailModal from '../components/TemplateDetailModal';
import PageHero from '../components/PageHero';

export default function Templates() {
  const [templates, setTemplates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const fetchTemplates = useCallback(async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (category !== 'All') params.category = category;

      const { data } = await templateAPI.getAll(params);
      setTemplates(data);
      setError('');
    } catch {
      setError('Failed to load templates. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [search, category]);

  const fetchCategories = async () => {
    try {
      const { data } = await templateAPI.getCategories();
      setCategories(data);
    } catch {
      /* optional */
    }
  };

  const fetchFavoriteIds = useCallback(async () => {
    if (!isAuthenticated) {
      setFavoriteIds([]);
      return;
    }
    try {
      const { data } = await favoriteAPI.getIds();
      setFavoriteIds(data);
    } catch {
      setFavoriteIds([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchTemplates, 300);
    return () => clearTimeout(timer);
  }, [fetchTemplates]);

  useEffect(() => {
    fetchFavoriteIds();
  }, [fetchFavoriteIds]);

  const handleToggleFavorite = async (templateId) => {
    if (!isAuthenticated) {
      showToast('Please login to save favorites', 'error');
      navigate('/login');
      return;
    }

    try {
      const { data } = await favoriteAPI.toggle(templateId);
      if (data.favorited) {
        setFavoriteIds((prev) => [...prev, templateId]);
        showToast('Added to your favorites');
      } else {
        setFavoriteIds((prev) => prev.filter((id) => id !== templateId));
        showToast('Removed from favorites');
      }
      window.dispatchEvent(new Event('favorites-updated'));
    } catch {
      showToast('Failed to update favorite', 'error');
    }
  };

  const hasFilters = search || category !== 'All';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHero
        title="Browse Templates"
        subtitle="Discover professional website templates for portfolios, SaaS, e-commerce, and more. Save your favorites and access them anytime."
      >
        <div className="rounded-xl bg-white/15 px-4 py-2 backdrop-blur">
          <span className="text-2xl font-bold">{templates.length}</span>
          <span className="ml-2 text-sm text-indigo-100">templates available</span>
        </div>
        {isAuthenticated && (
          <div className="rounded-xl bg-white/15 px-4 py-2 backdrop-blur">
            <span className="text-2xl font-bold">{favoriteIds.length}</span>
            <span className="ml-2 text-sm text-indigo-100">in your favorites</span>
          </div>
        )}
      </PageHero>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            ⌕
          </span>
          <input
            type="text"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white sm:w-52"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setCategory('All');
            }}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Clear filters
          </button>
        )}
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <TemplateCardSkeleton key={n} />
          ))}
        </div>
      ) : templates.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center dark:border-slate-600 dark:bg-slate-800">
          <p className="text-lg font-medium text-slate-900 dark:text-white">No templates found</p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isFavorited={favoriteIds.includes(template.id)}
              onToggleFavorite={handleToggleFavorite}
              onViewDetails={setSelectedId}
            />
          ))}
        </div>
      )}

      <TemplateDetailModal
        templateId={selectedId}
        isOpen={!!selectedId}
        onClose={() => setSelectedId(null)}
        isFavorited={favoriteIds.includes(selectedId)}
        onToggleFavorite={async (id) => {
          await handleToggleFavorite(id);
        }}
      />
    </div>
  );
}
