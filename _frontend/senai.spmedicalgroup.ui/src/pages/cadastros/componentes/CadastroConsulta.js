import React, { Component } from "react";
import urlApi from '../../../services/urlApi';
import cadastrarItem from "./_cadastrarItem";

import "../assents/css/cadastro.css";

class CadastroConsulta extends Component {
    constructor() {
        super();

        this.state = {
            listaProntuarios: [],
            idProntuario: "",
            listaMedicos: [],
            idMedico: "",
            dataAgendada: "",
            horaAgendada: "",
            idSituacao: "",
            descricao: "",
            mensagem: "",
            mensagemErroProntuario: "",
            mensagemErroMedico: "",
        }

        this.atualizarIdProntuario = this.atualizarIdProntuario.bind(this);
        this.atualizarIdMedico = this.atualizarIdMedico.bind(this);
        this.atualizarDataAgendada = this.atualizarDataAgendada.bind(this);
        this.atualizarHoraAgendada = this.atualizarHoraAgendada.bind(this);
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

        // valições dos valores inseridos nos inputs
        this.setState({ mensagem: "" });
        this.setState({ mensagemErroProntuario: "" });
        this.setState({ mensagemErroMedico: "" });

        if (consulta.idProntuario === "") {
            this.setState({ mensagemErroProntuario: "Prontuário deve ser deve ser selecionado." });
        };
        
        if (consulta.idMedico === "") {
            this.setState({ mensagemErroMedico: "Médico deve ser selecionada." });
        };

        cadastrarItem
            .cadastrar('Consultas', consulta)
            .then(data => {
                if (data.status === 200) {
                    this.setState({ mensagem: "Cadastro realizado com sucesso!" });
                    this.setState({ idProntuario: ""});
                    this.setState({ idMedico: ""});
                    this.setState({ idSituacao: ""});
                }
                else {
                    this.setState({ mensagem: "Dados Inválidos" })
                }
            })
            .catch(erro => {
                this.setState({ mensagem: "Ocorreu um erro durante o cadastro, tente novamente" });
                console.log(erro);
            });
    }

    componentDidMount() {
        this.listarMedicos();
        this.listarProntuarios();
    }

    listarMedicos() {
        fetch(`${urlApi}api/Medicos/SelectMedicos`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaMedicos: data }))
            .catch(erro => console.log(erro))
    }

    listarProntuarios() {
        fetch(`${urlApi}api/Prontuarios/SelectProntuarios`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaProntuarios: data }))
            .catch(erro => console.log(erro))
    }

    render() {
        return (
            <div>
                <h2>Cadastrar Consulta</h2>
                <div className="style__titulo--linha"></div>

                <form className="cadastro__cadastro--form" onSubmit={this.cadastrarConsulta.bind(this)}>
                    <select className="cadastro__cadastro--input cadastro__cadastro--select" required value={this.state.idProntuario} onChange={this.atualizarIdProntuario}>
                        <option className="dashboard__lista--select-option">Prontuário</option>                        
                        {
                            this.state.listaProntuarios.map(prontuario => {
                                return (
                                    <option key={prontuario.id} value={prontuario.id} className="dashboard__lista--select-option">{prontuario.nome}</option>
                                )
                            })
                        }
                    </select>
                    <select className="cadastro__cadastro--input cadastro__cadastro--select dashboard__select-default" required value={this.state.idMedico} onChange={this.atualizarIdMedico}>
                        <option className="dashboard__lista--select-option">Médico</option>                        
                        {
                            this.state.listaMedicos.map(medicos => {
                                return (
                                    <option key={medicos.id} value={medicos.id} className="dashboard__lista--select-option">{medicos.nome}</option>
                                )
                            })
                        }
                    </select>
                    <input type="date" placeholder="Data Agendada" className="cadastro__cadastro--input" required value={this.state.dataAgendada} onChange={this.atualizarDataAgendada} />
                    <select className="cadastro__cadastro--input cadastro__cadastro--select dashboard__select-default" required value={this.state.horaAgendada} onChange={this.atualizarHoraAgendada}>
                        <option className="dashboard__lista--select-option" value="">Hora Agendada</option>
                        <option className="dashboard__lista--select-option" value="07:00:00">07:00</option>
                        <option className="dashboard__lista--select-option" value="08:00:00">08:00</option>
                        <option className="dashboard__lista--select-option" value="09:00:00">09:00</option>
                        <option className="dashboard__lista--select-option" value="10:00:00">10:00</option>
                        <option className="dashboard__lista--select-option" value="11:00:00">11:00</option>
                        <option className="dashboard__lista--select-option" value="12:00:00">12:00</option>
                        <option className="dashboard__lista--select-option" value="13:00:00">13:00</option>
                        <option className="dashboard__lista--select-option" value="14:00:00">14:00</option>
                        <option className="dashboard__lista--select-option" value="15:00:00">15:00</option>
                        <option className="dashboard__lista--select-option" value="16:00:00">16:00</option>
                        <option className="dashboard__lista--select-option" value="17:00:00">17:00</option>
                        <option className="dashboard__lista--select-option" value="18:00:00">18:00</option>
                        <option className="dashboard__lista--select-option" value="19:00:00">19:00</option>
                        <option className="dashboard__lista--select-option" value="20:00:00">20:00</option>
                        <option className="dashboard__lista--select-option" value="22:00:00">21:00</option>                        
                    </select>
                    <textarea placeholder="Descrição" className="cadastro__cadastro--textarea" value={this.state.descricao} onChange={this.atualizarDescricao}></textarea>
                    
                    <button type="submit" className="style__button--blue">Cadastrar</button>
                </form>

                <p className="cadastro__cadastro--form-erro-first">{this.state.mensagem}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroProntuario}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroMedico}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroSituacao}</p>
            </div>
        )
    }
}

export default CadastroConsulta;