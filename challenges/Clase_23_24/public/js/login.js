document.getElementById("login").addEventListener("click", (e) => {
  e.preventDefault();

  const form = document.getElementById("loginForm");
  const formData = new FormData(form);

  fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((json) => console.log(json));
});

document.getElementById("register").addEventListener("click", (e) => {
  e.preventDefault();
  location.replace(window.location.origin + "/register");
});
