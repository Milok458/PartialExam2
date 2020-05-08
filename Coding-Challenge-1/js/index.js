function mealSearch(name) {
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s="+name;
    let settings = {
        method: 'GET'
    };

    fetch(url, settings).then(res => {
        if(res.status === 200){
            return res.json();
        }
        else throw new Error("Error on search!");
    }).then(result => {
        let cont = document.querySelector('.js-search-results');

        let meals = "";

        for(let i in result){
            let meal = result[i];

            meals += `<li><p>`+meal.strMeal+`</p><p>`+meal.strArea+`</p><p>`+meal.strInstructions+`</p></li>`
        }

        cont.innerHTML = meals;
    });
}

function formSubmit() {
    let from = document.querySelector(".js-search-form");

    from.addEventListener('submit', (event) =>{
        event.preventDefault();
        mealSearch(from.querySelector('#query').value);
    });
}

function init() {
    formSubmit();
}

init();