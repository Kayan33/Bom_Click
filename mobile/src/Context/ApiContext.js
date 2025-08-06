import { createContext } from 'react';
import axios from 'axios'

export const ApiContext = createContext();

export default function ApiProvider({ children }) {

    const apiBack = axios.create({
<<<<<<< HEAD
        baseURL: 'http://192.168.56.1:3333'
        // baseURL: 'http://192.168.1.195:3333'
=======
        // baseURL: 'http://192.168.56.1:3333'
        baseURL: 'https://kayanpereira.com.br:21025'
>>>>>>> 8957e5317340e4dd298801806673703975a6385a
    });

    const buscaPromocoes = async () =>{

        try {
            
            const response = await apiBack.get('/BuscaPromoMercados');

            return response.data;
            

        } catch (error) {
            
            console.error(error);

        };

    };

    const buscaProdutos = async (nomeProduto) => {

        try {
            
            const response = await apiBack.post('/BuscarProdutos', { nomeProduto });
            console.log("Resposta", response)

            return response.data;
            

        } catch (error) {
            
            console.error(error);

        };

    }

    return (
        <ApiContext.Provider value={{apiBack, buscaPromocoes, buscaProdutos}}>
            {children}
        </ApiContext.Provider>
    )

}