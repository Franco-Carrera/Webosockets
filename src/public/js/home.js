let user = {};

fetch("/session/current")
  .then((response) => {
    if (response.status !== 200) location.replace("index.html");
    return response.json();
  })
  .then((data) => {
    user = data;
    setUserProfile(data);
  });

const setUserProfile = (user) => {
  const avatar = document.getElementById("avatar");
  if (avatar && user.avatar) {
    avatar.setAttribute("src", user.avatar);
  }
  const email = document.getElementById("email");
  if (email) {
    email.innerHTML = user.email;
  }
  const role = document.getElementById("role");
  if (role) {
    role.innerHTML = user.role;
  }
};

const socket = io();

//-----------Socket Events------------//
socket.on("deliverProducts", (data) => {
  fetch("templates/productsBox.handlebars")
    .then((string) => string.text())
    .then((template) => {
      const processedTemplate = Handlebars.compile(template);
      const templateObj = {
        products: data,
      };
      const html = processedTemplate(templateObj);
      let div = document.getElementById("productBox");
      div.innerHTML = html;
    });
});
//-----------Fin Socket Events-----------//
