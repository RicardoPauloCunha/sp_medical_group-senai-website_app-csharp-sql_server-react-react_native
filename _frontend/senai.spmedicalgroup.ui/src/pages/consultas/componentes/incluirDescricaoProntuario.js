import React, { Component } from 'react';
// import Axios from 'axios';
import urlApi from '../../../services/urlApi';

class IncluirDescricao extends Component {
    constructor() {
        super();

        this.state = {
            descricao: "",
            mensagem: ""
        }
    }

    //pega a descricao digitada
    atualizarDescricao(event) {
        this.setState({ descricao: event.target.value });
    }

    //metodo atualiza descricao do prontuario
    incluirDescricao(event) {
        event.preventDefault();

        var idDescricao = event.target.getAttribute("consulta-id")

        let item = {
            id: idDescricao,
            descricao: this.state.descricao
        }

        console.log(item);

        fetch(`${urlApi}AlterarDescricaoConsulta`, {
            method: "PUT",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta)
            // .then(this.listarConsultas())
            .catch(erro => console.log(erro))

        // this.listarConsultas();
    }

    render() {
        return (
            <div>
                <form className="consultas__consulta--item-infos-desc consultas__consulta--item-infos-desc-displaynone" consulta-id={this.props.idConsulta} onSubmit={this.incluirDescricao.bind(this)}>
                    <textarea className="consultas__consulta--item-input-desc" placeholder="Incluir Descrição" value={this.state.descricao} onChange={this.atualizarDescricao.bind(this)}></textarea>
                    <button type="submit" className="style__button--blue">Incluir Descrição</button>
                </form>
            </div>
        )
    }
}

export default IncluirDescricao;
