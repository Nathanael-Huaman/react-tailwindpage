import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
export const MainContext = createContext()

export const MainProvider = ({children}) => {
    const API = 'https://api-l3qa59czz-nathanaelhuamans-projects.vercel.app/api'
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const [searched,setSearched] = useState("")
    const [categorys,setCategorys] = useState(null)
    const [total,setTotal] = useState(0)
    const [openOrder,setOpenOrder] = useState(null)
    const [openMenu,setOpenMenu] = useState(null)
    const [openDetail,setOpenDetail] = useState([{state:false,id:{category:"",url:"",title:"",price:"",add:"",id:"",description:""}}])

    const useApi = (valueUrl) => {    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(valueUrl);
                    if (!response.ok) {
                        
                        throw new Error('Network response was not ok ');
                    }
                    const result = await response.json();
                    setData(result);
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            };

             fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []); // Lista de dependencias vacía para que se ejecute solo una vez .
        return {data,loading,error}
    }

    const cartShop = () => {
        setOpenMenu(false)
        setOpenOrder(!openOrder)
        setOpenDetail([{state:false,id:{category:"",url:"",title:"",price:"",add:"",id:"",description:""}}])
        console.log(openDetail[0].state)
    }

    const useAddItem = (id,price) =>{
        setOrder([...order,id])
        setTotal(total + price)
        cartShop()
        setOpenOrder(true)
    }

    const removeOrder = (item,price) => {
        const newArray = order.filter((element,index) => (index !== item))
        setOrder(newArray)
        setTotal(total - price)
    }

    

    const showDetail = (id) => {
        setOpenDetail([{state:!!id,id:id}])
        setOpenOrder(false)
        console.log(!!id)
    }

    const closeDetail = () => {
        setOpenDetail([{state:false,id:{category:"",url:"",title:"",price:"",add:"",id:"",description:""}}])
    }



    return (
        <MainContext.Provider value={{closeDetail,showDetail,cartShop,orders,setOrders,data,loading,error,useApi,API,order,useAddItem,searched,setSearched,categorys,setCategorys,total,setTotal,openOrder,setOpenOrder,openMenu,setOpenMenu,removeOrder,setOrder,openDetail,setOpenDetail}}>
            {children}
        </MainContext.Provider>
    )
}

MainProvider.propTypes = {
    children: PropTypes.any.isRequired,
  };