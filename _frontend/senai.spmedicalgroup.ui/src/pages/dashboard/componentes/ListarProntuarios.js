import React, { Component } from "react";
import listarItem from "./_listarItem";

import "../assents/css/dashboard.css";
import "../../_assets/css/style.css";

class ListarProntuarios extends Component {
    constructor() {
        super();

        this.state = {
            listaProntuarios: [],
            mensagem: ""
        }
    }

    listarProntuarios() {
        listarItem
            .listar("Prontuarios")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaProntuarios: data }) })
            .catch(erro => console.log(erro))
    }

    buttonClickProntuarios() {
        this.listarProntuarios();
    }

    render() {
        return (
            <div>
                <div className="consultas__lista--table">
                    <div className="dashboard__lista--titulo">
                        <h2>Lista de Prontuarios</h2>
                    </div>
                    <div className="style__titulo--linha dashboard__titulo--linha"></div>
                    <button onClick={this.buttonClickProntuarios.bind(this)} className="style__button--blue">Listar</button>
                </div>

                <div class="consultas__lista">
                    <table className="consultas__lista--lista">
                        <tbody>
                            <tr className="consultas__lista--header">
                                <th>Id</th>
                                <th>Nome</th>
                                <th>RG</th>
                                <th>CPF</th>
                                <th>DataNascimento</th>
                                <th>Telefone</th>
                                <th>IdUsuario</th>
                                <th>Rua</th>
                                <th>Bairro</th>
                                <th>Cidade</th>
                                <th>Estado</th>
                                <th>CEP</th>
                            </tr>

                            {
                                this.state.listaProntuarios.map(prontuario => {
                                    return (
                                        <tr key={prontuario.id} className="consultas__lista--info">
                                            <td>{prontuario.id}</td>
                                            <td>{prontuario.nome}</td>
                                            <td>{prontuario.rg}</td>
                                            <td>{prontuario.cpf}</td>
                                            <td>{prontuario.dataNascimento}</td>
                                            <td>{prontuario.telefone}</td>
                                            <td>{prontuario.idUsuario}</td>
                                            <td>{prontuario.rua}</td>
                                            <td>{prontuario.bairro}</td>
                                            <td>{prontuario.cidade}</td>
                                            <td>{prontuario.estado}</td>
                                            <td>{prontuario.cep}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListarProntuarios;