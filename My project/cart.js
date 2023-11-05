// cart.js

var cartItems = [];

function updateCartView() {
  var cartContainer = $("#cart-items");
  cartContainer.empty();

  cartItems.forEach(function(item) {
    var cartItemDiv = $("<div>").addClass("cart-item");
    cartItemDiv.append($("<h4>").text(item.name));
    cartItemDiv.append($("<p>").text("Price: " + item.price + "₸"));
    cartItemDiv.append($("<p>").text("Quantity: " + item.quantity));

    cartContainer.append(cartItemDiv);
  });
}

$(document).ready(function() {
  $(".ccart").click(function() {
    var itemName = $(this).siblings("h4").text();
    var itemPrice = parseInt($(this).siblings("p").text().replace("₸", "").trim());
    var itemQuantity = parseInt($(this).siblings(".quantitysection").find('input[name="quantity"]').val());

    addToCart(itemName, itemPrice, itemQuantity);
  });

  function addToCart(name, price, quantity) {
    var itemExists = false;
    cartItems.forEach(function(item) {
      if (item.name === name) {
        item.quantity += quantity;
        itemExists = true;
      }
    });

    if (!itemExists) {
      cartItems.push({ name: name, price: price, quantity: quantity });
    }

    updateCartView();
  }
});
    