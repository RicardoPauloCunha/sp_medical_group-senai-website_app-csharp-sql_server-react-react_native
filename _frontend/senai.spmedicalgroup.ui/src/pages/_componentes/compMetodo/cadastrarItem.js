import { UsuarioToken } from "../../../services/auth";

export default {
    cadastrar(endpoint, item) {
        let url = `http://localhost:5000/api/${endpoint}`;

        return fetch(url, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + UsuarioToken 
            }
        })
    }
}