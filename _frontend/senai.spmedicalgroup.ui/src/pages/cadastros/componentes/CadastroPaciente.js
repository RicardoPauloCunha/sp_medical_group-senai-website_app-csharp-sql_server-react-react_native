import React, { Component } from "react";
import cadastrarItem from "./_cadastrarItem";

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
                if(data.status === 200){
                    this.setState({mensagem: "Cadastro realizado com sucesso!"});
                }
                else if(data.status === 401){
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
                <form onSubmit={this.cadastrarPaciente.bind(this)}>
                    <input type="text" placeholder="Nome" value={this.state.nome} onChange={this.atualizarNome} />
                    <input type="text" placeholder="RG" value={this.state.rg} onChange={this.atualizarRg} />
                    <input type="text" placeholder="CPF" value={this.state.cpf} onChange={this.atualizarCpf} />
                    <input type="text" placeholder="DataNascimento" value={this.state.dataNascimento} onChange={this.atualizarDataNascimento} />
                    <input type="text" placeholder="Telefone" value={this.state.telefone} onChange={this.atualizarTelefone} />
                    <input type="text" placeholder="IdUsuario" value={this.state.idUsuario} onChange={this.atualizarIdUsuario} />
                    <input type="text" placeholder="Rua" value={this.state.rua} onChange={this.atualizarRua} />
                    <input type="text" placeholder="Bairro" value={this.state.bairro} onChange={this.atualizarBairro} />
                    <input type="text" placeholder="Cidade" value={this.state.cidade} onChange={this.atualizarCidade} />
                    <input type="text" placeholder="Estado" value={this.state.estado} onChange={this.atualizarEstado} />
                    <input type="text" placeholder="CEP" value={this.state.cep} onChange={this.atualizarCep} />

                    <button type="submit">Cadastrar</button>
                </form>

                <p>{this.state.mensagem}</p>
            </div>
        )
    }
}

export default CadastroPaciente;