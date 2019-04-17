import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/logout";
import listarItem from "../_componentes/compMetodo/listarItem";

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            listaConsultas: [],
            listaUsuarios: [],
            listaProntuarios: [],
            listaMedicos: [],
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

    listarProntuarios() {
        listarItem
            .listar("Prontuarios")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaProntuarios: data }) })
            .catch(erro => console.log(erro))
    }

    listarMedicos() {
        listarItem
            .listar("Medicos")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaMedicos: data }) })
            .catch(erro => console.log(erro))
    }

    listarUsuarios() {
        listarItem
            .listar("Usuarios")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaUsuarios: data }) })
            .catch(erro => console.log(erro))
    }

    buttonClickConsultas() {
        this.listarConsultas();
    }

    buttonClickProntuarios() {
        this.listarProntuarios();
    }

    buttonClickMedicos() {
        this.listarMedicos();
    }

    buttonClickUsuarios() {
        this.listarUsuarios();
    }

    render() {
        return (
            <div>
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

                <div>
                    <h3>Lista de Prontuarios</h3>
                    <button onClick={this.buttonClickProntuarios.bind(this)}>Listar</button>
                    <table>
                        <tbody>
                            <tr>
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
                                        <tr key={prontuario.id}>
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

                <div>
                    <h3>Lista de Medicos</h3>
                    <button onClick={this.buttonClickMedicos.bind(this)}>Listar</button>
                    <table>
                        <tbody>
                            <tr>
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
                                        <tr key={medico.id}>
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

                <div>
                    <h3>Lista de Usuarios</h3>
                    <button onClick={this.buttonClickUsuarios.bind(this)}>Listar</button>
                    <table>
                        <tbody>
                            <tr>
                                <th>Id</th>
                                <th>Email</th>
                                <th>Senha</th>
                                <th>TipoUsuario</th>
                            </tr>

                            {
                                this.state.listarUsuarios.map(usuario => {
                                    return (
                                        <tr key={usuario.id}>
                                            <td>{usuario.id}</td>
                                            <td>{usuario.email}</td>
                                            <td>{usuario.senha}</td>
                                            <td>{usuario.idTipoUsuario}</td>
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

export default Dashboard;