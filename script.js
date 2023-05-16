// Form Validation and redirecting to main page using call back function
function formValidate(callback){
    var email=document.getElementById("Email1");
    var password=document.getElementById("Pwd1");
    //var subbut=document.getElementById("submitButton");
    var username="admin";
    var pass=12345;
    if(username==email.value && pass==password.value){
        console.log("inside if");
        callback();
        }
    else{
        alert("Access denied! Username and Password are incorrect!!!");
        }
}
function toMainPage(){
    window.location.href='main.html';
}

// Retrieving information from API
function ajaxreq(){
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){

        if(xhttp.readyState==4 && xhttp.status==200){
            var data=JSON.parse(this.responseText);
            thead=document.getElementById("tableHead");
            thead.innerHTML=`<tr><th scope="col">Id</th><th scope="col">Title</th><th scope="col">Completed</th></tr>`;
            for (let i=0;i<data.length;i++) {
            var trow=document.createElement("tr");
            trow.innerHTML = `<td>${data[i].id}</td><td>${data[i].title}</td><td><input type="checkbox" ${data[i].completed ? "checked disabled" : ""} class="checkbox" onclick="promiseCheck()" ></td>`;
            document.getElementById("tableBody").appendChild(trow);
            }
            
        }
    }

    xhttp.open("GET","https://jsonplaceholder.typicode.com/todos",true);
    xhttp.send();
}

// function to check whether 5 checkboxes are checked
function checkIfFiveChecked(){
    const checkboxes = document.getElementsByClassName('checkbox');
    let checkedCount = 0;
    for(let i=0;i<checkboxes.length;i++){
        if (!checkboxes[i].disabled && checkboxes[i].checked) {
            checkedCount++;
        }
    }  
    return checkedCount === 5; 
}     

//Promise() to alert message when 5 TodoLists are completed
function promiseCheck(){
    let promise=new Promise((resolve)=>{
        if(checkIfFiveChecked()){
            resolve();
        }
    })
promise
.then(()=>{alert("Congrats. 5 Tasks have been successfully completed");})
}
 