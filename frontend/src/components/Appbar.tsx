import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

function Appbar() {

    const [atAnalytics, setAtAnalytics] = useState(false)

    useEffect(() => {

        let href = window.location.href

        if(href.includes("analytics")){
            setAtAnalytics(true)
        }
        else{
            setAtAnalytics(false)
        }

    }, [window.location])
    

    return (
        <div className='flex justify-between border-b border-black h-16'>
            <div className="flex flex-col justify-center pl-4 text-xl  md:text-2xl font-semibold">
                <Link to='/' className="cursor-pointer">
                    shrtly
                </Link>
            </div>
            <div className="mr-5 flex flex-col justify-center">
                    {
                        atAnalytics ?
                        <Link className="p-2 px-3 rounded-lg border border-slate-600" to={'/'} onClick={() => {
                            setAtAnalytics(false)
                        }}>
                            Shrink
                        </Link>
                        :
                        <Link className="p-2 px-3 rounded-lg border border-slate-600" to={'/analytics'} onClick={() => {
                            setAtAnalytics(true)
                        }}>
                            Analytics
                        </Link>
                    }
            </div>
        </div>
    )
}

export default Appbar
