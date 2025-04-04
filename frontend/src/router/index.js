import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "../page/home/home_screen";
import DadosPorMercado from "../page/dadosPorMercado/dadosPorMercado";
import CarrinhoCompras from "../page/carrinho/carrinho_compras";
import Loading from "../page/compraFinalizada/Loading";
import Cadastro from "../components/cadastro/Cadastro";
import Perfil from "../page/perfil/Perfil";
import EditarInformacoes from "../page/editarInformacoes/editarInformacoes";

export default function NAutenticado() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/dadosPorMercado" element={<DadosPorMercado />}></Route>
        <Route path="/carrinho" element={<CarrinhoCompras />}></Route>
        <Route path="/finalizado" element={<Loading />}></Route>
        <Route path="/cadastro" element={<Cadastro />}></Route>
        <Route path="/perfil" element={<Perfil />}></Route>
        <Route path="/editarInformacoes" element={<EditarInformacoes />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
