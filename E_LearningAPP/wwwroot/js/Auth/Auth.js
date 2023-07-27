﻿///*console.clear();*/

//const loginBtn = document.getElementById('login');
//const signupBtn = document.getElementById('signup');

//console.log(loginBtn);

//loginBtn.addEventListener('click', (e) => {
//	let parent = e.target.parentNode.parentNode;
//	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
//		if (element !== "slide-up") {
//			parent.classList.add('slide-up')
//		} else {
//			signupBtn.parentNode.classList.add('slide-up')
//			parent.classList.remove('slide-up')
//		}
//	});
//});

//signupBtn.addEventListener('click', (e) => {
//	let parent = e.target.parentNode;
//	Array.from(e.target.parentNode.classList).find((element) => {
//		if (element !== "slide-up") {
//			parent.classList.add('slide-up')
//		} else {
//			loginBtn.parentNode.parentNode.classList.add('slide-up')
//			parent.classList.remove('slide-up')
//		}
//	});
//});


var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

myInput.onfocus = function () {
    document.getElementById("message").style.display = "block";
}

myInput.onblur = function () {
    document.getElementById("message").style.display = "none";
}

myInput.onkeyup = function () {
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}


function validate_password() {
    var password = document.getElementById("psw").value;
    var confirm = document.getElementById("confirm_psw").value;
    if (password != confirm) {
        document.getElementById('wrong_psw_alert').style.color = 'red';
        document.getElementById('wrong_psw_alert').innerHTML
            = '☒ Use same password';
        document.getElementById("wrong_psw_alert").style.paddingLeft = "33px";
        /*document.getElementById('submit').setAttribute('disabled', 'true');*/
        /*document.getElementById('subnit').style.opacity = (0.4);*/
    } else {
        document.getElementById('wrong_psw_alert').style.color = 'green';
        document.getElementById('wrong_psw_alert').innerHTML =
            '🗹 Password Matched';
        /*document.getElementById('submit').removeAttribute('disabled');*/
    }
}