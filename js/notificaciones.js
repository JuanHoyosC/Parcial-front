db.collection("empleados").onSnapshot((querySnapshot) => {
    const uidEmpresa = localStorage.getItem('IdEmpresa');
    var a = document.getElementById("notificacion");
    while (a.hasChildNodes()) {
        a.removeChild(a.firstChild);
    }
    querySnapshot.forEach((doc) => {
        if (uidEmpresa == doc.data().uidEmpresa) {
            if(doc.data().respondio == "true"){
                let p = document.createElement("p");
                p.innerHTML += `
                <i class="fas fa-check"></i> ${doc.data().name} respondio la encuesta
                `
                let hr = document.createElement("hr");
                p.classList.add('text-success');
                var currentDiv = document.getElementById("notificacion");
                currentDiv.appendChild(p);
                currentDiv.appendChild(hr);
            }
        }

    });

});