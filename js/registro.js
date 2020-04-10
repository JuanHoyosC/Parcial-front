firebase.initializeApp({
    apiKey: "AIzaSyBIWplHf1UW47MdtAxRq9sSm_OdxcQiKF4",
    authDomain: "parcial-db.firebaseapp.com",
    projectId: "parcial-db"
});

const db = firebase.firestore();

const obtenerDatos = () => {
    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const tipo = document.getElementById("tipo").value;
    const numDocumento = document.getElementById("numDocumento").value;
    const nomEmpresa = document.getElementById("nomEmpresa").value;
    const telefono = document.getElementById("telefono").value;
    console.log(email, contraseña, name, tipo, numDocumento, nomEmpresa, telefono)

    if (email.length == 0 || password.length == 0 || name.length == 0 || tipo.length == 0 || numDocumento.length == 0 ||
        nomEmpresa.length == 0 || telefono.length == 0) {
        alert("No debe dejar campos vacio");
    } else {
        const data = arrayJson(nomEmpresa, tipo, numDocumento, email, nomEmpresa, telefono, contraseña);
        db.collection("users").add(data)
            .then(function (docRef) {
                alert("Usuario registrado");
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
}

const arrayJson = (name, tipo, numDocumento, email, nomEmpresa, telefono, contraseña) => {
    const data = {
        name: name,
        tipo: tipo,
        numDocumento: numDocumento,
        email: email,
        nomEmpresa: nomEmpresa,
        telefono: telefono,
        contraseña: contraseña
    }
    return data;
}