import React, {Component} from "react";
import {Link} from "react-router-dom";
import {logout} from "../../services/logout";
import CadastroUsuario from "./componentes/CadastroUsuario";
import CadastroMedico from "./componentes/CadastroMedico";
import CadastroPaciente from "./componentes/CadastroPaciente";
import CadastroConsulta from "./componentes/CadastroConsulta";

class Cadastros extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return(
            <div>
                <CadastroUsuario />

                <CadastroMedico />
                
                <CadastroPaciente />

                <CadastroConsulta />

                <Link to="/" onClick={logout}>Sair</Link>
            </div>
        )
    }
}

export default Cadastros;