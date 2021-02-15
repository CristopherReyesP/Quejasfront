import React from 'react';
import { AppRouter } from './router/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SocketProvider } from './context/SocketContext';


export const QuejasApp = () => {

  return (
    <SocketProvider>
      <AppRouter />
    </SocketProvider>
  );


}
