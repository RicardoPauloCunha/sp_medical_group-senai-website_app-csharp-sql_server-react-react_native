import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import api from '../../services/api';
import jwt from 'jwt-decode';

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            email: "mariana@outlook.com",
            senha: "mariana132",
            mensagem: ""
        }
    }

    _efetuarLogin = async () => {
        try {
            const resposta = await api.post("/Login", {
                email: this.state.email,
                senha: this.state.senha
            });

            if (resposta.status === 200) {
                const token = resposta.data.token;
                await AsyncStorage.setItem("UsuarioToken", token);

                let userLogado = jwt(token);

                if (userLogado.UsuarioTipo == 3) {
                    this.props.navigation.navigate("PacienteMainDrawerNav");
                }
                else if (userLogado.UsuarioTipo == 2) {
                    this.props.navigation.navigate("MedicoMainDrawerNav");
                }
                else {
                    this.setState({ mensagem: "App não da suporte para usuários Administradores!!" });
                    console.warn(this.state.mensagem)
                }
            };
        }
        catch (erro) {
            console.warn(`Ocorreu um erro: ${erro}`);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                />

                <TextInput
                    placeholder="Senha"
                    onChangeText={senha => this.setState({ senha })}
                />

                <TouchableOpacity
                    onPress={this._efetuarLogin}
                >
                    <Text>Entrar</Text>
                </TouchableOpacity>
                <Text>{this.state.mensagem}</Text>
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