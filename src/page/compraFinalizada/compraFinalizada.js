import '../compraFinalizada/compraFinalizada.css';
import compraFinalizada from '../../imagens/finalizado.svg';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CompraFinalizada() {

    const navigate = useNavigate()

    useState(() => {
        const time = setTimeout(() => {
            navigate('/')
        }, 7000);

        return () => clearTimeout(time);

    }, [navigate])


    return (
        <div className='cabecalho_compra_finalizada'>
            <div className='compra_finalizada'>

                <h1>Compra Realizada com sucesso!</h1>
                <img src={compraFinalizada} alt="" />

            </div>

        </div>
    )
}

export default CompraFinalizada