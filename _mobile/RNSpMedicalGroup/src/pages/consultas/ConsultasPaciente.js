import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class ConsultasPaciente extends Component {
    static navigationOptions = {
        title: "Consultas do Paciente"
    }

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Consultas dos Pacientes!!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    }
});