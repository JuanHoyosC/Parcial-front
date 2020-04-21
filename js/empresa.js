if(localStorage.getItem('IdEmpresa') == null){
    window.location = "../../index.html";
}
var cont = 0;

 
document.getElementById("img").src = localStorage.getItem('Url');
document.getElementById("nombre-empresa").innerHTML = localStorage.getItem('Nombre');
document.getElementById("imgen").src = localStorage.getItem('Url');
document.getElementById("nombre-empres").innerHTML = "Nombre empresa: " + localStorage.getItem('Nombre');
db.collection("empleados").onSnapshot((querySnapshot) => {
    const uidEmpresa = localStorage.getItem('IdEmpresa');
    var a = document.getElementById("lista");
    
    querySnapshot.forEach((doc) => {
        if (uidEmpresa == doc.data().uidEmpresa) {
            cont = cont +1;
        }        
    });
    db.collection("users").onSnapshot((querySnapshot) => {
        const uidEmpresa = localStorage.getItem('IdEmpresa');               
        querySnapshot.forEach((doc) => {
            if (uidEmpresa == doc.data().uid) {
                document.getElementById("email").innerHTML = "Email: " + doc.data().email;
                              

            }      


        });
    
    
    });
    console.log(cont);
    document.getElementById("numero").innerHTML = "Numero de empleados: " + cont;

});