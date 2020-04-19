

firebase.initializeApp({
   
    apiKey: "AIzaSyBIWplHf1UW47MdtAxRq9sSm_OdxcQiKF4",
    authDomain: "parcial-db.firebaseapp.com",
    databaseURL: "https://parcial-db.firebaseio.com",
    projectId: "parcial-db",
    storageBucket: "parcial-db.appspot.com",
    messagingSenderId: "796397147936",
    appId: "1:796397147936:web:15719d863544e4bae3a945",
    measurementId: "G-5SPHRL79PH"
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
    




    if (email.length == 0 || contraseña.length == 0 || name.length == 0 || tipo.length == 0 || numDocumento.length == 0 ||
        nomEmpresa.length == 0 || telefono.length == 0 || !file) {

        Swal.fire({
            title: 'Informacion incompleta',
            text: "Debe llenar todos los campos",
            icon: 'warning',

        })
    } else {

        firebase.auth().createUserWithEmailAndPassword(email, contraseña)
        .then(function(){
         VerificarGmail();
         firebase.auth().signInWithEmailAndPassword(email, contraseña).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const storageRef = storage.ref('empresas/img/' + file.name);
                const upload = storageRef.put(file);
                uid = firebase.auth().currentUser.uid;
                upload.on('state_changed', (snapshot) => {
        
                }, function (error) {
                    console.log(error)
                }, function () {
                    upload.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        url = downloadURL;
                        const data = arrayJson(nomEmpresa, tipo, numDocumento, email, url, nomEmpresa, telefono, contraseña, uid);
                        db.collection("users").add(data)
                            .then(function (docRef) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Registrado satisfactoriamente',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
        
                                window.location = "preguntas.html";
                            })
                            .catch(function (error) {
                                console.error("Error adding document: ", error);
                            });
                    });
                });               
            }else{
                sw = false;
            }
        }); 


        })        
        
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);           
           

            if(errorCode == "auth/email-already-in-use"){
                Swal.fire({
                    title: 'Espere',
                    text: "Correo electronico ya registrado",
                    icon: 'warning',        
                })
            }else{
                if(errorCode == "auth/invalid-email"){
                    Swal.fire({
                        title: 'Espere',
                        text: "Correo electronico incorrecto",
                        icon: 'warning',            
                    })

                }else{
                    if(errorCode == "auth/operation-not-allowed"){                        
                        Swal.fire({
                            title: 'Espere',
                            text: "Correo electronico inhabilitado",
                            icon: 'warning',                
                        })
                    }else{
                        if(errorCode == "auth/weak-password"){
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

const arrayJson = (name, tipo, numDocumento, email, url, nomEmpresa, telefono,contraseña, uid) => {
    const data = {
        name: name,
        tipo: tipo,
        numDocumento: numDocumento,
        email: email,
        url: url,
        nomEmpresa: nomEmpresa,
        telefono: telefono,
        contraseña: contraseña,
        uid: uid
    }
    return data;
}
function VerificarGmail(){
    var user = firebase.auth().currentUser;
    user.sendEmailVerification().then(function() {
     // Email sent.
    }).catch(function(error) {
     // An error happened.
    });    
}




