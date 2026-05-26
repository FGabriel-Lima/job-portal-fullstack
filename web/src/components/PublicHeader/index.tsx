import { Link } from 'react-router-dom';

export function PublicHeader() {
  return (
    <header className="w-full top-0 bg-white border-b border-gray-200 z-50 sticky shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-orange-500 tracking-tight">Ottolog</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-orange-500 border-b-2 border-orange-500 pb-1">
              Carreiras
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}