import React, { Component } from "react";

import "../_assets/css/style.css";
import { Link } from "react-router-dom";
import { logout } from "../../services/logout";

class ButtonLogout extends Component {
    render() {
        return (
            <div class="style__menu--nav-button">
                <Link to="/" onClick={logout}>
                    <button type="submit" class="style__button--white">Sair</button>
                </Link>
            </div>
        )
    }
}

export default ButtonLogout;