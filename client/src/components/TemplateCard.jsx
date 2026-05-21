import { useState } from 'react';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop';

export default function TemplateCard({
  template,
  isFavorited,
  onToggleFavorite,
  onViewDetails,
  showFavoriteButton = true,
}) {
  const [imgSrc, setImgSrc] = useState(template.thumbnail_url);

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:border-indigo-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-500">
      <button
        type="button"
        onClick={() => onViewDetails?.(template.id)}
        className="relative aspect-[3/2] w-full overflow-hidden bg-slate-100 text-left dark:bg-slate-700"
      >
        <img
          src={imgSrc}
          alt={template.name}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm backdrop-blur-sm">
          {template.category}
        </span>
        <span className="absolute bottom-3 right-3 rounded-lg bg-black/50 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
          View details
        </span>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <button
          type="button"
          onClick={() => onViewDetails?.(template.id)}
          className="text-left"
        >
          <h3 className="text-lg font-semibold text-slate-900 transition-colors hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400">
            {template.name}
          </h3>
        </button>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3 dark:text-slate-400">
          {template.description}
        </p>

        <div className="mt-4 flex gap-2">
          {onViewDetails && (
            <button
              type="button"
              onClick={() => onViewDetails(template.id)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              Details
            </button>
          )}
          {showFavoriteButton && (
            <button
              type="button"
              onClick={() => onToggleFavorite(template.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isFavorited
                  ? 'bg-rose-50 text-rose-600 ring-1 ring-rose-200 hover:bg-rose-100'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isFavorited ? '♥ Saved' : '+ Save'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
