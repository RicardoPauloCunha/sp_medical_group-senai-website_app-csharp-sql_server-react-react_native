import React, { Component } from "react";
import ListarConsultas from "./ListarConsultas";
import ListarMedicos from "./ListarMedicos";
import ListarUsuarios from "./ListarUsuarios";
import ListarProntuarios from "./ListarProntuarios";

class ListasIf extends Component {
    constructor(props) {
        super(props)

        this.state = {
            listaId: props.idDaLista
        }
    }

    componentDidMount(){
    console.log(this.state.listaId);
    }

    render() {
        

        if (this.state.listaId === "1") {
            return (<ListarConsultas />)
        }
        else if (this.state.listaId === "2") {
            return (<ListarMedicos />)
        }
        else if (this.state.listaId === "3") {
            return (<ListarUsuarios />)
        }
        else if (this.state.listaId === "4") {
            return (<ListarProntuarios />)
        }
        else {
            console.log(this.state.listaId);
            return(<ListarConsultas />)
        }
    }
}

export default ListasIf;