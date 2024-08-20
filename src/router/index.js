import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "../page/home/home_screen";
import Perfil from "../page/perfil/Perfil";
import DadosPorMercado from "../page/dadosPorMercado/dadosPorMercado";
import EditarInformacoes from "../page/editarInformacoes/editarInformacoes";
import ResumoCompra from "../page/resumoCompra/resumo_compra";
import CarrinhoCompras from "../page/carrinho/carrinho_compras";

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen/>}></Route>
        <Route path="/resumocompra" element={<ResumoCompra/>}></Route>
        <Route path="/perfil" element={<Perfil/>}></Route>
        <Route path="/dadosPorMercado" element={<DadosPorMercado/>}></Route>
        <Route path="/editarInformacoes" element={<EditarInformacoes/>}></Route>
        <Route path="/carrinho" element={<CarrinhoCompras/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;