export default {
    listar(endpoint) {
        return fetch(`http://localhost:5000/api/${endpoint}`, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
    }
}