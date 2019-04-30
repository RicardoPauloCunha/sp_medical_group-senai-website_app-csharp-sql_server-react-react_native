import React, { Component } from "react";

import "./assets/css/consultas.css";
import "../_assets/css/style.css";

import MenuMin from "../_componentes/menuMin";
import Rodape from "../_componentes/rodaPe";
import ConsultasMedicos from "./componentes/ConsultasEDescricao";

class ConsultasMedico extends Component {
    render() {
        return (
            <div>
                <MenuMin />

                <ConsultasMedicos />

                <Rodape />
            </div >
        );
    }
}

export default ConsultasMedico;