import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import jwt from 'jwt-decode';
import LinearGradient from 'react-native-linear-gradient';

import stylesLogin from '../../assents/styles/login/style';

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            email: "mariana@outlook.com",
            senha: "mariana132",
            // email: "ricardo.lemos@spmedicalgroup.com.br",
            // senha: "spricardo132",
            mensagem: "",
            buttonColor: ""
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
                }
            };
        }
        catch (error) {
            console.warn(`Ocorreu um erro: ${error}`);
        }
    }

    render() {
        return (
            <ImageBackground
                source={require("../../assents/img/login/backgroundImg.jpg")}
                style={StyleSheet.absoluteFillObject}
            >
                <View />
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    colors={["rgba(0, 255, 0, 0.6)", "rgba(0, 0, 255, 0.6)"]}
                    style={stylesLogin.overlay}
                ></LinearGradient>
                <View style={stylesLogin.main}>
                    <View style={stylesLogin}>
                        <Image
                            source={require("../../assents/img/components/icon-logo-circulo.png")}
                            style={stylesLogin.logo}
                        />
                    </View>

                    <View style={stylesLogin.form}>
                        <Text style={stylesLogin.titulo}>{"Login".toLocaleUpperCase()}</Text>

                        <TextInput
                            style={stylesLogin.input}
                            placeholderTextColor="gray"
                            placeholder="Email"
                            onChangeText={email => this.setState({ email })}
                        />

                        <TextInput
                            style={stylesLogin.input}
                            placeholder="Senha"
                            placeholderTextColor="gray"
                            onChangeText={senha => this.setState({ senha })}
                        />

                        <TouchableOpacity
                            style={stylesLogin.button}
                            onPress={this._efetuarLogin}
                        >
                            <Text style={stylesLogin.buttonText}>Entrar</Text>
                        </TouchableOpacity>

                        <Text style={stylesLogin.mensagemErro}>{this.state.mensagem}</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

