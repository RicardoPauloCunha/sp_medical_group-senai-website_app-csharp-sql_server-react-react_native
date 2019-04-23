import React, { Component } from "react";
import cadastrarItem from "./_cadastrarItem";

import "../assents/css/cadastro.css";

class CadastroMedico extends Component {
    constructor() {
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
                    <div class="cadastro__cadastro--header-links">
                        <p>Usuários</p>
                    </div>
                    <div class="cadastro__cadastro--header-links cadastro__cadastro--header-links-select">
                        <p>Medicos</p>
                    </div>
                </div>
                <div class="cadastro__cadastro--item">
                    <h2>Cadastrar Médico</h2>
                    <div class="style__titulo--linha"></div>

                    <form class="cadastro__cadastro--form" onSubmit={this.cadastrarMedico.bind(this)}>
                        <input type="text" placeholder="Nome" class="cadastro__cadastro--input cadastro__cadastro--input-grande" value={this.state.nome} onChange={this.atualizarNome} />
                        <input type="text" placeholder="CRM" class="cadastro__cadastro--input " value={this.state.crm} onChange={this.atualizarCrm} />
                        <input type="text" placeholder="IdEspecialid." class="cadastro__cadastro--input" value={this.state.idEspecialidade} onChange={this.atualizarIdEspecialidade} />
                        <input type="text" placeholder="IdUser" class="cadastro__cadastro--input" value={this.state.idUsuario} onChange={this.atualizarIdUsuario} />
                        <input type="text" placeholder="IdClinica" class="cadastro__cadastro--input" value={this.state.idClinica} onChange={this.atualizarIdClinica} />
                        <button class="style__button--blue" type="submit">Cadastrar</button>
                    </form>

                    <p>{this.state.mensagem}</p>
                </div>
            </div>
        )
    }
}

export default CadastroMedico