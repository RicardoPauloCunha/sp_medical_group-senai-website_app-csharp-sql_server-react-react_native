import React, { Component } from "react";
import listarItem from "./_listarItem";

import "../assents/css/dashboard.css";
import "../../_assets/css/style.css";

class ListarMedicos extends Component {
    constructor() {
        super();

        this.state = {
            listaMedicos: [],
            mensagem: ""
        }
    }

    listarMedicos() {
        listarItem
            .listar("Medicos")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaMedicos: data }) })
            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.listarMedicos();
    }

    render() {
        return (
            <div className="dashboard__lista">
                <h2>Lista de Médicos</h2>
                <div className="style__titulo--linha"></div>

                <div className="consultas__consulta">

                    {
                        this.state.listaMedicos.map(medico => {
                            return (
                                <div key={medico.id} className="consultas__consulta--item dashboard__consulta--display-none">
                                    <p className="consultas__consulta--item-infos-prot">N | Inscrição: {medico.id}</p>
                                    <div className="consultas__consulta--item-infos">
                                        <table >
                                            <tbody>
                                                <tr>
                                                    <th>Nome:</th>
                                                    <td>{medico.nome}</td>
                                                </tr>
                                                <tr>
                                                    <th>CRM:</th>
                                                    <td>{medico.crm}</td>
                                                </tr>
                                                <tr>
                                                    <th>IdEspecialidade:</th>
                                                    <td>{medico.idEspecialidade}</td>
                                                </tr>
                                                <tr>
                                                    <th>IdUsuario:</th>
                                                    <td>{medico.idUsuario}</td>
                                                </tr>
                                                <tr>
                                                    <th>IdClinica:</th>
                                                    <td>{medico.idClinica}</td>
                                                </tr>
                                            </tbody>
                                        </table>
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
                                        <th>Nome</th>
                                        <th>CRM</th>
                                        <th>IdEspecialidade</th>
                                        <th>IdUsuario</th>
                                        <th>IdClinica</th>
                                    </tr>

                                    {
                                        this.state.listaMedicos.map(medico => {
                                            return (
                                                <tr key={medico.id} className="consultas__table--info dashboard__table--info">
                                                    <td>{medico.id}</td>
                                                    <td>{medico.nome}</td>
                                                    <td>{medico.crm}</td>
                                                    <td>{medico.idEspecialidade}</td>
                                                    <td>{medico.idUsuario}</td>
                                                    <td>{medico.idClinica}</td>
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

export default ListarMedicos;