import React, { Component } from "react";
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
            listaSituacao: [],
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

    componentDidMount() {
        this.listarSitucao();
        this.listarMedicos();
        this.listarProntuarios();
    }

    listarSitucao() {
        fetch("http://localhost:5000/api/Consultas/SelectSituacao", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaSituacao: data }))
            .catch(erro => console.log(erro))
    }

    listarMedicos() {
        fetch("http://localhost:5000/api/Medicos/SelectMedicos", {
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
        fetch("http://localhost:5000/api/Prontuarios/SelectProntuarios", {
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
                    {/* <input type="text" placeholder="IdProntuário" className="cadastro__cadastro--input" value={this.state.idProntuario} onChange={this.atualizarIdProntuario} /> */}
                    <select className="cadastro__cadastro--input cadastro__cadastro--select" value={this.state.idProntuario} onChange={this.atualizarIdProntuario}>
                        <option className="dashboard__lista--select-option">Prontuário</option>                        
                        {
                            this.state.listaProntuarios.map(prontuario => {
                                return (
                                    <option key={prontuario.id} value={prontuario.id} className="dashboard__lista--select-option">{prontuario.nome}</option>
                                )
                            })
                        }
                    </select>

                    {/* <input type="text" placeholder="IdMédico" className="cadastro__cadastro--input " value={this.state.idMedico} onChange={this.atualizarIdMedico} /> */}
                    <select className="cadastro__cadastro--input cadastro__cadastro--select dashboard__select-default" value={this.state.idMedico} onChange={this.atualizarIdMedico}>
                        <option className="dashboard__lista--select-option">Médico</option>                        
                        {
                            this.state.listaMedicos.map(medicos => {
                                return (
                                    <option key={medicos.id} value={medicos.id} className="dashboard__lista--select-option">{medicos.nome}</option>
                                )
                            })
                        }
                    </select>

                    <input type="date" placeholder="Data Agendada" className="cadastro__cadastro--input" value={this.state.dataAgendada} onChange={this.atualizarDataAgendada} />
                    
                    {/* <input type="time" placeholder="Hora Agendada" className="cadastro__cadastro--input" value={this.state.horaAgendada} onChange={this.atualizarHoraAgendada} /> */}
                    <select className="cadastro__cadastro--input cadastro__cadastro--select dashboard__select-default" value={this.state.horaAgendada} onChange={this.atualizarHoraAgendada}>
                        <option className="dashboard__lista--select-option">Hora Agendada</option>
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

                    {/* <input type="text" placeholder="IdSituacao" className="cadastro__cadastro--input cadastro__cadastro--input-ultimo" value={this.state.idSituacao} onChange={this.atualizarIdSituacao} /> */}
                    <select className="cadastro__cadastro--input cadastro__cadastro--input-ultimo cadastro__cadastro--select dashboard__select-default" value={this.state.idSituacao} onChange={this.atualizarIdSituacao}>
                        <option className="dashboard__lista--select-option">Situação</option>                        
                        {
                            this.state.listaSituacao.map(situacao => {
                                return (
                                    <option key={situacao.id} value={situacao.id} className="dashboard__lista--select-option">{situacao.nome}</option>
                                )
                            })
                        }
                    </select>

                    <textarea placeholder="Descrição" className="cadastro__cadastro--textarea" value={this.state.descricao} onChange={this.atualizarDescricao}></textarea>
                    <button type="submit" className="style__button--blue">Cadastrar</button>
                </form>

                <p>{this.state.mensagem}</p>
            </div>
        )
    }
}

export default CadastroConsulta;