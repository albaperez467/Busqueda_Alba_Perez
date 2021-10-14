window.onload = function(){

    //FUNCIÓN PARA EMPEZAR LA BUSQUEDA
    function searchInText( palabra, html ) {

        //EXPRESIÓN PARA BUSCAR LA PALABRA
        var caracter = new RegExp(palabra.replace(/[\[\]\(\)\{\}\.\-\?\*\+]/, "\\$&"), "gi");
        var paginacaracter = /<\/?(?:a|b|br|em|font|img|p|span|strong)[^>]*?\/?>/g;

        //AÑADIMOS LAS VARIABLES NECESARIAS
        var array;
        var paginaarray;
        var longitud = 0;
        var suma = 0;
        var posicion = 28 + palabra.length;

        while ((array = caracter.exec(html)) != null) {

            paginaarray = paginacaracter.exec(html);
     
            //COMPROBAMOS SI LA BÚSQUEDA COINCIDE CON LA ETIQUETA HTML
            if(paginaarray != null && paginaarray.index < array.index && paginaarray.index + paginaarray[0].length > array.index + palabra.length){

                caracter.lastIndex = paginaarray.index + paginaarray[0].length;

                continue;

            }

            longitud = array.index + palabra.length;

            //Cuando encuentre la palabra buscada recoga esa palabra con un <span class="encontrado"> y podemos poner las etiquetas que necesitemos para que aparezca en un estilo.
            html = html.slice(0, array.index) + "<span class='encontrado'><strong>" + html.slice(array.index, longitud) + "</strong></span>" + html.slice(longitud, html.length);

            caracter.lastIndex += posicion;

            if(paginaarray != null) paginacaracter.lastIndex = caracter.lastIndex;
            
            suma++;

        }

        return {total: suma, html: html};

    }

    // EVENTO CUANDO PRESIONAMOS LE BOTÓN BUSCAR
    document.getElementById("boton").addEventListener("click", function(){

        var buscar= document.getElementById("buscar").value;

        if(buscar.length == 0) return;

        var contenido = searchInText( buscar, document.getElementById("contenido").innerHTML );
        
        document.getElementById("resultado").innerHTML = (contenido.total > 0) ? "Veces encontradas: " + contenido.total : "No se ha encontrado";
        
        if(contenido.total > 0) document.getElementById("contenido").innerHTML = contenido.html;

    });

}