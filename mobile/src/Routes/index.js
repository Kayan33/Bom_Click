import React, { useContext } from "react";
import { AutenticadoContexto } from "../Context/authContext";
import RotasAutenticadas from "./RotasAutenticadas";
import RotasNaoAutenticadas from './RotaNaoAutenticadas'


export default function RotasIndex() {
    const { autenticado } = useContext(AutenticadoContexto)

    return (
        autenticado === false ? <RotasNaoAutenticadas/> : <RotasAutenticadas/>
    )

}