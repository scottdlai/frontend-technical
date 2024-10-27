import { MouseEvent, ReactNode } from 'react';

export interface ButtonProps {
  onClick: (clickEvent: MouseEvent) => void;
  children: ReactNode;
}

export function Button({ onClick, children }: ButtonProps): JSX.Element {
  return (
    <button
      className='text-center bg-primary-400 hover:bg-primary-500 text-white font-semibold py-2 px-6 rounded-lg'
      onClick={onClick}
    >
      {children}
    </button>
  );
}
