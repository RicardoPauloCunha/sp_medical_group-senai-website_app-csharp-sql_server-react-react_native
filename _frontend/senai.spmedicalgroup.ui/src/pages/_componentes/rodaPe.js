import React, { Component } from "react";

import "../_assets/css/style.css";

class RodaPe extends Component {
    render() {
        return (
            <div class="style__rodape" >
                <p class="style__rodape--titulo">Sp Medical Group</p>
                <div class="style__rodape--infos">
                    <div class="style__rodape--infos-links style__rodape--links-wrap">
                        <p class="style__rodape--links-wrap-p">Consultas</p>
                        <p class="style__rodape--links-wrap-p">Agendamentos</p>
                        <p class="style__rodape--links-wrap-p">Exames</p>
                        <p class="style__rodape--links-wrap-p">Instituições</p>
                        <p class="style__rodape--links-wrap-p">Medicos</p>
                    </div>
                    <div class="style__rodape--infos-links">
                        <p class="style__rodape--infos-links-espacamento">Fale Conosco</p>
                        <p>(11) 99999-9999</p>
                        <p>spmedicalgroup@gmail.com</p>
                    </div>
                </div>
            </div >
        )
    }
}

export default RodaPe;