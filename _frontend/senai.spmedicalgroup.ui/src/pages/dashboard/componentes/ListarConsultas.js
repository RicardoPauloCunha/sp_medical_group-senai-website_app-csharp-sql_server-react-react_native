import React, { Component } from "react";
import listarItem from "./_listarItem";

import "../assents/css/dashboard.css";
import "../../_assets/css/style.css";

class ListarConsultas extends Component {
    constructor() {
        super();

        this.state = {
            listaConsultas: [],
            mensagem: ""
        }
    }

    listarConsultas() {
        listarItem
            .listar("Consultas/ConsultasInclude")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaConsultas: data }) })
            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.listarConsultas();
    }

    buttonClickConsultas() {
        this.listarConsultas();
    }

    render() {
        return (

            <div className="dashboard__lista">
                <h2>Lista de Consultas</h2>
                <div className="style__titulo--linha"></div>

                <div className="consultas__consulta">

                    {
                        this.state.listaConsultas.map(consulta => {
                            return (
                                <div key={consulta.id} className="consultas__consulta--item dashboard__consulta--display-none">
                                    <p className="consultas__consulta--item-infos-prot">N | Protocologo: {consulta.id}</p>
                                    <div className="consultas__consulta--item-infos">
                                        <table >
                                            <tbody>
                                                <tr>
                                                    <th>Prontuario:</th>
                                                    <td>{consulta.idProntuarioNavigation.nome}</td>
                                                </tr>
                                                <tr>
                                                    <th>Medico:</th>
                                                    <td>{consulta.idMedicoNavigation.nome}</td>
                                                </tr>
                                                <tr>
                                                    <th>Data:</th>
                                                    {/* <td>{consulta.dataAgendada.toLocaleDateString()}</td> */}
                                                    {/* <td>{new  Intl.DateTimeFormat('pt-GB', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: '2-digit'
                                                    }).format(consulta.dataAgendada)}</td> */}
                                                    <td>{consulta.dataAgendada}</td>
                                                </tr>
                                                <tr>
                                                    <th>Hora:</th>
                                                    <td>{consulta.horaAgendada}</td>
                                                </tr>
                                                <tr>
                                                    <th>Situação:</th>
                                                    <td>{consulta.idSituacaoNavigation.nome}</td>
                                                </tr>
                                                <tr>
                                                    <th>Descricao:</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="consultas__consulta--item-infos-desc">{consulta.descricao}</p>
                                    </div>
                                </div>
                            );
                        })
                    }

                    <div className="consultas__consulta--item-infos dashboard__lista--table-container">
                        <div className="consultas__table dashboard__lista--table">
                            <table className="dashboard__table--table">
                                <tbody>
                                    <tr className="consultas__lista--header">
                                        <th>Id</th>
                                        <th>IdProntuario</th>
                                        <th>IdMedico</th>
                                        <th>DataAgendada</th>
                                        <th>HoraAgendada</th>
                                        <th>IdSituacao</th>
                                        <th>Descricao</th>
                                    </tr>

                                    {
                                        this.state.listaConsultas.map(consulta => {
                                            return (
                                                <tr key={consulta.id} className="consultas__table--info dashboard__table--info">
                                                    <td>{consulta.id}</td>
                                                    <td>{consulta.idProntuarioNavigation.nome}</td>
                                                    <td>{consulta.idMedicoNavigation.nome}</td>
                                                    <td>{consulta.dataAgendada}</td>
                                                    <td>{consulta.horaAgendada}</td>
                                                    <td>{consulta.idSituacaoNavigation.nome}</td>
                                                    <td className="consultas__ldescista--desc">{consulta.descricao}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListarConsultas;