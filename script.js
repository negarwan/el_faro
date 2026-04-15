// reloj en vivo
// se usa setInterval para ejecutar la función cada 1 segundo
// ==========================================

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

// se llama una vez al cargar para que no haya retraso de 1 segundo al inicio
actualizarReloj();

// setInterval repite la función cada 1000 ms (1 segundo) para mostrar segundos en vivo
setInterval(actualizarReloj, 1000);



// articulos dinamicos
// los artículos se guardan en arreglos en lugar de estar escritos en el HTML
// ==========================================

// arreglo con los textos de los artículos de la sección general
let articulosGeneral = [
    {
        titulo: 'Protestas por alza en combustibles',
        categoria: 'Nacional',
        texto: 'Cientos de estudiantes secundarios y universitarios se movilizaron este mediodía por el eje Alameda, manifestando su rechazo ante la histórica alza en el precio de los combustibles, que hoy registró un aumento de hasta $580 en el diésel. La jornada estuvo marcada por el cierre preventivo de estaciones de Metro como La Moneda y Universidad Católica, además de incidentes aislados cerca de la Casa Central de la Universidad de Chile. Los manifestantes exigen al Gobierno medidas de mitigación inmediatas para frenar el impacto en el costo del transporte público y de la canasta básica familiar.'
    },
    {
        titulo: 'Avances en IA en Chile',
        categoria: 'Tecnología',
        texto: 'En una alianza estratégica entre el Ministerio del Trabajo y gigantes tecnológicos, se anunciaron hoy más de 5.000 nuevas becas de especialización en Inteligencia Artificial Generativa y Ciberseguridad. El programa, canalizado a través de Sence y Talento Digital, busca reconvertir la fuerza laboral nacional hacia áreas de alta demanda como el "Prompt Engineering" y el análisis de datos masivos. Con esta iniciativa, Chile pretende consolidarse como el principal hub de innovación digital de Sudamérica, ofreciendo herramientas gratuitas para que jóvenes programadores puedan competir en el mercado global.'
    },
    {
        titulo: 'Festival de Cine de Santiago inicia hoy',
        categoria: 'Cultura',
        texto: 'Con una glamorosa alfombra roja y la presencia de destacados directores internacionales, se dio inicio a una nueva edición del festival de cine más importante del país. Durante los próximos siete días, diversas salas de la capital exhibirán más de 80 producciones, incluyendo estrenos nacionales exclusivos y cortometrajes premiados en el extranjero. Los organizadores destacaron que este año el foco estará puesto en el cine de autor y la inclusión de nuevas tecnologías en la narrativa audiovisual, transformando a Santiago en el epicentro de la reflexión y el arte cinematográfico continental.'
    }
];

// arreglo con los artículos de la sección deportes
let articulosDeporte = [
    {
        titulo: 'Massú y González ganan en Atenas',
        categoria: 'Deportes',
        texto: 'En una hazaña sin precedentes para el deporte nacional, la dupla dorada de Nicolás Massú y Fernando González logró conquistar el primer lugar en el podio olímpico. Tras un partido agotador de casi cuatro horas contra la pareja alemana, los tenistas chilenos grabaron sus nombres en la historia mundial del tenis.'
    },
    {
        titulo: 'El renacer del Estadio Nacional tras Santiago 2023',
        categoria: 'Deportes',
        texto: 'El principal recinto deportivo del país se ha consolidado como el epicentro del alto rendimiento en Sudamérica. Con las nuevas pistas de atletismo y centros acuáticos de nivel mundial, los atletas chilenos cuentan ahora con infraestructura de punta para preparar sus próximas clasificaciones olímpicas, fomentando el surgimiento de nuevas promesas en disciplinas como la gimnasia y la natación.'
    },
    {
        titulo: 'La Roja inicia entrenamientos en Juan Pinto Durán',
        categoria: 'Deportes',
        texto: 'La selección chilena de fútbol ha comenzado su proceso de preparación para los próximos desafíos internacionales. Con una mezcla de figuras históricas y jóvenes talentos del torneo local, el cuerpo técnico busca consolidar un esquema ofensivo que permita recuperar el protagonismo en Sudamérica, despertando nuevamente la ilusión de la hinchada que espera ver al equipo en lo más alto.'
    }
];

// arreglo con los artículos de la sección negocios
let articulosNegocios = [
    {
        titulo: 'Bolsa chilena se desploma',
        categoria: 'Negocios',
        texto: 'El índice IPSA, principal indicador de la Bolsa de Santiago, cerró la jornada con una caída del 3,2%, arrastrado por el retroceso en los precios internacionales del cobre y la debilidad del sector retail. Expertos financieros sugieren que esta volatilidad responde a las crecientes tensiones comerciales globales, lo que ha generado una ola de ventas masivas por parte de inversionistas extranjeros que buscan refugio en activos menos riesgosos ante la incertidumbre del mercado.'
    },
    {
        titulo: 'El auge de las Fintech en el mercado chileno',
        categoria: 'Negocios',
        texto: 'Las aplicaciones financieras y los bancos digitales están revolucionando la forma en que los chilenos manejan su dinero. Durante el último semestre, se registró un aumento del 40% en el uso de billeteras electrónicas, lo que ha impulsado a las startups locales a expandirse hacia otros mercados de Latinoamérica, compitiendo directamente con la banca tradicional y fomentando la inclusión financiera en el país.'
    },
    {
        titulo: 'Estrategia Nacional del Litio impulsa nuevos acuerdos',
        categoria: 'Negocios',
        texto: 'Chile se posiciona como líder mundial en la transición energética tras firmar nuevos convenios de explotación y procesamiento de litio con gigantes tecnológicos de Asia y Europa. Estos acuerdos no solo prometen aumentar las arcas fiscales, sino que también exigen la creación de centros de investigación en territorio nacional, fomentando la transferencia tecnológica y la creación de empleos calificados en el norte del país.'
    }
];



// RENDERIZAR ARTÍCULOS Y CONTADOR
// usa un ciclo for para recorrer el arreglo y crear elementos HTML dinámicamente
// igual que el ejemplo del documento con document.createElement y appendChild


function renderizarArticulos(arreglo, idTabla, idContador) {
    // se obtiene la tabla y el contador desde el DOM usando getElementById
    const tabla = document.getElementById(idTabla);
    const contador = document.getElementById(idContador);

    // se limpia la tabla antes de volver a renderizar
    // esto evita que se dupliquen artículos al agregar uno nuevo
    tabla.innerHTML = '';

    // ciclo for que recorre el arreglo de artículos
    // basado en sección 1.1.1 For del documento S4
    for (let i = 0; i < arreglo.length; i++) {

        // se crea un elemento tr (fila) y un td (celda) por cada artículo
        // igual que el ejemplo del documento con document.createElement('li')
        const tr = document.createElement('tr');
        const td = document.createElement('td');

        // se inserta el contenido del artículo dentro del td
        td.innerHTML = '<h3>' + arreglo[i].titulo + '</h3>' +
                       '<p><strong>Categoría:</strong> ' + arreglo[i].categoria + '</p>' +
                       '<p>' + arreglo[i].texto + '</p>';

        // se agrega el td dentro del tr y el tr dentro de la tabla
        // igual que listado.appendChild(item) del ejemplo del documento
        tr.appendChild(td);
        tabla.appendChild(tr);
    }

    // se actualiza el contador con la cantidad actual de artículos
    // usando textContent sobre el párrafo del contador, igual que en sección 1.1.3 Objetos
    contador.textContent = 'Artículos en esta sección: ' + arreglo.length;
}

// se llaman las tres funciones al cargar la página para renderizar los artículos iniciales
renderizarArticulos(articulosGeneral, 'tabla-general', 'contador-general');
renderizarArticulos(articulosDeporte, 'tabla-deporte', 'contador-deporte');
renderizarArticulos(articulosNegocios, 'tabla-negocios', 'contador-negocios');



// FUNCIÓN PARA AGREGAR NUEVOS ARTICULOS

// valida que los campos no estén vacíos antes de agregar, igual que el
// ejemplo de validateForm() del documento


function agregarArticulo() {
    // se leen los valores de los campos del formulario
    const titulo = document.getElementById('nuevo-titulo').value;
    const texto = document.getElementById('nuevo-texto').value;
    const seccion = document.getElementById('nueva-seccion').value;

    // validación: si algún campo está vacío se muestra alerta y se detiene la función
    // basado en el ejemplo de validación de formularios sección 1.1.7 del documento S4
    if (titulo === '' || texto === '') {
        alert('Por favor completa el título y la descripción.');
        return false;
    }

    // se crea el objeto del nuevo artículo con los datos ingresados
    
    const nuevoArticulo = {
        titulo: titulo,
        categoria: seccion,
        texto: texto
    };

    // condicional if/else if para determinar en qué arreglo y tabla agregar el artículo
   
    if (seccion === 'general') {
        // push agrega el nuevo artículo al final del arreglo
        
        articulosGeneral.push(nuevoArticulo);
        renderizarArticulos(articulosGeneral, 'tabla-general', 'contador-general');

    } else if (seccion === 'deporte') {
        articulosDeporte.push(nuevoArticulo);
        renderizarArticulos(articulosDeporte, 'tabla-deporte', 'contador-deporte');

    } else if (seccion === 'negocios') {
        articulosNegocios.push(nuevoArticulo);
        renderizarArticulos(articulosNegocios, 'tabla-negocios', 'contador-negocios');
    }

    // se limpian los campos del formulario después de publicar
    document.getElementById('nuevo-titulo').value = '';
    document.getElementById('nuevo-texto').value = '';
}



// formularo de contacto

// valida campos vacíos igual que el ejemplo validateForm() del documento


function enviarContacto() {
    // se leen los valores del formulario de contacto
    const nombre = document.getElementById('contacto-nombre').value;
    const mensaje = document.getElementById('contacto-mensaje').value;

    // validación: si algún campo está vacío se muestra alerta y se detiene la función
    if (nombre === '' || mensaje === '') {
        alert('Por favor completa tu nombre y mensaje.');
        return false;
    }

    // se muestra mensaje de confirmación en el párrafo de respuesta
    // usando textContent sobre el elemento

    document.getElementById('contacto-respuesta').textContent =
        '¡Gracias, ' + nombre + '! Tu mensaje fue enviado correctamente.';

    // se limpian los campos del formulario después de enviar
    document.getElementById('contacto-nombre').value = '';
    document.getElementById('contacto-mensaje').value = '';
}