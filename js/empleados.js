
//Impiden que no entren a la pagina si no estan logueados
if (localStorage.getItem('IdEmpresa') == null) {
    window.location = "../../index.html";
}
var cont = 0;

document.getElementById("img").src = localStorage.getItem('Url');
document.getElementById("nombre-empresa").innerHTML = localStorage.getItem('Nombre');
db.collection("empleados").onSnapshot((querySnapshot) => {
    const uidEmpresa = localStorage.getItem('IdEmpresa');
    var a = document.getElementById("lista");
    while (a.hasChildNodes()) {
        a.removeChild(a.firstChild);
    }
    querySnapshot.forEach((doc) => {
        if (uidEmpresa == doc.data().uidEmpresa) {

            // Se crean los div
            let info = document.createElement("div");
            let li = document.createElement("li");
            let imagen = document.createElement("div");
            let img = document.createElement("img");
            let editar = document.createElement("button");
            let eliminar = document.createElement("button");
            let bloquear = document.createElement("button");
            let resultado = document.createElement("button");

            //Se crean las etiquetas p
            let pName = document.createElement("p");
            let pDIreccion = document.createElement("p");
            let pRespondio = document.createElement("p");

            pName.classList.add('info-empleado');
            pDIreccion.classList.add('info-empleado');
            //Se añade el contenido a las etiquetas p
            pName.innerHTML = doc.data().name;
            pDIreccion.innerHTML = doc.data().direccion;
            if (doc.data().respondio == "true") {
                pRespondio.innerHTML = "<span class='badge badge-success p-2'>Encuesta respondida</span>";
                pRespondio.classList.add('info-empleado', 'text-success');
                resultado.classList.add('btn', 'btn-success', 'ml-3');
                resultado.innerHTML = "Ver respuestas";
                resultado.setAttribute("data-toggle", "modal");
                resultado.setAttribute("data-target", "#exampleModalCenter4")
                resultado.onclick = function () {
                    db.collection("Preguntas").onSnapshot((querySnapshot) => {
                        const Id = localStorage.getItem('IdEmpresa');
                        querySnapshot.forEach((doc) => {
                            if(doc.data().uidEmpresa == Id){
                                document.getElementById("pregunta11").innerText = "¿" + doc.data().pregunta1 + "?";
                                document.getElementById("pregunta22").innerText = "¿" + doc.data().pregunta2 + "?";
                                document.getElementById("pregunta33").innerText = "¿" + doc.data().pregunta3 + "?";
                                document.getElementById("pregunta44").innerText = "¿" + doc.data().pregunta4 + "?";
                                document.getElementById("pregunta55").innerText = "¿" + doc.data().pregunta5 + "?";
                            }
                        })
                    });

                    db.collection("respuestas").onSnapshot((querySnapshot) => {
                        const Id = doc.data().uidEmpleado
                        querySnapshot.forEach((doc) => {
                            if(doc.data().uidEmpleado == Id){
                                document.getElementById("respuesta1").innerText = doc.data().respuesta1;
                                document.getElementById("respuesta2").innerText = doc.data().respuesta2;
                                document.getElementById("respuesta3").innerText = doc.data().respuesta3;
                                document.getElementById("respuesta4").innerText = doc.data().respuesta4;
                                document.getElementById("respuesta5").innerText = doc.data().respuesta5;
                            }
                        })
                    });
                }
            } else {
                pRespondio.innerHTML = "<span class='badge badge-danger p-2'>Aun no se responde la encuesta</span>";
                pRespondio.classList.add('info-empleado', 'text-danger');
            }

            img.src = doc.data().url;
            editar.innerHTML = "Editar";
            eliminar.innerHTML = "Eliminar";


            //Se añaden las clases a los elementos del dom


            info.classList.add('col-8', 'col-lg-9', 'col-info');
            imagen.classList.add('col-4', 'col-lg-3', 'col-img', 'pl-0');
            img.classList.add('img-empleado');
            editar.classList.add('btn', 'btn-warning', 'text-white');
            eliminar.classList.add('btn', 'btn-danger', 'ml-3', 'text-white');
            bloquear.classList.add('btn', 'btn-secondary', 'ml-3');

            //Funcion que se encarga de eliminar empleados
            eliminar.onclick = function () {
                db.collection("empleados").doc(doc.id).delete().then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario eliminado satisfactoriamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            };

            //Funcion que se encargara de editar los empleados
            li.classList.add('item-empleado', 'row', 'ml-0', 'mr-0');
            info.appendChild(pName);
            info.appendChild(pDIreccion);
            info.appendChild(pRespondio);
            imagen.appendChild(img);
            li.appendChild(imagen);
            li.appendChild(info);
            info.appendChild(editar)
            info.appendChild(eliminar);
            info.appendChild(bloquear);
            if (doc.data().respondio == "true") {
                info.appendChild(resultado);
            }

            //Funcion que se encarga de bloquear al empleado
            if (doc.data().estado == "activo") {
                bloquear.innerHTML = "Bloquear";
                bloquear.onclick = function () {
                    db.collection("empleados").doc(doc.id).update({
                        name: doc.data().name,
                        email: doc.data().email,
                        url: doc.data().url,
                        direccion: doc.data().direccion,
                        contraseña: doc.data().contraseña,
                        uidEmpresa: doc.data().uidEmpresa,
                        uidEmpleado: doc.data().uidEmpleado,
                        tipo: doc.data().tipo,
                        estado: "desactivado",
                        respondio: doc.data().respondio
                    }).then(() => {
                        bloquear.innerHTML = "Desbloquear";
                    })
                };

            } else {
                bloquear.innerHTML = "Desbloquear";
                bloquear.onclick = function () {
                    db.collection("empleados").doc(doc.id).update({
                        name: doc.data().name,
                        url: doc.data().url,
                        direccion: doc.data().direccion,
                        contraseña: doc.data().contraseña,
                        uidEmpresa: doc.data().uidEmpresa,
                        uidEmpleado: doc.data().uidEmpleado,
                        tipo: doc.data().tipo,
                        estado: "activo",
                        respondio: doc.data().respondio
                    }).then(() => {
                        bloquear.innerHTML = "Bloquear";
                    })
                }
            }
            // añade el elemento creado y su contenido al DOM 
            var currentDiv = document.getElementById("lista");
            currentDiv.appendChild(li);

        }

    });

});

