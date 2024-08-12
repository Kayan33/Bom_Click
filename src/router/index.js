import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "../page/home/home_screen";
import Perfil from "../page/perfil/Perfil";
function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen/>}></Route>
        <Route path="/perfil" element={<Perfil/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;