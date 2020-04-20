

const sw = false;
const crearPreguntas = () => {
    const pregunta1 = document.getElementById("pregunta1").value;
    const pregunta2 = document.getElementById("pregunta2").value;
    const pregunta3 = document.getElementById("pregunta3").value;
    const pregunta4 = document.getElementById("pregunta4").value;
    const pregunta5 = document.getElementById("pregunta5").value;

    const valor1 = document.getElementById("valor1").value;
    const valor2 = document.getElementById("valor2").value;
    const valor3 = document.getElementById("valor3").value;
    const valor4 = document.getElementById("valor4").value;
    const valor5 = document.getElementById("valor5").value;
    const db = firebase.firestore();
    

    if (pregunta1.length == 0 || pregunta2.length == 0 || pregunta3.length == 0 || pregunta4.length == 0 ||
        pregunta5.length == 0 || valor1.length == 0 || valor2.length == 0 || valor3.length == 0 || valor4.length == 0
        || valor5.length == 0) {

        Swal.fire({
            title: 'Informacion incompleta',
            text: "Debe llenar todos los campos",
            icon: 'warning',

        })
    } else {
        const uid = localStorage.getItem('IdEmpresa')
        const data = array(pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, 
            valor1, valor2, valor3, valor4, valor5, uid);
        let verificar = false;

        console.log(uid);
        db.collection("Preguntas").onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {     
                console.log(doc.data().uidEmpresa);
                if(uid == doc.data().uidEmpresa) {                                       
                    verificar = true;
                    console.log(verificar);
                    localStorage.setItem('A', 2);                    
                }
             });
        });
        
        var cat = localStorage.getItem('A')
        console.log(cat);
        if(cat == 2){           

         Swal.fire({
          icon: 'error',
          title: 'Ya se han registrado preguntas',
          text: 'No puede ingresar al sistema',
      })


        }else{
            db.collection("Preguntas").add(data)
            .then(function (docRef) {
                 Swal.fire({
                   icon: 'success',
                   title: 'Preguntas registradas satisfactoriamente',
                   showConfirmButton: false,
                   timer: 1500
       })

   })
   .catch(function (error) {
       console.error("Error adding document: ", error);
   });
            

        }

        

    }
}

const array = (pregunta1, pregunta2, pregunta3, pregunta4, pregunta5, 
    valor1, valor2, valor3, valor4, valor5, uid) => {
    const data = {
        pregunta1: pregunta1,
        pregunta2:pregunta2,
        pregunta3: pregunta3,
        pregunta4: pregunta4,
        pregunta5: pregunta5,
        valor1: valor1,
        valor2: valor2,
        valor3: valor3,
        valor4: valor4,
        valor5: valor5,
        uidEmpresa: uid
    }
    return data;
}




