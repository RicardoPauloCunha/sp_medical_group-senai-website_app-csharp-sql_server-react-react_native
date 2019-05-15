import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class ConsultasMedico extends Component {
    static navigationOptions = {
        title: "Consultas do Medico"
    }

    constructor(props) {
        super(props);

        this.state = {
           
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Consultas do Médico</Text>
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