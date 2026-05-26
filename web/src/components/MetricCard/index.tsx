import { type ElementType } from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: ElementType; // Permite passar o componente do ícone do Lucide
  colorTheme: 'blue' | 'orange' | 'gray';
  subtitle?: string;
}

export function MetricCard({ title, value, icon: Icon, colorTheme, subtitle }: MetricCardProps) {
  // Mapa de cores dinâmicas usando Tailwind
  const colors = {
    blue: 'bg-blue-100 text-blue-600',
    orange: 'bg-orange-100 text-orange-600',
    gray: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${colors[colorTheme]}`}>
          <Icon size={24} />
        </div>
        {subtitle && (
          <span className="text-gray-500 text-xs font-bold bg-gray-100 px-2 py-1 rounded-full">
            {subtitle}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      {/* Se estiver carregando, podemos mostrar um traço ou o próprio número */}
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
    </div>
  );
}