let sections_linkes = document.querySelectorAll(".sections_linkes li");
let list_menu_links = document.querySelectorAll(".list_menu li");
let image_section = document.querySelectorAll(".image_section");
let menu_Icon = document.querySelector(".menu-icon");
let side_Menu = document.querySelector(".side_menu");

// start open side menu form BTn
menu_Icon.addEventListener("click",() => {
    side_Menu.classList.add("active");
})
// end open side menu form BTn
///////////////////////////////////////////////////////////////////////////
// start close Side menu form anywere
document.body.addEventListener("click",(e) => {
    if(e.target.classList.contains("side_menu") || e.target.classList.contains("menu-icon") || e.target.classList.contains("Link_Section")
        || e.target.classList.contains("Header_linke") || e.target.classList.contains("image_section") || e.target.classList.contains("img_slider")) {
    } else {
        side_Menu.classList.remove("active");
    }
})
// end close Side menu form anywere
//  start chang content of side menu
AddAcvtive()
function AddAcvtive() {
    list_menu_links.forEach(section => {
        section.addEventListener("click",(e) => {
            document.querySelectorAll(".list_menu li").forEach(li => {
                li.classList.remove("active");
            })
            e.target.classList.add("active")
            image_section.forEach(imgSection => {
                imgSection.classList.remove("active")
                if(e.target.dataset.type == imgSection.dataset.img) {
                    imgSection.classList.add("active");
                }
            })
            sections_linkes.forEach(links => {
                links.classList.remove("active");
                if(e.target.dataset.type == links.dataset.name ) {
                    links.classList.add("active");
                }
            })
        })
    })
}
//  end chang content of side menu

