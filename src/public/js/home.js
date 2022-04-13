let user = {};

fetch("/session/current")
  .then((response) => {
    if (response.status !== 200) location.replace("index.html");
    return response.json();
  })
  .then((data) => {
    user = data;
    setUserProfile(data);
    fetchProducts();
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

const socket = io();

//-----------Socket Events------------//
const fetchProducts = () => {
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

        const addProductToCartBtn = document.getElementsByClassName(
          "addProductToCartBtn"
        );
        if (addProductToCartBtn) {
          for (let i = 0; i < addProductToCartBtn.length; i++) {
            const element = addProductToCartBtn[i];
            element.addEventListener("click", (e) => {
              const productId = e.path[1].childNodes[1].defaultValue;
              fetch(`/api/users/${user._id}`)
                .then((result) => result.json())
                .then((response) => {
                  const user = response.user;
                  const cartId = user.cart;
                  if (!cartId) {
                    createCart(user._id, productId);
                  } else {
                    addProductToCart(cartId, productId);
                  }
                });
            });
          }
        }
      });
  });
};

//Probar poner aquí separado el addProductToCartBtn

/////////////////////////////
//Interesante comparando async

const createCart = async (userId, productId) => {
  fetch("/api/carts/", {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((result) => result.json())
    .then((response) => {
      addProductToCart(response.cart._id, productId);
    });
};

//Ideas: testing in folder bodgan.
// remove sockets.

const addProductToCart = (cartId, productId) => {
  fetch(`/api/carts/${cartId}/products/${productId}`, {
    method: "POST",
  })
    .then((result) => {
      if (result.status === 200) {
        window.alert("Product added to cart successfully.");
      } else {
        return result.json();
      }
    })
    .then((response) => {
      if (response && response.message) {
        window.alert(`Error: ${response.message}`);
      }
    });
};

//-----------Fin Socket Events-----------//

//La gracia de estar vivo! Único :¡ Jugar con eso

//Reahaciendo análisis de cómo pegan rutas con funciones trayendo funciones backend. en 12min
