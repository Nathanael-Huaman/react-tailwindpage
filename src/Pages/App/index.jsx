
import { useRoutes, BrowserRouter } from 'react-router-dom'
import { Home } from '../Home'
import { MyAccount } from '../MyAccount'
import { MyOrder } from '../MyOrder'
import { MyOrders } from '../MyOrders'
import { NotFound } from '../NotFound'
import { SingIn } from '../SingIn'
import './App.css'
import { Navbar } from '../../Components/Navbar'
import { Layout } from '../../Components/Layout'
import { MainProvider } from '../../assets/MainContext'

const AppRoutes = () => {
  let routes = useRoutes([
    {path: '/', element: <Home />},
    {path: '/my-account', element: <MyAccount />},
    {path: '/my-order', element: <MyOrder />},
    {path: '/my-orders', element: <MyOrders />},
    {path: '/sing-in', element: <SingIn />},
    {path: '/*', element: <NotFound />},
  ])
  return routes
}


function App() {
  return (
      <MainProvider>
        <BrowserRouter>
        <Navbar />
        <Layout clases={'flex flex-row mt-20'}>
          <AppRoutes />
        </Layout>
        </BrowserRouter>
      </MainProvider>
  )
}

export default App
