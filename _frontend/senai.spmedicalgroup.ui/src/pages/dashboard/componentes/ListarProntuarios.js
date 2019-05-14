import React, { Component } from "react";
import listarItem from "./_listarItem";
import Moment from "react-moment";

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
            .listar("Prontuarios/ProntuariosInclude")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaProntuarios: data }) })
            .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.listarProntuarios();
    }

    render() {
        return (
            <div className="dashboard__lista">
                <h2>Lista de Prontuários</h2>
                <div className="style__titulo--linha"></div>

                <div className="consultas__consulta consultas__consulta-prontuario">

                    {
                        this.state.listaProntuarios.map(prontuario => {
                            return (
                                <div key={prontuario.id} className="consultas__consulta--item dashboard__consulta--display-none">
                                    <p className="consultas__consulta--item-infos-prot">N | Inscrição: {prontuario.id}</p>
                                    <div className="consultas__consulta--item-infos">
                                        <table >
                                            <tbody>
                                                <tr>
                                                    <th>Nome:</th>
                                                    <td>{prontuario.nome}</td>
                                                </tr>
                                                <tr>
                                                    <th>RG:</th>
                                                    <td>{prontuario.rg}</td>
                                                </tr>
                                                <tr>
                                                    <th>CPF:</th>
                                                    <td>{prontuario.cpf}</td>
                                                </tr>
                                                <tr>
                                                    <th>DataNascimento:</th>
                                                    <td><Moment format="DD/MM/YYYY">{prontuario.dataNascimento}</Moment></td>
                                                </tr>
                                                <tr>
                                                    <th>Telefone:</th>
                                                    <td>{prontuario.telefone}</td>
                                                </tr>
                                                <tr>
                                                    <th>IdUsuario:</th>
                                                    <td>{prontuario.idUsuarioNavigation.email}</td>
                                                </tr>
                                                <tr>
                                                    <th>Rua:</th>
                                                    <td>{prontuario.rua}</td>
                                                </tr>
                                                <tr>
                                                    <th>Bairro:</th>
                                                    <td>{prontuario.bairro}</td>
                                                </tr>
                                                <tr>
                                                    <th>Cidade:</th>
                                                    <td>{prontuario.cidade}</td>
                                                </tr>
                                                <tr>
                                                    <th>Estado:</th>
                                                    <td>{prontuario.estado}</td>
                                                </tr>
                                                <tr>
                                                    <th>CEP:</th>
                                                    <td>{prontuario.cep}</td>
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
                                                <tr key={prontuario.id} className="consultas__table--info dashboard__table--info">
                                                    <td>{prontuario.id}</td>
                                                    <td>{prontuario.nome}</td>
                                                    <td>{prontuario.rg}</td>
                                                    <td>{prontuario.cpf}</td>
                                                    <td><Moment format="DD/MM/YYYY">{prontuario.dataNascimento}</Moment></td>
                                                    <td>{prontuario.telefone}</td>
                                                    <td>{prontuario.idUsuarioNavigation.email}</td>
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
                </div>
            </div>
        )
    }
}

export default ListarProntuarios;