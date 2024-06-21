import { useContext } from "react"
import { MainContext } from "../../assets/MainContext"

const OrderElement = ({item}) => {
    const {data} = useContext(MainContext)
    const itemOrder = data.filter((product) => {return product.id === item})
    return(
        <div className="flex items-center h-[10%] my-4">
            <figure className="flex items-center justify-center w-[25%] h-full rounded-xl border border-black">
            <img className="object-cover w-[80%] h-[80%] rounded-xl" src={itemOrder[0].image} alt={itemOrder[0].title} />
            </figure>
            <span className=" text-sm w-[45%] text-center">{itemOrder[0].title}</span>
            <span className="font-semibold w-[20%] text-left text-lg">{itemOrder[0].price}</span>
            <button className="w-[10%] right-0">X</button>
        </div>
    )
}

const ProductDetail = () => {
    const {order,total,openOrder,setOpenOrder} = useContext(MainContext)
    return(
        <aside className={`text-lg py-6 pl-6 flex flex-col md:w-1/5 w-full min-w-80 h-[calc(88vh)] fixed z-10 md:right-0 border bg-white md:mr-4 md:rounded-xl ${openOrder ? 'visible' : 'invisible'}`}>
            <div className="flex justify-between items-center pr-6">
                <span className="font-semibold">My Order</span>
                <button 
                className="font-semibold"
                onClick={() => setOpenOrder(null)}
                >X</button>
            </div>
            <div className="flex-1 overflow-y-scroll">
                {order.map((product,index) => <OrderElement key={index} item ={product} /> )}
            </div>
            <div className="flex flex-col w-full gap-2 pr-6">
                <div className="flex w-full justify-between items-center">
                    <span>Total:</span>
                    <span className="right-0 text-2xl font-semibold">{`$${parseFloat(total.toFixed(2))}`}</span>
                </div>
                <button 
                className="bg-black text-white py-2 rounded-lg"
                onClick={()=> console.log(order)}
                >Checkout</button>
            </div>
        </aside>
    )
}

export {ProductDetail}