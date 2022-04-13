let user = {};

fetch("/session/current")
  .then((result) => {
    if (result.status !== 200) location.replace("index.html");
    return result.json();
  })
  .then((response) => {
    user = response;
    setUserProfile(response);
    fetchProductsCart();
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

const logout = document.getElementById("logout");
if (logout) {
  logout.addEventListener("click", (e) => {
    fetch("/session/logout", {
      method: "POST",
    }).then((result) => {
      if (result.status === 200) location.replace("index.html");
    });
  });
}

const cart = document.getElementById("cart");
if (cart) {
  cart.addEventListener("click", (e) => {
    location.replace("cart.html");
  });
}

//const socket = io();
//-----------Socket Events------------//

//-----------End Socket Events-----------//

//ENCONTRAR CONEXIÓN ENTRE USER Y CART,
//DESDE PASSCONFIG, Models Purchase y métodos.

//COMO LOGRAR QUE LLEGUE EL CURRENT CartID

// fetch("/session/current")
//   .then((response) => response.json())
//   .then((data) => {
//     userName.innerHTML = data.first_name;
//   });

//
//de session current la data, se parece al let cartId
//

fetch("/session/current")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.cart);
    data.cart.map((product) => {
      console.log(data);
      fetch(`/api/products/${product.id}`)
        .then((resp) => resp.json())
        .then((data) => {
          carrito.innerHTML += `<div class="card w-25 text-center m-1 shadow">
                                    <h3>${data.name}</h3>
                                    <p>price: ${data.price}</p>
                                    <img src=${data.picture} alt="">
                                </div>`;
        });
    });
  });

const confirm = () => {
  fetch("/session/current")
    .then((response) => response.json())
    .then((data) => {
      location.href = `/api/carts/${data._id}/confirm`;
    });
};
