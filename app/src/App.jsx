import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from 'src/theme';
import routes from 'src/Routes';
import { Provider } from 'react-redux';
import { CssBaseline } from '@mui/material';
import store from './store';
import AlertSnackbars from './components/alerts/AlertSnackbars';
import LoadingCircularProgress from './components/loading/LoadingCircularProgress';

const App = () => {
  const { currentUser } = store.getState().user;
  const routing = useRoutes(routes(currentUser));
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertSnackbars />
        <LoadingCircularProgress />
        {routing}
      </ThemeProvider>
    </Provider>
  );
};

export default App;
