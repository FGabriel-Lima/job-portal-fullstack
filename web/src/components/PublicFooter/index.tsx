import { Link } from 'react-router-dom';

export function PublicFooter() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-6 py-8">
        <div className="text-xl font-bold text-gray-900 mb-4 md:mb-0">Ottolog</div>
        <nav className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
          <Link to="/" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Privacy Policy</Link>
          <Link to="/" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Terms of Service</Link>
          <Link to="/" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Contact Support</Link>
          
          <Link to="/login" className="text-sm text-gray-300 hover:text-gray-500 transition-colors ml-4 border-l border-gray-200 pl-4" title="Acesso Restrito">
            Admin
          </Link>
        </nav>
        <div className="text-sm text-gray-500">© 2026 Ottolog Inc. Todos os direitos reservados.</div>
      </div>
    </footer>
  );
}