import React, { Component } from 'react';
import { View, Text, FlatList, AsyncStorage, Image } from 'react-native';
import api from '../../services/api';
import moment from 'moment';

import stylesConsulta from '../../assents/styles/consultas/style';
import SituacaoCase from './components/consultaSituacao';
import Header from './components/header';

export default class ConsultasPaciente extends Component {
    static navigationOptions = {
        title: "Consultas do Paciente"
    }

    constructor(props) {
        super(props);

        this.state = {
            listaConsultas: []
        }
    }

    componentDidMount() {
        this.carregarlistaConsultas();
    }

    carregarlistaConsultas = async () => {
        try {
            const token = await AsyncStorage.getItem("UsuarioToken");

            const respota = await api.get("Consultas/ConsultasUsuarioInclude", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            this.setState({ listaConsultas: respota.data })
        }
        catch (erro) {
            console.warn(`Ocorreu um erro: ${erro}`);
        }
    }

    render() {
        return (
            <View style={stylesConsulta.container}>
                <Header tituloHeader="Consultas" />
                <FlatList
                    style={stylesConsulta.main}
                    data={this.state.listaConsultas}
                    keyExtractor={item => item.id}
                    renderItem={this.renderizarItems}
                />
                <View style={stylesConsulta.footer}></View>
            </View>
        )
    }

    renderizarItems = ({ item }) => (
        <View style={stylesConsulta.itemContainer}>
            <View style={stylesConsulta.itemHeader}>
                <Text style={stylesConsulta.itemHeaderTitulo}>Protocologo ID: {item.id}</Text>
                <View style={stylesConsulta.itemMain}>
                    <View style={stylesConsulta.itemTable}>
                        <View style={stylesConsulta.itemTh}>
                            <Text style={stylesConsulta.th}>Médico:</Text>
                            <Text style={stylesConsulta.th}>Data:</Text>
                            <Text style={stylesConsulta.th}>Horário:</Text>
                            <Text style={stylesConsulta.th}>Situação:</Text>
                            <Text style={stylesConsulta.th}>Descrição:</Text>
                        </View>
                        <View style={stylesConsulta.itemTd}>
                            <Text style={stylesConsulta.td}>{item.idMedicoNavigation.nome}</Text>
                            <Text style={stylesConsulta.td}>{moment(new Date(item.dataAgendada)).format("DD/MM/YYYY")}</Text>
                            <Text style={stylesConsulta.td}>{item.horaAgendada}</Text>
                            <SituacaoCase idSituacao={item.idSituacaoNavigation.nome} />
                            <Text style={stylesConsulta.td}>{item.descricao}</Text>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}