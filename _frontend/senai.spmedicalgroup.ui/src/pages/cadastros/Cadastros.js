import React, { Component } from "react";
import CadastrosIf from "./componentes/cadastrosIf";

import "../_assets/css/style.css";
import "./assents/css/cadastro.css";
import MenuMin from "../_componentes/menuMin";
import Rodape from "../_componentes/rodaPe";


class Cadastros extends Component {
    constructor() {
        super();

        this.state = {
            cadastroId: ""
        }
    }

    atualizaCadastroid(event) {
        var id = event.target.getAttribute('cadastro-id');
    }

    render() {
        return (
            <div>

                <MenuMin />

                <div className="cadastro__cadastro--container">
                    <div className="cadastro__cadastro">
                        <div className="cadastro__cadastro--header">
                            <div className="cadastro__cadastro--header-links  cadastro__cadastro--header-links-select" cadastro-id="2" onClick={this.atualizaCadastroid.bind(this)}>
                                <p>Consultas</p>
                            </div>
                            <div className="cadastro__cadastro--header-links  cadastro__cadastro--header-links-select" cadastro-id="2" onClick={this.atualizaCadastroid.bind(this)}>
                                <p>Prontuários</p>
                            </div>
                            <div className="cadastro__cadastro--header-links cadastro__cadastro--header-links-select" cadastro-id="3" onClick={this.atualizaCadastroid.bind(this)}>
                                <p>Usuários</p>
                            </div>
                            <div className="cadastro__cadastro--header-links  cadastro__cadastro--header-links-select" cadastro-id="4" onClick={this.atualizaCadastroid.bind(this)}>
                                <p>Medicos</p>
                            </div>
                        </div>
                        <CadastrosIf />
                    </div>
                </div>

                <Rodape />

            </div>
        )
    }
}

export default Cadastros;