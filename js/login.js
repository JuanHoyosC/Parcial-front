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

console.log(localStorage.getItem('IdEmpresa'))
if(localStorage.getItem('IdUser') != null){
  window.location = "html/preguntas.html";
}else{
  if(localStorage.getItem('IdEmpresa') != null){
    window.location = "html/empleados.html";
  }
}

const db = firebase.firestore();
var sw = false;

const verificarEmpleado = (email, password) => {
   let verificar = false;
   let bloqueo = false

  db.collection("empleados").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {     
      if (email == doc.data().email && password == doc.data().contraseña && doc.data().estado == "activo") {

        localStorage.setItem('Nombre', doc.data().name);
        localStorage.setItem('IdUser', doc.data().uidEmpleado);
        localStorage.setItem('IdEmpresa', doc.data().uidEmpresa);
        localStorage.setItem('Url', doc.data().url);
        // limpia los inputs
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        window.location = "html/preguntas.html";
        verificar = true;
      }

      if(email == doc.data().email && doc.data().estado == "desactivado"){
        bloqueo = true
      }

    });

    if(bloqueo){
      Swal.fire({
        icon: 'error',
        title: 'Usuario bloqueado',
        text: 'No puede ingresar al sistema',
      })
    }else{
      
      if (!verificar) {
        /*
        Swal.fire({
          icon: 'error',
          title: 'Usuario o Contraseña incorrecta',
          text: 'Intenta de nuevo',
        })*/
      }
    }

  });
}

const verificarEmpresa = (email, password) => {
  let verificar = false;
  db.collection("users").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (email == doc.data().email && password == doc.data().contraseña) {
        localStorage.setItem('Nombre', doc.data().nomEmpresa);
        localStorage.setItem('IdEmpresa', doc.data().uid);
        localStorage.setItem('Url', doc.data().url);
        // limpia los inputs
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        window.location = "html/empresa.html";
        verificar = true;
      }

    });

    if (!verificar) {
     /* 
      Swal.fire({
        icon: 'error',
        title: 'Usuario o Contraseña incorrecta',
        text: 'Intenta de nuevo',

      })*/
    }
    

  });
}

const verificar = () => {
  
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const empresa = document.querySelector("#gridRadios1").checked;
  console.log(sw);
  if(email.length == 0 || password.length == 0){
    Swal.fire({
      icon: 'error',
      title: 'Campos vacios',
      text: 'Intenta de nuevo',

    })  
  }else{
    vedddrificar(email, password);    
  }
  console.log(sw);
  
    console.log("-----------")
  if(empresa == true){
    verificarEmpresa(email, password);
    
  }else{
    verificarEmpleado(email, password);
  }

}

const vedddrificar = (username, password) => {
  //const username = document.getElementById("email").value;
  //const password = document.getElementById("password").value;
  


  firebase.auth().signInWithEmailAndPassword(username, password)
  .then(function(){
    

  })
  .catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);

    if(errorCode == "auth/wrong-password"){
      Swal.fire({
          title: 'Espere',
          text: "Contraseña incorrecta",
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
              if(errorCode == "auth/too-many-requests"){
                  Swal.fire({
                      title: 'Espere',
                      text: "Demasiados intentos de inicio de sesión fallidos. Por favor, inténtelo de nuevo más tarde.",
                      icon: 'warning',
          
                  })
              }
          }
      }    
  }  


  });
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("Inicio Seccion")
      sw = true;     
      
    } else {
     
    }
  });


}

function PasswordReset(){
  var auth = firebase.auth();
  var emailAddress = "user@example.com";
  auth.sendPasswordResetEmail(emailAddress).then(function() {
    // Email sent.
  }).catch(function(error) {
    // An error happened.
  });
}
