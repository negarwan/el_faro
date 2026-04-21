
// REQUERIMIENTO 1: RELOJ EN VIVO


function actualizarReloj() {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');

    // se extraen día, mes y año para mostrar la fecha
    const dia = ahora.getDate();
    const mes = ahora.toLocaleString('es-CL', { month: 'long' });
    const anio = ahora.getFullYear();

    document.getElementById('reloj').textContent =
        dia + ' de ' + mes + ' de ' + anio + ' — ' + horas + ':' + minutos + ':' + segundos;
}

actualizarReloj();
setInterval(actualizarReloj, 1000);



// REQUERIMIENTO 2: ARTÍCULOS DINÁMICOS


let articulosGeneral = [
    {
        titulo: 'Protestas por alza en combustibles',
        categoria: 'Nacional',
        texto: 'Cientos de estudiantes secundarios y universitarios se movilizaron este mediodía por el eje Alameda, manifestando su rechazo ante la histórica alza en el precio de los combustibles, que hoy registró un aumento de hasta $580 en el diésel.'
    },
    {
        titulo: 'Avances en IA en Chile',
        categoria: 'Tecnología',
        texto: 'En una alianza estratégica entre el Ministerio del Trabajo y gigantes tecnológicos, se anunciaron hoy más de 5.000 nuevas becas de especialización en Inteligencia Artificial Generativa y Ciberseguridad.'
    },
    {
        titulo: 'Festival de Cine de Santiago inicia hoy',
        categoria: 'Cultura',
        texto: 'Con una glamorosa alfombra roja y la presencia de destacados directores internacionales, se dio inicio a una nueva edición del festival de cine más importante del país.'
    }
];

let articulosDeporte = [
    {
        titulo: 'Massú y González ganan en Atenas',
        categoria: 'Deportes',
        texto: 'En una hazaña sin precedentes para el deporte nacional, la dupla dorada de Nicolás Massú y Fernando González logró conquistar el primer lugar en el podio olímpico.'
    },
    {
        titulo: 'El renacer del Estadio Nacional tras Santiago 2023',
        categoria: 'Deportes',
        texto: 'El principal recinto deportivo del país se ha consolidado como el epicentro del alto rendimiento en Sudamérica.'
    },
    {
        titulo: 'La Roja inicia entrenamientos en Juan Pinto Durán',
        categoria: 'Deportes',
        texto: 'La selección chilena de fútbol ha comenzado su proceso de preparación para los próximos desafíos internacionales.'
    }
];

let articulosNegocios = [
    {
        titulo: 'Bolsa chilena se desploma',
        categoria: 'Negocios',
        texto: 'El índice IPSA cerró la jornada con una caída del 3,2%, arrastrado por el retroceso en los precios internacionales del cobre y la debilidad del sector retail.'
    },
    {
        titulo: 'El auge de las Fintech en el mercado chileno',
        categoria: 'Negocios',
        texto: 'Las aplicaciones financieras y los bancos digitales están revolucionando la forma en que los chilenos manejan su dinero.'
    },
    {
        titulo: 'Estrategia Nacional del Litio impulsa nuevos acuerdos',
        categoria: 'Negocios',
        texto: 'Chile se posiciona como líder mundial en la transición energética tras firmar nuevos convenios de explotación y procesamiento de litio.'
    }
];



// REQUERIMIENTO: ARTÍCULO DESTACADO
// muestra el artículo más reciente de general en la tarjeta grande


function actualizarDestacado() {
    // toma el último artículo agregado al arreglo general
    const ultimo = articulosGeneral[articulosGeneral.length - 1];
    document.getElementById('destacado-titulo').textContent = ultimo.titulo;
    document.getElementById('destacado-categoria').textContent = 'Categoría: ' + ultimo.categoria;
    document.getElementById('destacado-texto').textContent = ultimo.texto;
}



// RENDERIZAR ARTÍCULOS Y CONTADOR
// ahora usa columnas Bulma en lugar de tablas para nueva estética


function renderizarArticulos(arreglo, idContenedor, idContador) {
    const contenedor = document.getElementById(idContenedor);
    const contador = document.getElementById(idContador);

    // limpia el contenedor antes de renderizar
    contenedor.innerHTML = '';

    // ciclo for que recorre el arreglo de artículos
    for (let i = 0; i < arreglo.length; i++) {

        // cada artículo va en una columna Bulma de tamaño mediano
        // Requerimiento: artículos más chicos en pantalla
        const columna = document.createElement('div');
        columna.className = 'column is-one-third';

        const tarjeta = document.createElement('div');
        tarjeta.className = 'faro-card-articulo';

        tarjeta.innerHTML = '<h3><strong>' + arreglo[i].titulo + '</strong></h3>' +
                            '<p><em>Categoría: ' + arreglo[i].categoria + '</em></p>' +
                            '<p>' + arreglo[i].texto + '</p>';

        columna.appendChild(tarjeta);
        contenedor.appendChild(columna);
    }

    // actualiza el contador con cantidad actual
    contador.textContent = 'Artículos en esta sección: ' + arreglo.length;
}

// renderiza todo al cargar la página
renderizarArticulos(articulosGeneral, 'tabla-general', 'contador-general');
renderizarArticulos(articulosDeporte, 'tabla-deporte', 'contador-deporte');
renderizarArticulos(articulosNegocios, 'tabla-negocios', 'contador-negocios');

// carga el artículo destacado al inicio
actualizarDestacado();



// REQUERIMIENTO 2: AGREGAR NUEVO ARTÍCULO


function agregarArticulo() {
    const titulo = document.getElementById('nuevo-titulo').value;
    const texto = document.getElementById('nuevo-texto').value;
    const seccion = document.getElementById('nueva-seccion').value;

    // validación de campos vacíos
    if (titulo === '' || texto === '') {
        alert('Por favor completa el título y la descripción.');
        return false;
    }

    const nuevoArticulo = {
        titulo: titulo,
        categoria: seccion,
        texto: texto
    };

    if (seccion === 'general') {
        articulosGeneral.push(nuevoArticulo);
        renderizarArticulos(articulosGeneral, 'tabla-general', 'contador-general');
        // si se agrega a general, actualiza el destacado
        actualizarDestacado();
    } else if (seccion === 'deporte') {
        articulosDeporte.push(nuevoArticulo);
        renderizarArticulos(articulosDeporte, 'tabla-deporte', 'contador-deporte');
    } else if (seccion === 'negocios') {
        articulosNegocios.push(nuevoArticulo);
        renderizarArticulos(articulosNegocios, 'tabla-negocios', 'contador-negocios');
    }

    document.getElementById('nuevo-titulo').value = '';
    document.getElementById('nuevo-texto').value = '';
}



// REQUERIMIENTO 3: FORMULARIO DE CONTACTO


function enviarContacto() {
    const nombre = document.getElementById('contacto-nombre').value;
    const mensaje = document.getElementById('contacto-mensaje').value;

    if (nombre === '' || mensaje === '') {
        alert('Por favor completa tu nombre y mensaje.');
        return false;
    }

    document.getElementById('contacto-respuesta').textContent =
        '¡Gracias, ' + nombre + '! Tu mensaje fue enviado correctamente.';

    document.getElementById('contacto-nombre').value = '';
    document.getElementById('contacto-mensaje').value = '';
}