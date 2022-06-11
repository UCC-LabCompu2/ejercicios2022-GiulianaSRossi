/**
 * Conversion de unidades, de metros, pulgadas, pies y yardas.
 * @method cambiarUnidades
 * @param {string} id - El id de los inputs de metros, pulgadas, pies o yardas.
 * @param {number} valor - El valor de los inputs de metros, pulgadas, pies o yardas.
 * @return
 */
function cambiarUnidades (id, valor) {
    var metro, pulgada, pie, yarda;

    if(valor.includes(",")){ /*include es para ver si el valor ingresado incluye , */
        valor=valor.replace(",", "."); /*aca se reemplaza la , por el .*/
    }

    if (isNaN(valor)){
        alert("Se ingreso un valor invalido "+id);
        metro = "";
        pulgada = "";
        pie = "";
        yarda = "";
    } else if (id=="metro"){
        metro = valor;
        pulgada = 39.3701*valor;
        pie = 3.28084*valor;
        yarda = 1.09361*valor;
    } else if (id == "pulgada"){
        pulgada = valor;
        metro = 0.0254*valor;
        pie = 0.0833333*valor;
        yarda = 0.0277778*valor;
    } else if (id=="yarda"){
        yarda = valor;
        metro = 0.9144*valor;
        pulgada = 36*valor;
        pie = 3*valor;
    } else if (id=="pie"){
        pie = valor;
        metro = 0.3048*valor;
        pulgada = 12*valor;
        yarda = 0.333333*valor;
    }
    document.lasUnidades.unid_metro.value=Math.round(metro*100)/100; /*Math.round() es para redondear*/
    document.lasUnidades.unid_pulgada.value=Math.round(pulgada*100)/100; /*  *100)/100 es para que tome 2 decimales*/
    document.lasUnidades.unid_pie.value=Math.round(pie*100)/100;
    document.lasUnidades.unid_yarda.value=Math.round(yarda*100)/100;
}

function convertirGR(id){
    var grad, rad;
    if (id=="grados"){
        grad=document.getElementById("grados".value); /*obtiene el valor que se ingresa en el campo y se lo asigna a grado */
        rad=(grad*Math.PI)/180;
    }else if(id=="radianes"){
        rad=document.getElementById("radianes".value);
        grad=(rad*180)/Math.PI;
    }
    grad=document.getElementById("grados".value);
    rad=document.getElementById("radianes".value);
}

function mostrar_ocultar(valorMO){
    if(valorMO=="val_mostrar"){
        document.getElementById("divMO").style.display='block';
    }else if(valorMO=="val_ocultar"){
        document.getElementById("divMO").style.display='none';
    }
}

function calcularSuma(){
    var num1, num2;
    num1=Number(document.getElementById("sum_num1")[0].value); /*diferenciar un elemento de otro se necesita indicar el indice. si hay un solo elemento se pone 0*/
    num2=Number(document.getElementById("sum_num2")[0].value);
    document.getElementsByName("sum_total")[0].innerHTML=num1+num2; /*innerHTML sirve para recuperar el contenido actual de un contenedor o insertar nuevo contenido en ese contenedor*/
}

function calcularResta(){
    var num1, num2;
    num1=Number(document.getElementById("res_num1")[0].value);
    num2=document.getElementById("res_num2")[0].value;
    document.getElementsByName("res_total")[0].innerHTML=num1-Number(num2);
}

function calcularMult(){
    var num1, num2;
    num1=document.getElementById("mul_num1")[0].value;
    num2=document.getElementById("mul_num2")[0].value;
    document.getElementsByName("mul_total")[0].innerHTML=Number(num1)*Number(num2);
}

function calcularDiv(){
    var num1, num2;
    num1=document.getElementById("div_num1")[0].value;
    num2=document.getElementById("div_num2")[0].value;
    document.getElementsByName("div_total")[0].innerHTML=Number(num1)/Number(num2);
}

function cargarWeb(){
    var cant, unidad, urlComp;

    cant=document.getElementById("distancia").value;
    unidad=document.getElementsByName("unidades")[0].value;
    urlComp="segundaWeb.html#" + cant + "#" + unidad;
    window.open(urlComp);
}

function cargarResultado(){
    var urlComp, can, un;

    urlComp=window.location.href.split("/")[5];
    can=urlComp.split("#")[1];
    un=urlComp.split("#")[2];
    document.getElementById("dist").value=can+" "+un;
    /* console.log(urlComp);*/
}

function guardarLocalStorage(){
    let distancia, unidad;
    distancia=document.getElementById('distancia').value;
    unidad=document.getElementsByName('unidades')[0].value;
    localStorage.setItem("distanciaLS", distancia);
    localStorage.setItem("unidadesLS", unidad);
    window.open('2_web.html');
}

function cargarLocalStorage(){
    let cant, un;
    cant=localStorage.getItem("distanciaLS");
    un=localStorage.getItem("unidadesLS");

    document.getElementById("dist").value=cant+" "+un;
}


function dibujarCirCuad(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var xMax = canvas.width;

    var yMax = canvas.height; /*usar la esquina inferior, saber el alto maximo*/
    var margen = 5;
    ctx.fillStyle ="#333899";
    ctx.fillRect(x=0+margen, y=yMax-40-margen, width=40, height=40);

    ctx.arc(x=xMax/2, y=yMax/2, radius=20, startAngle=0, endAngle=2*Math.PI);
    ctx.stroke(); /*dibujar el borde del circulo*/
    ctx.fillStyle ="#ac176a";
    ctx.fill(); /*pintar el circulo*/
}


var bandera; /*bandera global*/
function dibujar(event){
    var canvas = document.getElementById("canvasAdibujar");
    var ctx = canvas.getContext("2d");

    /*posicion del mouse*/
    var posX = event.clientX;
    var posY = event.clientY;
    console.log(posX, posY);

    canvas.onmousedown = function(){
        bandera = true;
    }
    canvas.onmouseup = function(){
        bandera = false;
    }

    if(bandera){
        /*dibujar lineas sin preocuparse si el mouse esta presionado o no*/
        ctx.fillRect(x=posX, y=posY, width=5, height=5);
        ctx.fill;
    }
}

function limpiarCanvas(){
    var canvas = document.getElementById("canvasAdibujar");
    var ctx = canvas.getContext("2d");

    canvas.width = canvas.width;
}

function dibujarCuadriculado(){
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    var anchoMax = canvas.width;
    var alturaMax = canvas.height;

    /*dibujar lineas horizontales*/
    ctx.beginPath();
    for(var i=0; i<alturaMax;){
        ctx.moveTo(0, i);
        ctx.lineTo(anchoMax, i);
        ctx.strokeStyle = "#b4b4fc";
        ctx.stroke();
        i=i+20;
    }
    ctx.closePath();

    /*dibujar lineas verticales*/
    ctx.beginPath();
    for(var i=0; i<anchoMax;){
        ctx.moveTo(i, 0);
        ctx.lineTo(i, alturaMax);
        ctx.strokeStyle = "#b4b4fc";
        ctx.stroke();
        i=i+20;
    }
    ctx.closePath();

    /* eje x*/
    ctx.beginPath();
    ctx.moveTo(0, alturaMax/2)
    ctx.lineTo(anchoMax, alturaMax/2)
    ctx.strokeStyle = "#f52a32";
    ctx.stroke();
    i=i+20;
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(anchoMax/2, 0)
    ctx.lineTo(anchoMax/2, alturaMax)
    ctx.strokeStyle = "#f52a32";
    ctx.stroke();
    i=i+20;
    ctx.closePath();
}

function dibujarImagen(posX, posY) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    console.log(posX, posY);
    var img = new Image();
    img.src = "images/auto.png";

    canvas.width = canvas.width /*limpiar el canvas*/

    img.onload = function (){
        ctx.drawImage(img, posX, posY);
    }

}
