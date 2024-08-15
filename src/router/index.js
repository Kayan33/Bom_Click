import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "../page/home/home_screen";
import Perfil from "../page/perfil/Perfil";
import DadosPorMercado from "../page/dadosPorMercado/dadosPorMercado";
import ResumoCompra from "../page/resumoCompra/resumo_compra";

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen/>}></Route>
        <Route path="/resumocompra" element={<ResumoCompra/>}></Route>
        <Route path="/perfil" element={<Perfil/>}></Route>
        <Route path="/dadosPorMercado" element={<DadosPorMercado/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;