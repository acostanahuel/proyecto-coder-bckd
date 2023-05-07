import fs from 'fs'

class Cart {
  constructor(id) {
    this.id = id;
    this.products = new Array;
  }
}

class CartManager {
  static cartsDirPath = "./database";
  static cartsFilePath = CartManager.cartsDirPath + "/carts.json";

  constructor() {
    this.cart = new Array;
  }

  fileCreator = async () => {
    await fs.promises.mkdir(CartManager.cartsDirPath, { recursive: true });
    if (!fs.existsSync(CartManager.cartsFilePath)) {
      await fs.promises.writeFile(CartManager.cartsFilePath, "[]");
    }
  }

  addCart = async () => {
    await this.getCart();
    let id = this.cart.length
    let newCart = new Cart(id);
    console.log(`Creating new cart:`);
    console.log(newCart);
    try {
      this.cart.push(newCart);
      console.log("Updating cart list:")
      console.log(this.cart);
      await fs.promises.writeFile(CartManager.cartsFilePath, JSON.stringify(this.cart));
    } catch (error) {
      console.error(Error`Creating new product" ${JSON.stringify(newProduct)}, error detail: ${error}`);
      throw Error(Error`Creating new product:" ${JSON.stringify(newProduct)}, error detail: ${error}`);
    } finally { return newCart }
  }

  getCart = async () => {
    try {
      await this.fileCreator();
      let cartFile = await fs.promises.readFile(CartManager.cartsFilePath, "utf-8");
      console.log("JSON file obtained from file:");
      console.log(cartFile);
      this.cart = JSON.parse(cartFile);
      console.log(this.cart);
      return this.cart;
    } catch (error) {
      console.error(`Error consulting the carts by file, validate the file: ${this.cart},error detail ${error}`);
      throw Error(`Error consulting the carts by file, validate the file: ${this.cart}, error detail ${error}`);
    }
  }

  getCartById = async (id) => {
    try {
      await this.getCart();
      const cartId = this.cart.find(c => c.id == id);
      if (cartId) {
        console.log("Cart found by ID:")
        console.log(cartId);
        return cartId
      } else {
        console.warn("Cart not found by ID" + id);
      }
    } catch (error) {
      console.error(`Error consulting the cart by specific ID: ${this.id}, error detail ${error}`);
      throw Error(`Error consulting the cart by specific ID: ${this.id}, error detail ${error}`);
    }
  }

  cartBuilder = async (cart, product) => {
    await this.getCart();
    const { id } = product;
    const item = { "id": id, "quantity": 1 };
    const repeated = cart.products.find(p => p.id == id);
    repeated ? repeated.quantity++ : cart.products.push(item);
    const updateCart = this.cart.map((c) => { if (c.id === cart.id) { return cart; } else { return c } });
    this.cart = updateCart
    console.log(this.cart)
    await fs.promises.writeFile(CartManager.cartsFilePath, JSON.stringify(this.cart));
  }
}




export default CartManager;
