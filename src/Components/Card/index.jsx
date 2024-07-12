import { useContext, useState } from "react"
import PropTypes from 'prop-types'
import { HiPlus } from "react-icons/hi"
import { MainContext } from "../../assets/MainContext"


const Card = ({category,url,title,price,add,id,description}) => {
    const [imgSrc, setImgSrc] = useState(url)
    const {showDetail} = useContext(MainContext)
    return(
        <div 
            className="bg-white cursor-pointer md:w-56 md:h-60 w-[calc(50%-40px)]"            
        >
            <figure className="relative mb-2 w-full h-4/5">
                <span className="absolute bottom-0 left-0 bg-white/60 text-black text-xs m-2 px-3 py-0.5">{category}</span>
                <img 
                className="w-full h-full object-cover" 
                src={imgSrc} 
                alt={title}
                onClick={() => showDetail({category:category,url:url,title:title,price:price,add:add,id:id,description:description})} 
                onError={() => setImgSrc("https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")}
                />
                <button 
                className="hover:bg-black hover:text-white absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
                onClick={() => add(id,price)}
                ><HiPlus /></button>
            </figure>
            <p className="flex justify-between">
                <span 
                className="text-sm font-light"
                onClick={() => showDetail({category:category,url:url,title:title,price:price,add:add,id:id,description:description})}
                >{title}</span>
                <span 
                className="text-lg font-medium"
                onClick={() => showDetail({category:category,url:url,title:title,price:price,add:add,id:id,description:description})}
                >{`$${price}`}</span>
            </p>
        </div>
    )
}

Card.propTypes = {
    category: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    add: PropTypes.any.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
}

export { Card }