const hamburger = document.querySelector(".hamburger-menu");
const header = document.querySelector("header");
const content = document.querySelector("#hamburger-content");

hamburger.dataset.isOpen = "false";

hamburger.addEventListener("click", () => {
  if(hamburger.dataset.isOpen == "false"){
    openHamburger();
  }
  else if(hamburger.dataset.isOpen == "true"){
    closeHamburger();
  }
});

function openHamburger(){
  hamburger.dataset.isOpen = "true";
  hamburger.src = "./images/bx-x.svg";

  header.style.backgroundColor = "var(--clr-accent)";

  content.classList.add("content-opened");
  content.classList.remove("content-closed");
}

function closeHamburger(){
  hamburger.dataset.isOpen = "false";
  hamburger.src = "./images/bx-menu.svg";

  header.style.backgroundColor = "var(--clr-primary)";

  content.classList.remove("content-opened");
  content.classList.add("content-closed");
}
