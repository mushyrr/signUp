let title = document.getElementById('title');



let myUsers ;

if (localStorage.users){
    myUsers = JSON.parse(localStorage.users)
}else{
    myUsers = []
}


let index = localStorage.getItem('thisUser')

title.innerHTML = ` welcome "${myUsers[index].username}"`