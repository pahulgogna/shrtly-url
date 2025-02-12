import { useMemo, useState } from "react"
import Container from "../components/basics/Container"
import Button from "../components/Button"
import TextInput from "../components/TextInput"
import { toast, ToastContainer } from "react-toastify"
import axios from "axios"
import { Link } from "react-router-dom"

type Opperation = "plus" | "minus"

const operations: Opperation[] = ["plus", "minus"]

var timeout: number

function ReportMalicious() {

    const [updated, setUpdated] = useState(0)    

    function getRandomInRange(n: number) {
        return Math.floor((Math.random() * (n + 1)))
    }

    function isUrlValid(userInput: string): boolean {
        if(!userInput.length){
            return true
        }
        let url;
        try {
          url = new URL(userInput);
        } catch (_) {
          return false;
        }

        return (url.protocol === "http:" || url.protocol === "https:") && url.href.includes("o.shrtly.co.in");
    }

    

    const n1 = useMemo(() => {
        return getRandomInRange(20) + 20
    }, [updated])

    const n2 = useMemo(() => {
        return getRandomInRange(n1 - 1)
    }, [updated])


    const opperation: Opperation = useMemo(() => {
        return operations[getRandomInRange(1)]
    }, [updated])
    
    const [sent, setSent] = useState(false)

    const [isValid, setIsValid] = useState(true)

    const [ans, setAns] = useState<number>()

    const [url, setUrl] = useState("")

    useMemo(() => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                setIsValid(isUrlValid(url))
            }, 200)
        }, [url])

    function evaluateAnswer(){
        if(opperation == "minus"){
            return n1 - n2
        }
        else{
            return n1 + n2
        }
    }


    async function handleReport() {
        if(!ans || !url.length){
            toast.error("Please fill all the fields!", {
                position: "bottom-right"
            })
            return
        }
        else{
            if(ans != evaluateAnswer()){
                setUpdated(u => ++u)
                toast.error("Incorrect answer", {
                    position: "bottom-right"
                })
                return
            }
            const spl = url.split('/')
            const id = spl[spl.length - 1]
            if(!id.length || id.includes("shrtly")){
                setUpdated(u => ++u)
                toast.error("Could not verify the short URL", {
                    position: "bottom-right"
                })
                return    
            }

            await axios.get(import.meta.env.VITE_BEEP + "/rm/" + id).then((_) => {
                setUpdated(u => ++u)
                setUrl("")
                setAns(undefined)
                setSent(true)
                
            })
            .catch((_) => {
                setUpdated(u => ++u)
                toast.error("we ran into some error while processing your request." , {
                    position: "bottom-right"
                })
            })
        }
    }

    return (
        <div className="flex justify-center pt-10">
            
            {!sent ?  <div className="w-full px-5 md:w-6/12 md:px-0">
                <div className="text-xl font-bold underline">
                    Report
                </div>
                <div className="flex mt-1 text-gray-700 gap-1">
                    Report a URL that violates our <Link className="text-blue-600" to={"/terms"}>guidelines.</Link>
                </div>
                <Container className="my-5 border-slate-300">
                    <TextInput
                        className={` ${isValid? "": "bg-red-200"} `}
                        
                        placeholder="eg: o.shrtly.co.in/AbCdEf"
                        lable="Short URL:"
                        value={url}
                        setValue={setUrl}
                    />

                    <div className="flex gap-2 mt-2 mb-4">
                        <div className="flex flex-col gap-2">
                            <div className="text-lg font-semibold mt-2">
                                Security question:
                            </div>
                            <input type="number" placeholder={`${n1} ${opperation} ${n2} = `} value={ans || ""} className="border border-slate-300 shadow-sm p-2 bg-gray-50 rounded-lg" onChange={(e) => {
                                setAns(Number(e.target.value))
                            }}/>
                        </div>
                    </div>                    


                    <Button onClick={handleReport}>
                        Submit
                    </Button>
                </Container>
            </div>
            : 
            <div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Thank you for your report!</h2>
                    <p className="mt-4">We will review the URL and take appropriate action if necessary.</p>
                    <Button onClick={async () => setSent(false)} className="mt-6">
                        Report another URL
                    </Button>
                </div>
            </div>
            }

            <ToastContainer/>
        </div>
    )
}

export default ReportMalicious
