
  

if(localStorage.getItem('IdEmpresa') == null){
    window.location = "../../index.html";
}
var cont = 0;

 
document.getElementById("img").src = localStorage.getItem('Url');
document.getElementById("nombre-empresa").innerHTML = localStorage.getItem('Nombre');
document.getElementById("imgen").src = localStorage.getItem('Url');
document.getElementById("nombre-empres").innerHTML = "Nombre empresa: " + localStorage.getItem('Nombre');
document.getElementById("mail").innerHTML = "Email: " + localStorage.getItem('email');
document.getElementById("tel").innerHTML = "Telefono: " + localStorage.getItem('Telefono');
document.getElementById("tipo").innerHTML = "Documento: " + localStorage.getItem('doc');
var b = "";
db.collection("empleados").onSnapshot((querySnapshot) => {
    const uidEmpresa = localStorage.getItem('IdEmpresa');
    var a = document.getElementById("lista");    
    querySnapshot.forEach((doc) => {
        if (uidEmpresa == doc.data().uidEmpresa) {
            cont = cont +1;
        }        
    });  

    document.getElementById("numero").innerHTML = "Numero de operadores: " + cont;
    
});



