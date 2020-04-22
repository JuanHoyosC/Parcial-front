const nom = localStorage.getItem("Nombre");


var config = {
    apiKey: "AIzaSyBIWplHf1UW47MdtAxRq9sSm_OdxcQiKF4",
    authDomain: "parcial-db.firebaseapp.com",
    projectId: "parcial-db",
    storageBucket: "parcial-db.appspot.com",
    messagingSenderId: "796397147936",
    appId: "1:796397147936:web:15719d863544e4bae3a945",
    measurementId: "G-5SPHRL79PH"
};

firebase.initializeApp(config);

const db = firebase.firestore();
const storage = firebase.storage();

const obtenerDatos = () => {
    const contraseña = document.getElementById("passwordEmpleado").value;
    const name = document.getElementById("nameEmpleado").value;
    const email = document.getElementById("email").value;
    const direccion = document.getElementById("direccion").value;
    let file = document.getElementById("file").files[0];


    if (direccion.length == 0 || contraseña.length == 0 || name.length == 0 || !file || email.length == 0) {

        Swal.fire({
            title: 'Informacion incompleta',
            text: "Debe llenar todos los campos",
            icon: 'warning',

        })
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, contraseña)
            .then(function () {
                VerificarGmail();
                firebase.auth().signInWithEmailAndPassword(email, contraseña).catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                });
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        const storageRef = storage.ref('empleados/img/' + file.name);
                        const upload = storageRef.put(file);
                        const uidEmpleado = firebase.auth().currentUser.uid;
                        upload.on('state_changed', (snapshot) => {

                        }, function (error) {
                            console.log(error)
                        }, function () {
                            upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                                url = downloadURL;
                                const uid = localStorage.getItem('IdEmpresa')
                                const data = arrayJson(name, email, url, contraseña, direccion, uid, uidEmpleado, "empleado", "activo", "false");
                                db.collection("empleados").add(data)
                                    .then(function (docRef) {
                                        Swal.fire({

                                            icon: 'success',
                                            title: 'Registrado satisfactoriamente',
                                            showConfirmButton: false,
                                            timer: 1500

                                        })
                                        //Limpia los inputs
                                        document.getElementById("passwordEmpleado").value = "";
                                        document.getElementById("nameEmpleado").value = "";
                                        document.getElementById("direccion").value = "";
                                        file = null;

                                    })
                                    .catch(function (error) {
                                        console.error("Error adding document: ", error);
                                    });
                            });
                        });


                    } else {
                        sw = false;
                    }
                });

            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);


                if (errorCode == "auth/email-already-in-use") {
                    Swal.fire({
                        title: 'Espere',
                        text: "Correo electronico ya registrado",
                        icon: 'warning',
                    })
                } else {
                    if (errorCode == "auth/invalid-email") {
                        Swal.fire({
                            title: 'Espere',
                            text: "Correo electronico incorrecto",
                            icon: 'warning',
                        })

                    } else {
                        if (errorCode == "auth/operation-not-allowed") {
                            Swal.fire({
                                title: 'Espere',
                                text: "Correo electronico inhabilitado",
                                icon: 'warning',
                            })
                        } else {
                            if (errorCode == "auth/weak-password") {
                                Swal.fire({
                                    title: 'Espere',
                                    text: "Contraseña no es segura",
                                    icon: 'warning',

                                })
                            }
                        }
                    }
                }

            });

    }
}

const arrayJson = (name, email, url, contraseña, direccion, uid, uidEmpleado, tipo, estado, respondio) => {
    const data = {
        name: name,
        email: email,
        url: url,
        direccion: direccion,
        contraseña: contraseña,
        uidEmpresa: uid,
        uidEmpleado: uidEmpleado,
        tipo: tipo,
        estado: estado,
        respondio: respondio
    }
    return data;
}

function VerificarGmail() {
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function () {
        // Email sent.
    }).catch(function (error) {
        // An error happened.
    });
}


