import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { StoreContextProvider } from './store/store-context';

ReactDOM.render((
  <BrowserRouter>
    <StoreContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </StoreContextProvider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
