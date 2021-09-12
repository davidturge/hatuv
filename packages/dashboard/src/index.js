import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render((
  <BrowserRouter>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </BrowserRouter>
), document.getElementById('root'));

serviceWorker.unregister();
