var http = require('http');
var url = require('url');
var fs = require('fs');

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
        callback(val);
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

http.createServer(function(request,response){
    var pathname = url.parse(request.url).pathname;

    if(request.method === "GET"){
        if(pathname==="/"){
            app.get("/",function(request,response){
                readAndServe('login.html','text',response);
            })
            

        }else if(pathname==="/index.html"){

            readAndServe("index.html",'text',response);

        }else if(pathname==="/register.html"){

            readAndServe("register.html","text",response);

        }else if(pathname==="/products.html"){

            readAndServe("products.html","text",response);

        }else if(pathname==="/cart.html"){

            readAndServe("cart.html","text",response);

        }else if(pathname==="/js/index.js" || pathname==="/js/login.js" || pathname==="/js/register.js" || pathname==="/js/products.js" || pathname==="/js/cart.js"){
            
            readAndServe('.'+pathname,'text/javascript',response);
        
        }else if(pathname==="/booked"){
            
            readPathFile("booked",function(booked){
                response.writeHead(200, {'Content-type': 'application/json'});
                response.write(JSON.stringify(booked));
                response.end();
            })
                
        }else if(pathname==="/products"){
        
            readPathFile("products",function(tasks){
                response.writeHead(200, {'Content-type': 'application/json'});
                response.write(JSON.stringify(tasks));
                response.end();
            })
        
        }else if(pathname==="/users"){
        
            readPathFile("users",function(users){
                response.writeHead(200, {'Content-type': 'application/json'});
                response.write(JSON.stringify(users));
                response.end();
            })
        
        }else{
        
            response.end();
        
        }
    
    }else if(request.method === "POST"){
        if(pathname==="/products"){
            readJSONBody(request,function(val){
                writePathFile("products",val,function(){
                    response.end();
                });
            });
        }else if(pathname==="/users"){
            readJSONBody(request,function(val){
                writePathFile("users",val,function(){
                    response.end();
                });
            });
        }else if(pathname==="/booked"){
            readJSONBody(request,function(val){
                writePathFile("booked",val,function(){
                    response.end();
                });
            });
        }else{
            response.end();
        }
    }else{
        response.end();
    }
}).listen(8000,'127.0.0.1');

console.log('Running on 127.0.0.1:8000');