export function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");

  parent.classList.add("error");
  small.innerText = message;
}

export function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");
  parent.classList.remove("error");
  small.innerText = "";
}

export function checkEmptyError(listInput) {
  let isEmpty = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();
    if (!input.value) {
      isEmpty = true;
      showError(input, "Không được để trống");
    } else {
      showSuccess(input);
    }
  });
  return isEmpty;
}

export function checkEmailError(input, maxLength) {
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/; // regex email
  input.value = input.value.trim();
  if (!regexEmail.test(input.value)) showError(input, "Email Invalid");
  else if (input.value.length > maxLength)
    showError(input, "Email không được quá 32 ký tự");
  else showSuccess(input);
}

export function checkPasswordError(input) {
  const regexPassword =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()-+=|{}[\]:;<>,.?/~]).{8,16}$/;
  input.value = input.value.trim();
  if (!regexPassword.test(input.value)) {
    showError(
      input,
      `Password phải có ít nhất 6 ký tự và không vượt quá 16 ký tự
                        Password có ít nhất 1 ký tự viết hoa
                        Password có ít nhất 1 ký tự đặc biệt`
    );
  } else showSuccess(input);
}
export function checkMatchPasswordConfirmError(passwordInput, input) {
  input.value = input.value.trim();
  if (passwordInput.value !== input.value)
    showError(input, "Mật khẩu không trùng khớp");
  else showSuccess(input);
}

export function checkAge(input) {
  input.value = input.value.trim();

  const DOB = new Date(input.value);
  const today = new Date();
  const msDiff = today - DOB;
  const age = Math.floor(msDiff / (1000 * 60 * 60 * 24 * 365.25));
  console.log(age);
  const regexdbo =
    /[1-9][0-9][0-9]{2}\/([0][1-9]|[1][0-2])\/([1-2][0-9]|[0][1-9]|[3][0-1])/;
  if (!regexdbo.test(input.value)) {
    showError(input, "Phải nhập theo định dạng yyyy/mm/dd");
  } else if (age < 18) showError(input, "Bạn phải lớn hơn 18 tuổi");
  else showSuccess(input);
}

export function checkPhone(input) {
  input.value = input.value.trim();
  const regexPhone =
    /^(0([1-9]{1}-?[1-9]\d{3}|[1-9]{2}-?\d{3}|[1-9]{2}\d{1}-?\d{2}|[1-9]{2}\d{2}-?\d{1})-?\d{4}|0[789]0-?\d{4}-?\d{4}|050-?\d{4}-?\d{4})$/;

  if (!regexPhone.test(input.value)) {
    showError(input, "Số điện thoại phải có trên 8 chữ số");
  } else showSuccess(input);
}
export function checkInputs() {
  let allFilled = true;
  inputs.forEach(function (input) {
    if (input.type === "checkbox") {
      if (!input.checked) {
        allFilled = false;
      }
    } else {
      if (!input.value.trim()) {
        allFilled = false;
      }
    }
  });

  const button = form.querySelector(".btn_rigester");
  if (allFilled) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}
