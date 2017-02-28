(function(window,document,undefined){

	var STATUS_OK = 200;
    var request = new XMLHttpRequest();
	var tab = document.getElementById('tab');
	var tasks = new Array();
    var butt = document.getElementById('logg');
    butt.addEventListener('click', log);
    function log(){
        var req = new XMLHttpRequest();
        req.open('GET','/');
        req.send();
        req.addEventListener('load',function(){
            if(req.status === STATUS_OK){
                window.open(req.responseURL);
                console.log(req);
            }
        })
    }

	request.addEventListener('load', function(){
        if(request.status === STATUS_OK){
            tasks = JSON.parse(request.responseText);
            addToTable();
        }
    });

    var user = sessionStorage.getItem('user');
    document.getElementById("heading").innerHTML="Hello, Mr. "+user;
    request.open('GET', '/products');
    request.send();	

    function addToTable(){
        for(var i=tab.rows.length-1;i>0;i--)
            tab.deleteRow(i);

        for(var i=0;i<tasks.length;i++){
            var tr = document.createElement('tr');
            tr.setAttribute("height", 70);
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');
            var td7 = document.createElement('td');
            var td6 = document.createElement('input');
            var td5 = document.createElement('button');
            var td8 = document.createElement('td');
            td6.setAttribute("placeholder", "Enter Quantity...");

            td1.textContent = tasks[i].name;
            tr.appendChild(td1);

            td2.textContent = tasks[i].desc;
            tr.appendChild(td2);

            td3.textContent = tasks[i].price;
            tr.appendChild(td3);

            td4.textContent = tasks[i].avail;
            tr.appendChild(td4);

            td6.setAttribute("type","number");
            td6.setAttribute("inputId",i);
            td7.appendChild(td6);
            tr.appendChild(td7);
            
            td5.textContent = "Add to cart";
            td5.setAttribute("id",i);
            td5.addEventListener("click",cart);

            td8.appendChild(td5);
            tr.appendChild(td8);

            tab.appendChild(tr);
        }
    }

    var ss = localStorage.getItem('cart');
    console.log(ss);

    function cart(){
        var cart_array = JSON.parse(localStorage.getItem('cart')) || [];
    	var id = this.getAttribute("id");
    	var bought = this.parentNode.previousSibling.firstChild.value;
        var cartLen = cart_array.length;
    	
        cart_array.push({
                    uname : user,
                    name : tasks[id].name,
                    desc : tasks[id].desc,
                    bought : bought,
                    price : tasks[id].price,
                    booked : 0
                });
        localStorage.setItem('cart',JSON.stringify(cart_array));
    }

    document.getElementById("goToCart").addEventListener("click",function(event){
    	
    	var req = new XMLHttpRequest();
    	req.open('GET','/cart.html');
        req.send();
        req.addEventListener('load',function(){
            if(req.status === STATUS_OK){
                window.open(req.responseURL);
                console.log(req);
            }
        })
    })
})(this, this.document);