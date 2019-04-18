import React, { Component } from "react";
import listaCountItem from "./_listaCountItem";

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
            <div>
                <h3>Consultas: {this.state.qtdConsultas}</h3>
                <h3>Prontuarios: {this.state.qtdProntuarios}</h3>
                <h3>Medicos: {this.state.qtdMedicos}</h3>
                <h3>Usuarios: {this.state.qtdUsuarios}</h3>
            </div>
        )
    }
}

export default QuantidadeItensLista;