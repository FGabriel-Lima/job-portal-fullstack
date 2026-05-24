import { type ComponentProps } from 'react';

// Herda todas as propriedades nativas de um botão HTML (onClick, type, disabled, etc)
interface ButtonProps extends ComponentProps<'button'> {
  isLoading?: boolean;
}

export function Button({ children, isLoading, ...props }: ButtonProps) {
  return (
    <button 
      {...props}
      disabled={isLoading || props.disabled}
      className="mt-4 w-full h-[52px] bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Aguarde...' : children}
    </button>
  );
}