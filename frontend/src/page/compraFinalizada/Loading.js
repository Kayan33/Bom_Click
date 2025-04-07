import './Loading.css';
import compraFinalizada from '../../imagens/bomClick.svg';

export default function Loading() {

    


    return (
        <div className='cabecalho_compra_finalizada'>
        <div className='compra_finalizada'>
          <img src={compraFinalizada} alt="" />
      
          <div className="mensagens">
          <h1>Estamos buscando os produtos pra você</h1>
          <h1>Consultando todos os mercados disponíveis</h1>
          <h1>Coletando as melhores ofertas do momento</h1>
          <h1>Organizando os resultados de forma inteligente</h1>

          
          </div>
        </div>
      </div>
      
    )
}

