(function(window, document, undefined){

    var STATUS_OK = 200;

    var a = document.getElementById("name");
    var b = document.getElementById("desc");
    var c = document.getElementById("price");
    var d = document.getElementById("avail");

    var submit = document.getElementById("submit_btn");
    var tasks = new Array();
    var tab = document.getElementById('tab');
    var tab2 = document.getElementById('tab2');
    var request = new XMLHttpRequest();

    request.open('GET', '/products');
    request.send();

    request.addEventListener('load', function() 
    {
        if (request.status === STATUS_OK) {
            tasks = JSON.parse(request.responseText);
            
            addToTable1();
        }
    });

    
    
    submit.addEventListener("click",add_tasks);

    function add_tasks(){
        var request = new XMLHttpRequest();
        var len = tasks.length;
        tasks.push({
                    name:a.value,
                    desc:b.value,
                    price:c.value,
                    avail:d.value
                });
        
        request.open('POST', '/tasks');
        request.send(JSON.stringify(tasks));
        console.log("Added");
        console.log(tasks)
        
        a.value = "";
        b.value = "";
        c.value = "";
        d.value = "";

        addToTable1();
        
    }

    function addToTable1(){
        for(var i=tab.rows.length-1;i>0;i--){
            tab.deleteRow(i);
        }

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

    var req = new XMLHttpRequest();
    req.open('GET', '/booked');
    req.send();

    var booked = new Array();
    var total = 0;
    req.addEventListener('load', function() 
    {
        if (req.status === STATUS_OK) {
            booked = JSON.parse(req.responseText);
            
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
            tr.appendChild(td1);

            td2.textContent = total;
            tr.appendChild(td2);

            tab2.appendChild(tr);
        }
    });
})(this, this.document);