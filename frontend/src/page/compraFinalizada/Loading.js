import './Loading.css';
import compraFinalizada from '../../imagens/bomClick.svg';

export default function Loading() {

    


    return (
        <div className='cabecalho_compra_finalizada'>
            <div className='compra_finalizada'>

                <img src={compraFinalizada} alt="" />
                <h1>Estamos Buscando os Produtos</h1>

            </div>

        </div>
    )
}

