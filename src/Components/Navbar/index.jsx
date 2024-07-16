import { useContext } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { MainContext } from "../../assets/MainContext"
import { HiMenu, HiOutlineX } from "react-icons/hi"

const Navbar = () => {
    const {order,categorys,setCategorys,openMenu,setOpenMenu,cartShop,login,setLogin,setNotification} = useContext(MainContext)
    const navigate = useNavigate()
    const navbarLinks = [
        {   
            key:0,
            id:'/',
            text: 'Shopi',
            clases: 'font-semibold text-lg lg:visible invisible',
        },
        {   
            key:1,
            id:'/',
            text: 'All',
            clases: login ? 'block' : 'hidden', 
        },
        {   
            key:2,
            id:'/',
            text: 'Clothes',
            clases: login ? 'block' : 'hidden', 
        },
        {   
            key:3,
            id:'/',
            text: 'Electronics',
            clases: login ? 'block' : 'hidden', 
        },
        {   
            key:4,
            id:'/',
            text: 'Furnitures',
            clases: login ? 'block' : 'hidden', 
        },
        {   
            key:5,
            id:'/',
            text: 'Toys',
            clases: login ? 'block' : 'hidden', 
        },
        {   
            key:6,
            id:'/',
            text: 'Others',
            clases: login ? 'block' : 'hidden', 
        },
    ]

    const navbarLinksRight = [
        {   
            key:7,
            id:'/my-orders',
            text: 'My Orders',
            clases: login ? 'block' : 'hidden', 
        },
        {   
            key:8,
            id:'/my-account',
            text: 'My Account',
            clases: login ? 'block' : 'hidden' 
        },
        {   
            key:9,
            id:'/sing-in',
            text: 'Sign In',
            clases: !login ? 'block' : 'hidden' 
        },
        {   
            key:10,
            id:'/',
            text: `🛒 ${order.length}`,
            clases: login ? 'block' : 'hidden' 
        },
        {   
            key:11,
            id:'/sing-up',
            text: `Sign Up`,
            clases: !login ? 'block' : 'hidden' 
        },
    ]
    
    const sendLinks = (id,text,key,cls,active) => {
        const activeStyle = active ? ( key !== 10 && key !== 0 ) ? 'underline underline-offset-4' : undefined : null
        return (
            <li className={cls} key={key}>
                <NavLink 
                    to={id}
                    className={({isActive}) => (isActive && text === categorys) ? activeStyle : (!categorys && text === 'All') ? activeStyle : undefined}
                    onClick={() => (text === 'All' || text === 'Shopi') ? setCategorys(null)  : (key===10) ? cartShop() : (text === 'My Orders' || text === 'My Account' || text === 'Sing In') ? setCategorys(categorys) : setCategorys(text)}
                    >
                    {text}
                </NavLink>
            </li> 
            )    
    }

    const logOutUser = () => {
        try {
            localStorage.setItem('Login',JSON.stringify(false))
            setLogin(false)
            setNotification('Log out successful!!')
            navigate('/')
        } catch (error) {
            setNotification('unexpected error')
            setLogin(false)
        }
    }

    return(
        <>
            {/* PC */}
            <nav className="w-full justify-between items-center fixed z-10 py-5 px-8 text-sm font-light top-0 bg-white border shadow lg:flex hidden">
                <ul className="flex items-center gap-4">
                    {navbarLinks.map((link) => sendLinks(link.id,link.text,link.key,link.clases || undefined,true))}
                </ul>
                <ul className="flex items-center gap-4">
                    <li key={'correo'}>rigel@xrigel.com</li>
                    {navbarLinksRight.map((link) => sendLinks(link.id,link.text,link.key,link.clases,true))}
                    <li className={login ? 'block' : 'hidden'}>
                        <NavLink
                        to={'#'}
                        key={'log-out'}
                        onClick={logOutUser}
                        >
                            Log out
                        </NavLink>
                    </li>
                </ul>
            </nav>
            {/* Movile */}
            <nav className="w-full flex flex-col justify-between items-center fixed z-10 py-5 px-4 gap-4 text-sm font-light top-0 bg-white border shadow lg:hidden">
                <div className="w-full flex justify-between">
                    <ul>
                        {sendLinks(navbarLinks[0].id,navbarLinks[0].text,navbarLinks[0].key,'font-semibold text-lg')}
                    </ul>
                    <button
                        onClick={() => setOpenMenu(!openMenu)}
                    >
                        {openMenu ? <HiOutlineX className="text-3xl text-black" /> : <HiMenu className="text-3xl text-black"/> }
                    </button>
                </div>

                <ul className={`${login ? 'block' : 'hidden'} w-full flex-col py-5 border-solid border-t border-gray-400 items-center gap-4 ${openMenu ? 'flex' : 'hidden'}`}>
                    {navbarLinks.map((link) => (link.text !== 'Shopi') && sendLinks(link.id,link.text,link.key,`${link.clases} hover:border-blue-400 border-2 border-black w-full text-center p-2 rounded-xl`,false))}
                </ul>
                <ul className={`w-full flex-col py-5 border-solid border-t border-gray-400 items-center gap-4 ${openMenu ? 'flex' : 'hidden'}`}>
                    <li key={'correo'}>rigel@xrigel.com</li>
                    {navbarLinksRight.map((link) => sendLinks(link.id,link.text,link.key,`${link.clases} hover:border-blue-400 border-2 border-black w-full text-center p-2 rounded-xl` || undefined,false))}
                    <li className={login ? 'block' : 'hidden'}>
                        <NavLink
                        to={'#'}
                        key={'log-out'}
                        onClick={logOutUser}
                        >
                            Log out
                        </NavLink>
                    </li>
                </ul>

            </nav>
        </>
    )
}

export {Navbar}