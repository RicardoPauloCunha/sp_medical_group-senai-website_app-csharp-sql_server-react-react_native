import React, { Component } from "react";
import cadastrarItem from "./_cadastrarItem";

import "../assents/css/cadastro.css";

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
        this.setState({ idProntuario: event.target.value });
    }

    atualizarIdMedico(event) {
        this.setState({ idMedico: event.target.value });
    }

    atualizarDataAgendada(event) {
        this.setState({ dataAgendada: event.target.value });
    }

    atualizarHoraAgendada(event) {
        this.setState({ horaAgendada: event.target.value });
    }

    atualizarIdSituacao(event) {
        this.setState({ idSituacao: event.target.value });
    }

    atualizarDescricao(event) {
        this.setState({ descricao: event.target.value });
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
                if (data.status === 200) {
                    this.setState({ mensagem: "Cadastro realizado com sucesso!" });
                }
                else if (data.status === 401) {
                    this.setState({ mensagem: "Você não tem permissão para realizar essa ação" })
                }
                else {
                    this.setState({ mensagem: "Dados Inválidos" })
                }
            })
            .catch(erro => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }))
    }

    render() {
        return (
            <div className="cadastro__cadastro--item">
                <h2>Cadastrar Consulta</h2>
                <div className="style__titulo--linha"></div>

                <form className="cadastro__cadastro--form" onSubmit={this.cadastrarConsulta.bind(this)}>
                    <input type="text" placeholder="IdProntuário" className="cadastro__cadastro--input" value={this.state.idProntuario} onChange={this.atualizarIdProntuario} />
                    <input type="text" placeholder="IdMédico" className="cadastro__cadastro--input " value={this.state.idMedico} onChange={this.atualizarIdMedico} />
                    <input type="text" placeholder="Data Agendada" className="cadastro__cadastro--input" value={this.state.dataAgendada} onChange={this.atualizarDataAgendada} />
                    <input type="text" placeholder="Hora Agendada" className="cadastro__cadastro--input" value={this.state.horaAgendada} onChange={this.atualizarHoraAgendada} />
                    <input type="text" placeholder="IdSituacao" className="cadastro__cadastro--input cadastro__cadastro--input-ultimo" value={this.state.idSituacao} onChange={this.atualizarIdSituacao} />
                    <textarea placeholder="Descrição" className="cadastro__cadastro--textarea" value={this.state.descricao} onChange={this.atualizarDescricao}></textarea>
                    <button type="submit" className="style__button--blue">Cadastrar</button>
                </form>

                <p>{this.state.mensagem}</p>
            </div>
        )
    }
}

export default CadastroConsulta;