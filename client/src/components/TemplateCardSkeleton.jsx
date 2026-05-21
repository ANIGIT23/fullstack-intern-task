export default function TemplateCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="aspect-[3/2] bg-slate-200 dark:bg-slate-700" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="mt-4 h-10 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}
