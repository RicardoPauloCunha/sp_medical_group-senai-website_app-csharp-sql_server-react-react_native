import React, { Component } from "react";
import { Link } from "react-router-dom";

import MenuMin from "../_componentes/menuMin";
import RodaPe from "../_componentes/rodaPe";

import ListarConsultas from "./componentes/ListarConsultas";
import ListarProntuarios from "./componentes/ListarProntuarios";
import ListarMedicos from "./componentes/ListarMedicos";
import ListarUsuarios from "./componentes/ListarUsuarios";
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
            selectOption: 0
        }
    }

    // Busca Item
    atualizaIdBuscsa(event) {
        this.setState({ idBusca: event.target.value });
    }

    atualizaEndpointBusca(event) {
        this.setState({ endpointBusca: event.target.value });
    }

    buscarId(event) {
        event.preventDefault();

        let url = `http://localhost:5000/api/${this.state.endpointBusca}${this.state.idBusca}`;
        console.log(url)

        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta)
            .then(data => { console.log(data) })
            .catch(erro => console.log(erro));
    }

    // função select
    atualizaSelectOption(event) {
        this.setState({ selectOption: event.target.value });
    }

    selecionar() {
        console.log(this.state.selectOption)
    }

    render() {
        return (
            <div>
                <MenuMin />

                <div className="style__main--container">
                    <QuantidadeItensLista />

                    <div className="links">
                        <Link to="/Cadastros">Cadastros</Link>
                    </div>

                    <div className="dashboard__item--container dashboard__lista">

                        <div className="dashboard__lista--header">
                            <select className="dashboard__lista--select" value={this.state.selectOption} onChange={this.atualizaSelectOption.bind(this)}>
                                <option value="1" className="dashboard__lista--select-option">Listar</option>
                                <option value="2" className="dashboard__lista--select-option">Consultas</option>
                                <option value="3" className="dashboard__lista--select-option">Prontuarios</option>
                                <option value="4" className="dashboard__lista--select-option">Medicos</option>
                                <option value="5" className="dashboard__lista--select-option">Usuarios</option>
                            </select>
                            <select className="dashboard__lista--select">
                                <option value="" className="dashboard__lista--select-option">Cadastrar</option>
                                <option value="" className="dashboard__lista--select-option">Consultas</option>
                                <option value="" className="dashboard__lista--select-option">Prontuarios</option>
                                <option value="" className="dashboard__lista--select-option">Medicos</option>
                                <option value="" className="dashboard__lista--select-option">Usuarios</option>
                            </select>
                        </div>

                        <button onClick={this.selecionar.bind(this)}>Selecionar</button>

                        {/* <ListarConsultas /> */}
                    </div>

                    {/* <div className="dashboard__item--container-prontuario">
                        <ListarProntuarios />
                    </div>

                    <div className="dashboard__item--container dashboard__lista">
                        <ListarMedicos />

                        <ListarUsuarios />

                    </div> */}

                    <ListaIf />
                    
                </div>

                <RodaPe idDaLista="4"/>
            </div>
        )
    }

}

export default Dashboard;