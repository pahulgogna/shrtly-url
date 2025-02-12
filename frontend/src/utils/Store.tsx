import { toast } from "react-toastify"


export function StoreLink(id: string): string[] | null{
    var urls: string | null = localStorage.getItem("urls")

    if(urls){
        try{
            let urlArr:string[]  = JSON.parse(urls)

            urlArr.push(id)

            localStorage.setItem("urls", JSON.stringify(urlArr))

            return urlArr
        }
        catch{
            toast.error("error while saving this url.")
            return null
        }
    }
    else{
        localStorage.setItem("urls", JSON.stringify([id]))
        return [id]
    }
}