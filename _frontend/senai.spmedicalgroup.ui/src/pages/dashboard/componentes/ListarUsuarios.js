import React, { Component } from "react";
import listarItem from "./_listarItem";

import "../assents/css/dashboard.css";
import "../../_assets/css/style.css";
import "../../consultas/assets/css/consultas.css";

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
                <div className="consultas__lista--table">
                    <h2>Lista de Usuarios</h2>
                    <div className="style__titulo--linha"></div>
                    <button onClick={this.buttonClickUsuarios.bind(this)} className="style__button--blue">Listar</button>
                </div>

                <div class="consultas__lista">
                    <table className="consultas__lista--lista">
                        <tbody>
                            <tr className="consultas__lista--header">
                                <th>Id</th>
                                <th>Email</th>
                                <th>Senha</th>
                                <th>IdTipoUsuario</th>
                            </tr>

                            {
                                this.state.listaUsuarios.map(usuario => {
                                    return (
                                        <tr key={usuario.id} className="consultas__lista--info">
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
            </div>
        )
    }
}

export default ListarUsuarios;