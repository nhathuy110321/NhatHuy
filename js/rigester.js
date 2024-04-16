import {
  checkEmptyError,
  checkEmailError,
  checkPasswordError,
  checkMatchPasswordConfirmError,
  checkAge,
  checkPhone,
  checkInputs,
} from "./validate.js";

var email = document.querySelector("#email");
var password = document.querySelector("#password");
var confirmPassword = document.querySelector("#confirmPassword");
var province = document.querySelector("#province");
var bird = document.querySelector("#bird");
var nickname = document.querySelector("#nickname");
var lastName = document.querySelector("#lastName");
var firstName = document.querySelector("#firstName");
var phone = document.querySelector("#phone");
var form = document.querySelector("form");
// const btnRegister = document.querySelector(".btn_register");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const isEmpty = checkEmptyError([
    email,
    password,
    confirmPassword,
    province,
    bird,
    nickname,
    lastName,
    firstName,
    phone,
  ]);
  if (isEmpty) return;
  checkEmailError(email, 32);
  checkPasswordError(password);
  checkMatchPasswordConfirmError(password, confirmPassword);
  checkAge(bird);
  checkPhone(phone);
});

email.addEventListener("input", function (e) {
  checkEmailError(email, 32);
});

password.addEventListener("input", function (e) {
  checkPasswordError(password);
});
confirmPassword.addEventListener("input", function (e) {
  checkMatchPasswordConfirmError(password, confirmPassword);
});

bird.addEventListener("input", function (e) {
  checkAge(bird);
});
phone.addEventListener("input", function (e) {
  checkPhone(phone);
});

checkInputs();
