const nom = localStorage.getItem("Nombre");
var op = false;
if (nom == null) {
    op = false;

}
if (nom != null) {
    op = true;
}



var config = {
    apiKey: "AIzaSyBIWplHf1UW47MdtAxRq9sSm_OdxcQiKF4",
    authDomain: "parcial-db.firebaseapp.com",
    projectId: "parcial-db",
    storageBucket: "parcial-db.appspot.com",
};

firebase.initializeApp(config);

const db = firebase.firestore();
const storage = firebase.storage();

const obtenerDatos = () => {
    const contraseña = document.getElementById("passwordEmpleado").value;
    const name = document.getElementById("nameEmpleado").value;
    const direccion = document.getElementById("direccion").value;
    let file = document.getElementById("file").files[0];
    

    if (direccion.length == 0 || contraseña.length == 0 || name.length == 0 || !file) {

        Swal.fire({
            title: 'Informacion incompleta',
            text: "Debe llenar todos los campos",
            icon: 'warning',

        })
    } else {
        const storageRef = storage.ref('empleados/img/' + file.name);
        const upload = storageRef.put(file);
        upload.on('state_changed', (snapshot) => {

        }, function (error) {
            console.log(error)
        }, function () {
            upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                url = downloadURL;
                const empresa = localStorage.getItem("Nombre");
                const data = arrayJson(name, url, contraseña, direccion, empresa, "empleado", "activo");
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


    }
}

const arrayJson = (name, url, contraseña, direccion, empresa, tipo, estado) => {
    const data = {
        name: name,
        url: url,
        direccion: direccion,
        contraseña: contraseña,
        empresa: empresa,
        tipo: tipo,
        estado: estado

    }
    return data;
}




