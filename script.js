const menuElement = document.querySelector("#menu");
const menuTitle = document.createElement("h2");
menuTitle.textContent = "Menu";
menuTitle.classList.add("menu-header");
menuElement.append(menuTitle);

async function createMenu(){
  let response = await fetch('menu.json');
  let menuArray = await response.json();

  // Create Menu Container
  let menuContainer = document.createElement("div");
  menuContainer.classList.add("menu-container");
  
  // Loop through every menu item 
  for(let i = 0; i < menuArray.length; i++){
    // Create Menu Section
    let menuType = createMenuType(menuArray[i]);
    let menuPriceTypes = createMenuPrices(menuArray[i].priceTypes);
    let menuItems = createMenuItems(menuArray[i].menuItems, menuPriceTypes);

    // Add Event Listener 
    setClickEvent(menuType, menuItems);

    menuContainer.append(menuType, menuItems);
  }

  menuElement.append(menuContainer);
}

function createMenuType(menuData){
  let menuFoodType = document.createElement("div");
  menuFoodType.classList.add("menu__food-type");
  
  let menuFoodTypeHeader = document.createElement("h2"); 
  menuFoodTypeHeader.textContent = menuData.foodType;
  menuFoodType.append(menuFoodTypeHeader);
  
  let menuFoodTypeArrow = document.createElement("img"); 
  menuFoodTypeArrow.src = "./images/arrow.svg";
  menuFoodType.append(menuFoodTypeArrow);

  menuFoodType.dataset.open = false;
  
  return menuFoodType;
}

function createMenuPrices(menuPriceArray){
  let priceContainer = document.createElement("div");
  priceContainer.classList.add("menu__price-container");

  for(let i = 0; i < menuPriceArray.length; i++){
    let priceElement = document.createElement("p");
    priceElement.textContent = menuPriceArray[i];
    priceContainer.append(priceElement);
  }

  return priceContainer;
}

function createMenuItems(menuItemsArray, priceTypes){
  let menuItemContainer = document.createElement("div");
  menuItemContainer.classList.add("menu__food-item-container");

  menuItemContainer.append(priceTypes);

  for(let i = 0; i < menuItemsArray.length; i++){

    let menuItemElement = document.createElement("div");
    menuItemElement.classList.add("menu__food-item");

    let menuItemContent = document.createElement("div");
    menuItemContent.classList.add("menu__food-item__content");

    let menuItemTitle = document.createElement("h2");
    menuItemTitle.textContent = menuItemsArray[i].itemTitle;

    let menuItemDescription = document.createElement("p");
    menuItemDescription.textContent = menuItemsArray[i].itemDescription;

    let menuItemPrice = document.createElement("div"); 
    menuItemPrice.classList.add("menu__food-item__price");

    if(menuItemsArray[i].hasMultiplePrices){
      // TODO FIX PRICE LENGTH HANDLING
      for(let j = 0; j < menuItemsArray[i].price.length; j ++){
        let menuItemPriceElement = document.createElement("p");
        menuItemPriceElement.textContent = menuItemsArray[i].price[j]; 
        menuItemPrice.append(menuItemPriceElement);
      }
    }
    else{
      let menuItemPriceElement = document.createElement("p");
      let menuItemPriceEmpty = document.createElement("p");
      menuItemPriceElement.textContent = menuItemsArray[i].price[0];
      menuItemPriceEmpty.textContent = " ";
      menuItemPrice.append(menuItemPriceEmpty, menuItemPriceElement);
    }
    menuItemContent.append(menuItemTitle, menuItemDescription);
    menuItemElement.append(menuItemContent, menuItemPrice);
    menuItemContainer.append(menuItemElement);
  }

  return menuItemContainer;
}

function setClickEvent(menuType, menuItems){
  menuType.addEventListener("click", (e) => {

    if(e.target.dataset.open == "true"){
      e.target.dataset.open = "false";

      menuItems.style.maxHeight = "0px";

      menuItems.classList.add("close-food-item-container");
      menuItems.classList.remove("open-food-item-container");

      menuType.querySelector("img").classList.remove("spin-arrow");
      menuType.querySelector("img").classList.add("unspin-arrow");
    }
    else{
      e.target.dataset.open = "true";

      menuItems.style.display = "block";
      menuItems.style.maxHeight = menuItems.scrollHeight + "px";
      
      menuItems.classList.remove("close-food-item-container");
      menuItems.classList.add("open-food-item-container");

      menuType.querySelector("img").classList.remove("unspin-arrow");
      menuType.querySelector("img").classList.add("spin-arrow");
    }
  });
}

createMenu();
