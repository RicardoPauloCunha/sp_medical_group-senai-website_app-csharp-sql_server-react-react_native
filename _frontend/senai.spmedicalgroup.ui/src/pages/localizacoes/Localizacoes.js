import React, { Component } from 'react';
import firebase from '../../services/firebaseConfig';

class Localizacoes extends Component {
    constructor() {
        super();

        this.state = {
            idadePac: "",
            longitude: "",
            latitude: "",
            especialidadeMed: "",
            listaLocalizacoes: []
        }
    }

    componentDidMount() {
        this._listarLocalizacoesRealTime();
    }

    _listarLocalizacoesRealTime() {
        firebase.firestore().collection("Enderecos")
            .onSnapshot((localizacoes) => {
                let localArray = [];

                localizacoes.forEach((local) => {
                    localArray.push({
                        id: local.id,
                        idadePac: local.data().IdadePaciente,
                        latitude: local.data().Latitude,
                        longitude: local.data().Longitude,
                        especialidadeMed: local.data().EspecialidadeMedico
                    })
                })

                this.setState({ listaLocalizacoes: localArray });
            })
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

    _enviarNotificacao = async () => {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken();

        fetch('https://fcm.googleapis.com/fcm/send', {
            method: "POST",
            body: JSON.stringify({
                notification: {
                    title: "SP Medical Group",
                    body: "Uma nova Localizacao foi cadastrada"
                },
                to: token
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: "key=AAAATc95t10:APA91bEXNSTuKbOif9mBlNIrhuO5RiEYVfNoEvm0BEMsLK3Ksedk9hTdBHwsimK_O5i0rnmYg6Swc6q7wjtah50SYn5lStu8on3pt96f3o3z86o2EhBCC6EqdGyWtApw721-zzeskmx1"
            }
        })
            .catch(erro => {
                console.log("Enviar Notificarion error: " + erro);
            })
    }

    render() {
        return (
            <div>
                <h3>Cadastrar</h3>
                <form onSubmit={this._cadastrarLocalizacao.bind(this)}>
                    <input
                        name="idadePac"
                        type="text"
                        placeholder="Idade do Paciente"
                        value={this.state.descricaoPac}
                        onChange={this._atualizaEstado.bind(this)}
                    />
                    <input
                        name="latitude"
                        type="text"
                        placeholder="Latitude"
                        value={this.state.descricaoPac}
                        onChange={this._atualizaEstado.bind(this)}
                    />
                    <input
                        name="longitude"
                        type="text"
                        placeholder="Longitude"
                        value={this.state.descricaoPac}
                        onChange={this._atualizaEstado.bind(this)}
                    />
                    <input
                        name="especialidadeMed"
                        type="text"
                        placeholder="Especialidade Médico"
                        value={this.state.descricaoPac}
                        onChange={this._atualizaEstado.bind(this)}
                    />
                    <button type="submit">Cadastrar</button>
                </form>

                <button onClick={this._enviarNotificacao}>
                    Enviar notification
                </button>

                <h3>Listar</h3>
                <ul>
                    {
                        this.state.listaLocalizacoes.map((local) => {
                            return (
                                <li key={local.id}>
                                    <p>{local.id}, {local.idadePac}, {local.latitude}, {local.longitude}, {local.especialidadeMed}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Localizacoes;