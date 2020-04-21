
//Impiden que no entren a la pagina si no estan logueados
if(localStorage.getItem('IdEmpresa') == null){
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

            //Se crean las etiquetas p
            let pName = document.createElement("p");
            let pDIreccion = document.createElement("p");

            //Se añade el contenido a las etiquetas p
            pName.innerHTML = doc.data().name;
            pDIreccion.innerHTML = doc.data().direccion;
            img.src = doc.data().url;
            editar.innerHTML = "Editar";
            eliminar.innerHTML = "Eliminar";

            //Se añaden las clases a los elementos del dom
            pName.classList.add('info-empleado');
            pDIreccion.classList.add('info-empleado');
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
            imagen.appendChild(img);
            li.appendChild(imagen);
            li.appendChild(info);
            info.appendChild(editar)
            info.appendChild(eliminar);
            info.appendChild(bloquear);

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
                        estado: "desactivado"
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
                        estado: "activo"
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

const desactivar = (doc) => {
    console.log("Desactivar")
    db.collection("empleados").doc(doc.id).update({
        name: doc.data().name,
        url: doc.data().url,
        direccion: doc.data().direccion,
        contraseña: doc.data().contraseña,
        empresa: doc.data().empresa,
        tipo: doc.data().tipo,
        estado: "desactivado"
    }).then(() => {

    })
}