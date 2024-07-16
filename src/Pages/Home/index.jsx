import { useContext } from "react";
import { Card } from "../../Components/Card"
import { MainContext } from "../../assets/MainContext";
import { ProductDetail } from "../../Components/ProductDetail";
import { Search } from "../../Components/Search";
import { Notification } from "../../Components/Notifications";



const Home = () => {
    const {notification, setNotification,useApi,API,loading,error,data,useAddItem,searched,categorys} = useContext(MainContext)
    useApi(`${API}/products`)
    const handleCloseNotification = () => {
        setNotification(null);
    };
    const searchProduct = data.filter((product) => {
        return categorys ? (product.category.toLowerCase().includes(categorys.toLowerCase()) && product.title.toLowerCase().includes(searched.toLowerCase())) : product.title.toLowerCase().includes(searched.toLowerCase())
        
      })
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <div className={`flex flex-row flex-wrap max-w-screen-lg w-full gap-8 justify-center`}>
                <Search />
                {searchProduct.map((product) => <Card 
                key={product.id} 
                category={product.category}
                url={product.image}
                title={product.title}
                price={product.price}
                add={useAddItem} 
                id={product.id}
                description={product.description}
                />)}
                <span>{(searchProduct.length == 0) && `No se encontro el producto ${searched}`}</span>
            </div>
            <ProductDetail />
            {notification && (
                <Notification 
                    message={notification} 
                    duration={4500} // 10 segundos en milisegundos
                    onClose={handleCloseNotification}
                />
            )}
        </>
    )
}

export {Home}