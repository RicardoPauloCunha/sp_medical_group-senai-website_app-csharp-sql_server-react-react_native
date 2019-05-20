import React, { Component } from 'react';
import {Text, View} from 'react-native';
import LinearGradient from "react-native-linear-gradient";

import stylesComponent from '../../../assents/styles/components/style';

export default class Header extends Component {
    render() {
        return (
            <LinearGradient
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                colors={["rgba(0, 255, 0, 0.6)", "rgba(0, 0, 255, 0.6)"]}
                style={stylesComponent.header}
            >
                {/* <Image
                        source={require("../../assents/img/components/icon-logo-circulo.png")}
                        style={stylesConsulta.iconLogo}
                    /> */}
                <Text style={stylesComponent.titulo}>{this.props.tituloHeader.toLocaleUpperCase()}</Text>
                <View style={stylesComponent.linha}></View>
            </LinearGradient>
        )
    }
}