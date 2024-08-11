import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarrinhoCompras from "../page/carrinho_compras";
import HomeScreen from "../page/home_screen";
import ResumoCompra from "../page/resumo_compra";
function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/carrinho" element={<CarrinhoCompras />}></Route>
        <Route path="/compras" element={<ResumoCompra />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;