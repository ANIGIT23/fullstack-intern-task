import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { favoriteAPI } from '../api/axios';
import { useToast } from '../context/ToastContext';
import TemplateCard from '../components/TemplateCard';
import TemplateCardSkeleton from '../components/TemplateCardSkeleton';
import TemplateDetailModal from '../components/TemplateDetailModal';
import PageHero from '../components/PageHero';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const { showToast } = useToast();

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const { data } = await favoriteAPI.getAll();
      setFavorites(data);
      setError('');
    } catch {
      setError('Failed to load favorites. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (templateId) => {
    try {
      await favoriteAPI.toggle(templateId);
      setFavorites((prev) => prev.filter((t) => t.id !== templateId));
      showToast('Removed from favorites');
      if (selectedId === templateId) setSelectedId(null);
    } catch {
      showToast('Failed to remove favorite', 'error');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHero
        title="My Favorites"
        subtitle="Your personal collection of saved templates. Click any card for full details."
      >
        <div className="rounded-xl bg-white/15 px-4 py-2 backdrop-blur">
          <span className="text-2xl font-bold">{favorites.length}</span>
          <span className="ml-2 text-sm text-indigo-100">saved templates</span>
        </div>
      </PageHero>

      {error && (
        <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
      )}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <TemplateCardSkeleton key={n} />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center dark:border-slate-600 dark:bg-slate-800">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-3xl dark:bg-indigo-900/50">
            ♡
          </div>
          <p className="text-lg font-medium text-slate-900 dark:text-white">No favorites yet</p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Browse templates and tap Save on ones you like</p>
          <Link
            to="/templates"
            className="mt-6 inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Browse Templates
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              isFavorited={true}
              onToggleFavorite={handleRemoveFavorite}
              onViewDetails={setSelectedId}
            />
          ))}
        </div>
      )}

      <TemplateDetailModal
        templateId={selectedId}
        isOpen={!!selectedId}
        onClose={() => setSelectedId(null)}
        isFavorited={true}
        onToggleFavorite={handleRemoveFavorite}
      />
    </div>
  );
}
