
db.collection("empleados").onSnapshot((querySnapshot) => {
    const empresa = localStorage.getItem('Nombre');
    var a=document.getElementById("lista");
    while(a.hasChildNodes()){
       a.removeChild(a.firstChild);	
    }
    querySnapshot.forEach((doc) => {
        if (empresa == doc.data().empresa) {
            console.log("sss")
            // Se crean los div
            let info = document.createElement("div");
            let li = document.createElement("li");
            let imagen = document.createElement("div");
            let img = document.createElement("img");
            
            //Se crean las etiquetas p
            let pName = document.createElement("p");
            let pDIreccion = document.createElement("p");
            
            //Se añade el contenido a las etiquetas p
            pName.innerHTML = doc.data().name;
            pDIreccion.innerHTML = doc.data().direccion;
            img.src ='../imagenes/user.png';
            //Se añaden las clases a los elementos del dom
            pName.classList.add('info-empleado');
            pDIreccion.classList.add('info-empleado');
            info.classList.add('col-8', 'col-lg-9', 'col-info');
            imagen.classList.add('col-4', 'col-lg-3', 'col-img', 'pl-0');
            img.classList.add('img-empleado');


            li.classList.add('item-empleado', 'row',  'ml-0', 'mr-0');
            info.appendChild(pName);
            info.appendChild(pDIreccion);
            imagen.appendChild(img);
            li.appendChild(imagen);
            li.appendChild(info);
            // añade el elemento creado y su contenido al DOM 
            var currentDiv = document.getElementById("lista");
            currentDiv.appendChild(li);
        }
    });
});