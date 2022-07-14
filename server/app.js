const express = require('express');
const app = express();
const port = 3000;
var nodemailer = require('nodemailer');
var cors = require('cors')
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

app.use(cors())
const bodyParser = require('body-parser');

app.use(bodyParser.json());

var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: 'prueba.uptcdis@gmail.com',
      pass: 'qqemjqbrvxnufhun'
    }
  });

  var connection = mysql.createConnection({
    host     : 'mysql-mintic.alwaysdata.net',
    user     : 'mintic_prueba',
    password : 'Medalla987',
    database : 'mintic_prod'
  });

connection.connect();

app.get('/Proyects', (req, res) => {
  proyect = connection.query('SELECT ID_PRUECTOS , C.nombre as nombre_usuario , apellido ,  PR.nombre as nombre_producto , telefono , correo  , estado FROM PROYECTOS P , CLIENTES C , PRODUCTOS PR WHERE  P.ID_CLIENTE = C.ID_CLIENTE AND P.ID_PRODUCTO = PR.ID_PRODUCTO', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

app.get('/User', (req, res) => {
  connection.query('SELECT * FROM USUARIOS', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  }
  );
});

app.get('/ProyectsHistory', (req, res) => {
  proyect = connection.query('SELECT ID_HISTORIAL , nombre as nombre_usuario , ID_PRUECTOS ,  FECHA , estado_inicial , estado_final  FROM HISTORIAL H , USUARIOS U WHERE  H.ID_USUARIO = U.ID_USUARIO', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

app.post('/Contact', (req, res) => {
  console.log(req.body);
  connection.query('INSERT INTO CLIENTES (NOMBRE , APELLIDO , TELEFONO , CORREO ) VALUES '+ 
  '("'+ req.body.name + '" , "'+req.body.lastName + '" , '+req.body.phone + ' , "'+req.body.email+'" )', function (error, results) {
  });
  connection.query('INSERT INTO PROYECTOS (ID_CLIENTE , ID_PRODUCTO , ESTADO) VALUES ((SELECT MAX(ID_CLIENTE) FROM CLIENTES ) , '+ req.body.type + ' , "En espera" )', function (error, results) {
  console.log(error);
  console.log(results);
  });
});

app.post('/Contact/Notification', (req, res) => {
  connection.query('INSERT INTO NOTIFICATIONS (NOTE , id_usuario ,TYPE) SELECT "'+req.body.message+'" , id_usuario  , "Project" FROM USUARIOS WHERE ROL = "Administrador" OR ROL = "Usuario"', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
    }
    );
});


app.post('/Proyects/Notification', (req, res) => {
  connection.query('INSERT INTO NOTIFICATIONS (NOTE , id_usuario ,TYPE) SELECT "'+req.body.message+'" , id_usuario  , "Project" FROM USUARIOS WHERE ROL = "Administrador"', function (error, results, fields) {
    if (error) throw error;
    res.send(results);
    }
    );
});


app.get('/Material', (req, res) => {
  proyect = connection.query('SELECT * FROM PROYECTO_MATERIALES', function (error, results, fields) {
  console.log(results);
    if (error) throw error;
    res.send(results);
  });
});

app.put('/Proyects', (req, res) => {
  console.log(req.body);
  connection.query('INSERT INTO HISTORIAL (ID_USUARIO , ID_PRUECTOS , FECHA , estado_inicial , estado_final) VALUES ( (SELECT ID_USUARIO FROM USUARIOS WHERE CORREO = "'+req.body.id+'"),'+req.body.idProyecto+', (SELECT now()) , "'+ req.body.stateB +'" ,"'+req.body.state+'" )');
  connection.query('UPDATE PROYECTOS SET ESTADO = "'+req.body.state+'" WHERE ID_PRUECTOS = '+req.body.idProyecto, function (error, results, fields) {
    console.log(results);
  var mailOptions ={
  from: 'prueba.uptcdis@gmail.com',
  to: req.body.email,
  subject: 'Actualizacion de estado',
  text: 'Estimado ' + req.body.name + ' Su proyecto realizado por producciones páramo acaba de cambiar al estado: '
  + req.body.state + ' \r ' + ' \r ' + 'Notas: '+req.body.note
};
transporter.sendMail(mailOptions, function(error, info){
if (error) {
  res.send({message: 'Hay un error en el envio de correo' } , 400)
  console.log(error);
} else {
  res.send({message: 'Correo enviado exitosamente' } , 200);
  console.log('Email sent: ' + info.response);
}
});

    if (error) throw error;
    res.send(results);
  });
});

app.put('/Proyects/edit', (req, res) => {
  connection.query('UPDATE CLIENTES SET NOMBRE = "'
  +req.body.name+'" , APELLIDO = "'+req.body.lastName+'" , TELEFONO = '
  +req.body.phone+' , CORREO = "'+req.body.email+'" WHERE ID_CLIENTE = (SELECT ID_CLIENTE FROM PROYECTOS WHERE ID_PRUECTOS = '+req.body.id+')');
  connection.query('UPDATE PROYECTOS SET ID_PRODUCTO = (SELECT ID_PRODUCTO FROM PRODUCTOS WHERE NOMBRE = "'+req.body.type+'") WHERE ID_PRUECTOS = '+req.body.id);
  console.log(req.body);
});

app.post('/Login', (req, res) => {

 connection.query('SELECT CONTRASENA , ROL FROM USUARIOS WHERE CORREO = "'+req.body.email+'" AND STATE IS NOT NULL' , function (error, results, fields) {

  if(results.length == 0){
    res.send({message: "El usuario no se encuentra registrado o no está activado" , status: 200} , 400);
  } else {
  if(bcrypt.compareSync(req.body.password, results[0].CONTRASENA)){
    var token = jwt.sign({ email: req.body.email }, 'vaca', { expiresIn: '1h' });
    res.send({message: "Login correcto" , status: 200 , token : token ,rol:results[0].ROL , email:req.body.email } , 200);
  }else{
    res.send({message: "Contraseña incorrecta" , status: 200}, 400);
  }
    }
 }
 );
 
});

app.post('/Register', (req, res) => {
var randomstring = Math.random().toString(36).slice(-8);
bcrypt.genSalt(10, function (err, Salt) {
  bcrypt.hash(randomstring, Salt, function (err, hash) {
    createUser(req , hash , res)
  })
})
let link = "http://" + req.headers.host + "/api/confirm/" + jwt.sign({email : req.body.email }, 'vaca' , { expiresIn: '1d' });
var mailOptions ={
  from: 'prueba.uptcdis@gmail.com',
  to: req.body.email,
  subject: 'Creacion de cuenta',
  text: 'Estimado ' + req.body.name + ' Su cuenta de producciones paramo fue creada con exito, su contraseña es: ' + randomstring
  + ' Por el momento su cuenta se cuentra inactiva, para activarla por favor ingrese al siguiente enlace: ' + link 
};
transporter.sendMail(mailOptions, function(error, info){
if (error) {
  res.send({message: 'Hay un error en el envio de correo' } , 400)
  console.log(error);
} else {
  res.send({message: 'Correo enviado exitosamente' } , 200);
  console.log('Email sent: ' + info.response);
}
});

});

app.get('/api/confirm/:token', (req, res) => {
  const verify= jwt.verify(req.params.token, 'vaca');
  if(!verify) return res.status(400).send({message: 'Token invalido'});
    connection.query('UPDATE USUARIOS SET STATE = "A" WHERE CORREO = "'+verify.email+'"');
    res.send({message: 'Cuenta activada'});
});


app.post('/api/user/edit', (req, res) => {
  console.log(req.body);
  if(req.body.password != ''){
    bcrypt.genSalt(10, function (err, Salt) {
      bcrypt.hash(req.body.password, Salt, function (err, hash) {
        connection.query('UPDATE USUARIOS SET CONTRASENA = "'+hash+'" WHERE CORREO = "'+req.body.email+'"');
      })
    })
  }
  connection.query('UPDATE USUARIOS SET NOMBRE = "'+req.body.name+'" WHERE CORREO = "'+req.body.email+'"');
});

app.put('/user/adm', (req, res) => {
  console.log(req.body);
  connection.query('UPDATE USUARIOS SET ROL = "'+req.body.rol+'" WHERE CORREO = "'+req.body.id.CORREO+'"');
  connection.query('UPDATE USUARIOS SET CORREO = "'+req.body.email+'" WHERE ID_USUARIO = '+req.body.id.ID_USUARIO+'');
  connection.query('UPDATE USUARIOS SET NOMBRE = "'+req.body.name+'" WHERE ID_USUARIO = '+req.body.id.ID_USUARIO+'');
 });


app.get('/Notification:id', (req, res) => {
  console.log(req.params.id);
  connection.query('SELECT * FROM NOTIFICATIONS WHERE id_usuario = (SELECT ID_USUARIO FROM USUARIOS WHERE CORREO = SUBSTRING("'+req.params.id+'",2))', 
  function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  }
  );
});

app.post('/Notification/update', (req, res) => {
  console.log(req.body.id);
  connection.query('DELETE FROM NOTIFICATIONS WHERE ID = '+req.body.id+'', 
  function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


function createUser(req , hash, res){
  
  connection.query('INSERT INTO USUARIOS (NOMBRE , CORREO , CONTRASENA , ROL) VALUES ('+
  '"'+req.body.name+'" , "'+req.body.email+'" , "'+hash+'", "'+req.body.rol+'" )', function (error, results, fields) {
    if (error) throw res.send("El usuario correo ya se encuentra registrado" , 500);
    res.send(results);
  }
  );

}