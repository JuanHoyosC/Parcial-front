const preguntas = document.getElementById('preguntas');

//Impide que entren a la pagina si no estan logueados
if (localStorage.getItem('IdEmpresa') == null || localStorage.getItem('IdUser') == null) {
  //window.location = "../../index.html";
}
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
  const Id = localStorage.getItem('IdEmpresa');

  querySnapshot.forEach((doc) => {
    if (Id == doc.data().uidEmpresa) {
      preguntas.innerHTML += `
            <div class="pregunta mb-2">
            <p class="text-pregunta mb-2 ml-4">¿${doc.data().pregunta1}?</p>
            <form class="respuestas ml-5">
            <div class="row">
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option2">
                <label class="form-check-label" for="gridRadios1">
                1
                </label>
                </div>

                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option2">
                <label class="form-check-label" for="gridRadios1">
                  2
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option2">
                <label class="form-check-label" for="gridRadios1">
                  3
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option2">
                <label class="form-check-label" for="gridRadios1">
                  4
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option2">
                <label class="form-check-label" for="gridRadios1">
                  5
                </label>
                </div>

          </div>
            </form>
            </div>

            <div class="pregunta  mb-2">
            <p class="text-pregunta mb-2 ml-4">¿${doc.data().pregunta2}?</p>
            <form class="respuestas ml-5">
            <div class="row">
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                <label class="form-check-label" for="gridRadios2">
                1
                </label>
                </div>

                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                <label class="form-check-label" for="gridRadios2">
                  2
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                <label class="form-check-label" for="gridRadios2">
                  3
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                <label class="form-check-label" for="gridRadios2">
                  4
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                <label class="form-check-label" for="gridRadios2">
                  5
                </label>
                </div>

            </div>
            </form>
            </div>

            <div class="pregunta mb-2">
            <p class="text-pregunta mb-2 ml-4">¿${doc.data().pregunta3}?</p>
            <form class="respuestas ml-5">
            <div class="row">
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option2">
                <label class="form-check-label" for="gridRadios3">
                1
                </label>
                </div>

                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option2">
                <label class="form-check-label" for="gridRadios3">
                  2
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option2">
                <label class="form-check-label" for="gridRadios3">
                  3
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option2">
                <label class="form-check-label" for="gridRadios3">
                  4
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option2">
                <label class="form-check-label" for="gridRadios3">
                  5
                </label>
                </div>

            </div>
            </form>
            </div>

            <div class="pregunta mb-2">
            <p class="text-pregunta mb-2 ml-4">¿${doc.data().pregunta4}?</p>
            <form class="respuestas ml-5">
            <div class="row">
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="option2">
                <label class="form-check-label" for="gridRadios4">
                1
                </label>
                </div>

                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="option2">
                <label class="form-check-label" for="gridRadios4">
                  2
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="option2">
                <label class="form-check-label" for="gridRadios4">
                  3
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="option2">
                <label class="form-check-label" for="gridRadios4">
                  4
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios4" value="option2">
                <label class="form-check-label" for="gridRadios4">
                  5
                </label>
                </div>

            </div>
            </form>
            </div>

            <div class="pregunta mb-2">
            <p class="text-pregunta mb-2 ml-4">¿${doc.data().pregunta5}?</p>
            <form class="respuestas ml-5">
            <div class="row">
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios5" value="1">
                <label class="form-check-label" for="gridRadios5">
                1
                </label>
                </div>

                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios5" value="2">
                <label class="form-check-label" for="gridRadios5">
                  2
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios5" value="3">
                <label class="form-check-label" for="gridRadios5">
                  3
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios5" value="4">
                <label class="form-check-label" for="gridRadio5">
                  4
                </label>
                </div>

            
                <div class ="col-md-1">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios5" value="5">
                <label class="form-check-label" for="gridRadios5">
                  5
                </label>
                </div>

            </div>
            </form>
            </div>

            <div class="container-button mt-4">
            <input type ="button"  class="btn btn-primary" onclick ="responder()" value ="Finalizar" >
            </div>
            `
    }
  });
});

const responder = () => {
  let respuesta1 = -1;
  let respuesta2 = -1;
  let respuesta3 = -1;
  let respuesta4 = -1;
  let respuesta5 = -1;

  for (let i = 0; i < 5; i++) {
    if (document.querySelectorAll("#gridRadios1")[i].checked) {
      respuesta1 = i + 1;
    }
    if (document.querySelectorAll("#gridRadios2")[i].checked) {
      respuesta2 = i + 1;
    }
    if (document.querySelectorAll("#gridRadios3")[i].checked) {
      respuesta3 = i + 1;
    }
    if (document.querySelectorAll("#gridRadios4")[i].checked) {
      respuesta4 = i + 1;
    }
    if (document.querySelectorAll("#gridRadios5")[i].checked) {
      respuesta5 = i + 1;
    }

  }

  if (respuesta1 == -1 || respuesta2 == -1 || respuesta3 == -1 || respuesta4 == -1 ||
    respuesta5 == -1) {

    Swal.fire({
      title: 'Informacion incompleta',
      text: "Debe llenar todos los campos",
      icon: 'warning',

    })
  } else {
    const uidUser = localStorage.getItem('IdUser')
    if (uidUser != null) {
      const uidEmpresa = localStorage.getItem('IdEmpresa')
      let validar = false;
      db.collection("respuestas").onSnapshot((querySnapshot) => {
        let id = 0
        querySnapshot.forEach((doc) => {
          if (doc.data().uidEmpleado == uidUser) {
            validar = true;
          }

        });

        if (!validar) {

          //Actualiza la informacion del empleado
          db.collection("empleados").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().uidEmpleado == uidUser) {
                db.collection("empleados").doc(doc.id).update({
                  name: doc.data().name,
                  url: doc.data().url,
                  direccion: doc.data().direccion,
                  contraseña: doc.data().contraseña,
                  uidEmpresa: doc.data().uidEmpresa,
                  uidEmpleado: doc.data().uidEmpleado,
                  tipo: doc.data().tipo,
                  estado: doc.data().estado,
                  respondio: "true"
                }).then(() => {

                })
              }

            });

          });
          //Guarda las respuestas del empleado
          const data = arrayRespuestas(respuesta1, respuesta2, respuesta3, respuesta4, respuesta5, uidEmpresa, uidUser);
          db.collection("respuestas").add(data)
            .then(function (docRef) {
              Swal.fire({

                icon: 'success',
                title: 'Respuestas registradas',
                showConfirmButton: false,
                timer: 1500

              })

            })
            .catch(function (error) {
              console.error("Error adding document: ", error);
            });
        } else {
          Swal.fire({
            title: 'Ya respondio la encuesta',
            text: "Encuesta respondida con anterioridad",
            icon: 'warning',

          })
        }

      });
    } else {
      Swal.fire({
        title: 'Error',
        text: "Debe Ser empleado para llenar un formulario",
        icon: 'warning',

      })
    }
  }
}

const arrayRespuestas = (respuesta1, respuesta2, respuesta3, respuesta4, respuesta5, uid, uidUser) => {
  const data = {
    respuesta1: respuesta1,
    respuesta2: respuesta2,
    respuesta3: respuesta3,
    respuesta4: respuesta4,
    respuesta5: respuesta5,
    uidEmpresa: uid,
    uidEmpleado: uidUser
  }
  return data;
}

const activar = (doc) => {
  console.log("Activar")
  db.collection("empleados").doc(doc.id).update({
    name: doc.data().name,
    url: doc.data().url,
    direccion: doc.data().direccion,
    contraseña: doc.data().contraseña,
    empresa: doc.data().empresa,
    tipo: doc.data().tipo,
    estado: 'activo'
  }).then(() => {

  })

}
