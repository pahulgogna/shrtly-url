import csv from 'csvtojson'
import fs from 'fs'

export async function readUrlJsonData() {
  var urlData: { [key: string]: boolean } = JSON.parse(String(fs.readFileSync('./urlset/jsonData.json')))
  return urlData
}


async function parseCSVToJsonAndSave() {
  var urlData: {"url": string}[] = await csv()
    .fromFile('urlset/verified_online.csv')

  const obj = Object.fromEntries(urlData.map(k => [k.url, true]))

  fs.writeFile("./urlset/jsonData.json",JSON.stringify(obj), () => {
    console.log("file written")
  })
}

async function test() {
  let start = Date.now()
  console.log(await readUrlJsonData())
  let end = Date.now()

  console.log("time taken: " + (end - start))
}
