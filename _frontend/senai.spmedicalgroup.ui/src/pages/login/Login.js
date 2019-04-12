import React, { Component } from "react";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            senha: ""
        }

        this.atualizarEmail = this.atualizarEmail.bind(this);
        this.atualizarSenha = this.atualizarSenha.bind(this);
    }

    atualizarEmail(event){
        this.setState({email: event.target.value});
    }

    atualizarSenha(event) {
        this.setState({senha: event.target.value});
    }

    efetuarLogin(event){
        event.preventDefault();

        fetch('http://localhost:5000/api/Login', {
            method: "POST",
            body: JSON.stringify({
                email: this.state.email,
                senha: this.state.senha
            }),
            headers: {
                "Content-Type" : "application/json"
            }
        })
        .then(resposta => resposta)
        .then(data => console.log(data))
        .catch(erro => console.log(erro))
    }

    render() {
        return (
            <form onSubmit={this.efetuarLogin.bind(this)}>
                <input type="email" placeholder="Email:" value={this.state.email} onChange={this.atualizarEmail}/>
                <input type="password" placeholder="Senha" value={this.state.senha} onChange={this.atualizarSenha}/>

                <button type="submit">Entrar</button>
            </form>
        )
    }
}

export default Login;