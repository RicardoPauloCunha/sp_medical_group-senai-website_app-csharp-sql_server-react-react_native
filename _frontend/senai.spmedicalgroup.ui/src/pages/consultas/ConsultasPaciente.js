import React, { Component } from "react";
import listarConsultasUsuarioItem from "./componentes/listarConsultasUsuarioItem";

import "./assets/css/consultas.css";
import "../_assets/css/style.css";

import MenuMin from "../_componentes/menuMin";
import Rodape from "../_componentes/rodaPe";

class ConsultasPaciente extends Component {
    constructor() {
        super();

        this.state = {
            consultas: [],
            descricao: "",
            idDescricaoIncluir: "",
            mensagem: ""
        }

        this.atualizarDescricao = this.atualizarDescricao.bind(this);
        this.atualizarIdDescricaoIncluir = this.atualizarIdDescricaoIncluir.bind(this);
    }

    // carrega o metodo
    componentDidMount() {
        this.listarConsultas();
    }

    // lista todas as consultas
    listarConsultas() {
        listarConsultasUsuarioItem
            .listar()
            .then(resposta => resposta.json())
            .then(data => { this.setState({ consultas: data }) })
            .catch(erro => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }))
    }

    // pega a descriçao digitada
    atualizarDescricao(event) {
        this.setState({ descricao: event.target.value });
    }

    atualizarIdDescricaoIncluir(event) {
        this.setState({ idDescricaoIncluir: event.target.value });
    }

    render() {
        return (
            <div>
                <MenuMin />

                <div class="style__main--container">
                    <div class="consultas__consulta">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <th>IdProntuario</th>
                                    <th>IdMedico</th>
                                    <th>DataAgendada</th>
                                    <th>HoraAgendade</th>
                                    <th>IdSituacao</th>
                                    <th>Descricao</th>
                                </tr>

                                {
                                    this.state.consultas.map(consulta => {
                                        return (
                                            <tr key={consulta.id}>
                                                <td>{consulta.id}</td>
                                                <td>{consulta.idProntuario}</td>
                                                <td>{consulta.idMedico}</td>
                                                <td>{consulta.dataAgendada.replace("T", " ").split(".")[0]}</td>
                                                <td>{consulta.horaAgendada}</td>
                                                <td>{consulta.idSituacao}</td>
                                                <td>{consulta.descricao}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                        <p>{this.state.mensagem}</p>
                    </div>
                </div>

                <Rodape />
            </div>
        );
    }
}

export default ConsultasPaciente;