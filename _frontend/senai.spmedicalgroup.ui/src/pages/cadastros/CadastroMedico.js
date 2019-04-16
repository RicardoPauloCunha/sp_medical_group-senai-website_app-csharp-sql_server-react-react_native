import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from "../../services/logout";
import { UsuarioToken } from "../../services/auth";

class CadastroMedico extends Component {
    constructor(){
        super();

        this.state = {
            nome: "",
            crm: "",
            idEspecialidade: "",
            idUsuario: "",
            idClinica: ""
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

        let usuario = {
            nome: this.state.nome,
            crm: this.state.crm,
            idEspecialidade: this.state.idEspecialidade,
            idUsuario: this.state.idUsuario,
            idClinica: this.state.idClinica
        }
        
        fetch('http://localhost:5000/api/Medicos', {
            method: "POST",
            body: JSON.stringify(usuario),
            headers: {
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + UsuarioToken
            }
        })
        .then(resposta => resposta)
        .then(data => console.log(data))
        .then(erro => console.log(erro))
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
            </div>
        )
    }
}

export default CadastroMedico