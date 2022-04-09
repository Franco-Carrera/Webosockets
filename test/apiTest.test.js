import supertest from "supertest";
import chai, { expect } from "chai";
import faker from "@faker-js/faker";

const request = supertest("http://localhost:3000/api");

describe("test API", () => {
  describe("USERS", () => {
    describe("READE (GET ALL) OK", () => {
      it("La peticion debería retornar status 200", async () => {
        let res = await request.get("/users");
        expect(res.status).to.equal(200);
      });
    });

    describe("CREATE (POST) OK", () => {
      //Para agregar usuario se debe ir cambiando email and username

      it("Debe poder guardar un usuario", async () => {
        let user = {
          first_name: "Maxi",
          last_name: "Barraza",
          email: "maximobar@gmail.com",
          password: "maximus",
          username: "max_22", //xq username tamb lo valida? checking
          phone: "541167896543",
          address: "Buenos Aires",
          age: 42,
          avatar: "maxiAvatar.jpg",
          role: "user",
        };
        let res = await request.post("/users").send(user);
        expect(res.status).to.be.equals(200);
      });
    });

    describe("READ (GET ONE) OK", () => {
      it("Operación para encontrar un usuario", async () => {
        const res = await request.get("/users");
        const result = await request.get(`/users/${res.body.users[0].id}`);
        expect(res.status).to.be.equals(200);
      });
    });

    describe("UPDATE (PUT) OK", () => {
      it("Se debe poder actualizar un usuario", async () => {
        const res = await request.get("/users");

        const user = {
          first_name: "Alejandro",
          last_name: "Magno",
          email: "alemagno@gmail.com",
          password: "alejandría", //add encrypt
          username: "alemagno",
          phone: "541148694921",
          address: "Macedonia",
          age: 33,
          role: "user",
          avatar: "alenew.jpg",
        };

        const result = await request
          .put(`/users/${res.body.users[0].id}`)
          .send(user);
        expect(result.status).to.be.equals(200);
        expect(result.body.user.email).to.be.equals(user.email);
      });
    });

    describe("DELETE (DELETE) OK", () => {
      it("Se debería poder eliminar un usuario", async () => {
        const res = await request.get("/users");
        const result = await request.delete(`/users/${res.body.users[0].id}`); //siempre elimina el primero, en front como sería?
        expect(result.status).to.be.equals(204);
      });
    });
  });
});

describe("PRODUCTS", () => {
  it("CREATE (POST) - OK", async () => {
    const product = {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.productAdjective(),
      code: faker.datatype.string(5),
      price: faker.commerce.price(150, 1000),
      stock: faker.datatype.number({ min: 10, max: 100 }),
      picture: faker.image.abstract(),
    };

    const result = await request.post("/products").send(product);
    expect(result.status).to.be.equals(200);
  });

  it("READ (GET ALL) - OK", async () => {
    const res = await request.get("/products");
    expect(res.status).to.be.equals(200);
  });

  it("READ (GET ONE) OK", async () => {
    const response = await request.get("/products");
    const product = await request.get(
      `/products/${response.body.products[0].id}`
    );
    expect(product.status).to.be.equals(200);
  });

  it("UPDATE (PUT) OK", async () => {
    const response = await request.get("/products");

    const product = {
      name: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.productAdjective(),
      code: faker.datatype.string(5),
      price: faker.commerce.price(150, 1000),
      stock: faker.datatype.number({ min: 10, max: 100 }),
      picture: faker.image.abstract(),
    };

    const result = await request
      .put(`/products/${response.body.products[0].id}`)
      .send(product);
    expect(result.status).to.be.equals(200);
    expect(result.body.product.code).to.be.equals(product.code);
  });

  it("DELETE (DELETE OK)", async () => {
    const response = await request.get("/products");
    const result = await request.delete(
      `/products/${response.body.products[0].id}`
    );
    expect(result.status).to.be.equals(204);
  });
});
///Hasta este proceso quedarían eliminados los users y productos creados.
//____(sólo si se corre el npm test)____con todos los métodos encadenados//

describe("CARTS", () => {
  describe("READ (GET ALL) OK", () => {
    it("La petición debería retornar status 200", async () => {
      const res = await request.get("/carts");
      expect(res.status).to.be.equals(200);
    });
  });

  describe("CREATE (POST) OK", () => {
    it("Debe poder crear un cart", async () => {
      const userBody = {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        age: faker.datatype.number({ min: 17, max: 58 }),
        avatar: faker.image.avatar(),
        role: "user",
      };

      const user = await request.post("/users").send(userBody);

      const body = { userId: user.body.user.id }; //log visto.
      console.log(user.body.user.id);

      let cart = await request.post("/carts").send(body);
      expect(cart.status).to.be.equals(200);
    });
  });

  describe("READ (GET ONE) OK", () => {
    it("Operación para obtener un cart", async () => {
      const carts = await request.get("/carts");
      const cart = await request.get(`/carts/${carts.body.carts[0].id}`);
      expect(cart.status).to.be.equals(200);
    });
  });

  describe("ADD PRODUCT TO CART (POST) OK", () => {
    //Si es necesario, coloco [1], para adjuntar productos en un nuevo cart.

    it("Debe poder agregar un producto al cart", async () => {
      const carts = await request.get("/carts");

      const productBody = {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.productAdjective(),
        code: faker.datatype.string(5),
        price: faker.commerce.price(150, 1000),
        stock: faker.datatype.number({ min: 10, max: 100 }),
        picture: faker.image.abstract(),
      };

      const product = await request.post("/products").send(productBody); //como método GET products, ahora desde POST

      const result = await request.post(
        `/carts/${carts.body.carts[0].id}/products/${product.body.product.id}`
      );
      expect(result.status).to.be.equals(200);
    });
  });

  describe("PRODUCTS FROM CART (GET) OK", () => {
    it("Operación para obtener productos del cart", async () => {
      const carts = await request.get("/carts");

      const productsInCart = await request.get(
        `/carts/${carts.body.carts[0].id}/products`
      );
      expect(productsInCart.status).to.be.equals(200);
    });
  });

  describe("DELETE PRODUCT FROM CART", () => {
    it("Se debería poder eliminar un cart", async () => {
      const carts = await request.get("/carts");

      const productBody = {
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.productAdjective(),
        code: faker.datatype.string(5),
        price: faker.commerce.price(150, 1000),
        stock: faker.datatype.number({ min: 10, max: 100 }),
        picture: faker.image.abstract(),
      };

      const product = await request.post("/products").send(productBody);
      await request.post(
        `/carts/${carts.body.carts[0].id}/products/${product.body.product.id}`
      );

      const result = await request.delete(
        `/carts/${carts.body.carts[0].id}/products/${product.body.product.id}`
      );
      expect(result.status).to.be.equals(204);
    });
  });
});
