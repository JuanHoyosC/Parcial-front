firebase.initializeApp({
  apiKey: "AIzaSyBIWplHf1UW47MdtAxRq9sSm_OdxcQiKF4",
  authDomain: "parcial-db.firebaseapp.com",
  projectId: "parcial-db"
});

const db = firebase.firestore();



const verificar = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let verificar = false;
  db.collection("users").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (email == doc.data().email && password == doc.data().contraseña) {    
        
             
      
        
        localStorage.setItem('Nombre', doc.data().nomEmpresa);
        window.location = "html/empleados.html";
        verificar = true;
        
      }

    });

    if (!verificar) {
      Swal.fire({
        icon: 'error',
        title: 'Email o Contraseña incorrecta',
        text: 'Intenta de nuevo',
       
      })
    }
    
  });


}

const vedddrificar = () =>{
  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  

  firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;

});
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        firebase.auth().currentUser.getIdToken().then(function(idToken) {
            localStorage.auth = idToken;
            localStorage.uid = firebase.auth().currentUser.uid;

            uid = firebase.auth().currentUser.uid;
            firebase.database().ref("users/" + uid).update({
                "name": $("#nameUser").val(),
                "status": "0",
                "uid": uid,
                "challenge": false,
                "statusChallenge": false
            });
        });
        window.location = "html/empleados.html";
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Usuario y/o contraseña son incorrectos',
        });
    }
});


}


console.log("dd")