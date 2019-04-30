import React, { Component } from "react";

import "../assets/css/consultas.css";
import "../../_assets/css/style.css";

import listarConsultasUsuarioItem from "./listarConsultasUsuarioItem";

class ConsultasMedico extends Component {
    constructor() {
        super();

        this.state = {
            consultas: [],
            descricao: "",
            mensagem: ""
        }
    }

    // lista todas as consultas
    listarConsultas() {
        listarConsultasUsuarioItem
            .listar()
            .then(resposta => resposta.json())
            .then(data => { this.setState({ consultas: data }) })
            .catch(erro => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }));
    }

    // carrega o metodo
    componentDidMount() {
        this.listarConsultas();
    }

    //pega a descricao digitada
    atualizarDescricao(event) {
        this.setState({ descricao: event.target.value });
    }

    //metodo atualiza descricao do prontuario
    incluirDescricao(event) {
        event.preventDefault();

        var idDescricao = event.target.getAttribute("consulta-id")

        let item = {
            id: idDescricao,
            descricao: this.state.descricao
        }

        console.log(item);

        fetch('http://localhost:5000/AlterarDescricaoConsulta', {
            method: "PUT",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta)
            .then(this.listarConsultas())
            .catch(erro => console.log(erro))

        this.listarConsultas();
    }

    render() {
        return (
            <div className="body">
                {
                    this.state.consultas.map(consulta => {
                        return (
                            <div className="consultas__consulta" key={consulta.id}>

                                <div className="consultas__consulta--item consultas__consulta--display-none">
                                    <p className="consultas__consulta--item-infos-prot">N | Protocologo: {consulta.id}</p>
                                    <div className="consultas__consulta--item-infos">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Prontuário:</th>
                                                    <td>{consulta.idProntuario}</td>
                                                </tr>
                                                <tr>
                                                    <th>Data:</th>
                                                    <td>{consulta.dataAgendada}</td>
                                                </tr>
                                                <tr>
                                                    <th>Hora:</th>
                                                    <td>{consulta.horaAgendada}</td>
                                                </tr>
                                                <tr>
                                                    <th>Situação:</th>
                                                    <td>{consulta.idSituacao}</td>
                                                </tr>
                                                <tr>
                                                    <th>Descricao:</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="consultas__consulta--item-infos-desc">{consulta.descricao}</p>
                                        <form className="consultas__consulta--item-infos-desc" consulta-id={consulta.id} onSubmit={this.incluirDescricao.bind(this)}>
                                            <textarea className="consultas__consulta--item-input-desc" placeholder="Incluir Descrição" value={this.state.descricao} onChange={this.atualizarDescricao.bind(this)}></textarea>
                                            <button type="submit" className="style__button--blue">Incluir Descrição</button>
                                        </form>
                                    </div>
                                </div>

                                <div className="consultas__consulta--item consulta__table--display-none">
                                    <div className="consultas__consulta--item-infos">
                                        <div className="consultas__table">
                                            <table className="consultas__table--table">
                                                <tbody>
                                                    <tr className="consultas__table--header">
                                                        <th>Id</th>
                                                        <th>idProntuario</th>
                                                        <th>DataAgendada</th>
                                                        <th>HoraAgendade</th>
                                                        <th>IdSituacao</th>
                                                    </tr>
                                                    <tr className="consultas__table--info">
                                                        <td>{consulta.id}</td>
                                                        <td>{consulta.idProntuario}</td>
                                                        <td>{consulta.dataAgendada.replace("T", " ").split(".")[0]}</td>
                                                        <td>{consulta.horaAgendada}</td>
                                                        <td>{consulta.idSituacao}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <table className="consultas__table--table consultas__table--table-textarea">
                                                <tbody>
                                                    <tr className="consultas__table--header">
                                                        <th>Descrição</th>
                                                    </tr>
                                                    <tr className="consultas__table--info consultas__table--info-desc">
                                                        <td>{consulta.descricao}</td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <form className="consultas__consulta--item-infos-desc" consulta-id={consulta.id} onSubmit={this.incluirDescricao.bind(this)}>
                                                <textarea className="consultas__consulta--item-input-desc" placeholder="Incluir Descrição" value={this.state.descricao} onChange={this.atualizarDescricao.bind(this)}></textarea>
                                                <button type="submit" className="style__button--blue">Incluir Descrição</button>
                                            </form>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        );
                    })
                }
            </div>
        )
    }
}

export default ConsultasMedico