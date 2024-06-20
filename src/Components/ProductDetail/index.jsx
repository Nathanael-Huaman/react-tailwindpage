import { useContext } from "react"
import { MainContext } from "../../assets/MainContext"

const ProductDetail = () => {
    const {order} = useContext(MainContext)
    return(
        <aside className="text-lg p-6 flex flex-col md:w-1/5 w-full min-w-80 h-[calc(88vh)] fixed z-10 right-0 border bg-white mr-4 rounded-xl">
            <div className="flex justify-between items-center">
                <span className="font-semibold">My Order</span>
                <button className="font-semibold">X</button>
            </div>
            <div className="flex-1">
                elementos
            </div>
            <div className="flex flex-col w-full gap-2">
                <div className="flex w-full justify-between items-center">
                    <span>Total:</span>
                    <span className="right-0 text-2xl font-semibold">$59</span>
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