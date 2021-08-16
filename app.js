/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  console.log(kittens)
  event.preventDefault();

  let form = event.target;
  let kitten = {
  id: generateId(),
  name: form.name.value,
  mood: "",
  affection: 7 
  
}
setKittenMood(kitten)
 kittens.push(kitten)
 saveKittens()
 form.reset()
 drawKittens();
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
 
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensList= document.getElementById("kittens")
 let kittensTemplate = ""
 kittens.forEach (kitten => {
   kittensTemplate +=`
   <button class="btn-cancel" onclick="deleteCat('${kitten.id}')" > X </button>
   <div class="card kitten ${kitten.mood} ">
   <span id="name">Name: ${kitten.name}</span>
   <img src="https://robohash.org/${kitten.name}?set=set4">
   
   <div id="cat-stats">
     <div class="d-flex space-between">

       <span id="mood" >Mood:${kitten.mood}</span>
       <span id="affection">Affection:${kitten.affection}</span>
     </div>
       <div class="d-flex space-between">

         <button id="Pet" onclick="pet('${kitten.id}')">Pet </button>
         <button class= "btn-dark" id="catnip" onclick="catnip('${kitten.id}')">Catnip</button>
       </div>
       </div>

     </div>
   `
 })
kittensList.innerHTML= kittensTemplate

}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
let cat = findKittenById(id)
console.log(id)
let i=  Math.random()
if (i < .7) {
  cat.affection -= 2
}
  else {cat.affection += 2 }
  setKittenMood(cat);
  saveKittens();
  drawKittens();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let nip=findKittenById(id)
 nip.affection = 5 
 console.log(id)
  setKittenMood(nip)

  
  saveKittens();
  drawKittens();
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
   if (kitten.affection > 6) {
     kitten.mood = "happy"
   }
   else if (kitten.affection <= 0){
     kitten.mood ="gone"
   }
   else if(kitten.affection <= 3){
     kitten.mood ="angry"
    }
    else if(kitten.affection <= 5){
      kitten.mood= "Tolerant"
    }
  

  
  
  
 
    
  }
  




function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens();
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );

}

function deleteCat(kittenId){
  
  let index= kittens.findIndex( kitten=> kitten.id ==kittenId) 
  console.log(index)
  if (index ==-1){
    throw new Error("Invalid Cat Id")
  }
  kittens.splice(index, 1)
  saveKittens()
  drawKittens()
}

loadKittens();
drawKittens();
// delete check contacts delete func.
// get the catnip button functioning pass in the whole cat