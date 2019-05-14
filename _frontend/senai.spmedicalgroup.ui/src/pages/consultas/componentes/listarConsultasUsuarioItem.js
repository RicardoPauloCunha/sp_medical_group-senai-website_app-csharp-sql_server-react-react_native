export default {
    listar() {
        return fetch('http://localhost:5000/api/Consultas/ConsultasInclude', {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
    }
}