import React, { Component } from "react";
import listarItem from "./_listarItem";

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

    buttonClickConsultas() {
        this.listarConsultas();
    }

    render() {
        return (
            <div>
                <h3>Lista de Consultas</h3>
                <button onClick={this.buttonClickConsultas.bind(this)}>Listar</button>
                <table>
                    <tbody>
                        <tr>
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
                                    <tr key={consulta.id}>
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