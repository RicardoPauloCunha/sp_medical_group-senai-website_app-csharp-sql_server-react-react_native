import React, { Component } from 'react';
import { StyleSheet, Modal, Text, View, ActivityIndicator, StatusBar } from 'react-native';

const Loader = props => {
    const {
        loading,
    } = props;

    return (
        <Modal
            transparent={true}
            visible={loading}
            animationType={"none"}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator
                        animating={loading}
                        size="large"
                        color="#82c1d7"
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalHeader: {
        height: 30,
        backgroundColor: "red"
    },
    modalBackground: {
        height: "104%",
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default Loader;