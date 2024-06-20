import { useContext } from "react";
import { Card } from "../../Components/Card"
import { MainContext } from "../../assets/MainContext";
import { ProductDetail } from "../../Components/ProductDetail";



const Home = () => {
    const {useApi,API,loading,error,data,useAddItem} = useContext(MainContext)
    useApi(`${API}/products`)
    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            <div className={`flex flex-row flex-wrap w-full gap-8 justify-center content-center`}>
                {data.map((product,index) => <Card 
                key={index}
                // category={product.category.name}
                // url={JSON.parse(product.images)[0]}
                // title={product.title}
                // price={product.price} 
                category={product.category}
                url={product.image}
                title={product.title}
                price={product.price}
                add={useAddItem} 
                />)}
            </div>
            <ProductDetail />
        </>
    )
}

export {Home}