var pageOne = document.querySelector(".page-one");
var pageTwo = document.querySelector(".page-two");
var stepsContainer = document.querySelector(".steps-container").children;
console.log(stepsContainer);

var nextStepBtn = document.querySelector(".next-step");
var goBackBtn = document.querySelector(".go-back");

var inputName = document.querySelector(".personal-name");
var inputEmail = document.querySelector(".personal-email");
var inputPhone = document.querySelector(".personal-phone");

var steps = {
  stepOne: 1,
  stepTwo: 2,
  stepThree: 3,
  stepFour: 4,
};

var currentState = {
  name: "",
  email: inputEmail.value,
  phone: inputPhone.value,
};

var currentStep = 1;

nextStepBtn.addEventListener("click", validateForm);
goBackBtn.addEventListener("click", goBack);
inputName.addEventListener("input", checkForLetters);
inputPhone.addEventListener("input", checkForNumbers);

function validateForm(e) {
  e.preventDefault();
  let email = inputEmail.value;
  let phone = inputPhone.value;
  let checkedEmail = checkEmail(email);
  let checkedPhone = checkPhone(phone);

  if (currentStep == steps.stepOne) {
    if (!checkedEmail) {
      /* SHAKE ANIMATION */
      inputEmail.style.border = "1px solid red";
      inputEmail.classList.add("shake");
      inputEmail.classList.remove("shake");
      void inputEmail.offsetWidth;
      inputEmail.classList.add("shake");

      /*SHOW ERROR */

      let error = document.querySelector(".email-error");
      error.style.display = "inline-block";

      setTimeout(() => {
        inputEmail.style.border = "2px solid var(--Light-gray)";
        inputEmail.style.transition = "border 1s linear";
        error.style.display = "none";
      }, 3000);
    }

    if (!checkedPhone) {
      inputPhone.style.border = "1px solid red";
      /* SHAKE ANIMATION */
      inputPhone.classList.add("shake");
      inputPhone.classList.remove("shake");
      void inputPhone.offsetWidth;
      inputPhone.classList.add("shake");

      /*SHOW ERROR */

      let error = document.querySelector(".phone-error");
      error.style.display = "inline-block";
      setTimeout(() => {
        inputPhone.style.border = "2px solid var(--Light-gray)";
        inputPhone.style.transition = "border 1s linear";
        error.style.display = "none";
      }, 3000);
    }

    if (checkedEmail && checkedPhone) {
      pageOne.classList.add("hide");
      pageTwo.classList.remove("hide");
      changeActiveStep("next", currentStep);
      goBackBtn.style.display = "block";
    }
  } else if (currentStep == steps.stepTwo) {
    console.log("stepTwo na po");
  }
  console.log(currentStep);
}

function goBack(e) {
  changeActiveStep("back", currentStep);
  console.log("currentStep", currentStep);
}

function checkEmail(email) {
  if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    return true;
  }
  return false;
}

function checkPhone(phone) {
  if (phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{5})$/)) {
    return true;
  }
  return false;
}

function checkForLetters(e) {
  e.target.value = e.target.value.replace(/[^a-zA-Z\s]+/, "");
}

function checkForNumbers(e) {
  e.target.value = e.target.value.replace(/^[a-zA-Z\s]*$/, "");
}

function changeActiveStep(direction, step) {
  if (direction == "next") {
    stepsContainer.item(step - 1).classList.remove("step-active");
    stepsContainer.item(step).classList.add("step-active");
    currentStep = step + 1;
  } else if (direction == "back") {
    console.log("AFTER FUNCTION: ", currentStep);
    console.log("DIRECTION", direction);
    stepsContainer.item(step - 1).classList.remove("step-active");
    stepsContainer.item(step - 2).classList.add("step-active");
    currentStep = step - 1;
  }
}
