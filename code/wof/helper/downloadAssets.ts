import request from "request";
import axios from "axios";
import { writeFile, mkdir } from "fs/promises"
import { join } from "path";

const pathsToAssetFolder = [
    "../app/src/assets_generated",
    "../app/public/assets_generated",
]
for (const pathToAssetFolder of pathsToAssetFolder) {
    await mkdir(pathToAssetFolder, { recursive: true })
}
console.log("Downloading Background")
const res = await axios.get("https://www.materna.de/SharedDocs/Bilder/DE/buehne_startseite.svg?__blob=panorama&v=1");
for (const pathToAssetFolder of pathsToAssetFolder) {
    await writeFile(join(pathToAssetFolder, "background_full.svg"), res.data)
}
// , async (err, res, body) => {
//
//     r({ error: err, response: res, body })
// })

console.log("Background downloaded")

console.log("Downloading Logo")
const res2 = await axios.get("https://www.materna.de/SharedDocs/Bilder/DE/Presse/Bildarchiv/logo-materna-gross.jpg?__blob=normal&v=1", { responseType: 'arraybuffer' });
for (const pathToAssetFolder of pathsToAssetFolder) {
    await writeFile(join(pathToAssetFolder, "logo.jpg"), res2.data)
}

console.log("Logo downloaded")