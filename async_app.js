/* Part 1 Numbers 1 & 2:
        Request favorite number(s) depending on how many entries
        there are and display them on the user's screen.  */

let factBtn = document.getElementById("fact-btn");
let factList = document.getElementById("fact-list");
let favNum1 = document.getElementById("fav-num-1");
let favNum2 = document.getElementById("fav-num-2");
let favNum3 = document.getElementById("fav-num-3");

factBtn.addEventListener("click", function(e) {
    let favNums = [];
    // First determine how many entries the user has submitted.
    if (favNum1.value) {
        favNums.push(favNum1.value);
    }
    if (favNum2.value) {
        favNums.push(favNum2.value);
    }
    if (favNum3.value) {
        favNums.push(favNum3.value);
    }

    addFavFacts(favNums)
})

async function addFavFacts(favNums) {
    // Make the requests for fun facts based on the user's inputted number or show an error to the user.
    if (favNums.length == 1) {
        let numFactPromise = await axios.get(`http://numbersapi.com/${favNums[0]}?json`);
        let factLi = document.createElement("li");
        factLi.innerText = numFactPromise.data.text;
        factList.appendChild(factLi);
    }

    else if (favNums.length >= 2) {
        let numFactPromise = await axios.get(`http://numbersapi.com/${favNums}?json`);
        for (fact in numFactPromise.data) {
            let factLi = document.createElement("li");
            factLi.innerText = numFactPromise.data[fact];
            factList.appendChild(factLi);
        }
    }

    else {
        alert("You must enter a valid number to get your facts!")
    }
}



/* Part 1 Number 3:
        Request multiple fun facts based on a single user favorite number entry*/

let favFav = document.getElementById("fav-fav");
let favFavBtn = document.getElementById("fav-fav-btn");
let multLi = document.getElementById("mult-facts");

favFavBtn.addEventListener("click", function() {
    if (favFav.value) {
        addAllFavFacts();
    }
    else {
        alert("Please enter your favorite number for your facts!");
    }
})

async function addAllFavFacts() {
    // Make the actual request to the api for the facts
    let p1Promise = axios.get(`http://numbersapi.com/${favFav.value}/math?json`);
    let p2Promise = axios.get(`http://numbersapi.com/${favFav.value}/year?json`);
    let p3Promise = axios.get(`http://numbersapi.com/${favFav.value}/trivia?json`);

    let p1 = await p1Promise;
    let p2 = await p2Promise;
    let p3 = await p3Promise;

    const allFacts = [p1,p2,p3]

    // Post the resulting facts in bullet points on the page
    allFacts.forEach(function(fact) {
        let factLi = document.createElement("li");
        factLi.innerText = fact.data.text;
        multLi.appendChild(factLi);
    })
}