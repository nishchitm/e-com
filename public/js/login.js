(function(window, document, undefined){
    
    var STATUS_OK = 200;
    var login = document.getElementById("login_btn");
    var reg = document.getElementById("reg_btn");
    var users = new Array();
    var request = new XMLHttpRequest();

    request.addEventListener('load', function(){
        if(request.status === STATUS_OK)
            users = JSON.parse(request.responseText);
    });

    request.open('GET', '/users');
    request.send();

    login.addEventListener("click",loginUser);

    function loginUser(){
        var req = new XMLHttpRequest();
        var a = document.getElementById("uname").value;
        var b = document.getElementById("pass").value;
        var flag=0;
        var i=0;
        var len = users.length;
        if(a==='admin' && b==='admin')
            flag=2;
        else{
            for(i=0;i<len;i++){
                flag=0;
                if(a===users[i].uname){
                    if(b===users[i].pass){
                        flag=1;
                        break;
                    }
                    else
                        flag=0;
                }
            }
        }
        if(flag==1){
            req.open('GET','/products.html');
            req.send();
            req.addEventListener('load',function(){
                if(req.status === STATUS_OK){
                    sessionStorage.setItem('user',users[i].uname);
                    window.open(req.responseURL);
                }
            })
        }
        else if(flag==2){
            req.open('GET','/index.html');
            req.send();
            req.addEventListener('load',function(){
                if(req.status === STATUS_OK){
                    window.open(req.responseURL);
                    console.log(req);
                }
            })
        }
        else
            alert("Username or password don't match.");
    }
    reg.addEventListener("click",function(event){
        req = new XMLHttpRequest;
        req.open('GET','/register.html');
        req.send();
        req.addEventListener('load',function(){
            if(req.status === STATUS_OK){
                window.open(req.responseURL);
                console.log(req);
            }
        })
    })
})(this, this.document);