import React, { Component } from "react";
import Axios from "axios";
import { parseJwt } from "../../services/auth";

import "./assents/css/login-css.css";
import "../_assets/css/style.css";

import iconFacebook from "./assents/img/login-icon-facebook.jpg";
import iconGoogle from "./assents/img/login-icon-google.jpg";
import iconHome from "./assents/img/login-icon-home.png";
import iconLogo from "../_assets/img/icon-logo.png";

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

    atualizarEmail(event) {
        this.setState({ email: event.target.value });
    }

    atualizarSenha(event) {
        this.setState({ senha: event.target.value });
    }

    efetuarLogin(event) {
        event.preventDefault();

        Axios.post('http://localhost:5000/api/Login', {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(data => {
                if (data.status === 200) {
                    localStorage.setItem("usuarioautenticado-token-spmedgroup", data.data.token);
                    if (parseJwt().UsuarioTipo === "1") {
                        this.props.history.push("/Dashboard");
                    } else if (parseJwt().UsuarioTipo === "2") {
                        this.props.history.push("/ConsultasMedico");
                    } else if (parseJwt().UsuarioTipo === "3") {
                        this.props.history.push("/ConsultasPaciente");
                    }
                };
            })
            .catch(erro => console.log(erro))
    }

    render() {
        return (
            <div class="login__container">
                <div class="login__main">
                    <div class="login__login-background">
                        <div class="login__login">
                            <div class="login__login--home">
                                <img src={iconHome} alt=""/>
                            </div>
                            <div class="style__logo--circulo">
                                <img src={iconLogo} alt=""/>
                            </div>

                            <h1 class="style__menu--titulo login__login--titulo">Login</h1>

                            <form class="login__login--form" onSubmit={this.efetuarLogin.bind(this)}>
                                <input type="email" placeholder="Email" class="login__login--input" value={this.state.email} onChange={this.atualizarEmail} />
                                <input type="password" placeholder="Senha" class="login__login--input" value={this.state.senha} onChange={this.atualizarSenha} />
                                <button type="submit" class="style__button--white">Entrar</button>
                            </form>
                        </div>
                    </div>
                    <div class="login__divisoria--circulo">V</div>
                    <div class="login__outlogin">
                        <p>ou</p>
                        <img src={iconFacebook} class="login__outlogin--our-fist" alt=""/>
                        <img src={iconGoogle} class="login__outlogin--our" alt=""/>
                        <p>Criar uma Conta</p>
                        <div class="login__outlogin--linha"></div>
                        <p class="login__outlogin--p-pequeno">Sobre | Contrato</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;