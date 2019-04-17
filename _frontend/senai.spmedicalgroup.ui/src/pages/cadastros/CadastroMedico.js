import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from "../../services/logout";
import { UsuarioToken } from "../../services/auth";
import cadastrarItem from "../_componentes/compMetodo/cadastrarItem";

class CadastroMedico extends Component {
    constructor(){
        super();

        this.state = {
            nome: "",
            crm: "",
            idEspecialidade: "",
            idUsuario: "",
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
        this.setState({nome: event.target.value});
    }

    atualizarCrm(event) {
        this.setState({crm: event.target.value});
    }

    atualizarIdEspecialidade(event) {
        this.setState({idEspecialidade: event.target.value});
    }

    atualizarIdUsuario(event) {
        this.setState({idUsuario: event.target.value});
    }

    atualizarIdClinica(event) {
        this.setState({idClinica: event.target.value});
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
        return(
            <div>
                <form onSubmit={this.cadastrarMedico.bind(this)}>
                    <input type="text" placeholder="Nome" value={this.state.nome} onChange={this.atualizarNome} />
                    <input type="text" placeholder="CRM" value={this.state.crm} onChange={this.atualizarCrm} />
                    <input type="text" placeholder="IdTipoEspecialidade" value={this.state.idEspecialidade} onChange={this.atualizarIdEspecialidade} />
                    <input type="text" placeholder="IdUsuario" value={this.state.idUsuario} onChange={this.atualizarIdUsuario} />
                    <input type="text" placeholder="IdClinica" value={this.state.idClinica} onChange={this.atualizarIdClinica} />

                    <button type="submit">Cadastrar</button>
                </form>

                <Link to="/" onClick={logout}>Sair</Link>
                <p>{this.state.mensagem}</p>
            </div>
        )
    }
}

export default CadastroMedico