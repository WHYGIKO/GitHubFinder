import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Main from './assets/Components/Main.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}

export default App;
