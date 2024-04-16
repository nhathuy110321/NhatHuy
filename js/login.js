import {
  checkEmptyError,
  checkEmailError,
  checkPasswordError,
} from "./validate.js";

var email = document.querySelector("#email");
var password = document.querySelector("#password");
var form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const isEmpty = checkEmptyError([email, password]);
  if (isEmpty) return;
  checkEmailError(email, 32);
  checkPasswordError(password);
});

email.addEventListener("input", function (e) {
  checkEmailError(email, 32);
});

password.addEventListener("input", function (e) {
  checkPasswordError(password);
});
