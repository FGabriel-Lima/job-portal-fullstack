import { Link } from 'react-router-dom';

export function PublicHeader() {
  return (
    <header className="w-full top-0 bg-white/90 backdrop-blur border-b border-gray-200 z-50 sticky">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-16">
        <div className="flex items-center gap-8">
          <Link to="/" className="font-display text-2xl font-bold text-orange-500 tracking-tight">Ottolog</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-semibold text-gray-900">
              Carreiras
            </Link>
          </nav>
        </div>
        <Link to="/login" className="text-sm font-semibold text-gray-500 hover:text-orange-500 transition-colors">
          Área do recrutador
        </Link>
      </div>
    </header>
  );
}
