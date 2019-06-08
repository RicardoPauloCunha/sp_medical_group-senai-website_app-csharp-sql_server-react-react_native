import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import firebase from '../../../services/firebaseConfig';
import '../assents/css/style.css';

class MapaGoogle extends Component {
    constructor() {
        super();

        this.state = {
            listaLocalizacoes: [{
                id: 1,
                idadePac: 23,
                latitude: -23.444,
                longitude: -34.666,
                especialidadeMed: "Terapeuta"
            },
            {
                id: 2,
                idadePac: 65,
                latitude: -23.5345442,
                longitude: -46.6493879,
                especialidadeMed: "Terapeuta"
            }]
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


    render() {
        return (
            <div className="map">
                <Map google={this.props.google}
                    initialCenter={{
                        lat: -23.5345442,
                        lng: -46.6493879
                    }}
                    style={{ width: '90%', height: '70%', margin: "auto", marginTop: "0.5em"  }}
                    zoom={14}
                    >
                    {
                        this.state.listaLocalizacoes.map((localizacao) => {
                            return (
                                <Marker
                                    title={`Especialidade: ${localizacao.id}, Idade Paciente: ${localizacao.idadePac}`}
                                    position={{ lat: localizacao.latitude, lng: localizacao.longitude }}
                                />
                            )
                        })
                    }
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyD6g51cxMvwPJnVZ-Aj7edXMdq64qa6M1Y")
})(MapaGoogle);