import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx'; // 👈 NUEVO
import {Provider} from 'react-redux'; // 👈 NUEVO
import {store} from './redux/store'; // 👈 NUEVO

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
);
