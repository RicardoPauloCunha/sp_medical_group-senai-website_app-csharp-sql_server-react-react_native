import React, { Component } from "react";

import CadastroUsuario from "./componentes/CadastroUsuario";
import CadastroMedico from "./componentes/CadastroMedico";
import CadastroPaciente from "./componentes/CadastroPaciente";
import CadastroConsulta from "./componentes/CadastroConsulta";

import "../_assets/css/style.css";
import "./assents/css/cadastro.css";
import MenuMin from "../_componentes/menuMin";
import Rodape from "../_componentes/rodaPe";


class Cadastros extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return (
            <div>

                <MenuMin />

                <div class="cadastro__cadastro--container">
                    <CadastroUsuario />

                    <CadastroMedico />

                    <CadastroPaciente />

                    <CadastroConsulta />
                </div>

                <Rodape />

            </div>
        )
    }
}

export default Cadastros;