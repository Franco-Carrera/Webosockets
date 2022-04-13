// fetch("/session/current").then((result) => {
//   if (result.status === 200) location.replace("home.html");
// });

const form = document.getElementById("loginForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (!user.email || !user.password) {
    window.alert("The fields have to be completed.");
  } else {
    fetch("/session/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((result) => {
        if (result.status === "success") {
          console.log(result.json);
          location.replace("../home.html");
        } else {
          // return result.json();
          Swal.fire({
            title: "Error!",
            text: result.message,
            icon: "error",
          });
        }
      });
  }
});
