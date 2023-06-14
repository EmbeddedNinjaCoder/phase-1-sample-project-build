// Welcome section
function showWelcome() {
    recipeDetailsContainer.style.display = "none"
    recipeContainer.style.display = "none"
    welcomeSection.style.display = "grid"
    featuredRecipeDiv.replaceChildren()
    featuredRecipeDiv.textContent = "Featured Recipe"
    selectionH1.textContent = ""
    getFeaturedRecipe()
 }
 
 function getFeaturedRecipe() {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
       .then(r => r.json())
       .then(recipe => renderRecipeCard(recipe.meals[0], true))
       .catch(error => alert(error))
 }

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
    })
 }
 
 function renderCategoryOptions(categories) {
    categories.forEach(category => {
       const option = document.createElement("option")
       option.value = category.strCategory
       option.textContent = category.strCategory
       categorySelect.append(option)
    })
 }