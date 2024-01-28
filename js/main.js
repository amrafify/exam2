$(document).ready(() => {
  getMeals().then(() => {
    $(".loading-screen").fadeOut(500);
    $("body").css("overflow", "visible");
  });
});

let innewidthNav = $(".left-nav").innerWidth();
$("nav").css("left", `-${innewidthNav}`);

$(".fa-bars").click(() => {
  $("nav").animate({ left: "0" }, 500);
  $(".fa-bars").addClass("d-none");
  $(".fa-x").removeClass("d-none");
  for (let i = 0; i < 5; i++) {
    $(".links li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
});

$(".fa-x").click(() => {
  $("nav").animate({ left: `-${innewidthNav}` });
  $(".fa-x").addClass("d-none");
  $(".fa-bars").removeClass("d-none");
  $(".links li").animate({ top: 300 }, 500);
});

function navBar() {
  $("nav").animate({ left: `-${innewidthNav}` });
  $(".fa-x").addClass("d-none");
  $(".fa-bars").removeClass("d-none");
  $(".searchBar").addClass("d-none");
}

let data = {};

async function getMeals(type1 = "search", type2 = "s", Value = "") {
  let myReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/${type1}.php?${type2}=${Value}`
  );
  data = await myReq.json();
  displayHome();
}

async function getMealscategory() {
  $(".loading-screen").fadeIn(300);
  navBar();
  let myReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  data = await myReq.json();

  displaycategoryList();
  $(".loading-screen").fadeOut(300);
}

async function getArea() {
  $(".loading-screen").fadeIn(500);
  navBar();
  let myReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  data = await myReq.json();
  $("nav").animate({ left: `-${innewidthNav}` });
  displayArea();
  $(".loading-screen").fadeOut(500);
}

async function getIngredients() {
  $(".loading-screen").fadeIn(500);
  navBar();
  let myReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  data = await myReq.json();
  $("nav").animate({ left: `-${innewidthNav}` });
  displayIngredients();
  $(".loading-screen").fadeOut(500);
}

function displayArea() {
  let temp = "";
  for (let i = 0; i < data.meals.length; i++) {
    temp += `<div class="col-md-3 py-5 img">
    <div class="position-relative overflow-hidden outer text-center text-white area" onclick="getMeals('filter','a','${data.meals[i].strArea}')" >
      <div class='fa-solid fa-house-laptop fa-4x'></div>
      <h2>${data.meals[i].strArea}</h2>
    </div>
  </div>`;
  }
  document.querySelector("#root .contant").innerHTML = temp;
}

async function getMealsdetails(meals = "") {
  $(".loading-screen").fadeIn(500);
  let myReq = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`
  );
  data = await myReq.json();
  detailsShow();
  $(".loading-screen").fadeOut(500);
}

function displayHome() {
  let temp = "";
  for (let i = 0; i < data.meals.length; i++) {
    temp += `
        <div class="col-md-3 py-5 img">
          <div class="position-relative overflow-hidden outer" onclick="details('${data.meals[i].strMeal}')" >
            <img src="${data.meals[i].strMealThumb}" class="w-100" />
            <div
              class="inner w-100 h-100 d-flex align-items-center position-absolute"
            >
              <h2>${data.meals[i].strMeal}</h2>
            </div>
          </div>
        </div>
`;
  }
  document.querySelector("#root .contant").innerHTML = temp;
}

function displaycategoryList() {
  let temp = "";
  for (let i = 0; i < data.categories.length; i++) {
    temp += `
        <div class="col-md-3 py-5 img">
          <div class="position-relative overflow-hidden outer" onclick="getMeals('filter','c','${data.categories[i].strCategory}')" >
            <img src="${data.categories[i].strCategoryThumb}" class="w-100" />
            <div
              class="inner w-100 text-center d-flex align-items-center justify-content-center flex-column position-absolute overflow-hidden"
            >
              <h2>${data.categories[i].strCategory}</h2>
              <p>${data.categories[i].strCategoryDescription}</p>
            </div>
          </div>
        </div>
`;
  }
  document.querySelector("#root .contant").innerHTML = temp;
}

function displayIngredients() {
  let temp = "";
  for (let i = 0; i < 20; i++) {
    temp += `<div class="col-md-3 py-5 img">
    <div class="position-relative overflow-hidden outer text-center text-white Ingredients" onclick="getMeals('filter','i','${data.meals[i].strIngredient}')" >
      <div class='fa-solid fa-drumstick-bite fa-4x '></div>
      <h2>${data.meals[i].strIngredient}</h2>
      <P>${data.meals[i].strDescription}</p>
    </div>
  </div>`;
  }
  document.querySelector("#root .contant").innerHTML = temp;
}

function details(x = "") {
  getMealsdetails(x);
}
function detailsShow() {
  let Recipes = "";
  for (let i = 1; i <= 20; i++) {
    if (data.meals[0][`strIngredient${i}`]) {
      Recipes += `<h6
      class="tags border border-1 p-2  bg-danger-subtle text-black my-3"
    >
    ${data.meals[0][`strMeasure${i}`]} ${data.meals[0][`strIngredient${i}`]} 
    </h6>`;
    }
  }
  let tags = data.meals[0].strTags?.split(",");
  if (!tags) tags = [];
  let tag = "";
  for (let i = 0; i < tags.length; i++) {
    tag += `<h6
    class="tags border border-1 p-2 rounded-pill bg-danger-subtle text-black my-3"
  >
  ${tags[i]}
  </h6>`;
  }
  console.log(tags);
  let temp = `<div class="col-md-4 py-5">
  <img src="${data.meals[0].strMealThumb}" class="w-100" alt="" />
  <h2 class="text-white">${data.meals[0].strMeal}</h2>
</div>
<div class="col-md-8 py-5 text-white">
  <h2>Instructions</h2>
  <p>
  ${data.meals[0].strInstructions}
  </p>
  <h2>Area : ${data.meals[0].strArea}</h2>
  <h2>Category : ${data.meals[0].strCategory}</h2>
  <h2>Recipes :</h2>
  <div class='d-flex gap-2 flex-wrap'>
  ${Recipes}
  </div>
  <h2>Tags :</h2>
  <div class='d-flex gap-2'>
  ${tag}
  </div>
  <button class="btn btn-info"><a href="${data.meals[0].strSource}" target='_blank'>Source</a></button>
  <button class="btn btn-danger"><a href="${data.meals[0].strYoutube}" target='_blank'>Youtube</a></button>
</div>`;
  document.querySelector("#root .contant").innerHTML = temp;
  $(".searchBar").addClass("d-none");
}

// search
function search() {
  $(".searchBar").removeClass("d-none");
  $("nav").animate({ left: `-${innewidthNav}` });
  $(".fa-x").addClass("d-none");
  $(".fa-bars").removeClass("d-none");
  document.querySelector("#root .contant").innerHTML = "";
}

// contantUs
function contantUs() {
  let temp = `<div class="col-md-12">
  <div class="container text-center">
    <div class="row my-5">
      <div class="col-md-6 mt-5">
        <input
          type="text"
          class="form-control mt-5"
          placeholder="Enter Your name"
          id='nameInput'
          onkeyup="inputsValidation()"
        />
        <div class="alert alert-danger d-none" role="alert" id='nameAlert'>
          Special characters and numbers not allowed
        </div>
      </div>
      <div class="col-md-6 mt-5">
        <input
          type="text"
          class="form-control mt-5"
          placeholder="Enter Your Email"
          id='emailInput'
          onkeyup="inputsValidation()"
        />
        <div class="alert alert-danger d-none" role="alert" id='emailAlert'>
          Email not valid *exemple@yyy.zzz
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <input
          type="text"
          class="form-control"
          placeholder="Enter Your Phone"
          id='phoneInput'
          onkeyup="inputsValidation()"
        />
        <div class="alert alert-danger d-none" role="alert" id='phoneAlert'>
          Enter valid Phone Number
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <input
          type="text"
          class="form-control"
          placeholder="Enter Your Age"
          id='ageInput'
          onkeyup="inputsValidation()"
        />
        <div class="alert alert-danger d-none" role="alert" id='ageAlert'>
          Enter valid age
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <input
          type="password"
          class="form-control"
          placeholder="Enter Your Password"
          id='passwordInput'
          onkeyup="inputsValidation()"
        />
        <div class="alert alert-danger d-none" role="alert" id='passwordAlert'>
          Enter valid password *Minimum eight characters, at least
          one letter and one number:*
        </div>
      </div>
      <div class="col-md-6 mt-3">
        <input
          type="password"
          class="form-control"
          placeholder="Repassword"
          id='repasswordInput'
          onkeyup="inputsValidation()"
        />
        <div class="alert alert-danger d-none" role="alert" id='repasswordAlert'>
          Enter valid repassword
        </div>
      </div>
    </div>
    <button class="btn btn-outline-danger" id='submitBtn' disabled>submit</button>
  </div>
</div>`;
  document.querySelector("#root .contant").innerHTML = temp;
  navBar();
  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }
  if (repasswordInputTouched) {
    if (repasswordValidation()) {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("repasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    repasswordValidation()
  ) {
    document.getElementById("submitBtn").removeAttribute("disabled");
  } else {
    document.getElementById("submitBtn").setAttribute("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    document.getElementById("emailInput").value
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    document.getElementById("phoneInput").value
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(
    document.getElementById("ageInput").value
  );
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(
    document.getElementById("passwordInput").value
  );
}

function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value ==
    document.getElementById("passwordInput").value
  );
}
