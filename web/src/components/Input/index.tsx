import { type ComponentProps, type ReactNode } from 'react';

interface InputProps extends ComponentProps<'input'> {
  label: string;
  rightElement?: ReactNode;
}

export function Input({ label, id, rightElement, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-semibold text-gray-700" htmlFor={id}>
        {label}
      </label>
      <div className="relative flex items-center group">
        <input 
          id={id}
          className="w-full h-[48px] px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all duration-200 shadow-sm" 
          {...props}
        />
        {rightElement && (
          <div className="absolute right-4">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}