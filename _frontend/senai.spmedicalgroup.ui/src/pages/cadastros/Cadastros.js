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
            selectOption: ""
        }

        this.atualizaSelectOption = this.atualizaSelectOption.bind(this);
    }

    // função select
    atualizaSelectOption(event) {
        this.setState({ selectOption: event.target.value });
    }

    render() {
        return (
            <div>

                <MenuMin />

                <div className="cadastro__cadastro--container">
                    <div className="cadastro__cadastro">
                        <div className="cadastro__cadastro--item">

                            <div className="cadastro__cadastro--item-select">
                                <select className="dashboard__lista--select" value={this.state.selectOption} onChange={this.atualizaSelectOption}>
                                    <option value="1" className="dashboard__lista--select-option">Cadastrar Consultas</option>
                                    <option value="2" className="dashboard__lista--select-option">Cadastrar Prontuarios</option>
                                    <option value="3" className="dashboard__lista--select-option">Cadastrar Medicos</option>
                                    <option value="4" className="dashboard__lista--select-option">Cadastrar Usuarios</option>
                                </select>
                            </div>

                            {/* <div className="cadastro__cadastro--header">
                            <div className="cadastro__cadastro--header-links  cadastro__cadastro--header-links-select">
                                <p>Consultas</p>
                            </div>
                            <div className="cadastro__cadastro--header-links  cadastro__cadastro--header-links-select" cadastro-id="2" onClick={this.atualizarCadastroId}>
                                <p>Prontuários</p>
                            </div>
                            <div className="cadastro__cadastro--header-links cadastro__cadastro--header-links-select" cadastro-id="3" onClick={this.atualizarCadastroId}>
                                <p>Usuários</p>
                            </div>
                            <div className="cadastro__cadastro--header-links cadastro__cadastro--header-links-select" cadastro-id={"4"} onClick={this.atualizarCadastroId}>
                                <p>Medicos</p>
                            </div>
                        </div> */}

                            <CadastrosIf cadastroId={this.state.selectOption} />
                        </div>
                    </div>
                </div>

                <Rodape />

            </div>
        )
    }
}

export default Cadastros;