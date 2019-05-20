import { StyleSheet } from "react-native";

const stylesConsulta = StyleSheet.create({
    container: {
        flex: 1,
    },
    main: {
        width: "100%",
        paddingTop: 10,
        backgroundColor: "rgb(245, 245, 245)",
    },
    flatList: {
    },

    // item consulta
    itemContainer: {
        width: "80%",
        margin: 10,
        marginLeft: "10%",
        marginRight: "10%",
    },
    itemHeader: {
        backgroundColor: "#82c1d7",
        padding: 1,
        paddingTop: 5,
        borderRadius: 10,
    },
    itemHeaderTitulo: {
        marginLeft: 4,
        color: "white",
        fontSize: 17
    },
    itemMain: {
        backgroundColor: "white",
        borderRadius: 10,
        marginTop: 5,
        padding: 5,
    },
    itemTable: {
        flexDirection: "row",
    },
    itemTh: {
        width: "30%",
    },
    th: {
        fontSize: 16,
        color: "gray"
    },
    itemTd: {
        width: "70%",

    },
    td: {
        fontSize: 16,
        color: "#5f5f5f"
    },
    footer: {
        height: 20,
    },

    // component
    tdSituacao: {
        fontSize: 16,
        color: "#5f5f5f",
        borderBottomWidth: 2,
        alignSelf: 'flex-start',
        width: "auto",
        // borderRadius: 20,
        // textAlign: "center"
        // borderWidth: 1,        
    },
})

export default stylesConsulta;