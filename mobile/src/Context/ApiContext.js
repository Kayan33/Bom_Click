import { createContext } from 'react';
import axios from 'axios'

export const ApiContext = createContext();

export default function ApiProvider({ children }) {

    const apiBack = axios.create({
        // baseURL: 'http://192.168.1.195:3333'
        baseURL: 'http://192.168.56.1:3333'
    });

    const buscaPromocoes = async () =>{

        try {
            
            const response = await apiBack.get('/BuscaPromocoes');


            return response.data
            

        } catch (error) {
            
            console.error(error)

        }

    }

    return (
        <ApiContext.Provider value={{apiBack, buscaPromocoes}}>
            {children}
        </ApiContext.Provider>
    )

}