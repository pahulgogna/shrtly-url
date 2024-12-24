import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Dot } from "lucide-react"
import { useRecoilValue } from "recoil"
import { UrlsAtom } from "../store/atom"

function Appbar() {

    const [atAnalytics, setAtAnalytics] = useState(false)
    const Urls = useRecoilValue(UrlsAtom)

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
            <div className="flex flex-col justify-center pl-4 text-xl  md:text-2xl font-bold">
                <Link to='/'  onClick={() => {
                            setAtAnalytics(false)
                        }} className="cursor-pointer gap-0 flex mr-0">
                    shrtly
                    <div className="flex flex-col justify-end m-0 gap-0 p-0">
                    <Dot strokeWidth={"4px"} size={"20px"} className=" justify-start flex w-4 h-4 p-0 m-0"/>
                    </div>
                </Link>
            </div>
            
            <div className="mr-5 flex flex-col justify-center">
                <div className="flex gap-2">
                        {
                            Urls && Urls.length ? 
                            <Link className="p-2 font-medium px-3 rounded-lg border border-slate-600" to={'/myurls'}>
                                My Urls
                            </Link>
                            :
                            null
                        }
                        {
                            atAnalytics ?
                            <Link className="p-2 px-3 font-medium rounded-lg border border-slate-600" to={'/'} onClick={() => {
                                setAtAnalytics(false)
                            }}>
                                Shrink
                            </Link>
                            :
                            <Link className="p-2 px-3 font-medium rounded-lg border border-slate-600" to={'/analytics'} onClick={() => {
                                setAtAnalytics(true)
                            }}>
                                Analytics
                            </Link>
                        }
                    </div>
            </div>
        </div>
    )
}

export default Appbar
