import React, { Component } from "react";
import listarConsultasUsuarioItem from "./componentes/listarConsultasUsuarioItem";


import "./assets/css/consultas.css";
import "../_assets/css/style.css";

import MenuMin from "../_componentes/menuMin";
import Rodape from "../_componentes/rodaPe";
import Consultas from "./componentes/Consultas";

class ConsultasPaciente extends Component {
    // carrega o metodo
    componentDidMount() {
        this.listarConsultas();
    }

    // lista todas as consultas
    listarConsultas() {
        listarConsultasUsuarioItem
            .listar()
            .then(resposta => resposta.json())
            .then(data => { this.setState({ consultas: data }) })
            .catch(erro => this.setState({ mensagem: "Ocorreu um erro durante o listagem, tente novamente" }))
    }

    // pega a descriçao digitada
    atualizarDescricao(event) {
        this.setState({ descricao: event.target.value });
    }

    atualizarIdDescricaoIncluir(event) {
        this.setState({ idDescricaoIncluir: event.target.value });
    }

    render() {
        return (
            <div>
                <MenuMin />
                
                <Consultas />

                <Rodape />
            </div >
        );
    }
}

export default ConsultasPaciente;