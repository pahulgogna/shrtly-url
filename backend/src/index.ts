import express from 'express'
import { readUrlJsonData } from './utils/readCSV';
import { UrlInputSchema, urlInputSchema } from '@pahul100/short-link-common'
import { shortHash } from './utils/hashing';
import { Url } from './utils/database';
import cors from 'cors';

const app = express();

var corsOptions = {
    origin: 'https://shrtly.co.in',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.set('trust proxy', true);

app.use(express.json())

app.use((req, _, next) => {
    console.log(req.method + " : " + req.originalUrl)
    next()
})

app.get("/", (req, res) => {
    res.redirect("https://shrtly.co.in")
})

app.post('/shrink',async (req, res) => {
    let data = await readUrlJsonData()

    let body = urlInputSchema.safeParse(req.body)

    if(!body.success){
        res.status(400).json({"detail": "Invalid Input"})
        return
    }

    let url: UrlInputSchema = body.data;

    url.url = url.url.trim()

    url.url = url.url.endsWith("/") ? url.url.replace(/[\s/]+$/, '') : url.url

    if(data[url.url]){
        res.status(400).json({
            "detail": "ERROR: The URL you provided appears to be unsafe or potentially harmful. For security purposes, it cannot be processed. Please verify the URL and try again."
        })
        return
    }

    const clientIp = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'][0] : req.ip
    const d = String(Date.now())

    let hash = shortHash((url.url + clientIp + d))

    try{
        let u = new URL(url.url);
    }
    catch{
        res.status(400).json({"detail" : "Invalid URL"})
        return
    }

    try{
        let createdUrl = await Url.create({
                            key: hash,
                            url: url.url,
                            verified: true
                        })
    
        const key = createdUrl.key
    
        res.json({"detail":key})
    }
    catch{
        res.status(500).json({"detail":"internal server error"})
    }
})

app.get('/analytics/*', async (req, res) => {
    const urlString = req.originalUrl.split('/')

    const id = urlString[urlString.length - 1]

    if(!id){
        res.sendStatus(404)
        return
    }

    try{
        let data = await Url.findOne({
            key: id
        })

        res.json(data)
    }
    catch{
        res.sendStatus(404)
    }

})

app.get("/rm/*", async (req, res) => {

    let data = req.originalUrl.split("/")

    let id = data[data.length - 1]    

    if(!id){
        res.sendStatus(404)
        return
    }

    let updated = await Url.findOneAndUpdate(
            {
                key: id
            },
            {
                verified: false
            }
    )

    console.log(id, updated)

    if(updated){
        res.sendStatus(204)
    }
    else{
        res.sendStatus(404)
        return
    }
})

app.get('/*', async (req, res) => {

    const id = req.originalUrl.slice(1)

    if(!id){
        res.sendStatus(404)
        return
    }

    try{
        let data = await Url.findOne({
            key: id
        })

        if(data){

            if(!data.verified){
                res.redirect("https://shrtly.co.in")
                return
            }
            
            const d = (new Date()).toDateString()
            
            let graph: { [key: string] : number} = JSON.parse(String(data.graph))
            
            
            if(graph[d]){
                graph[d]++
            }
            else{
                graph[d] = 1
            }
            
            await Url.findOneAndUpdate(
                {key: id},
                {clicks: data.clicks + 1, graph: JSON.stringify(graph)}
            )
            
            res.redirect(data.url)
        }
        else{
            res.redirect("https://shrtly.co.in")
        }
    }
    catch(e){
        console.log(e)
        res.redirect("https://shrtly.co.in")
    }
})

app.listen(3000, () => {
    console.log("started server on port 3000")
})