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


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const draggableElements = document.querySelectorAll('.draggable');
const dropContainer = document.querySelector('.options-container');

const shuffledElements = shuffleArray(Array.from(draggableElements));
shuffledElements.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });

    dropContainer.appendChild(draggable);
});

dropContainer.addEventListener('dragover', event => {
    event.preventDefault();
    const afterElement = getDragAfterElement(dropContainer, event.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
        dropContainer.appendChild(draggable);
    } else {
        dropContainer.insertBefore(draggable, afterElement);
    }
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function checkOrder() {
    const orderedElements = document.querySelectorAll('.draggable');
    const correctOrder = Array.from(orderedElements).every((element, index) => {
        return element.getAttribute('data-order') == index + 1;
    });
    return correctOrder;
}

dropContainer.addEventListener('dragend', () => {
    if (checkOrder()) {
        const popup = document.getElementById('popup');
        const closeButton = document.querySelector('.close-btn');
        popup.style.display = 'flex';
        closeButton.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }
});
