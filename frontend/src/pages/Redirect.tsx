import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

function Redirect() {
    const navigate = useNavigate()

    useEffect(() => {

        toast.info("redirecting...", {
            position:"bottom-right"
        })

        async function handleRedirect(id: string){
            try{
                 const data = (await axios.get(import.meta.env.VITE_BEEP + "/" + id)).data
                 console.log(data)
                 window.location.href = data
            }
            catch(e){
                console.log(e)
                navigate('/')
            }
        }

        const id = window.location.pathname.split('/')[1]
        console.log(id)
        if(id){
            handleRedirect(id)
        }
        else{
            navigate('/')
        }

    }, [])

  return (
    <div>
      <ToastContainer/>
    </div>
  )
}

export default Redirect
