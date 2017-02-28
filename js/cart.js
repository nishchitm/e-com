(function(window,document,undefined){

    var STATUS_OK = 200;

    var user = sessionStorage.getItem('user');
    console.log(user);
    document.getElementById("heading").innerHTML="Welcome "+user;
	
    var tab = document.getElementById('tab');
	
    var cart_array = JSON.parse(localStorage.getItem('cart')) || [];

    var cartLen = cart_array.length;

    for(var i=tab.rows.length-1;i>0;i--){
        tab.deleteRow(i);
    }

    var total = 0;

    for(var i=0;i<cartLen;i++){

        if(cart_array[i].uname===user && cart_array[i].booked==0){
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');
            var td5 = document.createElement('td');

            td1.textContent = cart_array[i].name;
            tr.appendChild(td1);

            td2.textContent = cart_array[i].desc;
            tr.appendChild(td2);

            td3.textContent = cart_array[i].price;
            tr.appendChild(td3);

            td4.textContent = cart_array[i].bought;
            tr.appendChild(td4);

            td5.textContent = parseInt(td4.textContent)*parseInt(td3.textContent);
            tr.appendChild(td5);
            total += parseInt(td5.textContent);

            tab.appendChild(tr);
        }
    }

    var tr = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');

    td1.setAttribute('colspan',4);
    tr.appendChild(td1);

    td2.textContent = total;
    tr.appendChild(td2);

    tab.appendChild(tr);

    var request = new XMLHttpRequest();

    var booked = new Array();

    
    request.open('GET','/booked');
    request.send();

    request.addEventListener('load',function(){
        if(request.status === STATUS_OK){
            booked = JSON.parse(request.response);
            console.log(request);
            console.log("Pehle",booked);

            document.getElementById("book").addEventListener("click",function(event){

                console.log(booked);

                request = new XMLHttpRequest();

                for(var i=0;i<cart_array.length;i++){
                    if(cart_array[i].uname===user && cart_array[i].booked==0){
                        booked.push({
                            uname : cart_array[i].uname,
                            name : cart_array[i].name,
                            desc : cart_array[i].desc,
                            price : cart_array[i].price,
                            bought : cart_array[i].bought
                        })
                        cart_array[i].booked = 1;
                    }
                }
                //booked[booked.length] = cart_array;
                request.open('POST','/booked');

                request.send(JSON.stringify(booked));

                for(var i=tab.rows.length-1;i>0;i--){
                    tab.deleteRow(i);
                }
                
            })

        }
    })

    console.log("jaskjans",booked);

            

})(this, this.document);