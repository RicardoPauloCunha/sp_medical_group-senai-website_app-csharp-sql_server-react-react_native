import React, { Component } from "react";
import cadastrarItem from "./_cadastrarItem";

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
            mensagem: ""
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

        cadastrarItem
            .cadastrar('Medicos', medico)
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
        this.listarEspecialidades();
        this.listarUsuarios();
        this.listarClinicas();
    }

    listarEspecialidades() {
        fetch("http://localhost:5000/api/Medicos/SelectEspecialidades", {
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
        fetch("http://localhost:5000/api/Usuarios/SelectUsuarios", {
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
        fetch("http://localhost:5000/api/Clinicas/SelectClinicas", {
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
                    <input type="text" placeholder="Nome" className="cadastro__cadastro--input cadastro__cadastro--input-grande" value={this.state.nome} onChange={this.atualizarNome} />
                    <input type="text" placeholder="CRM" className="cadastro__cadastro--input " value={this.state.crm} onChange={this.atualizarCrm} />
                    {/* <input type="text" placeholder="IdEspecialid." className="cadastro__cadastro--input" value={this.state.idEspecialidade} onChange={this.atualizarIdEspecialidade} /> */}

                    <select className="cadastro__cadastro--input cadastro__cadastro--select" value={this.state.idEspecialidade} onChange={this.atualizarIdEspecialidade}>
                        <option className="dashboard__lista--select-option">Especialidade</option>
                        {
                            this.state.listaEspecialidades.map(especialiade => {
                                return (
                                    <option key={especialiade.id} value={especialiade.id} className="dashboard__lista--select-option">{especialiade.nome}</option>
                                )
                            })
                        }
                    </select>

                    {/* <input type="text" placeholder="IdUser" className="cadastro__cadastro--input" value={this.state.idUsuario} onChange={this.atualizarIdUsuario} /> */}

                    <select className="cadastro__cadastro--input cadastro__cadastro--select" value={this.state.idUsuario} onChange={this.atualizarIdUsuario}>
                        <option className="dashboard__lista--select-option">Usuário</option>
                        {
                            this.state.listaUsuarios.map(usuario => {
                                return (
                                    <option key={usuario.id} value={usuario.id} className="dashboard__lista--select-option">{usuario.email}</option>
                                )
                            })
                        }
                    </select>

                    {/* <input type="text" placeholder="IdClinica" className="cadastro__cadastro--input" value={this.state.idClinica} onChange={this.atualizarIdClinica} /> */}

                    <select className="cadastro__cadastro--input cadastro__cadastro--select" value={this.state.idClinica} onChange={this.atualizarIdClinica}>
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

                <p>{this.state.mensagem}</p>
            </div>
        )
    }
}

export default CadastroMedico