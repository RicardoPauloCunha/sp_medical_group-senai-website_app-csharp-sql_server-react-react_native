import React, { Component } from "react";
import listaCountItem from "./_listaCountItem";

import "../assents/css/dashboard.css";
import "../../_assets/css/style.css";

import iconUsuario from "../assents/img/dashboard-icon-usuario.png";
import iconProntuario from "../assents/img/dashboard-icon-prontuario.png";
import iconConsulta from "../assents/img/dashboard-icon-consulta.png";
import iconMedico from "../assents/img/dashboard-icon-medico.png";

class QuantidadeItensLista extends Component {
    constructor() {
        super();

        this.state = {
            qtdConsultas: "",
            qtdUsuarios: "",
            qtdProntuarios: "",
            qtdMedicos: ""
        }
    }

    qtdConsultas() {
        listaCountItem
            .count("Consultas")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ qtdConsultas: data }) })
            .catch(erro => console.log(erro))
    }

    qtdProntuarios() {
        listaCountItem
            .count("Prontuarios")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ qtdProntuarios: data }) })
            .catch(erro => console.log(erro))
    }

    qtdMedicos() {
        listaCountItem
            .count("Medicos")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ qtdMedicos: data }) })
            .catch(erro => console.log(erro))
    }

    qtdUsuarios() {
        listaCountItem
            .count("Usuarios")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ qtdUsuarios: data }) })
            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.qtdConsultas();
        this.qtdProntuarios();
        this.qtdMedicos();
        this.qtdUsuarios();
    }

    render() {
        return (
            <div class="dashboard__item--container dashboard__estatic--container">
                <div class="dashboard__estatic--item">
                    <p>Usuários</p>
                    <img src={iconConsulta} alt="" />
                    <p>{this.state.qtdConsultas}</p>
                </div>
                <div class="dashboard__estatic--item">
                    <p>Prontuários</p>
                    <img src={iconProntuario} alt="" />
                    <p>{this.state.qtdProntuarios}</p>
                </div>
                <div class="dashboard__estatic--item">
                    <p>Consultas</p>
                    <img src={iconMedico} alt="" />
                    <p>{this.state.qtdMedicos}</p>
                </div>
                <div class="dashboard__estatic--item">
                    <p>Médicos</p>
                    <img src={iconUsuario} alt="" />
                    <p>{this.state.qtdUsuarios}</p>
                </div>
            </div>
        )
    }
}

export default QuantidadeItensLista;