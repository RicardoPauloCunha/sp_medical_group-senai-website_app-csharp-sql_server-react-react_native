import React, { Component } from "react";
import { Link } from "react-router-dom";

import MenuMin from "../_componentes/menuMin";
import RodaPe from "../_componentes/rodaPe";

import ListarConsultas from "./componentes/ListarConsultas";
import ListarProntuarios from "./componentes/ListarProntuarios";
import ListarMedicos from "./componentes/ListarMedicos";
import ListarUsuarios from "./componentes/ListarUsuarios";
import QuantidadeItensLista from "./componentes/QuantidadeItensLista";

import "./assents/css/dashboard.css";
import "../_assets/css/style.css";

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            idBusca: "",
            endpointBusca: "",
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

    render() {
        return (
            <div>
                <MenuMin />

                <div class="style__main--container">
                    <QuantidadeItensLista />

                    <Link to="/Cadastros">Cadastros</Link>

                    <div class="dashboard__item--container dashboard__lista">

                        <div class="dashboard__lista--header">
                            <select class="dashboard__lista--select">
                                <option value="" class="dashboard__lista--select-option">Listar</option>
                                <option value="" class="dashboard__lista--select-option">Consultas</option>
                                <option value="" class="dashboard__lista--select-option">Prontuarios</option>
                                <option value="" class="dashboard__lista--select-option">Medicos</option>
                                <option value="" class="dashboard__lista--select-option">Usuarios</option>
                            </select>
                            <select class="dashboard__lista--select">
                                <option value="" class="dashboard__lista--select-option">Cadastrar</option>
                                <option value="" class="dashboard__lista--select-option">Consultas</option>
                                <option value="" class="dashboard__lista--select-option">Prontuarios</option>
                                <option value="" class="dashboard__lista--select-option">Medicos</option>
                                <option value="" class="dashboard__lista--select-option">Usuarios</option>
                            </select>
                        </div>

                        <ListarConsultas />

                        <ListarProntuarios />

                        <ListarMedicos />

                        <ListarUsuarios />

                    </div>
                </div>

                <RodaPe />
            </div>
        )
    }

}

export default Dashboard;