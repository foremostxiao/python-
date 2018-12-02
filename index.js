
//（1）获取事件源
var todolist = document.getElementById('todolist');
var donelist = document.getElementById('donelist');
var todoCount = document.getElementById('todocount');
var doneCount = document.getElementById('donecount');
var todoc =0;
var donec=0;

// 添加Todo的内容
function postAction() {
    // 获取事件源 input-->id=title
    var title = document.getElementById("title");

    if(title.value ===""){
        alert("内容不能为空！")
    }else{
        var li = document.createElement("li");
        // 向新建的对象插入内容
        //onchange 在元素值改变时触发。
        li.innerHTML ='<input type="checkbox" onchange="update();">' +
            '<input class="title" type="text" onchange="change();" onclick="edit();">' +
            '<a  href="javascript:remove();">clear</a>';
        if(todoc ===0){
            todolist.appendChild(li);
        }else{
            //将新添的内容添加到第一行
            todolist.insertBefore(li,todolist.children[0]);
        }

        var txtTitle = document.getElementsByClassName("title")[0];
        txtTitle.value = title.value;

        loop('todolist');
        todoc++;
        //添加todolist的行数
        todoCount.innerHTML = todoc;
        // 添加到todocount正在进行的计划后，把title对象设为空
        title.value = "";
    }
}

//<ol id=todolist>
//    <li>
//      <input type="checkbox" onchange="update();">
//      <input class="title" type="text" onchange="change();" onclick="edit();">
//      <a href="javascript:remove();">remove</a>
//    </li>
//</ol>

// 循环 每次添加不同的i值
function loop(str){
    var list = null;
    str ==='todolist' ? list = todolist :list =donelist;
    // 正在进行的todolist的子节点列表
    childs = list.childNodes;
    for(var i=0; i<childs.length;i++){
        childs[i].children[0].setAttribute('onchange','update("'+i+'","'+str+'")');
        childs[i].children[1].setAttribute('onclick','edit("'+i+'","'+str+'")');
        childs[i].children[1].setAttribute('onchange','change("'+i+'","'+str+'","'
            +childs[i].children[1].value+'")');
        childs[i].children[2].setAttribute('href','javascript:remove("'+i+'","'+str+'")');
    }
}

// update方法
function update(n,str){
    var list = null;
    str === 'todolist' ? list = todolist : list = donelist;

    var li = null;
    childs = list.childNodes;
    for(var i=0;i<childs.length;i++){
        if(i===Number(n)){
            li = childs[i];
        }
    }
    // 删除原有的，得到li 并刷新了原有的li
    remove(n,str);

    if(str==='todolist'){
        if(donec ===0){
            donelist.appendChild(li);
        }else {
            donelist.insertBefore(li,donelist.children[0]);
        }
        loop('donelist');
        donec++;
        doneCount.innerHTML = donec;
    }else if(str ==='donelist'){
        todolist.appendChild(li);
        loop('todolist');
        todoc++;
        todoCount.innerHTML = todoc;
    }
}

// edit方法编译title
function edit(n,str) {
    var list = null;
    str ==='todolist' ? list = todolist : list = donelist;
    childs = list.childNodes;
    for(var i=0;i<childs.length;i++){
        if(i===Number(n)){
            childs[i].children[1].style.border = '1px solid red';
        }
    }
}


function change(n,str,oldValue) {
    var list = null;
    str==='todolist' ? list = todolist : list = donelist;
    childs = list.childNodes;
    for(var i=0; i<childs.length; i++){
        if(i===Number(n)){
            childs[i].children[1].style.border = 'none';
            if(childs[i].children[1].value === ""){
                alert('内容不能为空');
                childs[i].children[1].value = oldValue;
            }
        }
    }
    loop(str);
}

// 清除单个列表
function remove(n,str) {
    var list=null;
    if (str==='todolist'){
        list = todolist;
        todoc--;
        todoCount.innerHTML = todoc;
    } else if(str==='donelist'){
        list = donelist;
        donec--;
        doneCount.innerHTML = donec;
    }

    childs = list.childNodes;
    for(var i=childs.length-1;i>=0;i--){
        if(i===Number(n)){
            list.removeChild(childs[n]);
        }
    }
    loop(str);
}

// 清除所有列表
function clear(){
    childs1 = todolist.childNodes;
    for(var i=childs1.length-1;i>=0;i--){
        todolist.removeChild(childs1[i]);
    }
    childs2 = donelist.childNodes;
    for(var j=childs2.length-1;j>=0;j--){
        donelist.removeChild(childs2[j]);
    }
    todoc = 0;
    donec = 0;
    todoCount.innerHTML = todoc;
    doneCount.innerHTML = donec;
}