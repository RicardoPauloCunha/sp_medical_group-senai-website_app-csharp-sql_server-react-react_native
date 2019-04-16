import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from "../../services/logout";
import { UsuarioToken } from "../../services/auth";

class CadastroConsulta extends Component {
    constructor() {
        super();

        this.state = {
            idProntuario: "",
            idMedico: "",
            dataAgendada: "",
            horaAgendada: "",
            idSituacao: "",
            descricao: ""
        }

        this.atualizarIdProntuario = this.atualizarIdProntuario.bind(this);
        this.atualizarIdMedico = this.atualizarIdMedico.bind(this);
        this.atualizarDataAgendada = this.atualizarDataAgendada.bind(this);
        this.atualizarHoraAgendada = this.atualizarHoraAgendada.bind(this);
        this.atualizarIdSituacao = this.atualizarIdSituacao.bind(this);
        this.atualizarDescricao = this.atualizarDescricao.bind(this);
    }

    atualizarIdProntuario(event) {
        this.setState({idProntuario: event.target.value});
    }

    atualizarIdMedico(event) {
        this.setState({idMedico: event.target.value});
    }

    atualizarDataAgendada(event) {
        this.setState({dataAgendada: event.target.value});
    }

    atualizarHoraAgendada(event) {
        this.setState({horaAgendada: event.target.value});
    }

    atualizarIdSituacao(event) {
        this.setState({idSituacao: event.target.value});
    }

    atualizarDescricao(event) {
        this.setState({descricao: event.target.value});
    }

    cadastrarConsulta(event) {
        event.preventDefault();

        let consulta = {
            idProntuario: this.state.idProntuario,
            idMedico: this.state.idMedico,
            dataAgendada: this.state.dataAgendada,
            horaAgendada: this.state.horaAgendada,
            idSituacao: this.state.idSituacao,
            descricao: this.state.descricao
        }

        fetch('http://localhost:5000/api/Consultas', {
            method: "POST",
            body: JSON.stringify(consulta),
            headers: {
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + UsuarioToken
            }
        })
        .then(resposta => resposta)
        .then(data => console.log(data))
        .catch(erro => console.log(erro))
    }

    render() {
        return(
            <div>
                <form onSubmit={this.cadastrarConsulta.bind(this)}>
                    <input type="text" placeholder="IdProntuario" value={this.state.idProntuario} onChange={this.atualizarIdProntuario} />
                    <input type="text" placeholder="IdMedico" value={this.state.idMedico} onChange={this.atualizarIdMedico} />
                    <input type="text" placeholder="DataAgendada" value={this.state.dataAgendada} onChange={this.atualizarDataAgendada} />
                    <input type="text" placeholder="HoraAgendada" value={this.state.horaAgendada} onChange={this.atualizarHoraAgendada} />
                    <input type="text" placeholder="IdSituacao" value={this.state.idSituacao} onChange={this.atualizarIdSituacao} />
                    <input type="text" placeholder="Descricao" value={this.state.descricao} onChange={this.atualizarDescricao} />
                
                    <button type="submit">Cadastrar</button>
                </form>

                <Link to="/" onClick={logout}>Sair</Link>
            </div>
        )
    }
}

export default CadastroConsulta;