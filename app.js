// Part 1 Numbers 1 & 2

let factBtn = document.getElementById("fact-btn");
let factList = document.getElementById("fact-list");
let favNum1 = document.getElementById("fav-num-1");
let favNum2 = document.getElementById("fav-num-2");
let favNum3 = document.getElementById("fav-num-3");

factBtn.addEventListener("click", function(e) {
    let favNums = [];
    if (favNum1.value) {
        favNums.push(favNum1.value);
    }
    if (favNum2.value) {
        favNums.push(favNum2.value);
    }
    if (favNum3.value) {
        favNums.push(favNum3.value);
    }

    if (favNums.length == 1) {
        let numFactPromise = axios.get(`http://numbersapi.com/${favNums[0]}?json`);
        numFactPromise
            .then(function(data) {
                let factLi = document.createElement("li");
                factLi.innerText = data.data.text;
                factList.appendChild(factLi);
                }
                
            )
    }

    else if (favNums.length >= 2) {

        let numFactPromise = axios.get(`http://numbersapi.com/${favNums}?json`);
        numFactPromise
            .then(function(data) {
                for (fact in data.data) {
                    let factLi = document.createElement("li");
                    factLi.innerText = data.data[fact];
                    factList.appendChild(factLi);
                }
            })
    }

    else {
        alert("You must enter a valid number to get your facts!")
    }
})



// Part 1 Number 3

let favFav = document.getElementById("fav-fav");
let favFavBtn = document.getElementById("fav-fav-btn");
let multLi = document.getElementById("mult-facts");

favFavBtn.addEventListener("click", function(e) {
    if (favFav.value) {
        let fourURLs = [];
        let routes = ["math", "year", "trivia"];
        for (route of routes) {
            fourURLs.push(axios.get(`http://numbersapi.com/${favFav.value}/${route}?json`))
        }
        Promise.all(fourURLs)
            .then(factSet => (
                factSet.forEach(function(fact) {
                    console.log(fact.data.text)
                    let factLi = document.createElement("li");
                    factLi.innerText = fact.data.text;
                    multLi.appendChild(factLi);
                })
            ))
    }
    else {
        alert("Please enter your favorite number for your facts!")
    }
})

