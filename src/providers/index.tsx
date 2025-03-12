import React, { ReactNode } from 'react';
import { ThemeProvider } from './themeProvider';
interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = function ({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

export default Providers;
