document.getElementById('agregarDatos').addEventListener('click', function () {

    var afiliado = document.getElementById("afiliado").value;
    var nroAfiliado = document.getElementById("nroAfiliado").value;
    var domicilio = document.getElementById("domicilio").value;
    var medico = document.getElementById("medico").value;


    document.getElementById("vista-medico").textContent = medico;


    document.getElementById("vista-afiliado").textContent = afiliado;
    document.getElementById("vista-nroAfiliado").textContent = nroAfiliado;
    document.getElementById("vista-domicilio").textContent = domicilio;



    let listaOpciones = document.getElementById("lista");
    opcionSeleccionada = listaOpciones.options[listaOpciones.selectedIndex].text;
    document.getElementById("vista-iva").innerHTML = opcionSeleccionada;


    var clientName = document.getElementById("nombre-cliente").value;
    var cuitCliente = document.getElementById("cuit-cliente").value;
    var observaciones = document.getElementById("Observaciones").value;


    document.getElementById("vista-nombre-cliente").textContent = clientName;
    document.getElementById("vista-cuit-cliente").textContent = cuitCliente;
    document.getElementById("vista-observaciones").textContent = observaciones;


});

let contadorTablas = 1;


function agregarHoja() {


    let todoPrepOriginal = document.getElementById("todoPrep");
    let todoPrepDuplicado = todoPrepOriginal.cloneNode(true);
    todoPrepDuplicado.id = 'todoPrep' + contadorTablas; // Cambiar el id del div duplicado

    let contenedor = document.getElementById('todo');
    contenedor.appendChild(todoPrepDuplicado); // Agregar el div duplicado al contenedor

    // Obtener la tabla dentro de 'todoPrepDuplicado'
    let tabla = todoPrepDuplicado.getElementsByTagName('table')[0];

    // Cambiar el id de la tabla
    tabla.id = 'mostrarDatos' + contadorTablas;

    while (tabla.rows.length > 1) { // Empezamos desde la segunda fila (índice 1)
        tabla.deleteRow(1);
    }

    contadorTablas++; // Incrementar el contador de tablas
}




let contador = 0;

function agregarItems() {
    contador++;

    if (contador < 6) {
        agregar1();
    } else if (contador == 6) {
        agregarHoja();
    } else if (contador > 6 && contador < 12) {
        agregar2();
    }

    // Mostrar alerta si se ha alcanzado el límite de tablas
    if (contador > 12) {
        alert('No se pueden agregar más tablas.');
    }

}

document.getElementById('agregarItems').addEventListener('click', agregarItems);


function agregar1() {
    let descripcion = document.getElementById('descripcion').value;
    let cantidad = document.getElementById('cantidad').value;
    let precioUnitario = document.getElementById('precioUnitario').value;
    var subtotal = cantidad * precioUnitario;

    let fila = document.createElement('tr');
    fila.innerHTML = `
    <tbody>
            <td><p>${descripcion}</p></td>
            <td><p>${cantidad}</p></td>
            <td><p>${precioUnitario}</p></td>
            <td><p>${subtotal}</p></td>
    </tbody>
    <button onclick="eliminar(this)" class="btnel"></button>
    `;

    document.getElementById('mostrarDatos').appendChild(fila);


}

function agregar2() {
    let descripcion = document.getElementById('descripcion').value;
    let cantidad = document.getElementById('cantidad').value;
    let precioUnitario = document.getElementById('precioUnitario').value;
    var subtotal = cantidad * precioUnitario;

    let fila = document.createElement('tr');
    fila.innerHTML = `
    <tbody>
            <td><p>${descripcion}</p></td>
            <td><p>${cantidad}</p></td>
            <td><p>${precioUnitario}</p></td>
            <td><p>${subtotal}</p></td>
    </tbody>
    <button onclick="eliminar(this)" class="btnel"></button>
    `;

    document.getElementById('mostrarDatos1').appendChild(fila);


}




function eliminarCeldasDeTabla(tabla) {
    for (let i = tabla.rows.length - 1; i > 0; i--) {
        tabla.deleteRow(i);
    }
}

function eliminar(elemento) {
    elemento.parentElement.remove();
    contador--; // Restar 1 al contador de celdas
    calcularTotal();
}



document.getElementById('savePdf').addEventListener('click', function () {

    var incrementNumber = incrementAndSave();
    var numberDiv = document.getElementById('count');
    var countForPDF = localStorage.getItem('countForPDF');
    numberDiv.textContent = incrementNumber;

    var elements = window.document.querySelectorAll('#todoPrep, #todoPrep1');
    var opt = {
        margin: 0,
        filename: 'PRESUPUESTO IMPLANTECH ' + countForPDF + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    elements.forEach(function (element) {
        html2pdf().from(element).set(opt).save();
    });


});




function calcularTotal() {
    var table = document.getElementById('mostrarDatos');
    var sum = 0;

    for (var i = 1, row; row = table.rows[i]; i++) {
        var cuartaColumna = row.cells[3].textContent;

        if (cuartaColumna) {
            sum += parseFloat(cuartaColumna);
        }
    }

    // Calcula el porcentaje y agrégalo al total
    var valor = document.getElementById('porcIVA');
    var porcentaje = sum * valor.value / 100; // Ajusta este valor al porcentaje que deseas sumar
    var total = sum + porcentaje;
    document.getElementById('total').textContent = total.toFixed(2); // Convierte el total a una cadena con dos decimales
}

// Asegúrate de que este código se ejecute después de que la tabla esté creada
var table = document.getElementById('mostrarDatos');

table.addEventListener('DOMNodeInserted', function (event) {
    if (event.target.tagName === 'TR') {
        calcularTotal();
    }
});

table.addEventListener('DOMNodeRemoved', function (event) {
    if (event.target.tagName === 'TR') {
        calcularTotal();
    }
});



function incrementAndSave() {
    var count = localStorage.getItem('incrementNumber');
    if (!count) {
        count = '001-346';
    }

    var parts = count.split('-');
    var leftPart = parseInt(parts[0]);
    var rightPart = parseInt(parts[1]);

    if (rightPart < 999) {
        rightPart++;
    } else {
        rightPart = 0;
        leftPart++;
    }

    var newCount = ("000" + leftPart).slice(-3) + '-' + ("000" + rightPart).slice(-3);
    localStorage.setItem('incrementNumber', newCount);

    // Agregar esta línea para guardar el número de incremento actual en el archivo PDF
    localStorage.setItem('countForPDF', count);

    return newCount;
};

document.addEventListener('DOMContentLoaded', function () {
    let incrementNumber = localStorage.getItem('incrementNumber') || '001-346';
    let numberDiv = document.getElementById('count');
    numberDiv.textContent = incrementNumber;

    // eliminar el item 'incrementNumber' de localStorage
    //localStorage.removeItem('incrementNumber');

    // llamar a la función incrementAndSave para comenzar a contar desde 001-346
    //incrementAndSave();
});

document.getElementById('nuevo').addEventListener('click', function () {
    location.reload()

});
