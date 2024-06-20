import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
export const MainContext = createContext()

export const MainProvider = ({children}) => {
    const API = 'https://fakestoreapi.com'
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orders, setOrders] = useState([]);
    const [order, setOrder] = useState([]);

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

    const useAddItem = (id) =>{
        setOrder([...order,id])
    }
    return (
        <MainContext.Provider value={{orders,data,loading,error,useApi,API,order,useAddItem}}>
            {children}
        </MainContext.Provider>
    )
}

MainProvider.propTypes = {
    children: PropTypes.any.isRequired,
  };