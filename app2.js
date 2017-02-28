var express = require('express');
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var app = express();


app.use(express.static(path.join(__dirname,'public')));
//app.set('views',path.join(__dirname,'views'));

function readAndServe(path, contentType, response){
    fs.readFile(path, function(error,data){
        if(error){
            throw error;
        }

        response.writeHead(200, {'Content-type': contentType});
        response.write(data);
        response.end();
    });
}

function readPathFile(path, callback){
    fs.readFile(path,function(error,contents){
        if (error) {
            throw error;
        }
        var val;
        if(contents.length === 0){
            val = [];
        }else{
            val = JSON.parse(contents);
        }
        callback(error,val);
    })
}

function writePathFile(path,val,callback){
    var valJSON = JSON.stringify(val);
    
    fs.writeFile(path,valJSON,function(error){
        if(error){
            throw error;
        }
        callback();
    });
}

function readJSONBody(request,callback){
    var body = '';
    request.on('data',function(chunk){
        body+=chunk;
    });
    request.on('end',function(){
        var data = JSON.parse(body);
        callback(data);
    });
}



app.get("/",function(request,response,next){
    readAndServe("login.html",'text',response);
});

app.get("/index.html",function(request,response,next){
    readAndServe("index.html",'text',response);
});

app.get("/register.html",function(request,response,next){
    readAndServe("register.html",'text',response);
});

app.get("/products.html",function(request,response,next){
    readAndServe("products.html",'text',response);
});

app.get("/cart.html",function(request,response,next){
    readAndServe("cart.html",'text',response);
});





app.get("/booked",function(request,response){
    readPathFile("booked",function(error,tasks) {
        if(error){
            response.status(500).send;
        }

        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
    });
});

app.get("/products",function(request,response){
    readPathFile("products",function(error,tasks) {
        if(error){
            response.status(500).send;
        }

        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
    });
});

app.get("/users",function(request,response){
    readPathFile("users",function(error,tasks) {
        if(error){
            response.status(500).send;
        }

        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
    });
});





app.post("/booked",function(request,response){
    readJSONBody(request,function(val){
        writePathFile("booked",val,function(){
            response.end();
        });
    });
});

app.post("/users",function(request,response){
    readJSONBody(request,function(val){
        writePathFile("users",val,function(){
            response.end();
        });
    });
});

app.post("/products",function(request,response){
    readJSONBody(request,function(val){
        writePathFile("products",val,function(){
            response.end();
        });
    });
});

http.createServer(app).listen(8000,'127.0.0.1');

console.log('Running on 127.0.0.1:8000');