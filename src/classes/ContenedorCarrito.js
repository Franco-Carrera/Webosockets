import fs from "fs";
import __dirname from "../utils.js";

const CartUrl = __dirname + "/files/carrito.txt";

class Cart {
  async getAllCart() {
    try {
      let data = await fs.promises.readFile(CartUrl, "utf-8");
      let carts = JSON.parse(data);
      return { status: "success", payload: carts };
    } catch {
      return {
        status: "error",
        message: "Error al obtener CART. Intente más tarde",
      };
    }
  }
  async createCart(cart) {
    try {
      let data = await fs.promises.readFile(CartUrl, "utf-8");
      let carts = JSON.parse(data);
      let id = carts[carts.length - 1].id + 1;
      cart.adopted = false;
      cart = Object.assign({ id: 1 }, cart);
      carts.push(cart);
      try {
        await fs.promises.writeFile(CartUrl, JSON.stringify(carts, null, 2));
        return { status: "success", message: "CART registrado" };
      } catch {
        return {
          status: "error",
          message: "No se pudo registrar el CART",
        };
      }
    } catch {
      cart.adopted = false;
      cart = Object.assign({ id: 1 }, cart);
      try {
        await fs.promises.writeFile(CartUrl, JSON.stringify([cart], null, 2));
        return { status: "success", message: "CART registrado" };
      } catch (error) {
        console.log(error);
        return {
          status: "error",
          message: "No se pudo registrar el CART",
        };
      }
    }
  }
  async deleteCart(id) {
    try {
      let data = await fs.promises.readFile(CartUrl, "utf-8");
      let carts = JSON.parse(data);
      if (!carts.some((cart) => cart.id === id))
        return {
          status: "error",
          message: "No hay CART con el id especificado",
        };
      let cart = carts.find((v) => v.id === id);
      if (cart.adopted) {
        try {
          let userData = await fs.promises.readFile(
            "./files/users.txt",
            "utf-8"
          );
          let users = JSON.parse(userData);
          users.forEach((user) => {
            if (user.cart === id) {
              user.hasCart = false;
              delete user["cart"];
            }
          });
          await fs.promises.writeFile(
            "./files/users.txt",
            JSON.stringify(users, null, 2)
          );
        } catch (error) {
          return {
            status: "error",
            message: "Fallo al eliminar el CART: " + error,
          };
        }
      }
      let aux = carts.filter((cart) => cart.id !== id);
      try {
        await fs.promises.writeFile(CartUrl, JSON.stringify(aux, null, 2));
        return { status: "success", message: "CART eliminado" };
      } catch {
        return {
          status: "error",
          message: "No se pudo eliminar el CART",
        };
      }
    } catch {
      return { status: "error", message: "Fallo al eliminar el CART" };
    }
  }
  async updateCart(id, body) {
    try {
      let data = await fs.promises.readFile(CartUrl, "utf-8");
      let carts = JSON.parse(data);
      if (!carts.some((pt) => pt.id === id))
        return {
          status: "error",
          message: "No hay CARTS con el id especificado",
        };
      let result = carts.map((cart) => {
        if (cart.id === id) {
          if (cart.adopted) {
            body = Object.assign(body, { adopted: true, owner: cart.owner });
            body = Object.assign({ id: cart.id, ...body });
            return body;
          } else {
            body = Object.assign(body, { adopted: false });
            body = Object.assign({ id: id, ...body });
            return body;
          }
        } else {
          return cart;
        }
      });
      try {
        await fs.promises.writeFile(CartUrl, JSON.stringify(result, null, 2));
        return { status: "success", message: "CART actualizado" };
      } catch {
        return { status: "error", message: "Error al actualizar el CART" };
      }
    } catch (error) {
      return {
        status: "error",
        message: "Fallo al actualizar el CART: " + error,
      };
    }
  }
  async addToCart(cartid, uid) {
    try {
      let cartData = await fs.promises.readFile(CartUrl, "utf-8");
      let userData = await fs.promises.readFile("./files/users.txt", "utf-8");
      let carts = JSON.parse(cartData);
      let users = JSON.parse(userData);
      let cart = carts.find((v) => v.id === cartid);
      let user = users.find((v) => v.id === uid);
      if (!cart) return { status: "error", message: "No se encontró CART" };
      if (!user) return { status: "error", message: "Usuario no encontrado" };
      if (cart.adopted)
        return { status: "error", message: "La CART ya está adoptada" };
      if (user.hasCart)
        return {
          status: "error",
          message: "El usuario ya tiene CART adoptado",
        };
      cart.adopted = true;
      user.hasCart = true;
      cart.owner = user.id;
      user.cart = cart.id;
      let userAux = users.map((us) => {
        if (us.id === user.id) {
          return user;
        } else {
          return us;
        }
      });
      let cartAux = carts.map((pt) => {
        if (pt.id === cart.id) {
          return cart;
        } else {
          return pt;
        }
      });
      await fs.promises.writeFile(CartUrl, JSON.stringify(cartAux, null, 2));
      await fs.promises.writeFile(
        "./files/users.txt",
        JSON.stringify(userAux, null, 2)
      );
      return { status: "success", message: "CART agregado! Felicidades" };
    } catch (error) {
      return {
        status: "error",
        message: "No se pudo agregar al CART: " + error,
      };
    }
  }

  //
}

export default Cart;
