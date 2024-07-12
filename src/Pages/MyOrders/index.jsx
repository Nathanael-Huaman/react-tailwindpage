import { useContext } from "react"
import { MainContext } from "../../assets/MainContext"
import { NavLink } from "react-router-dom"
import { BsChevronRight } from "react-icons/bs"
import PropTypes from 'prop-types'

const ShowOrders = ({item,index}) => {
    return(
        <NavLink className={'flex justify-between w-full border border-black rounded-xl px-3 py-6 my-2 items-center hover:border-blue-500'} to={`/my-order/${index}`}>
        <span className="text-center">{`${item.items.length} articulos`}</span>
        <div className="flex items-center gap-x-2">
            <span className="font-bold text-lg">{`$${item.total.toFixed(2)}`}</span>
            <BsChevronRight className="text-2xl"  />
        </div>
        </NavLink>
    )
}

const MyOrders = () => {
    const {orders} = useContext(MainContext)
    return(
        <div className="flex flex-col sm:w-[240px]">
            <h1 className="text-center w-full my-5">My Orders</h1>
            {orders.map((item,index) => <ShowOrders key={index} item={item} index={index} /> )}
        </div>
    )
}

export {MyOrders}

ShowOrders.propTypes = {
    item: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
}