import { useRecoilValue } from "recoil"
import { UrlsAtom } from "../store/atom"
import { Link } from "react-router-dom"
import { ExternalLink } from "lucide-react"

function MyUrls() {

    const urls = useRecoilValue(UrlsAtom)

    return (
        <>
            <div className="flex justify-center mt-5 text-xl font-semibold">
                Your URLs
            </div>
            <div className="flex justify-center">
                {urls ?
                <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5">
                    
                        {urls.map((id) => {
                            return <Url id={id} className="container"/>
                        })}
                        
                </div>
                :<div className="flex justify-center py-10 text-xl font-semibold  w-full">
                    <div>
                        URLs you shorten will appear here.
                    </div>
                </div>
                }
            </div>
        </>
    )
}

function Url({
    id,
    className
}: {
    id: string,
    className?: string
}) {

    return (
        <div className={"p-5 border border-slate-600 rounded-lg " + className}>
            <div className="col-span-1 font-semibold">
                <a className="flex p-3 justify-center h-full text-blue-600" target="_blank" href={import.meta.env.VITE_DOMAIN + "/" + id}>
                    {import.meta.env.VITE_DOMAIN + "/" + id}
                    <div className="text-black mx-1">
                        <ExternalLink className="h-5"/>
                    </div>
                </a>
            </div>
            <div className="col-span-1">
                <div className="flex flex-col">
                    <Link className=" flex text-slate-50 bg-slate-900 justify-center p-2 px-3 my-2 font-medium rounded-lg border border-slate-600" to={'/analytics/' + id} onClick={() => {
                    }}>
                                    Analytics
                    </Link>
                </div>
            </div>
        </div>
    )

}



export default MyUrls
