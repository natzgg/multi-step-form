var pageOne = document.querySelector(".page-one");
var pageTwo = document.querySelector(".page-two");
var pageThree = document.querySelector(".page-three");
var pageFour = document.querySelector(".page-four");
var pageFive = document.querySelector(".page-five");
var stepsContainer = document.querySelector(".steps-container").children;
var checkbox = document.getElementById("checkbox");
var orderAddOnsBox = document.querySelector(".order-add-ons");
var chosenPlan = document.querySelector(".chosen-plan-text");

var nextStepBtn = document.querySelector(".next-step");
var goBackBtn = document.querySelector(".go-back");

var inputName = document.querySelector(".personal-name");
var inputEmail = document.querySelector(".personal-email");
var inputPhone = document.querySelector(".personal-phone");

var planPrice = document.querySelectorAll(".plan-price");
var planList = document.querySelectorAll(".plan-list");
var promos = document.querySelectorAll(".promo");

var addOnsPrice = document.querySelectorAll(".add-ons-price");

var addOnsList = document.querySelectorAll(".add-ons-list");

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
  planToggle: false,
  selectedPlan: "Arcade",
};

var selectedAddOns = [];

var currentStep = 1;

nextStepBtn.addEventListener("click", validateForm);
goBackBtn.addEventListener("click", goBack);
inputName.addEventListener("input", checkForLetters);
inputPhone.addEventListener("input", checkForNumbers);
checkbox.addEventListener("click", setPlan);
planList.forEach((plan) => {
  plan.addEventListener("click", toggleActivePlan);
});
addOnsList.forEach((addOn) => {
  addOn.addEventListener("click", toggleActiveAddOn);
});

function validateForm(e) {
  e.preventDefault();
  let email = inputEmail.value;
  let phone = inputPhone.value;
  let checkedEmail = checkEmail(email);
  let checkedPhone = checkPhone(phone);

  if (currentStep == steps.stepOne) {
    if (!checkedEmail) {
      showError("email");
    }

    if (!checkedPhone) {
      showError("phone");
    }

    if (checkedEmail && checkedPhone) {
      pageOne.classList.add("hide");
      pageTwo.classList.remove("hide");
      changeActiveStep("next", currentStep);
      goBackBtn.style.display = "block";
    }
  } else if (currentStep == steps.stepTwo) {
    pageTwo.classList.add("hide");
    pageThree.classList.remove("hide");
    changeActiveStep("next", currentStep);
  } else if (currentStep == steps.stepThree) {
    pageThree.classList.add("hide");
    pageFour.classList.remove("hide");
    changeActiveStep("next", currentStep);
    createAddOns();
    changeChosenPlan();
    computeTotal();
  } else if (currentStep == steps.stepFour) {
    pageFour.classList.add("hide");
    pageFive.classList.remove("hide");
    nextStepBtn.style.display = "none";
    goBackBtn.style.display = "none";
  }
}

function goBack(e) {
  if (currentStep == steps.stepTwo) {
    pageTwo.classList.add("hide");
    pageOne.classList.remove("hide");
    goBackBtn.style.display = "none";
  } else if (currentStep == steps.stepThree) {
    pageThree.classList.add("hide");
    pageTwo.classList.remove("hide");
  } else if (currentStep == steps.stepFour) {
    pageFour.classList.add("hide");
    pageThree.classList.remove("hide");
    resetPageFour();
  }
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

function showError(target) {
  if (target == "email") {
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
    }, 6000);
  } else if (target == "phone") {
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
    }, 6000);
  }
}

function setPlan(e) {
  console.log(currentState.planToggle);

  if (!currentState.planToggle) {
    planPrice.forEach((price, index) => {
      if (index == 0) {
        price.textContent = "$90/yr";
      } else if (index == 1) {
        price.textContent = "$120/yr";
      } else if (index == 2) {
        price.textContent = "$150/yr";
      }
    });

    setAddsOnPrice(currentState.planToggle);
    currentState.planToggle = !currentState.planToggle;
    promos.forEach((promo) => {
      promo.classList.remove("hide");
    });
  } else if (currentState.planToggle) {
    planPrice.forEach((price, index) => {
      if (index == 0) {
        price.textContent = "$9/mo";
      } else if (index == 1) {
        console.log("taeee");
        price.textContent = "$12/mo";
      } else if (index == 2) {
        console.log("tite");
        price.textContent = "$15/mo";
      }
    });

    setAddsOnPrice(currentState.planToggle);
    currentState.planToggle = !currentState.planToggle;
    promos.forEach((promo) => {
      promo.classList.add("hide");
    });
  }
}

function setAddsOnPrice(plan) {
  if (!plan) {
    addOnsPrice.forEach((price, index) => {
      if (index == 0) {
        price.textContent = "+$10/yr";
      } else if (index == 1) {
        price.textContent = "+$20/yr";
      } else if (index == 2) {
        price.textContent = "+$20/yr";
      }
    });
  } else if (plan) {
    addOnsPrice.forEach((price, index) => {
      if (index == 0) {
        price.textContent = "+$1/mo";
      } else if (index == 1) {
        price.textContent = "+$2/mo";
      } else if (index == 2) {
        price.textContent = "+$2/mo";
      }
    });
  }
}

function toggleActivePlan(e) {
  planList.forEach((plan) => {
    if (plan.classList.contains("active")) {
      plan.classList.remove("active");
    }
  });

  e.currentTarget.classList.toggle("active");
  currentState.selectedPlan =
    e.currentTarget.children[1].children[0].textContent;

  console.log(currentState.selectedPlan);
}

function toggleActiveAddOn(e) {
  e.currentTarget.classList.toggle("active");
  // console.log(e.currentTarget.querySelector(".add-ons-name"));

  e.currentTarget.children[0].children[0].checked =
    !e.currentTarget.children[0].children[0].checked;

  if (e.target.id == "add-ons-checkbox") {
    e.target.checked = !e.target.checked;
  }

  updateAddOns(e);
}

function updateAddOns(e) {
  let addOn = e.currentTarget;
  if (addOn.classList.contains("active")) {
    if (
      selectedAddOns.indexOf(
        addOn.querySelector(".add-ons-name").textContent
      ) == -1
    ) {
      selectedAddOns.push(addOn.querySelector(".add-ons-name").textContent);
    }
  }

  if (!addOn.classList.contains("active")) {
    if (
      selectedAddOns.indexOf(
        addOn.querySelector(".add-ons-name").textContent >= 0
      )
    ) {
      selectedAddOns.splice(
        selectedAddOns.indexOf(
          addOn.querySelector(".add-ons-name").textContent
        ),
        1
      );
    }
  }

  console.log(selectedAddOns);
}

function createAddOns() {
  selectedAddOns.forEach((selected) => {
    let addOn = document.createElement("div");
    let addOnName = document.createElement("div");
    let addOnPrice = document.createElement("div");

    addOn.className = "add-ons-item";
    addOnName.className = "name";
    addOnName.textContent = selected;
    addOnPrice.className = "price";

    if (selected == "Online service") {
      if (!currentState.planToggle) {
        addOnPrice.textContent = "+$1/mo";
      } else {
        addOnPrice.textContent = "+$10/yr";
      }
    } else if (selected == "Larger storage") {
      if (!currentState.planToggle) {
        addOnPrice.textContent = "+$2/mo";
      } else {
        addOnPrice.textContent = "+$20/yr";
      }
    } else if (selected == "Customizable profile") {
      if (!currentState.planToggle) {
        addOnPrice.textContent = "+$2/mo";
      } else {
        addOnPrice.textContent = "+$20/yr";
      }
    }

    addOn.appendChild(addOnName);
    addOn.appendChild(addOnPrice);

    orderAddOnsBox.appendChild(addOn);
  });
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

function resetPageFour() {
  orderAddOnsBox.innerHTML = "";
}

function changeChosenPlan() {
  chosenPlan.textContent = currentState.selectedPlan;

  if (currentState.selectedPlan == "Arcade") {
    if (!currentState.planToggle) {
      document.querySelector(".order-plan-price").textContent = "$9/mo";
    } else {
      document.querySelector(".order-plan-price").textContent = "$90/yr";
    }
  } else if (currentState.selectedPlan == "Advanced") {
    if (!currentState.planToggle) {
      document.querySelector(".order-plan-price").textContent = "$12/mo";
    } else {
      document.querySelector(".order-plan-price").textContent = "$120/yr";
    }
  } else if (currentState.selectedPlan == "Pro") {
    if (!currentState.planToggle) {
      document.querySelector(".order-plan-price").textContent = "$15/mo";
    } else {
      document.querySelector(".order-plan-price").textContent = "$150/yr";
    }
  }
}

function computeTotal() {
  let num = [];

  let a = document.querySelector(".order-plan-price").textContent;
  a = a.replace(/[^0-9]+/g, "");
  num.push(a);

  if (document.querySelector(".add-ons-item") != null) {
    document.querySelectorAll(".price").forEach((price) => {
      let b = price.textContent;
      b = b.replace(/[^0-9]+/g, "");
      num.push(b);
    });
  }
  console.log(num);
  var total = num.reduce((accumulator, currentValue) => {
    return Number(accumulator) + Number(currentValue);
  }, 0);

  if (!currentState.planToggle) {
    document.querySelector(".order-total-price").textContent =
      "$" + total + "/mo";
  } else {
    document.querySelector(".order-total-price").textContent =
      "$" + total + "/yr";
  }
}
