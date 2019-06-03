import React, { Component } from "react";
import cadastrarItem from "./_cadastrarItem";
import firebase from 'firebase';

import "../assents/css/cadastro.css";

class CadastroUsuario extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            senha: "",
            listaTipoUsuarios: [],
            idTipoUsuario: "",
            mensagem: "",
            mensagemErroSenha: "",
            mensagemErroTipo: ""
        }

        this.atualizarEmail = this.atualizarEmail.bind(this);
        this.atualizarSenha = this.atualizarSenha.bind(this);
        this.atualizarIdTipoUsuario = this.atualizarIdTipoUsuario.bind(this);
    }

    atualizarEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizarSenha(event) {
        this.setState({ senha: event.target.value });
    }

    atualizarIdTipoUsuario(event) {
        this.setState({ idTipoUsuario: event.target.value });
    }

    cadastrarUsuario(event) {
        event.preventDefault();

        let usuario = {
            email: this.state.email,
            senha: this.state.senha,
            idTipoUsuario: this.state.idTipoUsuario,
        }

        // valições dos valores inseridos nos inputs
        this.setState({ mensagem: "" })
        this.setState({ mensagemErroTipo: "" });
        this.setState({ mensagemErroSenha: "" });

        if (usuario.senha.length < 4) {
            this.setState({ mensagemErroSenha: "Senha deve possuir no minimo 4 caracteres." });
        }
        else if (usuario.senha.length > 30) {
            this.setState({ mensagemErroSenha: "Senha deve possuir no maximo que 30 caracteres." })
        }
        if (usuario.idTipoUsuario === "") {
            this.setState({ mensagemErroTipo: "Tipo usuário deve ser selecionado." });
        }

        cadastrarItem
            .cadastrar('Usuarios', usuario)
            .then(data => {
                if (data.status === 200) {
                    this.setState({ mensagem: "Cadastro realizado com sucesso!" });
                    this.setState({ idTipoUsuario: "" });
                }
                else {
                    this.setState({ mensagem: "Dados Inválidos" });
                }
            })
            .catch(erro => {
                this.setState({ mensagem: "Ocorreu um erro durante o cadastro, tente novamente" });
                console.log(erro);
            });
    }

    componentDidMount() {
        this.listarTiposUsuarios();
    }

    listarTiposUsuarios() {
        fetch("http://192.168.3.105:5000/api/Usuarios/SelectTiposUsuarios", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaTipoUsuarios: data }))
            .catch(erro => console.log(erro))
    }

    render() {
        return (
            <div>
                <h2>Cadastrar Usuários</h2>
                <div className="style__titulo--linha"></div>

                <form className="cadastro__cadastro--form" onSubmit={this.cadastrarUsuario.bind(this)}>
                    <input type="email" placeholder="Email" className="cadastro__cadastro--input cadastro__cadastro--input-grande" required value={this.state.email} onChange={this.atualizarEmail} />
                    <input type="password" placeholder="Senha" className="cadastro__cadastro--input cadastro__cadastro--input-grande" required value={this.state.senha} onChange={this.atualizarSenha} />
                    <select className="cadastro__cadastro--input cadastro__cadastro--input-ultimo cadastro__cadastro--select dashboard__select-default" required value={this.state.idTipoUsuario} onChange={this.atualizarIdTipoUsuario}>
                        <option className="dashboard__lista--select-option">Tipo Usuário</option>
                        {
                            this.state.listaTipoUsuarios.map(tipoUsuario => {
                                return (
                                    <option key={tipoUsuario.id} value={tipoUsuario.id} className="dashboard__lista--select-option">{tipoUsuario.nome}</option>
                                )
                            })
                        }
                    </select>

                    <button type="submit" className="style__button--blue">Cadastrar</button>
                </form>

                <p className="cadastro__cadastro--form-erro-first">{this.state.mensagem}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroSenha}</p>
                <p className="cadastro__cadastro--form-erro">{this.state.mensagemErroTipo}</p>
            </div>
        )
    }
}

export default CadastroUsuario;
