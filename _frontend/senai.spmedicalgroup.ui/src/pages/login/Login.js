import React, { Component } from "react";
import Axios from "axios";
import { parseJwt } from "../../services/auth";
import urlApi from '../../services/urlApi';
import firebase from '../../services/firebaseConfig';

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
            senha: "",
            mensagemErro: ""
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

        Axios.post(`${urlApi}api/Login`, {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(data => {
                if (data.status === 200) {

                    this._efetuarLoginFirebase();

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
            .catch(erro => { this.setState({ mensagemErro: erro.response.data }) });
    }

    _efetuarLoginFirebase = async () => {
        await firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.senha)
            .catch(
                this.setState({ mensagemErro: "Ocorreu uma falha no login do firebase!" })
            );
    }

    render() {
        return (
            <div className="login__container">
                <div className="login__main">
                    <div className="login__login-background">
                        <div className="login__login">
                            <div className="login__login--home">
                                <img src={iconHome} alt="" />
                            </div>
                            <div className="style__logo--circulo">
                                <img src={iconLogo} alt="" />
                            </div>

                            <h1 className="style__menu--titulo login__login--titulo">Login</h1>

                            <form className="login__login--form" onSubmit={this.efetuarLogin.bind(this)}>
                                <input type="email" placeholder="Email" className="login__login--input" required value={this.state.email} onChange={this.atualizarEmail} />
                                <input type="password" placeholder="Senha" className="login__login--input" required value={this.state.senha} onChange={this.atualizarSenha} />
                                <button type="submit" className="style__button--white">Entrar</button>
                            </form>
                            <p className="login__login--form-erro">{this.state.mensagemErro.mensagem}</p>
                        </div>
                    </div>
                    <div className="login__divisoria--circulo">V</div>
                    <div className="login__outlogin">
                        <p>ou</p>
                        <img src={iconFacebook} className="login__outlogin--our-fist" alt="" />
                        <img src={iconGoogle} className="login__outlogin--our" alt="" />
                        <p>Criar uma Conta</p>
                        <div className="login__outlogin--linha"></div>
                        <p className="login__outlogin--p-pequeno">Sobre | Contrato</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;