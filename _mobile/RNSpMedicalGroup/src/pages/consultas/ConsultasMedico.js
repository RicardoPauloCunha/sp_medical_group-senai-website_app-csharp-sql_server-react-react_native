import React, {Component} from 'react';
import { StyleSheet, View, ScrollView, Text, FlatList, AsyncStorage } from 'react-native';
import api from '../../services/api';

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
            <ScrollView>
                <View style={styles.container}>
                    <Text>Consultas dos Pacientes!!</Text>
                </View>
                <View>
                    <FlatList 
                        data={this.state.listaConsultas}
                        keyExtractor={item => item.id}
                        renderItem={this.renderizarItems}
                    />
                </View>
            </ScrollView>
        )
    }

    renderizarItems = ({item}) => (
        <View>
            <Text>{item.id}</Text>
            <Text>{item.idProntuarioNavigation.nome}</Text>
            <Text>{item.idMedicoNavigation.nome}</Text>
            <Text>{item.dataAgendada}</Text>
            <Text>{item.horaAgendada}</Text>
            <Text>{item.idSituacaoNavigation.nome}</Text>
            <Text>{item.descricao}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    flat: {
        flex: 1
    },
    flatItem: {
        width: 200,
        backgroundColor: "red"
    }
});