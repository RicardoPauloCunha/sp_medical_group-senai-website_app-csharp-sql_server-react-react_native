import firebase from './firebaseConfig';

// var unsubscribe = firebase.firestore().collection("Enderecos").onSnapshot(() => {});

export const logout = async () => {
    // unsubscribe();
    await firebase.auth().signOut();
    localStorage.removeItem("usuarioautenticado-token-spmedgroup");
}