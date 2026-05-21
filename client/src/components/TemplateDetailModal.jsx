import { useEffect, useState } from 'react';
import { templateAPI } from '../api/axios';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop';

export default function TemplateDetailModal({
  templateId,
  isOpen,
  onClose,
  isFavorited,
  onToggleFavorite,
}) {
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (!isOpen || !templateId) return;

    const fetchTemplate = async () => {
      setLoading(true);
      try {
        const { data } = await templateAPI.getById(templateId);
        setTemplate(data);
        setImgSrc(data.thumbnail_url);
      } catch {
        setTemplate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplate();
  }, [isOpen, templateId]);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="template-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-800">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow hover:bg-white dark:bg-slate-700/90 dark:text-slate-200 dark:hover:bg-slate-700"
          aria-label="Close"
        >
          ×
        </button>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          </div>
        ) : template ? (
          <>
            <div className="relative aspect-[16/9] bg-slate-100 dark:bg-slate-700">
              <img
                src={imgSrc}
                alt={template.name}
                onError={() => setImgSrc(FALLBACK_IMAGE)}
                className="h-full w-full object-cover"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-medium text-indigo-700 shadow">
                {template.category}
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <h2 id="template-modal-title" className="text-2xl font-bold text-slate-900 dark:text-white">
                {template.name}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">{template.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onToggleFavorite(template.id)}
                  className={`rounded-lg px-5 py-2.5 text-sm font-medium transition-colors ${
                    isFavorited
                      ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200 hover:bg-rose-100'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center text-slate-600 dark:text-slate-400">Could not load template details.</div>
        )}
      </div>
    </div>
  );
}
