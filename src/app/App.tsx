import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './providers/ErrorBoundary';
import { ConfigProvider } from './providers/ConfigProvider';
import { RouterProvider } from './providers/RouterProvider';
import { RootStoreProvider } from './providers/StoreProvider';

import './styles/index.css';

function App() {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <RootStoreProvider>
          <ErrorBoundary>
            <RouterProvider />
          </ErrorBoundary>
        </RootStoreProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
