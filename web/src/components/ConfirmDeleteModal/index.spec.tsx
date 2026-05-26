import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ConfirmDeleteModal } from './index';

describe('Componente ConfirmDeleteModal', () => {
  
  it('deve renderizar os textos corretamente', () => {
    const mockOnClose = vi.fn();
    const mockOnConfirm = vi.fn();

    render(<ConfirmDeleteModal onClose={mockOnClose} onConfirm={mockOnConfirm} />);

    expect(screen.getByText('Excluir Vaga')).toBeInTheDocument();
    expect(screen.getByText(/Tem certeza que deseja excluir esta vaga\?/i)).toBeInTheDocument();
  });

  it('deve chamar a função onClose ao clicar em Cancelar', () => {
    const mockOnClose = vi.fn(); 
    const mockOnConfirm = vi.fn();

    render(<ConfirmDeleteModal onClose={mockOnClose} onConfirm={mockOnConfirm} />);

    const btnCancelar = screen.getByText('Cancelar');
    fireEvent.click(btnCancelar);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('deve chamar a função onConfirm ao clicar em Sim, excluir vaga', () => {
    const mockOnClose = vi.fn();
    const mockOnConfirm = vi.fn();

    render(<ConfirmDeleteModal onClose={mockOnClose} onConfirm={mockOnConfirm} />);

    const btnConfirmar = screen.getByText('Sim, excluir vaga');
    fireEvent.click(btnConfirmar);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

});