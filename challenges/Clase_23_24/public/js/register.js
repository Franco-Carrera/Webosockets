document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = window.location.origin + "/";
});

const form = document.getElementById("registerForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("Hola!");
  const formData = new FormData(form);

  const body = {};
});
