let addtaskinput = document.getElementById("addtaskinput");
let addtaskbtn = document.getElementById("addtaskbtn");
const filterTask = document.querySelector(".filter-class");
const todoList = document.querySelector(".todo-list");
const input = document.querySelector("#addtaskinput");

input.addEventListener("keyup",function(event){
    if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("addtaskbtn").click();
    }
});
filterTask.addEventListener("click",displayFilteredTasks);
addtaskbtn.addEventListener("click", function(){
    addtaskinputval = addtaskinput.value;
    if(addtaskinputval.trim()!=0){
        let webtask = localStorage.getItem("localtask");
        if(webtask == null){
            taskObj = [];
        }
        else{
            
            taskObj = JSON.parse(webtask);
        }
        taskObj.push(addtaskinputval);
       
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        addtaskinput.value = '';
    }
     //window.alert("New Task Added : "+addtaskinputval);
    showtask();
});

// showtask
function showtask(){
    let webtask = localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
       
    }
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");
    taskObj.forEach((item, index) => {
        html += `<tr id="${index}">
                    <th scope="row">${index+1}</th>
                    <td id="name${index}">${item}<span/></td>
                    <td><button type="button" onclick="edittask(${index})" class="text-primary"><i class="fa fa-edit"></i>Edit</button></td>
                   
                    <td>
                        <button type="button" onclick="deleteitem(${index})"
                        class="text-danger"><i class="fa fa-trash"></i>Delete</button>
                    </td>
                    <td><button type="button" class="btn btn-success btn-sm" onclick="taskCompleted(${index})"><i class="fa fa-check"> Completed </button></td>
                </tr>`;
    });
    addedtasklist.innerHTML = html;
}

// edittask
function edittask(index){
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    addtaskinput.value = taskObj[index];
    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
    let completebtn = document.getElementById("completed");
    var name = taskObj[index];
    completebtn.addEventListener("click",function(){
                var ele = document.getElementById(name);
             /*   const item=index.target;
            if (item.classList[0]==="complete-btn"){
                const todo=item.parentElement;*/
                ele.classList.toggle("completed");
              });
 
}
function taskCompleted(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    var name = taskObj[index];
    var element = document.getElementById(index);
    
    element.classList.toggle("completed");
}

let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    let saveindex = document.getElementById("saveindex").value;
    taskObj[saveindex] = addtaskinput.value;
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    var ID = "name"+saveindex;
    document.getElementById(ID).innerHTML=addtaskinput.value;
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addtaskinput.value='';
    //showtask();
})
// deleteitem
function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
}



// deleteall
let deleteallbtn = document.getElementById("deleteallbtn");
deleteallbtn.addEventListener("click", function(){
    let savetaskbtn = document.getElementById("savetaskbtn");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
        taskObj = [];
    }
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();

})


// serachlist
let searchtextbox = document.getElementById("searchtextbox");
searchtextbox.addEventListener("input", function(){
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval, 'gi');
        if(searchedtext.match(re)){
            item.style.display="table-row";
        }
        else{
            item.style.display="none";
        }
    })
})
function displayFilteredTasks(event){
    const temp = todoList.childNodes;
    const todos = temp[0].childNodes;
    
    todos.forEach(function(todo){
       switch(event.target.value){
           case 'all' : todo.style.display="table-row";
               break;
               
           case 'completed' : if(todo.classList.contains("completed")){
               todo.style.display="table-row";
               
               }else{
                   todo.style.display="none";
               }
               break;
           case 'pending':
               if(!todo.classList.contains("completed")){
                   todo.style.display="table-row";
               }
               else{
                   todo.style.display="none";
               }
               break;
       } 
    });
}













