// import React from 'react';
import { AppRoutes } from './app-routes';
import Cursor from "../components/cursor"
import Providers from '../providers';
import { isMobile } from 'react-device-detect';

export function App() {
  return (
    <div>
      <Providers> 
      {isMobile ? null : <Cursor/>}
        <AppRoutes />
      </Providers>
    </div>
  );
}

export default App;
