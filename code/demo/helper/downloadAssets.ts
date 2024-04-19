import request from "request";
import { writeFile, mkdir } from "fs/promises"
import { join } from "path";

const pathToAssetFolder = "../webapp/src/assets_generated"

await mkdir(pathToAssetFolder, { recursive: true })
console.log("Downloading Background")
const background = await new Promise<{ error: any, response: request.Response, body: any }>(r => {
    request.get("https://www.materna.de/SharedDocs/Bilder/DE/buehne_startseite.svg?__blob=panorama&v=1", async (err, res, body) => {
        await writeFile(join(pathToAssetFolder, "background_full.svg"), body)
        r({ error: err, response: res, body })
    })
})

console.log("Background downloaded", background.response.statusMessage)

console.log("Downloading Logo")


const logo = await new Promise<{ error: any, response: request.Response, body: any }>(r => {
    request.get({ url: "https://www.materna.de/SharedDocs/Bilder/DE/Presse/Bildarchiv/logo-materna-gross.jpg?__blob=normal&v=1", encoding: null }, async (err, res, body) => {
        console.log({ body, err, bt: typeof body })
        await writeFile(join(pathToAssetFolder, "logo.jpg"), body)
        r({ error: err, response: res, body })
    })
})
console.log("Logo downloaded", logo.response.statusMessage)