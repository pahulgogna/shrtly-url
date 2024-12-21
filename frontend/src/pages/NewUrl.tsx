import { ArrowLeft, Copy, CopyCheck } from "lucide-react"
import { useEffect, useState } from "react"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

function NewUrl() {
    const [copied, setCopied] = useState(false)
    const [key, setKey] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const id = window.location.pathname.split('/')[2]

        if(id){
            setKey(id)
        }
        else{
            toast.error("Invalid URL", {
                position: "bottom-right"
            })
            toast.info("redirecting...", {
                position: "bottom-right"
            })
            setTimeout(() => {
                navigate('/')
            }, 2000)
            return
        }
    }, [])
    

    return (
        <div className="flex justify-center">
            <div className="flex justify-center mt-5 text-lg border border-slate-300 p-5 rounded-lg transition hover:shadow-lg w-fit">
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        Your URL:
                    </div>
                    <div className="flex">
                        <a href={import.meta.env.VITE_DOMAIN + "/" + key} target="_blanck" className="underline text-blue-600">
                            {import.meta.env.VITE_DOMAIN + "/" + key}
                        </a>
                        <div className="ml-3 hover:cursor-pointer" 
                        onClick={() => {
                            setCopied(true)
                            navigator.clipboard.writeText(import.meta.env.VITE_DOMAIN + "/" + key)
                            setTimeout(() => {
                                setCopied(false)
                            }, 2000)
                        }}>
                            {copied ? <CopyCheck/>:<Copy/>}
                        </div>
                    </div>
                    <div className="flex flex-col mt-8 justify-center">
                            <Button className="w-fit flex gap-1 justify-center" onClick={async () => {
                                navigate("/")
                            }}>
                                <ArrowLeft className="h-4 sm:h-5"/>
                                Shrink another URL
                            </Button>
                            <Button onClick={async () => {
                                navigate('/analytics/' + key)
                            }}>
                                Show Analytics
                            </Button>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default NewUrl
