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
            .catch(erro => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }));
    }

    render() {
        return (
            <div>
                {
                    this.state.consultas.map(consulta => {
                        return (
                            <div className="consultas__consulta" key={consulta.id}>

                                <div className="consultas__consulta--item">
                                    <div className="consultas__consulta--item-infos">
                                        <div className="consultas__table">
                                            <table className="consultas__table--table">
                                                <tbody>
                                                    <tr className="consultas__table--header">
                                                        <th>Id</th>
                                                        <th>IdProntuario</th>
                                                        <th>IdMedico</th>
                                                        <th>DataAgendada</th>
                                                        <th>HoraAgendade</th>
                                                        <th>IdSituacao</th>
                                                    </tr>
                                                    <tr className="consultas__table--info">
                                                        <td>{consulta.id}</td>
                                                        <td>{consulta.idProntuario}</td>
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