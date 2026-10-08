import { Link } from 'react-router-dom';

export function PublicFooter() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto px-6 py-8">
        <div className="font-display text-xl font-bold text-orange-500">Ottolog</div>
        <nav className="flex flex-wrap justify-center gap-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Vagas</Link>
          <a href="mailto:vagas@ottolog.com.br" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Fale com o RH</a>
          <Link to="/login" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Área do recrutador</Link>
        </nav>
        <div className="text-sm text-gray-500">© {new Date().getFullYear()} Ottolog. Todos os direitos reservados.</div>
      </div>
    </footer>
  );
}
