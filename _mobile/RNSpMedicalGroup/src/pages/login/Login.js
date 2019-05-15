import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <Button onPress={() => this.props.navigation.navigate('PacienteMainDrawerNav')} title="Entrar Paciente"/>
                <Button onPress={() => this.props.navigation.navigate('MedicoMainDrawerNav')} title="Entrar Medico"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});