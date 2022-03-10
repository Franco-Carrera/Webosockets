let user = {};

fetch("/sesion/current")
  .then((result) => {
    if (result.status !== 200) location.replace("login.html");
    return result.json();
  })
  .then((response) => {
    user = response;
    setUserProfile(response);
    fetchProducts();
  });

const setUserProfile = (user) => {
  const avatar = document.getElementById("avatar");
  if (avatar && user.avatar) {
    avatar.setAttribute("src", user.avatar);
  }
  const email = document.getElementById("email");
  if (email) {
    email.innerText = user.email;
  }
  const role = document.getElementById("role");
  if (role) {
    role.innerText = user.role;
  }
};

const logout = document.getElementById("logout");
if (logout) {
  logout.addEventListener("click", (e) => {
    fetch("/session/logout", {
      method: "POST",
    }).then((result) => {
      if (result.status === 200) location.replace("login.html");
    });
  });
}

const cart = document.getElementById("cart");
if (cart) {
  cart.addEventListener("click", (e) => {
    location.replace("cart.html");
  });
}

const fetchProducts = () => {
  fetch("/api/products")
    .then((result) => result.json())
    .then((response) => {
      let cards = "";
      response.products.forEach((product) => {
        cards += `<div class="card" style="width: 18rem;">
        <img src="${product.picture}" class="card-img-top" alt="...">
        <div class="card-body">
          <input value=${product._id} hidden />
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <button class="addProductToCartBtn btn btn-primary">Add to cart</button>
        </div>
      </div>`;
      });
      if (!cards) {
        document.getElementById("products").innerHTML =
          "<span class='display-6'>No products.</span>";
      } else {
        document.getElementById("products").innerHTML = cards;
      }

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
};

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
