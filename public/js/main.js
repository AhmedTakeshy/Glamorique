let sections_linkes = document.querySelectorAll(".sections_linkes li");
let list_menu_links = document.querySelectorAll(".list_menu li");
let image_section = document.querySelectorAll(".image_section");
let menu_Icon = document.querySelector(".menu-icon");
let side_Menu = document.querySelector(".side_menu");

// start ads window 
let ads_container = document.querySelector(".ads_container");
document.body.addEventListener("load",() => {
  console.log('Is load');
  ads_container.classList.add('open');
})
// end ads window 

// start open side menu form BTn
menu_Icon.addEventListener("click", () => {
  side_Menu.classList.add("active");
});
// end open side menu form BTn

// start close Side menu form anywere
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
let lower_value_range = document.getElementById("lower");
let max_value_range = document.getElementById("max");
let lower_value_view = document.getElementById("min_value");
let max_value_view = document.getElementById("max_value");
max_value_view.innerHTML = "max $" + max_value_range.value;
lower_value_view.innerHTML = "min $" + lower_value_range.value;

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
let color_Picker = document.getElementById("color_picker");
color_Picker.oninput = () => {
  console.log(color_Picker.value);
};

// ////////////////////start-get-color//////////////////////////////////

// ////////////////////start-get-data-atrrbiute--function//////////////
let check_filter_data = document.querySelectorAll(".check_filter");
check_filter_data.forEach((ele) => {
  console.log(ele);
});

// ////////////////////end-get-data-atrrbiute--function//////////////
