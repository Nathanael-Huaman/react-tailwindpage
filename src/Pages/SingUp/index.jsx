import { useContext } from "react"
import { MainContext } from "../../assets/MainContext"
import { useNavigate } from "react-router-dom"

const SingUp = () => {
    const {formData,setFormData,useLocalStorage,setNotification} = useContext(MainContext)
    const {localData,addUser} = useLocalStorage('users',[])
    const navigate = useNavigate()
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    const singUpUser =  () => {
        const {rUser,rPassword,rPassword2,rEmail,rPhone,errors} = formData
        const checkUser = (localData.filter( item => item.user === rUser )).length === 0 ? false : true
        const checkUserLength = !(rUser.length > 8)
        const checkPass = !(rPassword === rPassword2)
        const checkPasslength = rPassword.length > 16 ? false : true
        const checkEmail = !validateEmail(rEmail)
        const checkPhone = !(rPhone.length >= 9)
        setFormData({...formData,
            errors:{...errors,
                checkUser:checkUser,
                checkUserLength:checkUserLength,
                checkPass:checkPass,
                checkPasslength:checkPasslength,
                checkEmail:checkEmail,
                checkPhone:checkPhone, 
            }
        })
        const result = (!checkUser && !checkPass && !checkPasslength && !checkEmail && !checkPhone && !checkUserLength) && addUser(rUser,rPassword,rEmail,rPhone)
        console.log(result)
        result && (navigate('/sing-in'),setFormData({...formData,User:rUser,password:rPassword}),setNotification('Registro con exito!!'))
   }

    const handleValue = (e) => {
        const {name,value} = e.target
        if (name === 'rPhone'){
            if (/^\d*$/.test(value) && value.length <= 9){
                setFormData({
                    ...formData,
                    [name]:value
                })
            }
        }   else{
            setFormData({
                ...formData,
                [name]:value
            })
        }
    }

    return(
        <div className="w-[360px] h-[90vh] flex items-center justify-center">
            
            <form className="w-full flex flex-col p-6 gap-1">
                <span className="w-full text-center text-3xl font-bold mb-3">Create your account</span>
                    {/* User */}
                <div className="flex flex-col">
                    <label className="text-xl font-semibold px-1 mb-1" htmlFor="userR">User</label>
                    <input value={formData.rUser} onChange={handleValue} name="rUser" className={`bg-gray-200 py-2 px-3 rounded-xl ${(formData.errors.checkUser || formData.errors.checkUserLength) ? 'border-red-600' : 'border-black' } border-2`} type="text" id="userR" placeholder="User" />
                    <span className={`${(formData.errors.checkUser || formData.errors.checkUserLength) ? 'block' : 'hidden' } text-xs px-1 py-1 text-red-600`}>{`${formData.errors.checkUser ? 'El usuario ya existe' : ''} ${(formData.errors.checkUserLength && !(formData.errors.checkUser)) ? 'El usuario debe ser mayor a 8 caracteres':''}`}</span>
                </div>
                    {/* Passwords */}
                <div className="flex flex-col">
                    <label className="text-xl font-semibold px-1 mb-1" htmlFor="passR1">Password</label>
                    <input value={formData.rPassword} onChange={handleValue} name="rPassword" className={`bg-gray-200 py-2 px-3 rounded-xl ${(formData.errors.checkPass || formData.errors.checkPasslength) ? 'border-red-600' : 'border-black' } border-2`} type="password" id="passR1" placeholder="*****" />
                    <span className={`${(formData.errors.checkPass || formData.errors.checkPasslength) ? 'block' : 'hidden' } text-xs px-1 py-1 text-red-600`}>{`${formData.errors.checkPass ? 'Las contraseñas no coinciden' : ''} ${(formData.errors.checkPasslength && !(formData.errors.checkPass)) ? 'La contraseña debe de ser mayor a 16 caracteres':''}`}</span>
                </div>
                    
                <div className="flex flex-col">
                    <label className="text-xl font-semibold px-1 mb-1" htmlFor="passR2">Confirm your password</label>
                    <input value={formData.rPassword2} onChange={handleValue} name="rPassword2" className={`bg-gray-200 py-2 px-3 rounded-xl ${(formData.errors.checkPass || formData.errors.checkPasslength) ? 'border-red-600' : 'border-black' } border-2`} type="password" id="passR2" placeholder="*****" />
                    <span className={`${(formData.errors.checkPass || formData.errors.checkPasslength) ? 'block' : 'hidden' } text-xs px-1 py-1 text-red-600`}>{`${formData.errors.checkPass ? 'Las contraseñas no coinciden' : ''} ${(formData.errors.checkPasslength && !(formData.errors.checkPass)) ? 'La contraseña debe de ser mayor a 16 caracteres':''}`}</span>
                </div>
                    {/* Email */}
                <div className="flex flex-col">
                    <label className="text-xl font-semibold px-1 mb-1" htmlFor="emailR">Email</label>
                    <input value={formData.rEmail} onChange={handleValue} name="rEmail" className={`bg-gray-200 py-2 px-3 rounded-xl ${formData.errors.checkEmail ? 'border-red-600' : 'border-black' } border-2`} type="email" id="emailR" placeholder="example@example.com" />
                    <span className={`${formData.errors.checkEmail ? 'block' : 'hidden' } text-xs px-1 py-1 text-red-600`}>Introduce un Email valido</span>
                </div>
                    {/* Phone */}
                <div className="flex flex-col">
                    <label className="text-xl font-semibold px-1 mb-1" htmlFor="phoneR">Phone</label>
                    <input value={formData.rPhone} onChange={handleValue} name="rPhone" className={`bg-gray-200 py-2 px-3 rounded-xl ${formData.errors.checkPhone ? 'border-red-600' : 'border-black' } border-2`} type="text" id="phoneR" placeholder="123456789" />
                    <span className={`${formData.errors.checkPhone ? 'block' : 'hidden' } text-xs px-1 py-1 text-red-600`}>Introduce un número valido</span>
                </div>

                <input className="border-black border-2 rounded-2xl py-3 mt-1 w-full cursor-pointer hover:border-blue-500 font-semibold text-xl" type="button" value="Sign Up now!!" onClick={singUpUser} />
            </form>
        </div>
    )
}

export {SingUp}