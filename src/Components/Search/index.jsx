import { useContext } from "react"
import { MainContext } from "../../assets/MainContext"
import { HiX } from "react-icons/hi"

const Search = () => {
    const {searched,setSearched} = useContext(MainContext)
    return(
        <div className="flex flex-col w-full items-center p-3">
            <label 
            htmlFor="search"
            className="p-2 font-semibold text-xl"
            >Exclusive Products</label>
            <div className="flex border-2 border-black rounded-lg md:w-2/6 w-full">
            <input
                type="input"
                name="search"
                id="search" 
                placeholder="Search a product"
                className="p-3 focus:outline-none rounded-lg w-[calc(100%-20px)]"
                value={searched}
                onChange={(event) => setSearched(event.target.value)}
            />
            <button 
            className={`w-4 flex items-center ${searched ? 'visible' : 'invisible' }`}
            onClick={() => setSearched('')}
            >{searched ? <HiX className="text-xl hover:font-semibold hover:text-red-600" /> : ''}</button>
            </div>
        </div>
    )
}

export {Search}