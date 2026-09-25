import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; //
import { ToastContainer } from 'react-toastify'; //
import { Provider } from 'react-redux';
import { store } from './Toolkit/store';
import Layout from './Layout';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <App />
            <ToastContainer />
          </Layout>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);