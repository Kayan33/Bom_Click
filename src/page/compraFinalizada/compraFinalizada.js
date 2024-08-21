import '../compraFinalizada/compraFinalizada.css';
import compraFinalizada from '../../imagens/finalizado.svg';

function CompraFinalizada() {
    return(
        <div className='cabecalho_compra_finalizada'>
            <div className='compra_finalizada'>

            <h1>Compra Realizada com sucesso!</h1>
            <img src={compraFinalizada} alt="" />

            </div>

        </div>
    )
}

export default CompraFinalizada