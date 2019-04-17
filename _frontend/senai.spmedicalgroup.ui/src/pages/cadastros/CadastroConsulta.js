import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from "../../services/logout";
import { UsuarioToken } from "../../services/auth";
import cadastrarItem from "../_componentes/compMetodo/cadastrarItem";

class CadastroConsulta extends Component {
    constructor() {
        super();

        this.state = {
            idProntuario: "",
            idMedico: "",
            dataAgendada: "",
            horaAgendada: "",
            idSituacao: "",
            descricao: "",
            mensagem: ""
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

        cadastrarItem
            .cadastrar('Consultas', consulta)
            .then(data => {
                if(data.status == 200){
                    this.setState({mensagem: "Cadastro realizado com sucesso!"});
                }
                else if(data.status == 401){
                    this.setState({mensagem: "Você não tem permissão para realizar essa ação"})
                }
                else {
                    this.setState({mensagem: "Dados Inválidos"})
                }
            })
            .catch(erro => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }))
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
                <p>{this.state.mensagem}</p>
            </div>
        )
    }
}

export default CadastroConsulta;