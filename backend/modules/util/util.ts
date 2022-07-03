import config from "config"

export function printToConsole(s: string){
    if (config.get("debug")== "true"){
        console.log(s)
    }
}

export function printError(position: string, errorText: string) {
    printToConsole("At "+ position + " : " + errorText)
}

export const internalErrorMessage: string = "Something went wrong, possibly on our side. We are sorry.\n Please try again in a minute."