const cartItems = []; 
class CartItem {
  constructor(id, name, price, quantity, author, genre) {
    this.id = id;      
    this.name = name;    
    this.price = price;
    this.quantity = quantity;
    this.author = author; 
    this.genre = genre;   
  }
}
module.exports = { cartItems, CartItem };
