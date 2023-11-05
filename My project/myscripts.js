$("button").on("click", function(ev) {
    var currentButton = $(this);
    var currentQuantityInput = currentButton.closest(".d-flex").find('input[name="quantity"]');
    
    var currentQty = currentQuantityInput.val();
    var qtyDirection = currentButton.data("direction");
    var newQty = parseInt(currentQty);

    
    if (qtyDirection == "1") {
        newQty = parseInt(currentQty) + 1;
    } else if (qtyDirection == "-1" && newQty > 1) {
        newQty = parseInt(currentQty) - 1;
    }
    
    // make decrement disabled at 1
    if (newQty <= 1) {
        currentButton.closest(".d-flex").find(".decrement-quantity").attr("disabled", "disabled");
    } else {
        currentButton.closest(".d-flex").find(".decrement-quantity").removeAttr("disabled");
    }
    
    if (newQty > 0) {
        newQty = newQty.toString();
        currentQuantityInput.val(newQty);
    } else {
        currentQuantityInput.val("1");
    }
});


document.getElementById("loginButton").addEventListener("click", function() {
    var loginModal = new bootstrap.Modal(document.getElementById("loginModal"), {
      keyboard: false
    });
  
    // Show the modal
    loginModal.show();
  
    // Focus on the email input field when the modal is shown
    $('#loginModal').on('shown.bs.modal', function() {
      $('#email').focus();
    });
  
    // Validate email format
    document.getElementById("email").addEventListener("input", function() {
      var emailInput = document.getElementById("email");
      var emailError = document.getElementById("emailError");
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Invalid email format";
        emailInput.setCustomValidity("Invalid email format");
      } else {
        emailError.textContent = "";
        emailInput.setCustomValidity("");
      }
    });
  
    // Validate password length
    document.getElementById("password").addEventListener("input", function() {
      var passwordInput = document.getElementById("password");
      var passwordError = document.getElementById("passwordError")
      var loginButton = document.getElementById("loginButton");
  
      if (passwordInput.value.length < 8) {
        passwordError.textContent = "Invalid password format";
        passwordInput.setCustomValidity("Password must be at least 8 characters long");
        loginButton.disabled = true;
      } else {
        passwordError.textContent = "";
        passwordInput.setCustomValidity("");
        loginButton.disabled = false;
      }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("loginButton1").addEventListener("click", function() {
        var emailInput = document.getElementById("email");
        var passwordInput = document.getElementById("password");
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var errorAlert = document.getElementById("errorAlert");
        var successAlert = document.getElementById("successAlert");
    
        // Reset error messages
        errorAlert.textContent = "";
        errorAlert.classList.add("d-none");
    
        // Validate email and password
        if (!emailRegex.test(emailInput.value)) {
            errorAlert.textContent = "Invalid email format";
            errorAlert.classList.remove("d-none");
    
            // Hide error alert after 1 second
            setTimeout(function() {
                errorAlert.classList.add("d-none");
            }, 1000);
        } else if (passwordInput.value.length < 8) {
            errorAlert.textContent = "Password must be at least 8 characters long";
            errorAlert.classList.remove("d-none");
    
            // Hide error alert after 1 second
            setTimeout(function() {
                errorAlert.classList.add("d-none");
            }, 1000);
        } else {
            // Hide error alert (if visible)
            errorAlert.classList.add("d-none");
    
            // Display success message
            successAlert.textContent = "Login successful!";
            successAlert.classList.remove("d-none");
    
            // Hide success alert after 1 second
            setTimeout(function() {
                successAlert.classList.add("d-none");
            }, 1000);
    
            // Redirect to independent.html after 3 seconds
            setTimeout(function() {
                window.location.href = "index.html";
            }, 500);
        }
    });
    
});

$(".ccart").click(function (e) {
    // Show the success-checkmark element
    const successCheckmark = $(".success-checkmark");
    successCheckmark.removeClass("d-none");

    // Calculate the center of the viewport
    const viewportWidth = $(window).width();
    const viewportHeight = $(window).height();
    const checkmarkWidth = successCheckmark.width();
    const checkmarkHeight = successCheckmark.height();

    // Calculate the position to center the element
    const centerX = (viewportWidth - checkmarkWidth) / 2 + $(window).scrollLeft();
    const centerY = (viewportHeight - checkmarkHeight) / 2 + $(window).scrollTop();

    // Position the success-checkmark element at the center of the viewport
    successCheckmark.css({
        top: centerY + "px",
        left: centerX + "px",
    });

    // Hide the pop-up window after 3 seconds (3000 milliseconds)
    setTimeout(function () {
        successCheckmark.addClass("d-none");
    }, 1500);
});

document.getElementById('scrollToBottomLink').addEventListener('click', function(event) {
    event.preventDefault();
    // Scroll to the bottom of the page
    window.scrollTo(0, document.body.scrollHeight);
});

$(".ccart").click(function() {
    var productImage = $(this).closest(".grid-item").find("img").attr("src");
    var productName = $(this).closest(".grid-item").find("h4").text();
    var productPrice = $(this).closest(".grid-item").find("p").text();
    var productQuantity = $(this).closest(".grid-item").find('input[name="quantity"]').val();

    var product = {
        image: productImage,
        name: productName,
        price: productPrice,
        quantity: productQuantity
    };

    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

});


document.addEventListener("DOMContentLoaded", function() {
    updateCart();
});

function updateCart() {
    // Retrieve cart items from local storage
    var cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Get the cart container and total cost element
    var cartContainer = document.getElementById("cart-items");
    var totalCostElement = document.getElementById("total-cost");
    var totalCost = 0;

    // Clear the cart container before updating
    cartContainer.innerHTML = "";

    // Iterate through the cart items and update the DOM
    cartItems.forEach(function(item, index) {
        // Create a new cart item element
        var cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        // Create elements for item details
        var imageElement = document.createElement("img");
        imageElement.src = item.image;
        imageElement.alt = item.name;

        var detailsElement = document.createElement("div");
        detailsElement.classList.add("product-details");

        var nameElement = document.createElement("h2");
        nameElement.textContent = item.name;

        var priceElement = document.createElement("p");
        priceElement.textContent = item.price;

        var quantityElement = document.createElement("p");
        quantityElement.textContent = "Quantity: " + item.quantity;

        // Create a remove button for each item
        var removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function() {
            // Remove the item from the cartItems array
            cartItems.splice(index, 1);
            // Update local storage
            localStorage.setItem("cart", JSON.stringify(cartItems));
            // Update the cart display
            updateCart();
        });

        // Append elements to cart item
        detailsElement.appendChild(nameElement);
        detailsElement.appendChild(priceElement);
        detailsElement.appendChild(quantityElement);
        detailsElement.appendChild(removeButton);

        cartItem.appendChild(imageElement);
        cartItem.appendChild(detailsElement);

        // Append the new cart item to the cart container
        cartContainer.appendChild(cartItem);

        // Calculate total cost
        totalCost += parseFloat(item.price.replace(/[^0-9.]/g, '')) * parseInt(item.quantity);
    });

    // Display the updated total cost
    totalCostElement.textContent = "Total Cost: " + formatCurrency(totalCost.toFixed(2)) + " ₸";
}

// Function to format the currency (add Tenge symbol and thousand separators)
function formatCurrency(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}



