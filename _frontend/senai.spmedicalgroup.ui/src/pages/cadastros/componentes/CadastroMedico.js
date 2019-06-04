import React, { Component } from "react";
import cadastrarItem from "./_cadastrarItem";
import urlApi from '../../../services/urlApi';

import "../assents/css/cadastro.css";

class CadastroMedico extends Component {
    constructor() {
        super();

        this.state = {
            nome: "",
            crm: "",
            listaEspecialidades: [],
            idEspecialidade: "",
            listaUsuarios: [],
            idUsuario: "",
            listaClinicas: [],
            idClinica: "",
            mensagem: "",
            mensagemErroEspecialidade: "",
            mensagemErroUsuario: "",
            mensagemErroClinica: ""
        }

        this.atualizarNome = this.atualizarNome.bind(this);
        this.atualizarCrm = this.atualizarCrm.bind(this);
        this.atualizarIdEspecialidade = this.atualizarIdEspecialidade.bind(this);
        this.atualizarIdUsuario = this.atualizarIdUsuario.bind(this);
        this.atualizarIdClinica = this.atualizarIdClinica.bind(this);
    }

    atualizarNome(event) {
        this.setState({ nome: event.target.value });
    }

    atualizarCrm(event) {
        this.setState({ crm: event.target.value });
    }

    atualizarIdEspecialidade(event) {
        this.setState({ idEspecialidade: event.target.value });
    }

    atualizarIdUsuario(event) {
        this.setState({ idUsuario: event.target.value });
    }

    atualizarIdClinica(event) {
        this.setState({ idClinica: event.target.value });
    }

    cadastrarMedico(event) {
        event.preventDefault();

        let medico = {
            nome: this.state.nome,
            crm: this.state.crm,
            idEspecialidade: this.state.idEspecialidade,
            idUsuario: this.state.idUsuario,
            idClinica: this.state.idClinica
        }

        // valições dos valores inseridos nos inputs
        this.setState({ mensagem: "" });
        this.setState({ mensagemErroEspecialidade: "" });
        this.setState({ mensagemErroUsuario: "" });
        this.setState({ mensagemErroClinica: "" });

        if (medico.idEspecialidade === "") {
            this.setState({ mensagemErroEspecialidade: "Especialidade deve ser selecionada." });
        };

        if (medico.idUsuario === "") {
            this.setState({ mensagemErroUsuario: "Usuário deve ser selecionado." });
        };

        if (medico.idClinica === "") {
            this.setState({ mensagemErroClinica: "Clinica deve ser selecionada." });
        };

        cadastrarItem
            .cadastrar('Medicos', medico)
            .then(data => {
                if (data.status === 200) {
                    this.setState({ mensagem: "Cadastro realizado com sucesso!" });
                    this.setState({ idEspecialidade: "" });
                    this.setState({ idUsuario: "" });
                    this.setState({ idClinica: "" });
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
        this.listarEspecialidades();
        this.listarUsuarios();
        this.listarClinicas();
    }

    listarEspecialidades() {
        fetch(`${urlApi}api/Medicos/SelectEspecialidades`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaEspecialidades: data }))
            .catch(erro => console.log(erro))
    }

    listarUsuarios() {
        fetch(`${urlApi}api/Usuarios/SelectUsuarios`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaUsuarios: data }))
            .catch(erro => console.log(erro))
    }

    listarClinicas() {
        fetch(`${urlApi}api/Clinicas/SelectClinicas`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaClinicas: data }))
            .catch(erro => console.log(erro))
    }

    render() {
        return (
            <div>
                <h2>Cadastrar Médico</h2>
                <div className="style__titulo--linha"></div>

                <form className="cadastro__cadastro--form" onSubmit={this.cadastrarMedico.bind(this)}>
                    <input type="text" placeholder="Nome" className="cadastro__cadastro--input cadastro__cadastro--input-grande" required value={this.state.nome} onChange={this.atualizarNome} />
                    <input type="text" placeholder="CRM" className="cadastro__cadastro--input " required value={this.state.crm} onChange={this.atualizarCrm} />
                    <select className="cadastro__cadastro--input cadastro__cadastro--select dashboard__select-default" required value={this.state.idEspecialidade} onChange={this.atualizarIdEspecialidade}>
                        <option className="dashboard__lista--select-option">Especialidade</option>
                        {
                            this.state.listaEspecialidades.map(especialiade => {
                                return (
                                    <option key={especialiade.id} value={especialiade.id} className="dashboard__lista--select-option">{especialiade.nome}</option>
                                )
                            })
                        }
                    </select>
                    <select className="cadastro__cadastro--input cadastro__cadastro--select dashboard__select-default" required value={this.state.idUsuario} onChange={this.atualizarIdUsuario}>
                        <option className="dashboard__lista--select-option">Usuário</option>
                        {
                            this.state.listaUsuarios.map(usuario => {
                                return (
                                    <option key={usuario.id} value={usuario.id} className="dashboard__lista--select-option">{usuario.email}</option>
                                )
                            })
                        }
                    </select>
                    <select className="cadastro__cadastro--input cadastro__cadastro--select dashboard__select-default" required value={this.state.idClinica} onChange={this.atualizarIdClinica}>
                        <option className="dashboard__lista--select-option">Clinica</option>
                        {
                            this.state.listaClinicas.map(clinica => {
                                return (
                                    <option key={clinica.id} value={clinica.id} className="dashboard__lista--select-option">{clinica.nomeFantasia}</option>
                                )
                            })
                        }
                    </select>

                    <button className="style__button--blue" type="submit">Cadastrar</button>
                </form>

                <p className="cadastro__cadastro--form-erro-first">{this.state.mensagem}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroEspecialidade}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroUsuario}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroClinica}</p>
            </div>
        )
    }
}

export default CadastroMedico