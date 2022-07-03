import axios, {AxiosError, AxiosInstance, AxiosResponse} from "axios";

const apiAxiosInstance: AxiosInstance = axios.create({
    //if dev env variable is set use localhost port, else assume production where reverse a proxy should handle this correctly
    baseURL: process.env.DEV ? 'https://localhost:8000/api/' : '/api'
});

class APIService {

    public axios: AxiosInstance;

    constructor(axiosInstance: AxiosInstance) {
        this.axios = axiosInstance;
    }

    createDocument(title: string, text: string, privateNote: boolean){
        //todo: please change the backend to expect booleans, they are stored as booleans in the DB, then correct this
        let privateInt = 0;
        if(privateNote){privateInt = 1}
        return new Promise((resolve, reject) => {
            this.axios.post("/documents/create",
                {
                title: title,
                content: text,
                private: privateInt
                })
                .then((res: AxiosResponse) => {
                    resolve(res);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });

        });
    }
    /*
    todo: implement methods

    getDocument(){}

    deleteDocument(){}

    getDocumentList(){}
    */
    registerUser(username: string, password: string){
        return new Promise((resolve, reject) => {
            this.axios.post("/user/register", {name: username, password: password})
                .then((res: AxiosResponse) => {
                    resolve(res);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });

        });
    }

    //deleteUser(){}

    login(username: string, password: string){
        return new Promise((resolve, reject) => {
            this.axios.post("/user/login", {name: username, password: password})
                .then((res: AxiosResponse) => {
                    resolve(res);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });

        });
    }

    logout(){
        return new Promise((resolve, reject) => {
            this.axios.post("/user/logout")
                .then((res: AxiosResponse) => {
                    resolve(res);
                })
                .catch((error: AxiosError) => {
                    reject(error);
                });

        });
    }
}

export const API = new APIService(apiAxiosInstance);