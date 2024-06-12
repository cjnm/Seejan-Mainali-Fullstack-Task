import React from 'react';
import ReactDOM from 'react-dom/client';
import { Container, NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <Container fluid>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Container>
    </NextUIProvider>
  </React.StrictMode>
);
