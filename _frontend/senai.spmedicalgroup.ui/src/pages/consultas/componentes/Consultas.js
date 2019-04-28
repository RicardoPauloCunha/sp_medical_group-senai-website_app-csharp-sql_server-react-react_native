import React, { Component } from "react";

import "../assets/css/consultas.css";
import "../../_assets/css/style.css";

import listarConsultasUsuarioItem from "./listarConsultasUsuarioItem";

class Consultas extends Component {
    constructor() {
        super();

        this.state = {
            consultas: [],
            descricao: "",
            idDescricaoIncluir: "",
            mensagem: ""
        }
    }

    // lista todas as consultas
    listarConsultas() {
        listarConsultasUsuarioItem
            .listar()
            .then(resposta => resposta.json())
            .then(data => { this.setState({ consultas: data }) })
            .catch(erro => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }));
    }

    // carrega o metodo
    componentDidMount() {
        this.listarConsultas();
    }

    render() {
        return (
            <div className="body">
                {
                    this.state.consultas.map(consulta => {
                        return (
                            <div className="consultas__consulta" key={consulta.id}>

                                <div className="consultas__consulta--item consultas__consulta--display-none">
                                    <p className="consultas__consulta--item-infos-prot">N | Protocologo: {consulta.id}</p>
                                    <div className="consultas__consulta--item-infos">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Medico:</th>
                                                    <td>{consulta.idMedico}</td>
                                                </tr>
                                                <tr>
                                                    <th>Data:</th>
                                                    <td>{consulta.dataAgendada}</td>
                                                </tr>
                                                <tr>
                                                    <th>Hora:</th>
                                                    <td>{consulta.horaAgendada}</td>
                                                </tr>
                                                <tr>
                                                    <th>Situação:</th>
                                                    <td>{consulta.idSituacao}</td>
                                                </tr>
                                                <tr>
                                                    <th>Descricao:</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="consultas__consulta--item-infos-desc">{consulta.descricao}</p>
                                    </div>
                                </div>

                                <div className="consultas__consulta--item consulta__table--display-none">
                                    <div className="consultas__consulta--item-infos">
                                        <div className="consultas__table">
                                            <table className="consultas__table--table">
                                                <tbody>
                                                    <tr className="consultas__table--header">
                                                        <th>Id</th>
                                                        <th>IdMedico</th>
                                                        <th>DataAgendada</th>
                                                        <th>HoraAgendade</th>
                                                        <th>IdSituacao</th>
                                                    </tr>
                                                    <tr className="consultas__table--info">
                                                        <td>{consulta.id}</td>
                                                        <td>{consulta.idMedico}</td>
                                                        <td>{consulta.dataAgendada.replace("T", " ").split(".")[0]}</td>
                                                        <td>{consulta.horaAgendada}</td>
                                                        <td>{consulta.idSituacao}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table className="consultas__table--table consultas__table--table-textarea">
                                                <tbody>
                                                    <tr className="consultas__table--header">
                                                        <th>Descrição</th>
                                                    </tr>
                                                    <tr className="consultas__table--info consultas__table--info-desc">
                                                        <td>{consulta.descricao}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

export default Consultas