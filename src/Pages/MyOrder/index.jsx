import { useContext } from "react"
import { BsChevronLeft } from "react-icons/bs"
import { NavLink, useParams } from "react-router-dom"
import { MainContext } from "../../assets/MainContext"
import PropTypes from 'prop-types'

const Order = ({item}) => {
    const {data} = useContext(MainContext)
    const itemOrder = data.filter((product) => {return product.id === item})
    return (
        <div className="flex items-center justify-between">
            <figure className="flex items-center justify-center rounded-xl border border-black">
                <img className="rounded-xl object-cover w-20 h-20" src={itemOrder[0].image} alt={itemOrder[0].title} />
            </figure>
            <span>{itemOrder[0].title}</span>
            <span>{itemOrder[0].price}</span>
        </div>
    )
}

const MyOrder = () => {
    const {id} = useParams()
    console.log(id)
    const {orders} = useContext(MainContext)
    console.log(orders)
    const list = orders.length > 0 ? orders[id == "last" ? orders.length - 1 : id].items : []
    console.log(list)
    return(
        <div className="flex flex-col w-full sm:w-[520px] h-full">
            <div className="flex justify-center items-center m-5">
                <NavLink className={'text-2xl'} to={'/my-orders'}>{<BsChevronLeft />}</NavLink>
                <span className="w-full text-center">My Order</span>
            </div>
            <div className="flex flex-col m-5 gap-4">
                {list.map( (product, index) => <Order key={index} item={product}/>)}
            </div>
        </div>

    )
}

export {MyOrder}

Order.propTypes = {
    item: PropTypes.number.isRequired,
}