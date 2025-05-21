let inputField = document.getElementById("input-field");
let searchButton = document.getElementById("btn-btn");
let mealImage = document.getElementById("meal-picture");
let mealName = document.getElementById("meal-name");
let searchMealSection = document.getElementById("Search-result-section")
let recipeCard = document.getElementById("recipe-card")
// let modalContent = document.getElementById("modal-content")
let showModal = document.getElementById("modal")
let showNavBar = document.getElementById("modal-2")
let randomSearchCard = document.getElementById("random-search-card")
let randomSearch = document.getElementById("random-search")
let faBars = document.getElementById("fa-bars")
let xBar = document.getElementById("x-bar")
let logo = document.getElementById("logo")

logo.addEventListener("click", function(){
  location.reload();
})

searchButton.addEventListener("click", async function (event) {
  event.preventDefault();
  let searchValue = inputField.value.trim();
  try {
    if (!searchValue) {
      alert("Please enter a meal name");
    } else {
      let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
      );
  
      let data = await response.json();
      
      
      if (data.meals && data.meals.length > 0) {
        searchMealSection.innerHTML = '';
        data.meals.forEach((meal) => {
          const list = document.createElement('li')
          list.innerHTML = 
           `<div class="recipe-card" id="recipe-card">
            <img class="api-img" 
              src='${meal.strMealThumb}'
              alt=""
              class="meal-picture"
              id="meal-picture"
            />
            <div class="bottom-content">
              <div class="name-rate">
                <h3 id="meal-name">${meal.strMeal}</h3>
                <div class="star">
                  <i class="fa-solid fa-star"></i>
                  <span>4.5</span>
                </div>
              </div>
              <div class="minute-reaction">
                <div class="minute">
                  <i class="fa-regular fa-clock"></i><span>30 minutes</span>
                </div>
                <div class="reaction">
                  <i class="fa-regular fa-heart"></i>
                </div>
              </div>
            </div>
          </div>`
          searchMealSection.appendChild(list)

          list.addEventListener('click', () => {
            openModal(meal)
          })

          // showModal.addEventListener('click', () => {
          //   // showModal.classList.remove('visible')
          //   // showModal.classList.add('modal')
          // })
        });
      } else {
        searchMealSection.innerHTML = `<p style = "color: red; font-weight: bold;">No meals found. Try searching for something else!</p>`
      }
      console.log(data)

      function openModal(meal) {
        // showModal.classList.remove('modal')
        // showModal.classList.add('visible')
    
        document.getElementById("modal-meal-name").textContent = meal.strMeal;
        document.getElementById("modal-meal-image").src = meal.strMealThumb;
        document.getElementById("modal-instructions").textContent = meal.strInstructions;

        // Create array of 1 through 20, then use forEach
        const measureIngre = Array.from({length: 20}, (_, i) => i + 1)
        const ingredients = []

        measureIngre.forEach((i) => {
          const ingredient = meal[`strIngredient${i}`]
          const measure = meal[`strMeasure${i}`]

          ingredients.push(`<li>${ingredient}    ${measure}</li>`)
        }) 
      
        document.getElementById("modal-ingredients-list").innerHTML = ingredients.join("");
        


        // Hide modal on UI
        document.getElementById("close").addEventListener('click', () => {
          showModal.style.display = "none"
          document.body.classList.remove('modal-open');
        })

        // Display Modal on UI
        showModal.style.display = "flex";

        document.body.classList.add('modal-open');
      }

      
      
    }
  } catch (error) {}
  
});


async function randomCategory(){
  let randomResponse = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
  randomData = await randomResponse.json()
  try {
    if(randomData.categories && randomData.categories.length > 0){
      randomSearchCard.innerHTML = ''
      randomData.categories.forEach((category) => {
        const ranList = document.createElement('li')
        ranList.innerHTML = ` <div class="recipe-card" id="recipe-card">
              <img class="api-img" 
                src="${category.strCategoryThumb}"
                alt=""
                class="meal-picture"
                id="meal-picture"
              />
              <div class="bottom-content">
                <div class="random-name">
                  <h3 id="meal-name">${category.strCategory}</h3>
                </div>
                <div class="random-ingredients">
                  <p id="random-ingredients">Descriptions: </p>
                </div>
              </div>`
  
              randomSearchCard.appendChild(ranList)
              // randomSearch.appendChild(randomSearchCard)
      })
    }
  
    console.log(randomData)
    
  } catch (error) {
    
  }
}

randomCategory()

// Nav-bars Modals

faBars.addEventListener('click', () => {
  openNavBar()
})


function openNavBar(){
  showNavBar.style.display = "flex"

  xBar.addEventListener('click', () =>{
    showNavBar.style.display = "none"
  })

}










