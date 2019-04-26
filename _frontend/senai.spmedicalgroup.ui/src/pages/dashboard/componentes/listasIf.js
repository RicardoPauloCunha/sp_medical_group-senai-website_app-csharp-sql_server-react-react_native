import React, { Component } from "react";
import ListarConsultas from "./ListarConsultas";
import ListarMedicos from "./ListarMedicos";
import ListarUsuarios from "./ListarUsuarios";
import ListarProntuarios from "./ListarProntuarios";

class ListasIf extends Component {
    render() {
        var lista;

        if (this.props.idLista === "1") {
            lista = <ListarConsultas />
        }
        else if (this.props.idLista === "2") {
            lista = <ListarProntuarios />
        }
        else if (this.props.idLista === "3") {
            lista = <ListarMedicos />
        }
        else if (this.props.idLista === "4") {
            lista = <ListarUsuarios />
        }
        else {
            lista = <ListarConsultas />
        }

        return(
            <div>
                {lista}
            </div>
        );
    }
}

export default ListasIf;