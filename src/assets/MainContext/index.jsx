import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
export const MainContext = createContext()

export const MainProvider = ({children}) => {
    const API = 'http://localhost:3000/api'
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);
    const [searched,setSearched] = useState("")
    const [categorys,setCategorys] = useState(null)
    const [total,setTotal] = useState(0)
    const [openOrder,setOpenOrder] = useState(null)

    const useApi = (valueUrl) => {    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(valueUrl);
                    if (!response.ok) {
                        
                        throw new Error('Network response was not ok');
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

    const useAddItem = (id,price) =>{
        setOrder([...order,id])
        setTotal(total + price)
    }
    return (
        <MainContext.Provider value={{orders,data,loading,error,useApi,API,order,useAddItem,searched,setSearched,categorys,setCategorys,total,setTotal,openOrder,setOpenOrder}}>
            {children}
        </MainContext.Provider>
    )
}

MainProvider.propTypes = {
    children: PropTypes.any.isRequired,
  };