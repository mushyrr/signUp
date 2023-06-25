
const formL = document.getElementById('formLog');
const usernameL = document.getElementById('UsernameLog');
const emailL = document.getElementById('emailLog');
const passwordL = document.getElementById('password');
const login = document.getElementById('submitLog');

let loginAuser ;
let myUsers ;

let checkINmail = true;


if (localStorage.users){
    myUsers = JSON.parse(localStorage.users)
}else{
    myUsers = []
}




const setError = (ele , message)=>{
    const inputControl = ele.parentElement ;
    const errorDisplay = inputControl.querySelector('.error');
    
    errorDisplay.innerHTML = message;
    inputControl.classList.add('error')
    inputControl.classList.remove('success')
}

const setSuccess = element =>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerHTML = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error')
};





formL.addEventListener('submit',(s)=>{
    if (usernameL.value === ''){
        setError(usernameL , 'user is requierd')
    }
    s.preventDefault()
    checkLogin()
    
    localStorage.setItem('thisUser' , loginAuser);

    if(checkINmail === true){
        window.location.href = 'indexmain.html'
    }
})











function checkLogin() {
    if(usernameL.value !== ''){
        const usernamevalue = usernameL.value
        const emailvalue = emailL.value
        const passwordvalue = passwordL.value
        for(var i = 0;i < myUsers.length; i++ ){

            
            var index = myUsers[i].username.indexOf(usernamevalue);
            
            

            if(index !== -1){
                loginAuser = i
                break
                
            }
            
        }


        if(index !== -1 ){
            setSuccess(usernameL);
            checkINmail = true;
        
        }else{
            setError(usernameL , 'this user does not exist');
            checkINmail = false;
        }

        if(myUsers[i].email === emailvalue){
            setSuccess(emailL);
            checkINmail = true;
        }else if(emailvalue === ''){
            setError(emailL , 'email is requierd');
            checkINmail = false;
        } else{
            setError(emailL , 'the username dose not match the mail');
            checkINmail = false;
        }


        if(myUsers[i].password === passwordvalue){
            setSuccess(passwordL);
            checkINmail = true;
        }else if (passwordvalue === ''){
            setError(passwordL , 'password is requierd');
            checkINmail = false;
        } else{
            setError(passwordL , 'the password is incorrect');
            checkINmail = false;
        }

    }

}
