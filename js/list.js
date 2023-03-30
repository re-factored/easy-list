"use strict";

const itemList = document.getElementById('item-list');

let id = 0;


function getFromLocalStorage() {
  return localStorage.getItem("itemsList");
}

// Displays stored items on list
function displayItems() {
  // Clear the existing list items
  itemList.innerHTML = '';
  const storedItems = JSON.parse(getFromLocalStorage());

  // Sort the state array by category
  storedItems.sort((a, b) => (a.category > b.category) ? 1 : -1);

  // Loop through the state array and create a new list item for each item
  storedItems.forEach((item) => {
    let cat = item.category;
    cat = cat.replace(' ', '_')
    cat = cat.toLowerCase();

    id++;

    const divEl = document.createElement('div');
    divEl.classList.add('flex','flex-row', 'justify-between', 'align-center')
    divEl.innerHTML = `
          <div class="categoryCheckBox">
            <input type="checkbox" id="item${id}" ${item.isAdded ? 'checked' : ''}>
            <label for="item${id}" ${item.isAdded ? 'style="text-decoration: line-through;"' : ''}>${item.itemName} - ${item.quantity} ${item.ucm} <span class="category ${cat}">${item.category} </span></label>
          </div>
          <div><i class="fa-solid fa-xmark" style="color: #d60a0a;"></i></div>
        `;

        let checkbox = divEl.querySelector(`#item${id}`);
        checkbox.addEventListener('change', function(event){
          let isChecked = event.target.checked;
          item.isAdded = isChecked;
          storedItems.sort((a, b) => (a.category > b.category) ? 1 : -1);
          localStorage.setItem("itemsList", JSON.stringify(storedItems));
          displayItems();
        });

    // itemList.appendChild(li);
    itemList.appendChild(divEl);
  });
}

displayItems();

function removeTest(itemName) {
  console.log("name --- ", itemName);
  let storedItems = JSON.parse(localStorage.getItem("itemsList"));
  storedItems = storedItems.filter((item) => item.itemName !== itemName);
  localStorage.setItem("itemsList", JSON.stringify(storedItems));
  renderShoppingList();
}

const clearButton = document.getElementById("clear_list_button");

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  itemList.innerHTML = "";
  localStorage.removeItem("itemsList");
});
