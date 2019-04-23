import React, { Component } from "react";
import listarItem from "./_listarItem";

import "../assents/css/dashboard.css";
import "../../_assets/css/style.css";

class ListarUsuarios extends Component {
    constructor() {
        super();

        this.state = {
            listaUsuarios: [],
            mensagem: ""
        }
    }

    listarUsuarios() {
        listarItem
            .listar("Usuarios")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaUsuarios: data }) })
            .catch(erro => console.log(erro))
    }

    buttonClickUsuarios() {
        this.listarUsuarios();
    }

    render() {
        return (
            <div>
                <h2>Lista de Usuarios</h2>
                <div class="style__titulo--linha"></div>
                <button onClick={this.buttonClickUsuarios.bind(this)}>Listar</button>
                <table>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Senha</th>
                            <th>IdTipoUsuario</th>
                        </tr>

                        {
                            this.state.listaUsuarios.map(usuario => {
                                return (
                                    <tr key={usuario.id}>
                                        <td>{usuario.id}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.senha}</td>
                                        <td>{usuario.idTipoUsuario}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ListarUsuarios;