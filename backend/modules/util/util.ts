import config from "config"

export function printToConsole(s: string){
    if (config.get("debug")== "true"){
        console.log(s)
    }
}