
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
import { MainContext, MainProvider } from '../../assets/MainContext'
import { useContext } from 'react'
import { SingUp } from '../SingUp'

const AppRoutes = () => {
  const {login,useLocalStorage} = useContext(MainContext)
  useLocalStorage('Login',false)
  let routes = useRoutes([
    {path: '/', element: login === false ? <SingIn /> : <Home />},
    {path: '/my-account', element: login === false ? <SingIn /> : <MyAccount />},
    {path: '/my-order/:id', element: login === false ? <SingIn /> : <MyOrder />},
    {path: '/my-orders', element: login === false ? <SingIn /> : <MyOrders />},
    {path: '/sing-in', element: login === false ? <SingIn /> : <SingIn />},
    {path: '/sing-up', element: login === false ? <SingUp /> : <SingUp />},
    {path: '/*', element: login === false ? <NotFound /> : <NotFound />},
  ])
  return routes
}


function App() {
  return (
      <MainProvider>
        <BrowserRouter>
        <Navbar />
        <Layout clases={'flex flex-row mt-20 justify-center'}>
          <AppRoutes />
        </Layout>
        </BrowserRouter>
      </MainProvider>
  )
}

export default App
