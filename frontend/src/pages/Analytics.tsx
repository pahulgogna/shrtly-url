import { useState } from "react"
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Analytics() {

    const navigate = useNavigate()
    const [search, setSearch] = useState("")


    async function handleClick() {
        if(!search.length){
            toast.error("Invalid URL", {
                position: "bottom-right"
            })
            return
        }
        else{

            const sArray = search.split('/')

            const id = sArray[sArray.length - 1]

            if(id.length){
                navigate('/analytics/' + id)
            }
            else{
                toast.error("Invalid URL", {
                    position: "bottom-right"
                })
                return
            }         
        }
    }

    return (
        <div className="flex justify-center mt-10">
            <div className="w-full px-5 md:w-6/12 md:px-0">
                <div>
                    <div className="flex pb-10 text-2xl font-bold">
                        <div className="flex flex-col justify-start">
                            Get analytics for your shrtly url
                            <div className="font-semibold text-base text-slate-600 mt-1">
                                View the click trends over time for a Shrtly URL.
                            </div>
                        </div>
                    </div>
                    
                    <div className="border shadow-sm border-slate-300 rounded-lg p-5 flex flex-col justify-center">
                        <div className="flex justify-center text-xl font-bold p-5">
                            Enter the URL
                        </div>
                        <div className="flex justify-center pb-5">
                            <div>
                                <TextInput value={search} setValue={setSearch} lable="URL" placeholder="www.shrtly.co.in/966dop"/>
                                <Button onClick={handleClick}>
                                        check
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
            <ToastContainer/>
        </div>
    )
}

export default Analytics
