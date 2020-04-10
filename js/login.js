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
        window.location = "../html/empleados.html";
        verificar = true;
      }

    });

    if (!verificar) {
      alert("Usuario o contraseña incorrecta");
    }
    
  });


}


console.log("dd")