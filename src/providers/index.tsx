import React, { ReactNode } from 'react';
import { ThemeProvider } from './themeProvider';
interface ProvidersProps {
  children: ReactNode;
}
import { Toaster } from 'react-hot-toast';

const Providers: React.FC<ProvidersProps> = function ({ children }) {
  return (
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export default Providers;
