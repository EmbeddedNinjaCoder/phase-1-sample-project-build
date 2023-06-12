//https://www.themealdb.com/api/json/v1/1/list.php?a=list

// Elements
const cuisineSelect = document.querySelector("#cuisines")
const categorySelect = document.querySelector("#categories")

// Function Calls
getCuisines()
getCategories()

// Event Listeners
cuisineSelect.addEventListener("change", getRecipesByCuisine)
// categorySelect.addEventListener("change", getRecipesByCategory)


// Dropdown Functions
function getCuisines() {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    .then(r => r.json())
    .then(cuisines => renderCuisineOptions(cuisines.meals))
    .catch(error => alert(error))
}

function getCategories() {
    fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
    .then(r => r.json())
    .then(categories => renderCategoryOptions(categories.meals))
    .catch(error => alert(error))
    
}

function renderCuisineOptions(cuisines) {
    cuisines.forEach(cuisine => {
        const option = document.createElement("option")
        option.value = cuisine.strArea
        option.textContent = cuisine.strArea
        cuisineSelect.append(option)
    });
}

function renderCategoryOptions(categories) {
    categories.forEach(category => {
        const option = document.createElement("option")
        option.value = category.strCategory
        option.textContent = category.strCategory
        categorySelect.append(option)
    });
}

// Recipe Collection Functions

function getRecipesByCuisine(e) {
    const cuisine = e.target.value

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
      .then(r => r.json())
      .then(recipes => renderAllRecipes(recipes.meals))
      .catch(error => alert(error))
}

function renderAllRecipes(recipes) {
    recipes.forEach(recipe => {
        console.log(recipe)
     })
     cuisineSelect.value = ""
     categorySelect.value = ""
}