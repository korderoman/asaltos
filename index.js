const express = require('express');
const path = require('path');
const routes= require('./routes/routes');
const sassMiddleware= require('node-sass-middleware');
const cors= require('cors')

//* Aplicación
const app = express();
//* Configuración del motor de vistas
app.set("views",path.join(__dirname,"views"));
app.set('view engine', 'pug');
//* Configuración de Sass
app.use(sassMiddleware({
    src: path.join(__dirname,"scss"),
    dest: path.join(__dirname,"public","css"),
    debug:true,
    outputStyle: 'compressed',
    prefix:"/css"
}))
//*Configuración de archivos
app.use(express.static(path.join(__dirname,"public"),{etag:true,maxAge:'30 days',redirect:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//*CORS
app.use(cors());
//* Configuración de rutas
app.use(routes);

app.listen(process.env.PORT || 443, async () => {
    console.log(`Servidor iniciado en  ${process.env.PORT || 443}`);
});
