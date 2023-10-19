import Route from "./router/Route"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./hooks/use-auth";
import Loading from './components/Loading'

function App() {

  const { initialLoading } = useAuth();
  console.log(initialLoading)

  if (initialLoading) {
    return <Loading />
  }

  return (
    <>
      <Route />
      <ToastContainer />
    </>
  )
}

export default App
