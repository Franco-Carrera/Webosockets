fetch("/session/current").then((result) => {
  if (result.status === 200) location.replace("home.html");
  location.replace("login.html");
});
