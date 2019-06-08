import React, { Component } from 'react';
import firebase from '../../services/firebaseConfig';
import { Link } from "react-router-dom";

import './assents/css/style.css';
import "../cadastros/assents/css/cadastro.css";
import "../_assets/css/style.css";
import MenuMin from "../_componentes/menuMin";
import Rodape from "../_componentes/rodaPe";
import MapaGoogle from './components/MapaGoogle';
import urlApi from '../../services/urlApi';


class Localizacoes extends Component {
    constructor() {
        super();

        this.state = {
            descricao: "",
            idadePac: "",
            longitude: "",
            latitude: "",
            especialidadeMed: "",
            listaEspecialidades: []
        }
    }

    componentDidMount() {
        this._listarEspecialidades();
    }

    _listarEspecialidades() {
        fetch(`${urlApi}api/Medicos/SelectEspecialidades`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaEspecialidades: data }))
            .catch(erro => console.log(erro))
    }

    _atualizaEstado(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    _cadastrarLocalizacao(event) {
        event.preventDefault();

        firebase.firestore().collection("Enderecos")
            .add({
                EspecialidadeMedico: this.state.especialidadeMed,
                IdadePaciente: parseInt(this.state.idadePac),
                Latitude: this.state.latitude,
                Longitude: this.state.longitude
            })
            .then(resultado => {
                console.log("Cadastro realizado com sucesso");
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <div>

                <MenuMin />

                <div>
                    <h2 className="mapTitulo">Localizacoes</h2>
                    <div className="style__titulo--linha"></div>
                    <MapaGoogle />
                </div>

                <div className="cadastro__cadastro">
                    <div className="cadastro__cadastro--item">

                        <h2>Cadastrar Localização</h2>
                        <div className="style__titulo--linha"></div>

                        <form className="cadastro__cadastro--form" onSubmit={this._cadastrarLocalizacao.bind(this)}>
                            <input name="descricao" type="text" placeholder="Descrição" className="cadastro__cadastro--input cadastro__cadastro--input-grande" value={this.state.descricao} onChange={this._atualizaEstado.bind(this)} required />
                            <input name="idadePac" type="text" placeholder="Idade do Paciente" className="cadastro__cadastro--input" value={this.state.descricaoPac} onChange={this._atualizaEstado.bind(this)} required />
                            <input name="latitude" type="text" placeholder="Latitude" className="cadastro__cadastro--input" value={this.state.latitude} onChange={this._atualizaEstado.bind(this)} required />
                            <input name="longitude" type="text" placeholder="Longitude" className="cadastro__cadastro--input" value={this.state.longitude} onChange={this._atualizaEstado.bind(this)} required />
                            <select name="especialidadeMed" className="cadastro__cadastro--input cadastro__cadastro--select dashboard__select-default" value={this.state.especialidadeMed} onChange={this._atualizaEstado.bind(this)} required >
                                <option className="dashboard__lista--select-option">Especialidade</option>
                                {
                                    this.state.listaEspecialidades.map(especialiade => {
                                        return (
                                            <option key={especialiade.id} value={especialiade.id} className="dashboard__lista--select-option">{especialiade.nome}</option>
                                        )
                                    })
                                }
                            </select>
                            <button className="style__button--blue" type="submit">Cadastrar</button>
                        </form>

                        <div className="cadastro__cadastro--button">
                            <Link to="/Dashboard">
                                <button type="submit" className="style__button--blue">Voltar</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Rodape />

            </div>
        );
    }
}

export default Localizacoes;