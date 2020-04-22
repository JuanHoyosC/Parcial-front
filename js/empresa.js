grafica = document.getElementById("grafG");
  

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
    localStorage.setItem('cont',cont)
    document.getElementById("contt").innerHTML = cont;
    
});

var R1 = 0;
var R2 = 0;
var R3 = 0;
var R4= 0;
var R5 = 0;
var it = 0;
db.collection("respuestas").onSnapshot((querySnapshot) => {
    const uidEmpresa = localStorage.getItem('IdEmpresa');     
    querySnapshot.forEach((doc) => {
        if (uidEmpresa == doc.data().uidEmpresa) {

            R1 +=doc.data().respuesta1;
            R2 +=doc.data().respuesta2;
            R3 +=doc.data().respuesta3;
            R4 +=doc.data().respuesta4;
            R5 +=doc.data().respuesta5;
            it +=1;

            




        }        
    }); 
    console.log(R1);
    console.log(R2);
    console.log(R3);
    console.log(R4);
    console.log(R5);
    
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = google.visualization.arrayToDataTable([
        ['Preguntas', 'Hours per Day'],
        ['Pregunta 1: '+R1/it,     R1/it],
        ['Pregunta 2: '+R2/it,      R2/it],
        ['Pregunta 3: '+R3/it,  R3/it],
        ['Pregunta 4: '+R4/it, R4/it],
        ['Pregunta 5: '+R5/it,    R5/it]
      ]);

      var options = {
        title: 'Promedio de respuestas',
        width: 700,
        height: 400,    
        
      };

      var chart = new google.visualization.PieChart(document.getElementById('piechart'));

      chart.draw(data, options);
    }

            

                grafica.innerHTML += `<div id="piechart" style="width: 900px; height: 500px;"></div> ` 












    document.getElementById("numero").innerHTML = "Numero de operadores: " + cont;
    localStorage.setItem('cont',cont)
    document.getElementById("contt").innerHTML = cont;
    
});



