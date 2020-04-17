const nom = localStorage.getItem("Nombre");
var op = false;
if(nom == null){
    op = false;

}
if(nom != null){
   op = true;
    
}
console.log(op)

if(op==true){



}

firebase.initializeApp({
    apiKey: "AIzaSyBIWplHf1UW47MdtAxRq9sSm_OdxcQiKF4",
    authDomain: "parcial-db.firebaseapp.com",
    projectId: "parcial-db"
});

const db = firebase.firestore();

const obtenerDatos = () => {
    const contraseña = document.getElementById("passwordEmpleado").value;
    const name = document.getElementById("nameEmpleado").value;
    const direccion = document.getElementById("direccion").value;


    if (direccion.length == 0 || contraseña.length == 0 || name.length == 0) {
        

        Swal.fire({
            title: 'Informacion incompleta',
            text: "Debe llenar todos los campos",
            icon: 'warning',
            
          })
    } else {

        const empresa = localStorage.getItem("Nombre");
        const data = arrayJson(name, contraseña, direccion, empresa, "empleado", "activo");
        db.collection("empleados").add(data)
            .then(function (docRef) {
                Swal.fire({
                
                    icon: 'success',
                    title: 'Registrado satisfactoriamente',
                    showConfirmButton: false,
                    timer: 1500
                    
                  })
                  //Limpia los inputs
                  document.getElementById("passwordEmpleado").value = "";
                  document.getElementById("nameEmpleado").value = "";
                  document.getElementById("direccion").value = "";

                  
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    }
}

const arrayJson = (name, contraseña, direccion, empresa, tipo, estado) => {
    const data = {
        name: name,
        direccion: direccion,
        contraseña: contraseña,
        empresa: empresa,
        tipo: tipo,
        estad: estado
        
    }
    return data;
}




 