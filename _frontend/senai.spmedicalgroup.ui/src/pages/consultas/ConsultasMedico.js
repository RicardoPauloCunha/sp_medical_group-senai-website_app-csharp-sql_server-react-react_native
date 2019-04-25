import React, { Component } from "react";

import "./assets/css/consultas.css";
import "../_assets/css/style.css";

import MenuMin from "../_componentes/menuMin";
import Rodape from "../_componentes/rodaPe";
import Consultas from "./componentes/Consultas&Descricao";

class ConsultasMedico extends Component {
    constructor() {
        super();

        this.state = {

        }

    }

    render() {
        return (
            <div>
                <MenuMin />

                <Consultas />

                <Rodape />
            </div >
        );
    }
}

export default ConsultasMedico;