import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, FlatList, AsyncStorage } from 'react-native';
import api from '../../services/api';

import styles from "../../assents/styles/consultas/styles";

export default class ConsultasMedico extends Component {
    static navigationOptions = {
        title: "Consultas do Medico"
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
            <View style={styles.container}>
                <View>
                    <Text>Consultas dos Pacientes!!</Text>
                </View>
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
            <Text>{item.idProntuarioNavigation.nome}</Text>
            <Text>{item.dataAgendada}</Text>
            <Text>{item.horaAgendada}</Text>
            <Text>{item.idSituacaoNavigation.nome}</Text>
            <Text>{item.descricao}</Text>
        </View>
    )
}