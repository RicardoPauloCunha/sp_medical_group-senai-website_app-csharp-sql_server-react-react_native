import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from "../../services/logout";
import cadastrarItem from "../_componentes/compMetodo/cadastrarItem";

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

        cadastrarItem
            .cadastrar('Usuarios', usuario)
            .then(data => {
                if(data.status == 200){
                    this.setState({mensagem: "Cadastro realizado com sucesso!"});
                }
                else if(data.status == 401){
                    this.setState({mensagem: "Você não tem permissão para realizar essa ação"})
                }
                else {
                    this.setState({mensagem: "Dados Inválidos"})
                }
            })
            .catch(erro => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }))
    
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
                <p>{this.state.mensagem}</p>
            </div>
        )
    }
}

export default CadastroUsuario;
