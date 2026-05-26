import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MetricCard } from './index';
import { FolderOpen } from 'lucide-react';

describe('Componente MetricCard', () => {
  
  it('deve renderizar o título e o valor passados por propriedade', () => {
    render(
      <MetricCard 
        title="Vagas de Tecnologia" 
        value={42} 
        icon={FolderOpen} 
        colorTheme="blue" 
      />
    );

    expect(screen.getByText('Vagas de Tecnologia')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

});