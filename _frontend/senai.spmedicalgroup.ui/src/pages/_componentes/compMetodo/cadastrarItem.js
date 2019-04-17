export default {
    cadastrar(endpoint, item) {
        let url = `http://localhost:5000/api/${endpoint}`;

        return fetch(url, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
    }
}