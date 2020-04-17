firebase.initializeApp({
  apiKey: "AIzaSyBIWplHf1UW47MdtAxRq9sSm_OdxcQiKF4",
  authDomain: "parcial-db.firebaseapp.com",
  projectId: "parcial-db"
});

const db = firebase.firestore();

const verificarEmpleado = (email, password) => {
   let verificar = false;
  db.collection("empleados").onSnapshot((querySnapshot) => {

    querySnapshot.forEach((doc) => {
     
      if (email == doc.data().name && password == doc.data().contraseña) {

        localStorage.setItem('Nombre', doc.data().name);
        localStorage.setItem('Id', doc.id);
        // limpia los inputs
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        window.location = "html/preguntas.html";
        verificar = true;
      }

    });

    if (!verificar) {
      Swal.fire({
        icon: 'error',
        title: 'Usuario o Contraseña incorrecta',
        text: 'Intenta de nuevo',

      })
    }

  });
}

const verificarEmpresa = (email, password) => {
  let verificar = false;
  db.collection("users").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (email == doc.data().email && password == doc.data().contraseña) {
        localStorage.setItem('Nombre', doc.data().nomEmpresa);
        localStorage.setItem('Id', doc.id);
        // limpia los inputs
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        window.location = "html/empleados.html";
        verificar = true;

      }

    });

    if (!verificar) {
      Swal.fire({
        icon: 'error',
        title: 'Usuario o Contraseña incorrecta',
        text: 'Intenta de nuevo',

      })
    }

  });
}

const verificar = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const empresa = document.querySelector("#gridRadios1").checked;
  if(empresa == true){
    verificarEmpresa(email, password);
    
  }else{
    verificarEmpleado(email, password);
  }
}

const vedddrificar = () => {
  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;


  firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;

  });
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      firebase.auth().currentUser.getIdToken().then(function (idToken) {
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

