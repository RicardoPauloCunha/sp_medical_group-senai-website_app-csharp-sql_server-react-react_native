import React, { Component } from "react";
import listarItem from "./_listarItem";

import "../assents/css/dashboard.css";
import "../../_assets/css/style.css";

class ListarMedicos extends Component {
    constructor() {
        super();

        this.state = {
            listaMedicos: [],
            mensagem: ""
        }
    }

    listarMedicos() {
        listarItem
            .listar("Medicos")
            .then(resposta => resposta.json())
            .then(data => { this.setState({ listaMedicos: data }) })
            .catch(erro => console.log(erro))
    }

    buttonClickMedicos() {
        this.listarMedicos();
    }

    render() {
        return (
            <div>
                <h2>Lista de Medicos</h2>
                <div class="style__titulo--linha"></div>
                <button onClick={this.buttonClickMedicos.bind(this)}>Listar</button>
                <table>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>CRM</th>
                            <th>IdEspecialidade</th>
                            <th>IdUsuario</th>
                            <th>IdClinica</th>
                        </tr>

                        {
                            this.state.listaMedicos.map(medico => {
                                return (
                                    <tr key={medico.id}>
                                        <td>{medico.id}</td>
                                        <td>{medico.nome}</td>
                                        <td>{medico.crm}</td>
                                        <td>{medico.idEspecialidade}</td>
                                        <td>{medico.idUsuario}</td>
                                        <td>{medico.idClinica}</td>
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

export default ListarMedicos;