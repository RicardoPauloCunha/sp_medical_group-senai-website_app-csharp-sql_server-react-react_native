import React, { Component } from "react";
import cadastrarItem from "./_cadastrarItem";

import "../assents/css/cadastro.css";

class CadastroPaciente extends Component {
    constructor() {
        super();

        this.state = {
            nome: "",
            rg: "",
            cpf: "",
            dataNascimento: "",
            telefone: "",
            idUsuario: "",
            rua: "",
            bairro: "",
            cidade: "",
            estado: "",
            cep: "",
            mensagem: ""
        }

        this.atualizarNome = this.atualizarNome.bind(this);
        this.atualizarRg = this.atualizarRg.bind(this);
        this.atualizarCpf = this.atualizarCpf.bind(this);
        this.atualizarDataNascimento = this.atualizarDataNascimento.bind(this);
        this.atualizarTelefone = this.atualizarTelefone.bind(this);
        this.atualizarIdUsuario = this.atualizarIdUsuario.bind(this);
        this.atualizarRua = this.atualizarRua.bind(this);
        this.atualizarBairro = this.atualizarBairro.bind(this);
        this.atualizarCidade = this.atualizarCidade.bind(this);
        this.atualizarEstado = this.atualizarEstado.bind(this);
        this.atualizarCep = this.atualizarCep.bind(this);
    }

    //Pegar o valor que usuario digitar
    atualizarNome(event) {
        this.setState({ nome: event.target.value });
    }

    atualizarRg(event) {
        this.setState({ rg: event.target.value });
    }

    atualizarCpf(event) {
        this.setState({ cpf: event.target.value });
    }

    atualizarDataNascimento(event) {
        this.setState({ dataNascimento: event.target.value });
    }

    atualizarTelefone(event) {
        this.setState({ telefone: event.target.value });
    }

    atualizarIdUsuario(event) {
        this.setState({ idUsuario: event.target.value });
    }

    atualizarRua(event) {
        this.setState({ rua: event.target.value });
    }

    atualizarBairro(event) {
        this.setState({ bairro: event.target.value });
    }

    atualizarCidade(event) {
        this.setState({ cidade: event.target.value });
    }

    atualizarEstado(event) {
        this.setState({ estado: event.target.value });
    }

    atualizarCep(event) {
        this.setState({ cep: event.target.value });
    }

    //Cadastra o Prontuario com os dado passados pelo paciente
    cadastrarPaciente(event) {
        event.preventDefault();

        let prontuario = {
            nome: this.state.nome,
            rg: this.state.rg,
            cpf: this.state.cpf,
            dataNascimento: this.state.dataNascimento,
            telefone: this.state.telefone,
            idUsuario: this.state.idUsuario,
            rua: this.state.rua,
            bairro: this.state.bairro,
            cidade: this.state.cidade,
            estado: this.state.estado,
            cep: this.state.cep,
        };

        cadastrarItem
            .cadastrar('Prontuarios', prontuario)
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
            <div className="cadastro__cadastro">
                <div className="cadastro__cadastro--header">
                    <div className="cadastro__cadastro--header-links">
                        <p>Consultas</p>
                    </div>
                    <div className="cadastro__cadastro--header-links cadastro__cadastro--header-links-select">
                        <p>Prontuários</p>
                    </div>
                    <div className="cadastro__cadastro--header-links">
                        <p>Usuários</p>
                    </div>
                    <div className="cadastro__cadastro--header-links">
                        <p>Medicos</p>
                    </div>
                </div>
                <div className="cadastro__cadastro--item">
                    <h2>Cadastrar Prontuarios</h2>
                    <div className="style__titulo--linha"></div>

                    <form className="cadastro__cadastro--form" onSubmit={this.cadastrarPaciente.bind(this)}>
                        <input type="text" placeholder="Nome" className="cadastro__cadastro--input cadastro__cadastro--input-grande" value={this.state.nome} onChange={this.atualizarNome} />
                        <input type="text" placeholder="CPF" className="cadastro__cadastro--input " value={this.state.rg} onChange={this.atualizarRg} />
                        <input type="text" placeholder="RG" className="cadastro__cadastro--input" value={this.state.cpf} onChange={this.atualizarCpf} />
                        <input type="text" placeholder="Data Nasc." className="cadastro__cadastro--input" value={this.state.dataNascimento} onChange={this.atualizarDataNascimento} />
                        <input type="text" placeholder="Telefone" className="cadastro__cadastro--input" value={this.state.telefone} onChange={this.atualizarTelefone} />
                        <input type="text" placeholder="Rua" className="cadastro__cadastro--input cadastro__cadastro--input-grande" value={this.state.idUsuario} onChange={this.atualizarIdUsuario} />
                        <input type="text" placeholder="Bairro" className="cadastro__cadastro--input" value={this.state.rua} onChange={this.atualizarRua} />
                        <input type="text" placeholder="Cidade" className="cadastro__cadastro--input" value={this.state.bairro} onChange={this.atualizarBairro} />
                        <input type="text" placeholder="Estado" className="cadastro__cadastro--input" value={this.state.cidade} onChange={this.atualizarCidade} />
                        <input type="text" placeholder="CEP" className="cadastro__cadastro--input" value={this.state.estado} onChange={this.atualizarEstado} />
                        <input type="text" placeholder="IdUsuario" className="cadastro__cadastro--input cadastro__cadastro--input-ultimo" value={this.state.cep} onChange={this.atualizarCep} />
                        <button className="style__button--blue" type="submit">Cadastrar</button>
                    </form>

                    <p>{this.state.mensagem}</p>
                </div>
            </div>
        )
    }
}

export default CadastroPaciente;