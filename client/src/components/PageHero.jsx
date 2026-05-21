export default function PageHero({ title, subtitle, children }) {
  return (
    <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 px-6 py-10 text-white shadow-lg sm:px-10">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 max-w-2xl text-indigo-100">{subtitle}</p>}
      {children && <div className="mt-6 flex flex-wrap gap-4">{children}</div>}
    </div>
  );
}
