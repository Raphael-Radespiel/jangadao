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
    let menuType = createMenuType(menuArray[i]);
    let menuItems = createMenuItems(menuArray[i].menuItems);

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
  
  return menuFoodType;
}

function createMenuItems(menuItemsArray){
  let menuItemContainer = document.createElement("div");
  menuItemContainer.classList.add("menu__food-item-container");

  for(let i = 0; i < menuItemsArray.length; i++){

    let menuItemElement = document.createElement("div");
    menuItemElement.classList.add("menu__food-item");

    let menuItemTitle = document.createElement("h2");
    menuItemTitle.textContent = menuItemsArray[i].itemTitle;

    let menuItemDescription = document.createElement("p");
    menuItemDescription.textContent = menuItemsArray[i].itemDescription;

    let menuItemPrice = document.createElement("div"); 

    if(menuItemsArray[i].hasMultiplePrices){
      for(let j = 0; j < menuItemsArray[i].price.length; j += 2){
        let menuItemPriceElement = document.createElement("p");
        menuItemPriceElement.textContent = menuItemsArray[i].price[j] +
          ": " + menuItemsArray[i].price[j + 1]; 
        menuItemPrice.append(menuItemPriceElement);
      }
    }
    else{
      let menuItemPriceElement = document.createElement("p");
      menuItemPriceElement.textContent = menuItemsArray[i].price[0];
      menuItemPrice.append(menuItemPriceElement);
    }
    menuItemElement.append(menuItemTitle, menuItemDescription, menuItemPrice);
    menuItemContainer.append(menuItemElement);
  }

  return menuItemContainer;
}

createMenu();
