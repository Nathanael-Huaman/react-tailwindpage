import { useContext } from "react"
import { MainContext } from "../../assets/MainContext"
import { useNavigate } from "react-router-dom"
import { Notification } from "../../Components/Notifications"

const SingIn = () => {
    const {formData,setFormData,useLocalStorage,setNotification,setLogin,notification} = useContext(MainContext)
    const {localData} = useLocalStorage('users',[])
    const navigate = useNavigate()

    const handleValue = (e) => {
        const {name,value} = e.target
            setFormData({
                ...formData,
                [name]:value
            })
        
    }

    const handleCloseNotification = () => {
        setNotification(null);
    };

    const singInUser = () => {
        const {User:usuario,password,errors} = formData
        const user = localData.filter( item => item.user === usuario)
        const checkPassword = (user && user.length > 0) ? !(password === user[0].password) : true
        console.log(password)
        console.log(user[0].password)
        console.log(checkPassword)
        setFormData({...formData,
            errors:{...errors,
                checkPassword:checkPassword,
            }
        })
        try {
            !checkPassword && localStorage.setItem('Login',JSON.stringify(true))
            setLogin(true)
            setNotification('Sign In successful!!')
            navigate('/')
        } catch (error) {
            setNotification('unexpected error')
            setLogin(false)
        }
    }

    return (
        <>
            <div className="w-[360px] h-[90vh] flex items-center justify-center">
            <form className="w-full flex flex-col p-6 gap-1">
                <span className="w-full text-center text-3xl font-bold mb-3">Sign In</span>
                    {/* User */}
                <div className="flex flex-col">
                    <label className="text-xl font-semibold px-1 mb-1" htmlFor="User">User</label>

                    <input value={formData.User} onChange={handleValue} name="User" className={`bg-gray-200 py-2 px-3 rounded-xl border-2 ${formData.errors.checkPassword ? 'border-red-600' : 'border-black'}`} type="text" id="User" placeholder="User" />
                </div>
                    {/* Password */}
                <div className="flex flex-col">
                    <label className="text-xl font-semibold px-1 mb-1" htmlFor="password">Password</label>
                    <input value={formData.password} onChange={handleValue} name="password" className={`bg-gray-200 py-2 px-3 rounded-xl border-2 ${formData.errors.checkPassword ? 'border-red-600' : 'border-black'}`} type="password" id="password" placeholder="*****" />
                </div>
                <span className={`${formData.errors.checkPassword ? 'block' : 'hidden'} w-full text-center text-xs px-1 py-1 text-red-600`}>Incorrect user or password</span>
                <input className="border-black border-2 rounded-2xl py-3 mt-1 w-full cursor-pointer hover:border-blue-500 font-semibold text-xl" type="button" value="Sign In" onClick={singInUser} />
            </form>
        </div>
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

export {SingIn}