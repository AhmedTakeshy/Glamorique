let sections_linkes = document.querySelectorAll(".sections_linkes li");
let list_menu_links = document.querySelectorAll(".list_menu li");
let image_section = document.querySelectorAll(".image_section");
let menu_Icon = document.querySelector(".menu-icon");
let side_Menu = document.querySelector(".side_menu");
const showCart = document.querySelector(".showCart");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartHtml = document.querySelector(".cart");

for (let button of addToCartButtons) {
  button.addEventListener("click", async (e) => {
    console.log("clicked");
    // e.preventDefault();
    const productId = e.target.dataset.id;
    const response = await fetch("/add-to-cart", {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    data();
  });
}
async function data() {
  const response = await fetch("/add-to-cart");
  const res = await response.json();
  updateCartInformationOnPage(res);
}

function updateCartInformationOnPage(cart) {
  // Update the total amount on the page
  const totalAmount = document.getElementById("totalAmount");
  const cartDiv = document.querySelector(".display-product");
  const totalQuantity = document.querySelector(".quantity-value");
  const product = cart.items
    .map((item) => {
      return ` 
      <div class = 'car_product d-flex align-items- ' >
          <p>${item.name}</p>
          <p>${item.price}</p>
          <div class = 'Counter d-flex align-items-center justify-content-center '>
         <button class ='btn btn-primary'>+</button>
         <input type="text" value = ${item.quantity}>
         <button class =' btn btn-primary'>-</button>
          </div>
<div class='remove-content d-flex align-items-center justify-content-center'>
 <button class = "Remove-product btn btn-danger "  data-removeproduct = '${item.id}' >delete</button>
</div>
      </div>
      <hr/>    
`;
    })
    .join("");

  totalAmount.innerText = `Total: $${cart.totalAmount}`;
  cartDiv.innerHTML = product;
  // Update the number of items on the page
  // const product = document.getElementById("product");
  // Update the list of items on the page
  // product.innerHTML = "";
  // for (let item of cart.items) {
  //   const pName = document.createElement("p");
  //   const pPrice = document.createElement("p");
  //   const pQty = document.createElement("p");
  //   pName.innerText = `Name: ${item.name}`;
  //   pPrice.innerText = `Price: ${item.price} `;
  //   pQty.innerText = `Quantity: ${item.quantity}`;
  //   product.appendChild(pName);
  //   product.appendChild(pPrice);
  //   product.appendChild(pQty);
  // }
}

const BTn_Remove = [...document.querySelectorAll(".Remove-product")];
BTn_Remove.forEach((Btn) => {
  Btn.addEventListener("click", () => {
    const ProductIdRemove = Btn.dataset.removeproduct;
    console.log(json.stringify(ProductIdRemove));
    fetch("/remove-from-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json.stringify({ ProductIdRemove }),
    });
  });
});

showCart.addEventListener("click", function (e) {
  e.stopPropagation();
  cartHtml.classList.toggle("hidden");
  data();
});

// start ads window
let ads_container = document.querySelector(".ads_container");
document.body.addEventListener("DOMContentLoaded", () => {
  console.log("Is load");
  ads_container.classList.add("open");
});
// end ads window

// start open side menu form BTn
menu_Icon.addEventListener("click", () => {
  side_Menu.classList.add("active");
});
// end open side menu form BTn

// start close Side menu form anywhere
document.body.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("side_menu") ||
    e.target.classList.contains("menu-icon") ||
    e.target.classList.contains("Link_Section") ||
    e.target.classList.contains("Header_linke") ||
    e.target.classList.contains("image_section") ||
    e.target.classList.contains("img_slider")
  ) {
  } else {
    side_Menu.classList.remove("active");
  }
});
// end close Side menu form anywere
//  start chang content of side menu
AddAcvtive();
function AddAcvtive() {
  list_menu_links.forEach((section) => {
    section.addEventListener("click", (e) => {
      document.querySelectorAll(".list_menu li").forEach((li) => {
        li.classList.remove("active");
      });
      e.target.classList.add("active");
      image_section.forEach((imgSection) => {
        imgSection.classList.remove("active");
        if (e.target.dataset.type == imgSection.dataset.img) {
          imgSection.classList.add("active");
        }
      });
      sections_linkes.forEach((links) => {
        links.classList.remove("active");
        if (e.target.dataset.type == links.dataset.name) {
          links.classList.add("active");
        }
      });
    });
  });
}
//  end chang content of side menu

$(document).ready(function () {
  const btnToTop = $(".backTop");
  $(window).on("scroll", scrollTopFade);
  $(btnToTop).on("click", function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });

  function scrollTopFade() {
    if ($(window).scrollTop() > 100) {
      $(btnToTop).fadeIn();
    } else {
      $(btnToTop).fadeOut();
    }
  }
});
// /////////////////////////////////////////////////////////////////
// /////////////////////start filter section ///////////////////////

// ////////////////////start-Arrow-Down-function//////////////////////////
let Arrow_down = document.querySelectorAll(".Arrow_down");
Arrow_down.forEach((Arrow) => {
  Arrow.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log(e.target);
    e.target.closest(".list").classList.toggle("Full-heigt");
    e.target.closest(".list").classList.contains("Full-heigt")
      ? (e.target.innerHTML = `<i class="fa-solid fa-angle-up"></i>`)
      : (e.target.innerHTML = `<i class="fa-solid fa-angle-down  " ></i>`);
  });
});
// ////////////////////end-Arrow-Down-function//////////////////////////
// ////////////////////start-get-value//////////////////////////////////
let lower_value_range = document.getElementById("lower")
  ? document.getElementById("lower")
  : "";
let max_value_range = document.getElementById("max")
  ? document.getElementById("max")
  : "";
let lower_value_view = document.getElementById("min_value")
  ? document.getElementById("min_value")
  : "";
let max_value_view = document.getElementById("max_value")
  ? document.getElementById("max_value")
  : "";
max_value_view.innerHTML =
  "max $" + (max_value_range ? max_value_range.value : "");
lower_value_view.innerHTML =
  "min $" + (lower_value_range ? lower_value_range.value : "");

lower_value_range.oninput = function () {
  lower_value_range.value >= max_value_range.value
    ? (lower_value_range.value = max_value_range.value - 100)
    : "lower_value_range.value";
  lower_value_view.innerHTML = "min $" + lower_value_range.value;
};
max_value_range.oninput = () => {
  max_value_range.value <= lower_value_range.value
    ? (max_value_range.value = lower_value_range.value + 100)
    : "max_value_range.value";
  max_value_view.innerHTML = "max $" + max_value_range.value;
};
// ////////////////////end-get-value///////////////////////////////////
// ////////////////////start-get-color//////////////////////////////////
let color_Picker = document.getElementById("color_picker")
  ? document.getElementById("color_picker")
  : "";
color_Picker.oninput = () => {
  console.log(color_Picker.value);
};

// ////////////////////start-get-color//////////////////////////////////

// ////////////////////start-get-data-attribute--function//////////////
let check_filter_data = document.querySelectorAll(".check_filter");
check_filter_data.forEach((ele) => {
  console.log(ele);
});

// ////////////////////end-get-data-atrrbiute--function//////////////

// end price section in product page
