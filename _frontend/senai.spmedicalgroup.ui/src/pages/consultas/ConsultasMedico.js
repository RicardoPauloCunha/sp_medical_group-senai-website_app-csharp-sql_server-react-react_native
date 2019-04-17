import React, { Component } from "react";
import { BrowserRouter, Redirect, Link } from "react-router-dom";
import { logout } from "../../services/logout";
import listarConsultasUsuarioItem from "../_componentes/compMetodo/listarConsultasUsuarioItem";

class ConsultasMedico extends Component {
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
            .catch(erro => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }));
    }

    // pega a descriçao digitada
    atualizarDescricao(event) {
        this.setState({ descricao: event.target.value });
    }

    // atualiza a descricao de uma consulta
    atualizarIdDescricaoIncluir(event) {
        this.setState({ idDescricaoIncluir: event.target.value });
    }

    // metodo atualiza descricao prontuario
    incluirDescricao(event) {
        event.preventDefault();

        fetch('http://localhost:5000/AlterarDescricaoConsulta', {
            method: "PUT",
            body: JSON.stringify({
                id: this.state.idDescricaoIncluir,
                descricao: this.state.descricao
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resposta => resposta)
            .then(this.listarConsultas())
            .catch(erro => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }))
    }

    render() {
        return (
            <div>
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

                <form onSubmit={this.incluirDescricao.bind(this)}>
                    <input type="text" placeholder="Descricao" value={this.state.descricao} onChange={this.atualizarDescricao} />
                    <input type="text" placeholder="Id" value={this.state.idDescricaoIncluir} onChange={this.atualizarIdDescricaoIncluir} />

                    <button type="submit">Editar</button>
                </form>

                <Link to="/" onClick={logout}>Sair</Link>
                <p>{this.state.mensagem}</p>
            </div>
        );
    }
}

export default ConsultasMedico;