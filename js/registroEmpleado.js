const nom = localStorage.getItem("Nombre");
var op = false;
if(nom == null){
    op = false;

}
if(nom != null){
   op = true;
    
}
console.log(op)

if(op==true){



}

firebase.initializeApp({
    apiKey: "AIzaSyBIWplHf1UW47MdtAxRq9sSm_OdxcQiKF4",
    authDomain: "parcial-db.firebaseapp.com",
    projectId: "parcial-db"
});

const db = firebase.firestore();

const obtenerDatos = () => {
    const contraseña = document.getElementById("password").value;
    const name = document.getElementById("name").value;
    const direccion = document.getElementById("direccion").value;


    if (direccion.length == 0 || password.length == 0 || name.length == 0) {
        

        Swal.fire({
            title: 'Informacion incompleta',
            text: "Debe llenar todos los campos",
            icon: 'warning',
            
          })
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, contraseña).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
        const data = arrayJson(nomEmpresa, tipo, numDocumento, email, nomEmpresa, telefono, contraseña);
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




 