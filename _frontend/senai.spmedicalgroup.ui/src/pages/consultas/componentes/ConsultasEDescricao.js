import React, { Component } from "react";
import Moment from "react-moment";
import urlApi from '../../../services/urlApi';

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

        fetch(`${urlApi}AlterarDescricaoConsulta`, {
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
            <div className="body-consultas">
                <div className="body-consultas--titulo">
                    <h2>Consultas</h2>
                    <div className="style__titulo--linha"></div>
                </div>
                <div className="body-consultas--lista">

                    {
                        this.state.consultas.map(consulta => {
                            return (
                                <div className="consultas__consulta" key={consulta.id}>

                                    <div className="consultas__consulta--item consultas__consulta--display-none">
                                        <p className="consultas__consulta--item-infos-prot">N | Protocologo: {consulta.id}</p>
                                        <div className="consultas__consulta--item-infos">
                                            <table>
                                                <tbody>
                                                    <tr className="consultas__consulta--item-tr">
                                                        <p className="consultas__consulta--item-th">Medico:</p>
                                                        <p>{consulta.idProntuarioNavigation.nome}</p>
                                                    </tr>
                                                    <tr className="consultas__consulta--item-tr">
                                                        <p className="consultas__consulta--item-th">Data:</p>
                                                        <p><Moment format="DD/MM/YYYY">{consulta.dataAgendada}</Moment></p>
                                                    </tr>
                                                    <tr className="consultas__consulta--item-tr">
                                                        <p className="consultas__consulta--item-th">Hora:</p>
                                                        <p>{consulta.horaAgendada}</p>
                                                    </tr>
                                                    <tr className="consultas__consulta--item-tr">
                                                        <p className="consultas__consulta--item-th">Situação:</p>
                                                        <p>{consulta.idSituacaoNavigation.nome}</p>
                                                    </tr>
                                                    <tr className="consultas__consulta--item-tr">
                                                        <p className="consultas__consulta--item-th">Descricao:</p>
                                                        <p className="consultas__consulta--item-infos-desc">{consulta.descricao}</p>
                                                    </tr>
                                                </tbody>
                                            </table>
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
                                                            <th>Prontuario</th>
                                                            <th>DataAgendada</th>
                                                            <th>HoraAgendade</th>
                                                            <th>Situacao</th>
                                                        </tr>
                                                        <tr className="consultas__table--info">
                                                            <td>{consulta.id}</td>
                                                            <td>{consulta.idProntuarioNavigation.nome}</td>
                                                            <td><Moment format="DD/MM/YYYY">{consulta.dataAgendada}</Moment></td>
                                                            <td>{consulta.horaAgendada}</td>
                                                            <td>{consulta.idSituacaoNavigation.nome}</td>
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
            </div>
        )
    }
}

export default ConsultasMedico