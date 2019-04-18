import React, { Component } from "react";
import listarItem from "./_listarItem";

class ListarProntuarios extends Component {
    constructor() {
        super();

        this.state = {
            listaProntuarios: [],
            mensagem: ""
        }
    }

    listarProntuarios() {
        listarItem
            .listar("Prontuarios")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaProntuarios: data }) })
            .catch(erro => console.log(erro))
    }

    buttonClickProntuarios() {
        this.listarProntuarios();
    }

    render() {
        return (
            <div>
                <h3>Lista de Prontuarios</h3>
                <button onClick={this.buttonClickProntuarios.bind(this)}>Listar</button>
                <table>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>RG</th>
                            <th>CPF</th>
                            <th>DataNascimento</th>
                            <th>Telefone</th>
                            <th>IdUsuario</th>
                            <th>Rua</th>
                            <th>Bairro</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>CEP</th>
                        </tr>

                        {
                            this.state.listaProntuarios.map(prontuario => {
                                return (
                                    <tr key={prontuario.id}>
                                        <td>{prontuario.id}</td>
                                        <td>{prontuario.nome}</td>
                                        <td>{prontuario.rg}</td>
                                        <td>{prontuario.cpf}</td>
                                        <td>{prontuario.dataNascimento}</td>
                                        <td>{prontuario.telefone}</td>
                                        <td>{prontuario.idUsuario}</td>
                                        <td>{prontuario.rua}</td>
                                        <td>{prontuario.bairro}</td>
                                        <td>{prontuario.cidade}</td>
                                        <td>{prontuario.estado}</td>
                                        <td>{prontuario.cep}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListarProntuarios;