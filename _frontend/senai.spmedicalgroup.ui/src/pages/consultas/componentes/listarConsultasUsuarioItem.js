export default {
    listar() {
        return fetch('http://192.168.3.105:5000/api/Consultas/ConsultasUsuarioInclude', {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                Authorization: 'Bearer ' + localStorage.getItem("usuarioautenticado-token-spmedgroup")
            }
        })
    }
}