import config from "config"

export function printToConsole(s: string){
    if (config.get("debug")== "true"){
        console.log(s)
    }
}

export function printError(position: string, errorText: string) {
    printToConsole("At "+ position + " : " + errorText)
}