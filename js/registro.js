const nom = localStorage.getItem("Nombre");
var op = false;
if (nom == null) {
    op = false;

}
if (nom != null) {
    op = true;

}
console.log(op)

if (op == true) {



}

firebase.initializeApp({
    apiKey: "AIzaSyBIWplHf1UW47MdtAxRq9sSm_OdxcQiKF4",
    authDomain: "parcial-db.firebaseapp.com",
    projectId: "parcial-db",
    storageBucket: "parcial-db.appspot.com",
});

const db = firebase.firestore();
const storage = firebase.storage();
const obtenerDatos = () => {
    const email = document.getElementById("email").value;
    const contraseña = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const tipo = document.getElementById("tipo").value;
    const numDocumento = document.getElementById("numDocumento").value;
    const nomEmpresa = document.getElementById("nomEmpresa").value;
    const telefono = document.getElementById("telefono").value;
    let file = document.getElementById("file").files[0];


    if (email.length == 0 || password.length == 0 || name.length == 0 || tipo.length == 0 || numDocumento.length == 0 ||
        nomEmpresa.length == 0 || telefono.length == 0 || !file) {


        Swal.fire({
            title: 'Informacion incompleta',
            text: "Debe llenar todos los campos",
            icon: 'warning',

        })
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, contraseña).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
        const storageRef = storage.ref('empresas/img/' + file.name);
        const upload = storageRef.put(file);
        upload.on('state_changed', (snapshot) => {

        }, function (error) {
            console.log(error)
        }, function () {
            upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                url = downloadURL;
                const data = arrayJson(nomEmpresa, tipo, numDocumento, email, url, nomEmpresa, telefono, contraseña);
                db.collection("users").add(data)
                    .then(function (docRef) {
                        Swal.fire({

                            icon: 'success',
                            title: 'Registrado satisfactoriamente',
                            showConfirmButton: false,
                            timer: 1500

                        })

                    })
                    .catch(function (error) {
                        console.error("Error adding document: ", error);
                    });
            });
        });

    }
}

const arrayJson = (name, tipo, numDocumento, email, url, nomEmpresa, telefono, contraseña) => {
    const data = {
        name: name,
        tipo: tipo,
        numDocumento: numDocumento,
        email: email,
        url: url,
        nomEmpresa: nomEmpresa,
        telefono: telefono,
        contraseña: contraseña
    }
    return data;
}




