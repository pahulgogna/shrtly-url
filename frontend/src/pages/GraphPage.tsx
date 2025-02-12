import { toast, ToastContainer } from 'react-toastify'
import Chart from '../components/Analytics/Chart'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function GraphPage() {

    const [fullData, setFullData] = useState({
        url: '',
        clicks: 0,
        graph: [[], []] as [string[], number[]],
        key: ''
    })
    const navigate = useNavigate()

    async function handleFetch(id: string) {
        try{
            const response: {url: string, clicks: number, graph:string, key: string} = (await axios.get(import.meta.env.VITE_BEEP + "/analytics/" + id)).data

            let js = JSON.parse(response.graph)

            const keys: string[]= Object.keys(js)
            const values: number[] = Object.values(js)

            setFullData(_ => {
                return {...response, "graph":[keys, values]}
            })

        }
        catch{
            toast.error("Invalid URL", {
                position: "bottom-right"
            })
            toast.info("redirecting...", {
                position: "bottom-right"
            })
            setTimeout(() => {
                navigate('/analytics')
            }, 2000)
            return
        }
    }

    useEffect(() => {
        const id = window.location.pathname.split('/')[2]

        if(id){
            handleFetch(id)
        }
        else{
            toast.error("Invalid URL", {
                position: "bottom-right"
            })
            toast.info("redirecting...")
            setTimeout(() => {
                navigate('/analytics')
            }, 5500)
            return
        }

    }, [])

    return (
        <div className="grid grid-cols-1 mt-10">
            <div className="flex justify-center h-full w-full">
                <div className=" w-8/12 ">
                    <Chart xValues={fullData.graph[0].map((v) => {
                        return v.split(" ").slice(1).join("-")
                    })} yValues={fullData.graph[1]}/>
                </div>
                
            </div>
            <div className='flex flex-col justify-center text-lg font-semibold mt-5'>
                <div className='flex justify-center'>
                    Total clicks: {fullData.clicks}
                </div>
                <div className='flex justify-center gap-2'>
                        URL:
                    <a href={import.meta.env.VITE_DOMAIN + "/" + fullData.key} target='_blanck' className='flex text-md  cursor-pointer'>
                        <div className=' text-blue-600 hover:text-blue-700 font-normal'>
                            {import.meta.env.VITE_DOMAIN}/
                            {fullData.key}
                        </div>
                    </a>
                </div>
                <div className='flex justify-center gap-2'>
                    Leads to: 
                    <div className=' text-blue-600 hover:text-blue-700 font-normal'>
                        <a target='_blank' href={fullData.url}>
                            {fullData.url}
                        </a>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default GraphPage
