import { useContext } from "react"
import { MainContext } from "../../assets/MainContext"
import { NavLink } from "react-router-dom"
import PropTypes from 'prop-types'
const OrderElement = ({item,itemIndex}) => {
    const {data,removeOrder} = useContext(MainContext)
    const itemOrder = data.filter((product) => {return product.id === item})
    return(
        <div className="flex items-center h-[10%] my-4">
            <figure className="flex items-center justify-center w-[25%] h-full rounded-xl border border-black">
            <img className="object-cover w-[80%] h-[80%] rounded-xl" src={itemOrder[0].image} alt={itemOrder[0].title} />
            </figure>
            <span className=" text-sm w-[45%] text-center">{itemOrder[0].title}</span>
            <span className="font-semibold w-[20%] text-left text-lg">{itemOrder[0].price}</span>
            <button 
            className="w-[10%] right-0"
            onClick={() => removeOrder(itemIndex,itemOrder[0].price)}
            >X</button>
        </div>
    )
}



const ProductDetail = () => {
    const {order,setOrder,total,setTotal,openOrder,setOpenOrder,setOrders,orders,cartShop,openDetail,closeDetail} = useContext(MainContext)

    const checkOut = () => {
        let newArray = orders.slice()
        const updateArray = [...newArray,{items:order,total:total}]
        order.length > 0 && (
        setOrders(updateArray),
        setOrder([]),
        setTotal(0),
        cartShop(),
        console.log(orders))
        // console.log([...newArray,{items:order,total:total}])
        // setOrders([...orders,[items=order,total=total]])
    }

    return(
        <>
        <aside className={`text-lg py-6 pl-6 flex-col md:w-1/5 w-full min-w-80 h-[calc(88vh)] fixed z-10 md:right-0 border bg-white md:mr-4 md:rounded-xl ${(openOrder && !openDetail[0].state) ? 'flex' : 'hidden'}`}>
            <div className={`flex justify-between items-center pr-6`}>
                <span className="font-semibold">My Order</span>
                <button 
                className="font-semibold"
                onClick={() => setOpenOrder(null)}
                >X</button>
            </div>
            <div className="flex-1 overflow-y-scroll">
                {order.map((product,index) => <OrderElement key={index} item ={product} itemIndex={index}/> )}
            </div>
            <div className="flex flex-col w-full gap-2 pr-6">
                <div className="flex w-full justify-between items-center">
                    <span>Total:</span>
                    <span className="right-0 text-2xl font-semibold">{`$${parseFloat(total.toFixed(2))}`}</span>
                </div>
                {/* <button 
                className="bg-black text-white py-2 rounded-lg"
                onClick={checkOut}
                >Checkout</button> */}
                    <NavLink 
                    className="bg-black text-white py-2 rounded-lg text-center"
                    onClick={checkOut}
                    to={order.length > 0 ? '/my-order/last' : '#' }
                    >
                        Checkout
                    </NavLink>
            </div>
        </aside>

        <aside className={`text-lg py-6 flex-col md:w-1/5 w-full min-w-80 h-[calc(88vh)] fixed z-10 md:right-0 border bg-white md:mr-4 md:rounded-xl ${(openDetail[0].state && !openOrder) ? 'flex' : 'hidden'}`}>
            <div className={`flex justify-between items-center px-6`}>
                <span className="font-semibold">Detail</span>
                <button 
                className="font-semibold"
                onClick={() => closeDetail()}
                >X</button>
            </div>
            <div className="flex flex-col mt-4 gap-y-2">
                <figure className="w-full flex items-center justify-center">
                    <img className="w-[240px]" src={openDetail[0].id.url} alt={openDetail[0].id.title} />
                </figure>
                <div className="flex flex-col px-6 gap-y-1">
                    <span className="font-bold text-3xl">{`$${openDetail[0].id.price}`}</span>
                    <span className="font-semibold text-2xl">{openDetail[0].id.title}</span>
                    <span className="font-normal text-xl text-justify">{openDetail[0].id.description}</span>
                </div>
            </div>
        </aside>
        </>
    )
}

export {ProductDetail}

OrderElement.propTypes = {
    item: PropTypes.number.isRequired,
    itemIndex: PropTypes.number.isRequired,
}