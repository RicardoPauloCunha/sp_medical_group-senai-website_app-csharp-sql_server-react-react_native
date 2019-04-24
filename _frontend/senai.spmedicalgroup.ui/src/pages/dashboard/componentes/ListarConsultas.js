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
            .listar("Consultas")
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
            <div className="consultas__lista--table">
                <h2>Lista de Consultas</h2>
                <div className="style__titulo--linha"></div>
                <button onClick={this.buttonClickConsultas.bind(this)} className="style__button--blue">Listar</button>
                <table className="consultas__table">
                    <tbody>
                    <tr className="consultas__table--header">
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
                                    <tr key={consulta.id} className="consultas__table--infos">
                                        <td>{consulta.id}</td>
                                        <td>{consulta.idProntuario}</td>
                                        <td>{consulta.idMedico}</td>
                                        <td>{consulta.dataAgendada}</td>
                                        <td>{consulta.horaAgendada}</td>
                                        <td>{consulta.idSituacao}</td>
                                        <td>{consulta.descricao}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListarConsultas;