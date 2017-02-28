(function(window, document, undefined){

    var STATUS_OK = 200;
    var a = document.getElementById("name");
    var b = document.getElementById("desc");
    var c = document.getElementById("price");
    var d = document.getElementById("avail");
    var he = document.getElementById("hehe");
    var ha = document.getElementById("haha");
    var wo = document.getElementById("wow");
    var lo = document.getElementById("log");
    var submit = document.getElementById("submit_btn");
    var tasks = new Array();
    var tab = document.getElementById('tab');
    var tab2 = document.getElementById('tab2');

    he.addEventListener('click', function(){
        document.getElementById("divi").style.display="none";
        document.getElementById("h").style.display="none";
        document.getElementById('first').style.display="block";
    })

    lo.addEventListener('click', log);
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
    
    submit.addEventListener("click",add_tasks);

    wo.addEventListener('click', function(){
        document.getElementById("divi").style.display="none";
        document.getElementById("first").style.display="none";
        document.getElementById("h").style.display="block";
        var request = new XMLHttpRequest();
        request.open('GET', '/products');
        request.send();
        request.addEventListener('load', function(){
            if (request.status === STATUS_OK){
                tasks = JSON.parse(request.responseText);   
                addToTable1();
            }
        });
    });

    function add_tasks(){
        var request = new XMLHttpRequest();
        var len = tasks.length;
        tasks.push({
                    name:a.value,
                    desc:b.value,
                    price:c.value,
                    avail:d.value
                });
        
        request.open('POST', '/products');
        request.send(JSON.stringify(tasks));
        console.log("Added");
        console.log(tasks)
        
        a.value = "";
        b.value = "";
        c.value = "";
        d.value = "";
    }

    function addToTable1(){
        for(var i=tab.rows.length-1;i>0;i--)
            tab.deleteRow(i);

        for(var i=0;i<tasks.length;i++){
            var tr = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');

            td1.textContent = tasks[i].name;
            tr.appendChild(td1);

            td2.textContent = tasks[i].desc;
            tr.appendChild(td2);

            td3.textContent = tasks[i].price;
            tr.appendChild(td3);

            td4.textContent = tasks[i].avail;
            tr.appendChild(td4);

            tab.appendChild(tr);
        }
    }

    var booked = new Array();
    var total = 0;
    ha.addEventListener("click", function(){
        document.getElementById("first").style.display="none";
        document.getElementById("h").style.display="none";
        document.getElementById("divi").style.display="block";
        console.log("hlo");
        var req = new XMLHttpRequest();
        req.open('GET', '/booked');
        req.send();
        req.addEventListener('load', function(){
            if(req.status === STATUS_OK){
                booked = JSON.parse(req.responseText);
                addy();
            }
        });
    });

    function addy(){
        for(var i=tab2.rows.length-1;i>0;i--)
            tab.deleteRow(i);

        for(var i=0;i<booked.length;i++){
                    var tr = document.createElement('tr');
                    var td1 = document.createElement('td');
                    var td2 = document.createElement('td');
                    var td3 = document.createElement('td');
                    var td4 = document.createElement('td');
                    var td5 = document.createElement('td');
                    var td6 = document.createElement('td');

                    td1.textContent = booked[i].uname;
                    tr.appendChild(td1);

                    td2.textContent = booked[i].name;
                    tr.appendChild(td2);

                    td3.textContent = booked[i].desc;
                    tr.appendChild(td3);

                    td4.textContent = booked[i].price;
                    tr.appendChild(td4);

                    td5.textContent = booked[i].bought;
                    tr.appendChild(td5);

                    td6.textContent = parseInt(booked[i].price)*parseInt(booked[i].bought);
                    tr.appendChild(td6);

                    total += parseInt(td6.textContent);
                    
                    tab2.appendChild(tr);
        }
                
        var tr = document.createElement('tr');
        var td1 = document.createElement('td');
        var td2 = document.createElement('td');

        td1.setAttribute('colspan',5);
        td1.textContent="TOTAL";
        tr.appendChild(td1);

        td2.textContent = total;
        tr.appendChild(td2);

        tab2.appendChild(tr);
    }
})(this, this.document);