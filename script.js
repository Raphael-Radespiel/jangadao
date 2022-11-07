const menuElement = document.querySelector("#menu");
const menuTitle = document.createElement("h2");
menuTitle.textContent = "Menu";
menuTitle.classList.add("menu-header");
menuElement.append(menuTitle);

// MENU FOOD-TYPE

fetch('menu.json').then(res => {
  if(res.ok){
    console.log("Successful");
  }
  else{
    console.log("Not Successful");
  }
  return res.json();
}).then(data => {
  
  // Food Container
  let menuContainer = document.createElement("div");
  menuContainer.classList.add("menu-container");

  // FOR EVERY MENU ITEM FOOD TYPE
  for(let i = 0; i < data.length; i++){
    
    // Create Food Type black bar
    let menuFoodType = document.createElement("div");
    menuFoodType.classList.add("menu__food-type");

    // Food Type header
    let menuFoodTypeHeader = document.createElement("h2"); 
    menuFoodTypeHeader.textContent = data[i].foodType;
    menuFoodType.append(menuFoodTypeHeader);
    
    // Food Type arrow 
    let menuFoodTypeArrow = document.createElement("img"); 
    menuFoodTypeArrow.src = "./images/arrow.svg";
    menuFoodType.append(menuFoodTypeArrow);

    // APPEND TO MENU
    menuContainer.append(menuFoodType);
    // NOT YET, ONLY APPEND AFTER 

    // FOOD ITEM
    let menuItemsArray = data[i].menuItems;
    let menuItemContainer = document.createElement("div");
    menuItemContainer.classList.add("menu__food-item-container");

    // FOR EVERY FOOD ITEM
    for(let j = 0; j < menuItemsArray.length; j++){
      let menuItemElement = document.createElement("div");
      menuItemElement.classList.add("menu__food-item");
      let menuItemTitle = document.createElement("h2");
      menuItemTitle.textContent = menuItemsArray[j].itemTitle;
      let menuItemDescription = document.createElement("p");
      menuItemDescription.textContent = menuItemsArray[j].itemDescription;

      let menuItemPrice = document.createElement("div"); 
      if(menuItemsArray[j].hasMultiplePrices){
        for(let p = 0; p < menuItemsArray[j].price.length; p += 2){
          let menuItemPriceElement = document.createElement("p");
          menuItemPriceElement.textContent = menuItemsArray[j].price[p] +
            ": " + menuItemsArray[j].price[p + 1]; 
          menuItemPrice.append(menuItemPriceElement);
        }
      }
      else{
        let menuItemPriceElement = document.createElement("p");
        menuItemPriceElement.textContent = menuItemsArray[j].price[0];
        menuItemPrice.append(menuItemPriceElement);
      }

      menuItemElement.append(menuItemTitle, menuItemDescription, menuItemPrice);

      menuItemContainer.append(menuItemElement);
    }
    
    menuContainer.append(menuItemContainer);
    menuElement.append(menuContainer);
  }
});


