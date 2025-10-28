window.addEventListener("load", function () {
  const username = document.getElementById("userName");
  const userNameError = document.getElementById("userNameError");
  const required = document.getElementById("required");

  username.addEventListener("blur", function () {
    console.log("lost focus");
    if (username.value.trim() === "") {
      required.style.display = "block";
      userNameError.style.display = "none";
    } else if (!checkUserName(username.value)) {
      required.style.display = "none";
      userNameError.style.display = "block";
      this.focus();
      this.select();
    } else {
      required.style.display = "none";
      userNameError.style.display = "none";
    }
  });

  username.addEventListener("input", function () {
    required.style.display = "none";
    userNameError.style.display = "none";
  });

  document.forms[0].addEventListener("submit", function (e) {
    const value = username.value.trim();
    const levelValue = document.getElementById("levelDropDown").value;

    if (value === "") {
      e.preventDefault();
      required.style.display = "block";
      userNameError.style.display = "none";
    } else if (!checkUserName(value)) {
      e.preventDefault();
      required.style.display = "none";
      userNameError.style.display = "block";
    } else {
      required.style.display = "none";
      userNameError.style.display = "none";

      localStorage.setItem("username", value);
      localStorage.setItem("level", levelValue);

      console.log("Saved username:", value);
      console.log("Saved level:", levelValue);
    }
  });
});

function checkUserName(e) {
  const pattern = /^[A-Za-z].{3,}$/;
  return e.match(pattern);
}
