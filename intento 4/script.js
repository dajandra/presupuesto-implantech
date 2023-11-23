document.getElementById('agregar').addEventListener('click', function () {
    var descripcion = document.getElementById('descripcion').value;
    var cantidad = document.getElementById('cantidad').value;
    var precioUnitario = document.getElementById('precioUnitario').value;
    var subtotal = cantidad * precioUnitario;

    var fila = document.createElement('tr');

    var celdaDescripcion = document.createElement('td');
    var celdaCantidad = document.createElement('td');
    var celdaPrecioUnitario = document.createElement('td');
    var celdaSubtotal = document.createElement('td');

    celdaDescripcion.textContent = descripcion;
    celdaCantidad.textContent = cantidad;
    celdaPrecioUnitario.textContent = "$" + precioUnitario;
    celdaSubtotal.textContent = "$" + subtotal;

    fila.appendChild(celdaDescripcion);
    fila.appendChild(celdaCantidad);
    fila.appendChild(celdaPrecioUnitario);
    fila.appendChild(celdaSubtotal);

    document.getElementById('tabla').getElementsByTagName('tbody')[0].appendChild(fila);

    var afiliado = document.getElementById("afiliado").value;
    var nroAfiliado = document.getElementById("nroAfiliado").value;
    var domicilio = document.getElementById("domicilio").value;
    

    document.getElementById("vista-afiliado").textContent = afiliado;
    document.getElementById("vista-nroAfiliado").textContent = nroAfiliado;
    document.getElementById("vista-domicilio").textContent = domicilio;



    let listaOpciones = document.getElementById("lista");
    opcionSeleccionada = listaOpciones.options[listaOpciones.selectedIndex].text;
    document.getElementById("vista-iva").innerHTML = opcionSeleccionada;

    
    var clientName = document.getElementById("nombre-cliente").value;
    var cuitCliente = document.getElementById("cuit-cliente").value;


    document.getElementById("vista-nombre-cliente").textContent = clientName;
    document.getElementById("vista-cuit-cliente").textContent = cuitCliente;


    document.getElementById('formulario').reset();


    document.getElementById('total').textContent = '$' + calcularTotal();

});


document.getElementById('eliminar').addEventListener('click', function () {
    var tabla = document.getElementById('tabla');
    var ultimaFila = tabla.rows.length - 1;

    if (ultimaFila > 0) {
        tabla.deleteRow(ultimaFila);
    } else {
        alert('No hay líneas para eliminar');
    }

    document.getElementById('total').textContent = '$' + calcularTotal();
});

function calcularTotal() {
    var tabla = document.getElementById('tabla');
    var filas = tabla.getElementsByTagName('tr');
    var total = 0;

    for (var i = 1; i < filas.length; i++) {
        var subtotal = parseFloat(filas[i].getElementsByTagName('td')[3].textContent.slice(1));
        total += subtotal;
    }

    return total;
}


document.getElementById('savePdf').addEventListener('click', function () {

    var element = document.getElementById('contentToConvert');
    let incrementNumber = incrementAndSave();
    var opt = {
        margin: 0,
        filename: 'PRESUPUESTO IMPLANTECH' + incrementNumber + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();


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
    return newCount;
};

document.addEventListener('DOMContentLoaded', function () {
    let incrementNumber = localStorage.getItem('incrementNumber') || '001-346';
    let numberDiv = document.getElementById('count');
    numberDiv.textContent = incrementNumber;

    // eliminar el item 'incrementNumber' de localStorage
    // localStorage.removeItem('incrementNumber');

    // llamar a la función incrementAndSave para comenzar a contar desde 001-346
    //incrementAndSave();
});


document.getElementById('nuevo').addEventListener('click', function () {
    location.reload()

});


window.onload = function () {
    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1;
    var anio = fecha.getFullYear();

    document.getElementById("fecha-actual").innerHTML = "FECHA: " + dia + "/" + mes + "/" + anio;
}