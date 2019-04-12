import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import ConsultasPaciente from "./pages/consultas/ConsultasPaciente";
import ConsultasMedico from "./pages/consultas/ConsultasMedico";
import Login from "./pages/login/Login";


const Routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/ConsultasPaciente" component={ConsultasPaciente} />
                <Route path="/ConsultasMedico" component={ConsultasMedico} />
                {/* <Route path="/DashBoard" component={DashBoard} />
                <Route path="/Cadastros" component={Cadastros} /> */}
            </Switch>
        </div>
    </Router>
)
ReactDOM.render(Routing, document.getElementById('root'));

serviceWorker.unregister();
