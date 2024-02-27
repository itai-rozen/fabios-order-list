import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { data } from './data.json'
import './App.css'
import OrderList from './components/OrderList/OrderList'
import Header from './components/Header/Header'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 1,
    },
  },
});
function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className='app-container'>
        <Header />
        <OrderList />
      </div>
    </QueryClientProvider>
  )
}

export default App
