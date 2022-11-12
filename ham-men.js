const hamburger = document.querySelector(".hamburger-menu");
const header = document.querySelector("header");
hamburger.dataset.isOpen = "false";

hamburger.addEventListener("click", () => {
  if(hamburger.dataset.isOpen == "false"){
    hamburger.dataset.isOpen = "true";
    hamburger.src = "./images/bx-x.svg";

    header.style.backgroundColor = "var(--clr-accent)";
  }
  else if(hamburger.dataset.isOpen == "true"){
    hamburger.dataset.isOpen = "false";
    hamburger.src = "./images/bx-menu.svg";

    header.style.backgroundColor = "var(--clr-primary)";
  }
});
