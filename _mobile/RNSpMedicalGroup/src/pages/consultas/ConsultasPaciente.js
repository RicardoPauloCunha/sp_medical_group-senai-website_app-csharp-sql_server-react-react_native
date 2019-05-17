import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, FlatList, AsyncStorage, Image } from 'react-native';
import api from '../../services/api';
import LinearGradient from 'react-native-linear-gradient';
// import moment from 'moment';

import stylesConsulta from '../../assents/styles/consultas/styles';

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
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    colors={["rgba(0, 255, 0, 0.6)", "rgba(0, 0, 255, 0.6)"]}
                    style={stylesConsulta.header}
                >
                    {/* <Image
                        source={require("../../assents/img/components/icon-logo-circulo.png")}
                        style={stylesConsulta.iconLogo}
                    /> */}
                    <Text style={stylesConsulta.titulo}>{"Consultas".toLocaleUpperCase()}</Text>
                    <View style={stylesConsulta.linha}></View>
                </LinearGradient>
                <ScrollView>
                    <FlatList
                        data={this.state.listaConsultas}
                        keyExtractor={item => item.id}
                        renderItem={this.renderizarItems}
                    />
                </ScrollView>
            </View>
        )
    }

    renderizarItems = ({ item }) => (
        <View>
            <Text>{item.id}</Text>
            <Text>{item.idMedicoNavigation.nome}</Text>
            <Text>{item.dataAgendada}</Text>
            <Text>{item.horaAgendada}</Text>
            <Text>{item.idSituacaoNavigation.nome}</Text>
            <Text>{item.descricao}</Text>
        </View>
    )
}