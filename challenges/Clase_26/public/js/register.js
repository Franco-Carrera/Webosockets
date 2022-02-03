const form = document.getElementById("registerForm");
//Primero tomamos en una variable el id register.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //Escuchamos evento submit con form

  const formData = new FormData(form);
  //instanciamos nuevo form con la data

  //obtenemos atributos id con nueva variable
  const user = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    age: formData.get("age"),
    avatar: formData.get("avatar"),
  };
  //componiendo a Object usuario

  //Comprobamos que no existan
  if (
    !user.firstName ||
    !user.lastName ||
    !user.username ||
    !user.email ||
    !user.password ||
    !user.age ||
    !user.avatar.size === 0
    //att size for imgs.
  ) {
    Swal.fire({
      title: "Error!",
      text: "The fields have not completed.",
      icon: "error",
    });
  } else {
    //si existen fields
    fetch("/api/register", {
      method: "POST",
      body: formData, //se pasa dataForm a ruta registradora
    })
      .then((result) => result.json())
      .then((response) => {
        //resultado a json, y su respuesta, verificada como correcta o no.
        if (response.status === "success") {
          form.reset();
          Swal.fire({
            title: "User Registered!",
            text: "Registration has been successfully.",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: response.message,
            icon: "error",
          });
        }
      });
  }
});
//Swal.fire es el cómo demostramos el estado de respuesta.
