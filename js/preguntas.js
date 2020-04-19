const preguntas = document.getElementById('preguntas');
document.getElementById("img").src = localStorage.getItem('Url');
document.getElementById("nombre-empresa").innerHTML = localStorage.getItem('Nombre');
var config = {
    apiKey: "AIzaSyBIWplHf1UW47MdtAxRq9sSm_OdxcQiKF4",
    authDomain: "parcial-db.firebaseapp.com",
    projectId: "parcial-db",
    storageBucket: "parcial-db.appspot.com",
};

firebase.initializeApp(config);

const db = firebase.firestore();
const storage = firebase.storage();

db.collection("Preguntas").onSnapshot((querySnapshot) => {
    const Id = localStorage.getItem('Id');

    querySnapshot.forEach((doc) => {
        if (Id == doc.data().uidEmpresa) {
            preguntas.innerHTML += `
            <div class="pregunta mb-2">
            <p class="text-pregunta mb-2">¿${doc.data().pregunta1}?</p>
            <form class="respuestas">
            <input type="text" class="form-control" placeholder="Respuesta 1" id="respuesta1">
            </form>
            </div>

            <div class="pregunta  mb-2">
            <p class="text-pregunta mb-2">¿${doc.data().pregunta2}?</p>
            <form class="respuestas">
            <input type="text" class="form-control" placeholder="Respuesta 2" id="respuesta2">
            </form>
            </div>

            <div class="pregunta mb-2">
            <p class="text-pregunta mb-2">¿${doc.data().pregunta3}?</p>
            <form class="respuestas">
            <input type="text" class="form-control" placeholder="Respuesta 3" id="respuesta3">
            </form>
            </div>

            <div class="pregunta mb-2">
            <p class="text-pregunta mb-2">¿${doc.data().pregunta4}?</p>
            <form class="respuestas">
            <input type="text" class="form-control" placeholder="Respuesta 4" id="respuesta4">
            </form>
            </div>

            <div class="pregunta mb-2">
            <p class="text-pregunta mb-2">¿${doc.data().pregunta5}?</p>
            <form class="respuestas">
            <input type="text" class="form-control" placeholder="Respuesta 5" id="respuesta5">
            </form>
            </div>

            <div class="container-button">
            <a  class="btn-entrar text-center text-white" href = "resultado.html" >Continuar</a>
            </div>
            `
        }
    });
});

const responder = () =>{
    const respuesta1 = document.getElementById("respuesta1").value;
    const respuesta2 = document.getElementById("respuesta2").value;
    const respuesta3 = document.getElementById("respuesta3").value;
    const respuesta4 = document.getElementById("respuesta4").value;
    const respuesta5 = document.getElementById("respuesta5").value;

    if (respuesta1.length == 0 || respuesta2.length == 0 || respuesta3.length == 0 || respuesta4.length == 0 ||
        respuesta5.length == 0) {

        Swal.fire({
            title: 'Informacion incompleta',
            text: "Debe llenar todos los campos",
            icon: 'warning',

        })
    }
}