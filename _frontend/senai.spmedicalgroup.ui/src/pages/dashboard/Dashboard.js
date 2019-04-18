import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../services/logout";
import ListarConsultas from "./componentes/ListarConsultas";
import ListarProntuarios from "./componentes/ListarProntuarios";
import ListarMedicos from "./componentes/ListarMedicos";
import ListarUsuarios from "./componentes/ListarUsuarios";
import QuantidadeItensLista from "./componentes/QuantidadeItensLista";

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            idBusca: "",
            endpointBusca: "",
        }
    }

    // Busca Item
    atualizaIdBuscsa(event) {
        this.setState({ idBusca: event.target.value });
    }

    atualizaEndpointBusca(event) {
        this.setState({ endpointBusca: event.target.value });
    }

    buscarId(event) {
        event.preventDefault();

        let url = `http://localhost:5000/api/${this.state.endpointBusca}${this.state.idBusca}`;
        console.log(url)

        fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
            .then(resposta => resposta)
            .then(data => { console.log(data) })
            .catch(erro => console.log(erro));
    }

    render() {
        return (
            <div>
                {/* Quantidade item */}
                <QuantidadeItensLista />

                <Link to="/Cadastros">Cadastros</Link>

                {/* Listar Itens */}
                <div>
                    
                    <ListarConsultas />

                    <ListarProntuarios />
                    
                    <ListarMedicos />
                    
                    <ListarUsuarios />
                </div>
                
                {/* Buscar Item */}
                <div>
                    {/* <h3>Buscar Item</h3>

                    <form onSubmit={this.buscarId.bind(this)}>
                        <input type="text" placeholder="Id Item Buscado" value={this.state.idBusca} onChange={this.atualizaIdBuscsa.bind(this)} />
                        <select value={this.endpointBusca} onChange={this.atualizaEndpointBusca.bind(this)}>
                            <option value="">Selecione</option>
                            <option value="Consultas/">IdConsulta</option>
                            <option value="Medicos/">IdMedico</option>
                            <option value="Prontuarios/">IdProntuario</option>
                            <option value="Usuarios/">IdUsuario</option>
                        </select>

                        <button type="submit">Buscar</button>
                    </form>

                    <h4>Item Encontrado</h4> */}
                </div>
                
                {/* Sair */}
                <div>
                    <Link to="/" onClick={logout}>Sair</Link>
                </div>
            </div>
        )
    }

}

export default Dashboard;