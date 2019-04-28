import React, { Component } from "react";
import { Link } from "react-router-dom";

import MenuMin from "../_componentes/menuMin";
import RodaPe from "../_componentes/rodaPe";

// import ListarConsultas from "./componentes/ListarConsultas";
// import ListarProntuarios from "./componentes/ListarProntuarios";
// import ListarMedicos from "./componentes/ListarMedicos";
// import ListarUsuarios from "./componentes/ListarUsuarios";
import QuantidadeItensLista from "./componentes/QuantidadeItensLista";
import ListaIf from "./componentes/listasIf";

import "./assents/css/dashboard.css";
import "../_assets/css/style.css";

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            idBusca: "",
            endpointBusca: "",
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

                <div className="style__main--container">
                    <QuantidadeItensLista />

                    <div className="dashboard__item--container dashboard__lista">

                        <div className="dashboard__lista--header">

                            <select className="dashboard__lista--select" value={this.state.selectOption} onChange={this.atualizaSelectOption}>
                                <option value="1" className="dashboard__lista--select-option">Listar Consultas</option>
                                <option value="2" className="dashboard__lista--select-option">Listar Prontuarios</option>
                                <option value="3" className="dashboard__lista--select-option">Listar Medicos</option>
                                <option value="4" className="dashboard__lista--select-option">Listar Usuarios</option>
                            </select>

                            <Link to="/Cadastros" className="dashboard__lista--select-button">
                                <select className="dashboard__lista--select">
                                    <option value="" className="dashboard__lista--select-option">Cadastrar</option>
                                    <option value="" className="dashboard__lista--select-option">Consultas</option>
                                    <option value="" className="dashboard__lista--select-option">Prontuarios</option>
                                    <option value="" className="dashboard__lista--select-option">Medicos</option>
                                    <option value="" className="dashboard__lista--select-option">Usuarios</option>
                                </select>
                            </Link>

                        </div>
                    </div>
                    <ListaIf idLista={this.state.selectOption} />
                </div>

                <RodaPe />
            </div>
        )
    }

}

export default Dashboard;