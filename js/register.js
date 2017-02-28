(function(window, document, undefined){

    var STATUS_OK = 200;
    
    var a = document.getElementById("name");
    var b = document.getElementById("uname");
    var c = document.getElementById("num");
    var d = document.getElementById("pass");

    var submit = document.getElementById("reg_btn");
    var log = document.getElementById("login_btn");
    var users = new Array();

    var request = new XMLHttpRequest();

    request.addEventListener('load', function() 
    {
        if (request.status === STATUS_OK) {
            users = JSON.parse(request.responseText);
           console.log(STATUS_OK,":status");
           console.log("users:",users);
        }
    });

    request.open('GET', '/users');
    request.send();
    
    submit.addEventListener("click",add_users);

    function add_users(){
        var request = new XMLHttpRequest();
        
        var len = users.length;
        users.push({
                    name:a.value,
                    uname:b.value,
                    num:c.value,
                    pass:d.value
        });
        
        request.open('POST', '/users');
        request.send(JSON.stringify(users));
        console.log("Added");
        console.log(users)
        
        a.value = "";
        b.value = "";
        c.value = "";
        d.value = "";
    }


    log.addEventListener("click",function(event){
        req = new XMLHttpRequest;
        req.open('GET','/login.html');
        req.send();
        req.addEventListener('load',function(){
            if(req.status === STATUS_OK){
                window.open(req.responseURL);
                console.log(req);
            }
        })
    })
})(this, this.document);