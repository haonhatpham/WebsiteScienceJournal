const checkUsername = (username) => {
    if (!username) return "Hãy nhập Username !";
    else if (username.length < 5)
        return "Username cần chưa tối thiểu 5 kí tự !";
    else return true;
};
const checkPassword = (password,password2) => {
    if (!password) return "Hãy nhập Password !";
    else if (password.length < 5)
        return "Password cần chưa tối thiểu 5 kí tự !";
    else if(password !== password2)
        return "Mật khẩu không trùng khớp! ";
    else return true;
};
const checkEmail = (email) => {
    if (!email) return "Hãy nhập Email !";
    const expression = /^((?:[A-Za-z0-9!#$%&'*+\-\/=?^_`{|}~]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)((?:[A-Za-z0-9.\-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/i
    return expression.test(String(email).toLowerCase())
  
};

const showError = (element, message) => {
    element.style.display = "block";
    element.innerHTML = message;
    element.className = "message_error";
};
const hideError = (element) => {
    element.style.display = "none";
};


const validation = (username, password,password2,email) => {
    const errorUsername = document.getElementById("errorUsername");
    const errorPassword = document.getElementById("errorPassword");
    const errorPassword2 = document.getElementById("errorPassword2");
    const errorEmail = document.getElementById("errorEmail");

    // validation username;
    let messageErrorUsername = checkUsername(username);
    if (typeof messageErrorUsername === "string") {
        showError(errorUsername, messageErrorUsername);
    } else {
        hideError(errorUsername);
    }

    // validation password;
    let messageErrorPassword = checkPassword(password,password2);
    if (typeof messageErrorPassword === "string") {
        showError(errorPassword, messageErrorPassword);
        showError(errorPassword2, messageErrorPassword);
    } else {
        hideError(errorPassword);
        hideError(errorPassword2);
    }
    // validation email;
    let messageErrorEmail = checkEmail(email);
    if (messageErrorEmail === false) {
        showError(errorEmail, 'Hay nhap dia chi email hop le.\nExample@gmail.com');
    } else {
        hideError(errorEmail);
    }

    if (messageErrorUsername === true && messageErrorPassword === true && messageErrorEmail === true) {
        return true;
    }
    return false;
}
const iconLoading = document.getElementById("loading");

const showLoading = () => {
    iconLoading.style.display = "flex";
};
const hideLoading = () => {
    iconLoading.style.display = "none";
};
const signUp = e => {
    const givenNameElm=document.getElementById("givenName").value;
    const familyNameElm=document.getElementById("familyName").value;
    const affiliationElm=document.getElementById("affiliation").value;
    const phoneElm=document.getElementById("phone").value;
    const countryElm=document.getElementById("country").value;
    const emailElm=document.getElementById("email").value;
    const usernameElm=document.getElementById("username").value;
    const passwordElm=document.getElementById("password").value;
    const password2Elm=document.getElementById("password2").value;

    let formData = JSON.parse(localStorage.getItem('formData')) || [];

    const checkValidation = validation(usernameElm, passwordElm,password2Elm,emailElm);

    if (checkValidation === true) {
        let exist = formData.length && 
        JSON.parse(localStorage.getItem('formData')).some(data => 
            data.usernameElm.toLowerCase() == usernameElm.toLowerCase()&&
            data.emailElm.toLowerCase()==emailElm.toLowerCase()
        );

        if(!exist){
            formData.push({ givenNameElm, familyNameElm, affiliationElm, phoneElm,countryElm ,emailElm,usernameElm,passwordElm});
            localStorage.setItem('formData', JSON.stringify(formData));
            document.querySelector('form').reset();
            document.getElementById('givenName').focus();
            showLoading();
            setTimeout(() => {swal(
                "",
                "Đăng kí thành công!",
                "success"
                );
                hideLoading();
            },1000);
        }
        else{
            showLoading();
            setTimeout(() => {swal(
                "",
                "Tên người dùng này đã được đăng kí!",
                "warning"
                );
                hideLoading();
            },1000);
        }
        e.preventDefault();
        
    }
    else {
        e.preventDefault();
    }
}
