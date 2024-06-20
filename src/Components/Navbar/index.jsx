import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { MainContext } from "../../assets/MainContext"

const Navbar = () => {
    const {order} = useContext(MainContext)
    const navbarLinks = [
        {   
            key:0,
            id:'/',
            text: 'Shopi',
            clases: 'font-semibold text-lg',
        },
        {   
            key:1,
            id:'/',
            text: 'All',
        },
        {   
            key:2,
            id:'/clothes',
            text: 'Clothes',
        },
        {   
            key:3,
            id:'/electronics',
            text: 'Electronics',
        },
        {   
            key:4,
            id:'/furnitures',
            text: 'Furnitures',
        },
        {   
            key:5,
            id:'/toys',
            text: 'Toys',
        },
        {   
            key:6,
            id:'/others',
            text: 'Others',
        },
    ]

    const navbarLinksRight = [
        {   
            key:7,
            id:'/my-orders',
            text: 'My Orders',
        },
        {   
            key:8,
            id:'/my-account',
            text: 'My Account',
        },
        {   
            key:9,
            id:'/sing-in',
            text: 'Sing In',
        },
        {   
            key:10,
            id:'/my-order',
            text: `🛒 ${order}`,
        },
    ]
    
    const sendLinks = (id,text,key,cls) => {
        const activeStyle = ( key !== 10 && key !== 0 ) ? 'underline underline-offset-4' : undefined
        return (
            <li className={cls} key={key}>
                <NavLink 
                    to={id}
                    className={({isActive}) => isActive ? activeStyle : undefined
                    }>
                    {text}
                </NavLink>
            </li> 
            )    
    }

    return(
        <nav className="w-full flex justify-between items-center fixed z-10 py-5 px-8 text-sm font-light top-0 bg-white border shadow">
            <ul className="flex items-center gap-4">
                {navbarLinks.map((link) => sendLinks(link.id,link.text,link.key,link.clases || undefined))}
            </ul>
            <ul className="flex items-center gap-4">
                <li key={'correo'}>rigel@rigel.com</li>
                {navbarLinksRight.map((link) => sendLinks(link.id,link.text,link.key))}
            </ul>
        </nav>
    )
}

export {Navbar}