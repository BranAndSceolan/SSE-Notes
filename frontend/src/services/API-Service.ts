import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";

const apiAxiosInstance: AxiosInstance = axios.create({
    //if dev env variable is set use localhost port, else assume production where reverse a proxy should handle this correctly
    baseURL: process.env.DEV ? 'https://localhost:8000/api/' : '/api'
});

class APIService {
    /*
    todo: implement methods
    getDocument(){}

    deleteDocument(){}

    getDocumentList(){}
    */
    registerUser(username: string, password: string){
        apiAxiosInstance.post("/user/register", {name: username, password: password})
            .then((res: AxiosResponse) => {
                console.log(res)
            })
            .catch((error: AxiosError) => {
                console.log(error)
            });
    }

    //deleteUser(){}

    login(username: string, password: string){
        apiAxiosInstance.post("/user/login", {name: username, password: password})
            .then((res: AxiosResponse) => {
                console.log(res)
            })
            .catch((error: AxiosError) => {
                console.log(error)
            });
    }

    logout(){
        apiAxiosInstance.post("/user/logout")
            .then((res: AxiosResponse) => {
                console.log(res)
            })
            .catch((error: AxiosError) => {
                console.log(error)
            });
    }
}

export const API = new APIService();