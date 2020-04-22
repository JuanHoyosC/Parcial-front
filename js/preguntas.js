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
  const uidUser = localStorage.getItem('IdUser')
  querySnapshot.forEach((doc) => {

    const uidempre = doc.data().uidEmpresa;
    db.collection("empleados").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (uidempre == doc.data().uidEmpresa && doc.data().respondio == "true" && Id == doc.data().uidEmpresa && doc.data().uidEmpleado == uidUser) {
          db.collection("Preguntas").onSnapshot((querySnapshot) => {
            const Id = localStorage.getItem('IdEmpresa');
            querySnapshot.forEach((doc) => {
              if (doc.data().uidEmpresa == Id) {
                document.getElementById("pregunta11").innerText = "¿" + doc.data().pregunta1 + "?";
                document.getElementById("pregunta22").innerText = "¿" + doc.data().pregunta2 + "?";
                document.getElementById("pregunta33").innerText = "¿" + doc.data().pregunta3 + "?";
                document.getElementById("pregunta44").innerText = "¿" + doc.data().pregunta4 + "?";
                document.getElementById("pregunta55").innerText = "¿" + doc.data().pregunta5 + "?";
              }
            })
          });


          console.log("Respondio", doc.data().name);
          db.collection("respuestas").onSnapshot((querySnapshot) => {
            const Id = doc.data().uidEmpleado
            querySnapshot.forEach((doc) => {
              if (doc.data().uidEmpleado == Id) {
                document.getElementById("respuesta1").innerText = doc.data().respuesta1;
                document.getElementById("respuesta2").innerText = doc.data().respuesta2;
                document.getElementById("respuesta3").innerText = doc.data().respuesta3;
                document.getElementById("respuesta4").innerText = doc.data().respuesta4;
                document.getElementById("respuesta5").innerText = doc.data().respuesta5;




                google.charts.load('current', { 'packages': ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                  var data = google.visualization.arrayToDataTable([
                    ['Year', 'Sales'],
                    ['Resultado 1', doc.data().respuesta1],
                    ['Resultado 2', doc.data().respuesta2],
                    ['Resultado 3', doc.data().respuesta3],
                    ['Resultado 4', doc.data().respuesta4],
                    ['Resultado 5', doc.data().respuesta5]
                  ]);

                  var options = {
                    title: 'Respuestas',
                    curveType: 'function',
                    legend: { position: 'bottom' }
                  };

                  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

                  chart.draw(data, options);
                }






              }







            })

          });



          preguntas.innerHTML += `  <div class="col">
                <span id ="pregunta11"></span>
                <span id="respuesta1" class ="text-success"></span>
                <p></p>
                <span id ="pregunta22"></span>
                <span id="respuesta2" class ="text-success"></span>
                <p></p>
                <span id ="pregunta33"></span>
                <span id="respuesta3" class ="text-success"></span>
                <p></p>
                <span id ="pregunta44"></span>
                <span id="respuesta4" class ="text-success"></span>
                <p></p>
                <span id ="pregunta55"></span>
                <span id="respuesta5" class ="text-success"></span>
                <p></p>
     
              </div>
               <div id="curve_chart" style="width: 500px; height: 300px"></div>
              `





        } else {
          if (Uidempre == doc.data().uidEmpresa && doc.data().respondio == "false" && Id == doc.data().uidEmpresa && doc.data().uidEmpleado == uidUser) {
            console.log("NO Respondio", doc.data().name);


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




          }



        }

      })
    });


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

