import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from "../../services/logout";
import { UsuarioToken } from "../../services/auth";

class CadastroUsuario extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            senha: "",
            idTipoUsuario: ""
        }

        this.atualizarEmail = this.atualizarEmail.bind(this);
        this.atualizarSenha = this.atualizarSenha.bind(this);
        this.atualizarIdTipoUsuario = this.atualizarIdTipoUsuario.bind(this);
    }

    atualizarEmail(event) {
        this.setState({email: event.target.value});
    }

    atualizarSenha(event) {
        this.setState({senha: event.target.value});
    }

    atualizarIdTipoUsuario(event) {
        this.setState({idTipoUsuario: event.target.value});
    }

    cadastrarUsuario(event) {
        event.preventDefault();

        let usuario = {
            email: this.state.email,
            senha: this.state.senha,
            idTipoUsuario: this.state.idTipoUsuario
        }

        fetch('http://localhost:5000/api/Usuarios', {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + UsuarioToken
            }
        })
        .then(resposta => resposta)
        .then(data => console.log(data))
        .catch(erro => console.log(erro));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.cadastrarUsuario.bind(this)}>
                    <input type="text" placeholder="Email" value={this.state.email} onChange={this.atualizarEmail} />
                    <input type="text" placeholder="Senha" value={this.state.senha} onChange={this.atualizarSenha} />
                    <input type="text" placeholder="IdTipoUsuario" value={this.state.idTipoUsuario} onChange={this.atualizarIdTipoUsuario} />

                    <button type="submit">Cadastrar</button>
                </form>
                <Link to="/" onClick={logout}>Sair</Link>
            </div>
        )
    }
}

export default CadastroUsuario;
