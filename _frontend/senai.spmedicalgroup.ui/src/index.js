import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import ConsultasPaciente from "./pages/consultas/ConsultasPaciente";
import ConsultasMedico from "./pages/consultas/ConsultasMedico";
import Login from "./pages/login/Login";

import {UsuarioAutenticado} from "./services/auth";
import {parseJwt} from "./services/auth";
import Dashboard from './pages/dashboard/Dashboard';
import Cadastros from './pages/cadastros/Cadastros';
import Localizacoes from './pages/localizacoes/Localizacoes';

// Verifica se é Admin
const PermissaoAdmin = ({component : Component}) => (
    <Route
        render={props =>
            UsuarioAutenticado() && parseJwt().UsuarioTipo === "1" ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname: "/"}}/>
            )
        }
    />
)

// Verifica se é Medico
const PermissaoMedico = ({component : Component}) => (
    <Route
        render={props =>
            UsuarioAutenticado() && parseJwt().UsuarioTipo === "2" ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname: "/"}}/>
            )
        }
    />
)

// Verifica se é Paciente
const PermissaoPaciente = ({component : Component}) => (
    <Route
        render={props =>
            UsuarioAutenticado() && parseJwt().UsuarioTipo === "3" ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname: "/"}}/>
            )
        }
    />
)


const Routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Login}/>
                <PermissaoPaciente path="/ConsultasPaciente" component={ConsultasPaciente} />
                <PermissaoMedico path="/ConsultasMedico" component={ConsultasMedico} />
                <PermissaoAdmin path="/Cadastros" component={Cadastros} />
                <PermissaoAdmin path="/Dashboard" component={Dashboard} />
                <Route path="/Localizacoes" component={Localizacoes} />
            </Switch>
        </div>
    </Router>
)

// if ("serviceWorker" in navigator) {
//     navigator.serviceWorker
//       .register("./firebase-messaging-sw.js")
//       .then(function(registration) {
//         console.log("Registration successful, scope is:", registration.scope);
//       })
//       .catch(function(err) {
//         console.log("Service worker registration failed, error:", err);
//       });
//   }

ReactDOM.render(Routing, document.getElementById('root'));

serviceWorker.unregister();
