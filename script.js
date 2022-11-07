const menuElement = document.querySelector("#menu");

fetch('menu.json').then(res => {
  if(res.ok){
    console.log("Successful");
  }
  else{
    console.log("Not Successful");
  }
  return res.json();
}).then(data => {
  // FOR EVERY MENU ITEM FOOD TYPE
  for(let i = 0; i < data.length; i++){
    let menuFoodType = document.createElement("div");
    let menuFoodTypeHeader = document.createElement("h2"); 
    menuFoodTypeHeader.textContent = data[i].foodType;
    menuFoodType.append(menuFoodTypeHeader);

    // APPEND TO MENU
    menuElement.append(menuFoodType);

    let menuItemsArray = data[i].menuItems;
    // FOR EVERY FOOD ITEM
    for(let j = 0; j < menuItemsArray.length; j++){
      let menuItemElement = document.createElement("div");
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

      menuElement.append(menuItemElement);
    }
  }
});


