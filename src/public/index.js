const socket = io();

//-------------------- Eventos de Socket ----------------

socket.on("deliverProducts", (data) => {
  let products = data.payload;
  console.log(products);
  fetch("templates/productTable.handlebars")
    .then((string) => string.text())
    .then((template) => {
      const processedTemplate = Handlebars.compile(template);
      const templateObject = {
        products: products,
      };
      const html = processedTemplate(templateObject);
      let div = document.getElementById("productTable");
      div.innerHTML = html;
    });
});

// ------------------- ----------------------------

document.addEventListener("submit", enviarFormulario);

function enviarFormulario(event) {
  event.preventDefault();
  let form = document.getElementById("productForm");
  let data = new FormData(form);
  fetch("/api/products", {
    method: "POST",
    body: data,
  })
    .then((result) => {
      return result.json();
    })
    .then((json) => {
      Swal.fire({
        title: "Éxito",
        text: json.message,
        icon: "success",
        timer: 2000,
      }).then((result) => {
        location.href = "/";
      });
    });
}

document.getElementById("image").onchange = (e) => {
  let read = new FileReader();
  read.onload = (e) => {
    document.querySelector(".image-text").innerHTML = "¡Qué precioso!";
    document.getElementById("preview").src = e.target.result;
  };

  read.readAsDataURL(e.target.files[0]);
};
