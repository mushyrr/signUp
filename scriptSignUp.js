const form = document.getElementById('form');
const username = document.getElementById('Username');
const email = document.getElementById('email');
const password = document.getElementById('passw');
const password2 = document.getElementById('pass2');
const submit = document.getElementById('submit');


let allInputsValid = true;

let emailIdentical = true ;


let myUsers ;

if (localStorage.users){
    myUsers = JSON.parse(localStorage.users)
}else{
    myUsers = []
}

function checkEmail(){
for (let i = 0; i < myUsers.length;i++){
    if(myUsers[i].email === email.value){
        emailIdentical = false;
        break
    }else{
        emailIdentical = true
    }
}
}

form.addEventListener('input', ()=>{
    //e.preventDefault();

    checkEmail()
    validateInputs();

});

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

const isVlidEmail = email =>{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = ()=>{
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();



    if(usernameValue === ''){
        setError(username , 'Username is required');
        allInputsValid = false;
    }else{
        setSuccess(username);
    }

    if (emailValue === ''){
        setError (email , 'Email is required');
        allInputsValid = false;
    }else if(!isVlidEmail(emailValue)){
        setError(email , 'provide a valid email address')
        allInputsValid = false;
    }else if(emailIdentical == false){
        setError(email , 'mail is used')
        allInputsValid = false;
    } else{
        setSuccess(email);
    }

    if(passwordValue === ''){
        setError(password , 'Password is required');
        allInputsValid = false;
    }else if(passwordValue.length < 8){
        setError(password , 'password must be at least 8 charcter.');
        allInputsValid = false;
    }else{
        setSuccess(password)
    }

    
    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
        allInputsValid = false;
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
        allInputsValid = false;
    } else {
        setSuccess(password2);
        allInputsValid = true ;
    }


}



form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    
    checkEmail()
    validateInputs();


    if (allInputsValid == true && emailIdentical == true){
        const myLogin = {
            username : username.value ,
            email : email.value ,
            password : password.value
        }
        myUsers.push(myLogin)
        localStorage.setItem('users' , JSON.stringify(myUsers));
        

        window.location.href = 'indexmain.html'
        
        //clearLogin()

        
let index = myUsers.length -1

localStorage.setItem('thisUser' , index)

    }
});










function clearLogin(){
    username.value = ''
    email.value = ''
    password.value = ''
    password2.value = ''
}

