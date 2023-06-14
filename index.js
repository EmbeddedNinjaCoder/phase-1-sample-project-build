// Elements
const cuisineSelect = document.querySelector("#cuisines")
const categorySelect = document.querySelector("#categories")
const recipeContainer = document.querySelector(".recipe-container")
const selectionH1 = document.querySelector(".selection-heading")
const recipeDetailsContainer = document.querySelector(
   ".recipe-details-container"
)
const recipeDetailsSection = document.querySelector(".recipe-details-section")
const welcomeSection = document.querySelector(".welcome")
const featuredRecipeDiv = document.querySelector(".featured")
const mainTitle = document.querySelector(".main-title")
const ingredientSearch = document.querySelector("#ingredient-search")

// Function Calls
showWelcome()
getCuisines()
getCategories()

// Event Listeners
cuisineSelect.addEventListener("change", getRecipesByCuisine)
categorySelect.addEventListener("change", getRecipesByCategory)
mainTitle.addEventListener("click", showWelcome)
ingredientSearch.addEventListener("search", getRecipesByIngredient)


// Recipe Collection Functions

function getRecipesByCuisine(e) {
   const cuisine = e.target.value

   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
      .then(r => r.json())
      .then(recipes => renderAllRecipes(recipes.meals))
      .catch(error => alert(error))
}

function getRecipesByCategory(e) {
   const category = e.target.value

   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(r => r.json())
      .then(recipes => renderAllRecipes(recipes.meals))
      .catch(error => alert(error))
}

function getRecipesByIngredient(e) {
   const ingredient = e.target.value
   if (!ingredient) return

   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
      .then(r => r.json())
      .then(recipes => {
         if (!recipes.meals) {
            console.log("no recipes")
            alert("That ingredient is not found in our recipe database")
         } else {
            renderAllRecipes(recipes.meals)
         }
      })
      .catch(error => alert(error))
}

function renderAllRecipes(recipes) {
   welcomeSection.style.display = "none"
   recipeDetailsContainer.style.display = "none"
   recipeContainer.style.display = "grid"
   recipeContainer.replaceChildren()

   selectionH1.textContent = cuisineSelect.value || categorySelect.value

   recipes.forEach(recipe => {
      renderRecipeCard(recipe)
   })
   cuisineSelect.value = ""
   categorySelect.value = ""
}

function renderRecipeCard(recipe, featured = false) {
   const {
      idMeal: recipeId,
      strMeal: recipeName,
      strMealThumb: recipeImage,
   } = recipe

   const cardDiv = document.createElement("div")
   cardDiv.classList.add("card")
   cardDiv.addEventListener("click", e => getRecipeDetails(e, recipeId))

   const image = document.createElement("img")
   image.src = recipeImage

   const recipeTitleDiv = document.createElement("div")
   recipeTitleDiv.classList.add("recipe-title")
   const title = document.createElement("h3")
   title.textContent = recipeName

   recipeTitleDiv.append(title)
   cardDiv.append(image, recipeTitleDiv)

   if (featured) {
      featuredRecipeDiv.append(cardDiv)
   } else {
      recipeContainer.append(cardDiv)
   }

}

function getRecipeDetails(e, recipeId) {
   fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
      .then(r => r.json())
      .then(recipe => renderRecipeDetails(recipe.meals[0]))
      .catch(error => alert(error))
}

function renderRecipeDetails(recipeDetails) {
   welcomeSection.style.display = "none"
   recipeDetailsContainer.style.display = "grid"
   recipeContainer.replaceChildren()
   selectionH1.textContent = ""

   const {
      strMeal: recipe,
      strArea: cuisine,
      strCategory: category,
      strMealThumb: image,
      strInstructions: directions,
      strYoutube: youTubeLink,
   } = recipeDetails

   //Title Area
   const title = document.createElement("p")
   title.textContent = recipe
   let titleArea = document.querySelector(".recipe-details-title")
   titleArea.replaceChildren()
   titleArea.append(title)

   // Image Area
   const imageArea = document.querySelector(".recipe-details-image")
   const recipeImage = document.createElement("img")
   recipeImage.src = image
   recipeImage.alt = `Image for ${recipe}`
   imageArea.replaceChildren()
   imageArea.append(recipeImage)

   // Ingredients Area
   const ingredients = parseIngredients(recipeDetails)

   const ingredientPs = ingredients.map(ingredient => {
      const ingredientP = document.createElement("p")
      ingredientP.textContent = ingredient
      return ingredientP
   })

   const ingredientsArea = document.querySelector(".recipe-details-ingredients")
   const ingredientsTitle = document.createElement("h3")
   ingredientsTitle.textContent = "Ingredients"
   ingredientsTitle.style.textDecoration = "underline"
   ingredientsArea.replaceChildren()
   ingredientsArea.append(ingredientsTitle, ...ingredientPs)

   // Directions Area
   const directionsArea = document.querySelector(".recipe-details-directions")
   const directionsTitle = document.createElement("h3")
   directionsTitle.textContent = "Directions"
   directionsTitle.style.textDecoration = "underline"
   const directionsP = document.createElement("p")
   directionsArea.replaceChildren()
   directionsP.textContent = directions
   directionsArea.append(directionsTitle, directionsP)

   // Resource Area
   const resourcesArea = document.querySelector(".recipe-details-resources")
   const youTubeLinkATag = document.createElement("a")
   youTubeLinkATag.href = youTubeLink
   youTubeLinkATag.target = "_blank"
   youTubeLinkATag.text = `How to make ${recipe} on YouTube.`
   const cuisineCategory = document.createElement("p")
   cuisineCategory.textContent = `(Cuisine: ${cuisine}, Category: ${category})`
   resourcesArea.replaceChildren()
   resourcesArea.append(youTubeLinkATag, cuisineCategory)
}

function parseIngredients(recipe) {
   const ingredientArray = []

   for (let i = 1; i < 21; i++) {
      let measure = recipe["strMeasure" + i.toString()]
      let ingredient = recipe["strIngredient" + i.toString()]
      if (ingredient === "" || ingredient === null) {
         ingredient = ""
         measure = ""
         continue
      }
      let ingredientString = measure.trim() + " " + ingredient.trim()
      ingredientArray.push(ingredientString)
   }
   return ingredientArray
}
