# AlMundo

Guia de instalación

Pre requisitos  
1. Para iniciar la instalación se utiliza npm por lo cual es necesario tener nodeJs en su equipo. De no tenerlo puede descargarlo desde la siguiete ruta https://nodejs.org/en/download/
2. el gestor de paquetes bower necesita git para funcionar, éste puede ser descargado en https://git-scm.com/downloads

Backend:

1. Ingresar a la carpeta 'backend' utilizando una terminal de consola
2. Instalar paquetes de node:  'npm install'
3. Subir servidor: 'node app.js'

Frontend

1. Ingresar a la carpeta 'frontend' utilizando una terminal de consola
2. Para el manejo de archivos se utiliza la herramienta gulp por lo que es necesario instalarla ejecutando: 'npm install gulp -g'
3. Instalar bower:  'npm install bower -g'
4. Instalar paquetes de node: 'npm install'
5. Instala componentes desde bower: 'bower install'
6. Correr aplicacion web: 'gulp'

REST API:

/filter 
permite hacer una búsqueda paginada entre el listado de hoteles. Parámetros recibidos: name, stars, page (página de búsqueda),order (campo a ordenar)  e isDesc.

/create
Inserta un hotel de db. Parámetros recibidos: id, name, stars, price, amenities (array de string)

/update
Actualiza un hotel en db utilizando su id. Parámetros recibidos: id, name, stars, price, amenities (array de string).

/delete
Elimina un hotel en db. Parámetro recibido: id.



Tecnologías usadas:

Backend:

-SailsJs: Framework para NodeJs que provee una estructura robusta para montar la aplicación rest permitiendo la división de capas y configurar la aplicación para entornos de desarrollo y producción. El desarrollo creado se encuentra en 'backend/api'.

-NeDb: Gestor de base de datos que utiliza el sistema de archivos para almacenar la información. Al considerar la cantidad reducida de datos a usar se determinó que es la mejor opción debido a facilita la instalación de la db y WaterLine (ORM de SailsJs) lo tiene incluido dentro de sus adaptadores.

Front:

-AngularJs

-AngularJS Material: Framework para AngularJs que provee componentes con las especificaciones de google sobre Material Design. Entre sus características se encuentra un sistema de grillas responsivas que utiliza flex de css para su funcionamiento.

-Bower

-Gulp: Herramienta de automatización. En el proyecto es utilizada para tener una versión  de ui separada entre desarrollo y producción; proveyendo métodos que permiten el copiado y minificado de archivos, inyección de dependencias al archivo index.html y crea un servidor para montar la aplicación.
