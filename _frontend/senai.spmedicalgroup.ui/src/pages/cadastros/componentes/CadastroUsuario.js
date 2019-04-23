import React, { Component } from "react";
import cadastrarItem from "./_cadastrarItem";

import "../assents/css/cadastro.css";

class CadastroUsuario extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            senha: "",
            idTipoUsuario: "",
            mensagem: ""
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
            idTipoUsuario: this.state.idTipoUsuario
        }

        cadastrarItem
            .cadastrar('Usuarios', usuario)
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
            <div class="cadastro__cadastro">
                <div class="cadastro__cadastro--header">
                    <div class="cadastro__cadastro--header-links">
                        <p>Consultas</p>
                    </div>
                    <div class="cadastro__cadastro--header-links">
                        <p>Prontuários</p>
                    </div>
                    <div class="cadastro__cadastro--header-links cadastro__cadastro--header-links-select">
                        <p>Usuários</p>
                    </div>
                    <div class="cadastro__cadastro--header-links">
                        <p>Medicos</p>
                    </div>
                </div>
                <div class="cadastro__cadastro--item">
                    <h2>Cadastrar Usuários</h2>
                    <div class="style__titulo--linha"></div>

                    <form class="cadastro__cadastro--form" onSubmit={this.cadastrarUsuario.bind(this)}>
                        <input type="email" placeholder="Email" class="cadastro__cadastro--input cadastro__cadastro--input-grande" value={this.state.email} onChange={this.atualizarEmail} />
                        <input type="password" placeholder="Senha" class="cadastro__cadastro--input cadastro__cadastro--input-grande" value={this.state.senha} onChange={this.atualizarSenha} />
                        <input type="text" placeholder="IdTipoUsuario" class="cadastro__cadastro--input cadastro__cadastro--input-ultimo" value={this.state.idTipoUsuario} onChange={this.atualizarIdTipoUsuario} />
                        <button type="submit" class="style__button--blue">Cadastrar</button>
                    </form>

                    <p>{this.state.mensagem}</p>
                </div>
            </div>
        )
    }
}

export default CadastroUsuario;
