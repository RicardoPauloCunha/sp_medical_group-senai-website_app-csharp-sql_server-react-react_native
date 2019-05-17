import React, { Component } from 'react';
import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator, StackNavigator, DrawerItems } from 'react-navigation';
import { View, Button, Text, StyleSheet, SafeAreaView, AsyncStorage} from 'react-native';

import Login from './pages/login/Login';
import ConsultasPaciente from './pages/consultas/ConsultasPaciente';
import ConsultasMedico from './pages/consultas/ConsultasMedico';

const AuthStackNav = createStackNavigator(
    {
        Login
    }
);

const PacienteMainDrawerNav = createAppContainer(
    createDrawerNavigator(
        {
            mainPage: { screen: ConsultasPaciente }
        },
        {
            // Conteudo do drawer
            contentComponent: (props) => (
                <View style={{ flex: 1 }}>
                    <SafeAreaView>
                        <Text style={{ margin: 20, textAlign: "center" }}>Paciente Logado</Text>
                        {/* Rotas do Menu */}
                        <DrawerItems {...props} />
                        {/* Butão Deslogar */}
                        <Button title="Logout" onPress={() => props.navigation.navigate('AuthStackNav')} />
                    </SafeAreaView>

                </View>
            ),
            drawerOpenRoute: 'DrawerOpen',
            drawerCloseRoute: 'DrawerClose',
            drawerToggleRoute: 'DrawerToggle'
        })
);

const MedicoMainDrawerNav = createAppContainer(
    createDrawerNavigator(
        {
            mainPage: { screen: ConsultasMedico }
        },
        {
            // Conteudo do drawer
            contentComponent: (props) => (
                <View style={{ flex: 1 }}>
                    <Text style={{ margin: 20, textAlign: "center" }}>Médico Logado</Text>
                    {/* Rotas do Menu */}
                    <DrawerItems {...props} />
                    {/* Butão Deslogar */}
                    <Button title="Logout" onPress={() => props.navigation.navigate('AuthStackNav')} />
                </View>
            ),
            drawerOpenRoute: 'DrawerOpen',
            drawerCloseRoute: 'DrawerClose',
            drawerToggleRoute: 'DrawerToggle'
        })
);

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthStackNav,
            PacienteMainDrawerNav,
            MedicoMainDrawerNav,
        },
        {
            initialRouteName: "AuthStackNav"
        }
    )
);

