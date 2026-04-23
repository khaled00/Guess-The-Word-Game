// General setting 
let gameName = 'Guess The Word Game';
document.querySelector('title').innerHTML = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector('footer').innerHTML = `${gameName} By Mohamed Khaled`

// game setting option

let numbersOfTrys = 6;
let numbersOfLitters = 6;
let currentTry = 1;
let numberOfHints = 2;


//global veriabols
let inpustContainer = document.querySelector(".inputs");



//manage words
let wordToGuess = "";
const words = ["update", "create","delete","master","branch","mainly","Elzero","school","Khaled","Mohamed"];
wordToGuess = words[Math.floor( Math.random() * words.length)].toLocaleLowerCase();
// console.log(wordToGuess);

document.querySelector("button.hint span").innerHTML = numberOfHints;


function generateInputs(){
    

    for(let i = 1; i<= numbersOfTrys; i++){
        const tryDiv = document.createElement("Div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;
        inpustContainer.appendChild(tryDiv);

        if(i != 1 ) tryDiv.classList.add('disable-inputs');

        for(let j = 1 ; j<= numbersOfLitters;j++){
            const input = document.createElement("input");
            input.type = "Text";
            input.setAttribute("maxlength",1);
            input.id = `guess-${i}-${j}`;
            tryDiv.appendChild(input);
        }
        // foucs on first input
        document.querySelector("#guess-1-1").focus();

        //disable all inputs expect first line
        const allInpustsExcpect = document.querySelectorAll(".disable-inputs input");
        allInpustsExcpect.forEach((input) => input.disabled = true);

        //convert all to upper case
        const allInputs = document.querySelectorAll("input");
        allInputs.forEach((input,index) =>{
            input.addEventListener("input", function(){
                this.value = this.value.toUpperCase();
                const nextInput = allInputs[index + 1];
                if(nextInput) nextInput.focus();
            });

            
            input.addEventListener("keydown", function(event){
                //console.log(event);
                const currentIndex = Array.from(allInputs).indexOf(this);
                //console.log(currentIndex);
                // Arrow right event
                if(event.key == "ArrowRight"){
                    const nextIndex = currentIndex + 1;
                    if(nextIndex < allInputs.length) allInputs[nextIndex].focus();
                }
                 // Arrow left event
                if(event.key == "ArrowLeft"){
                    const prevoiusIndex = currentIndex - 1;
                    if(prevoiusIndex >= 0) allInputs[prevoiusIndex].focus();
                }
            });
        });
    }
}

const guessBotton = document.querySelector(".check");
const message = document.querySelector(".massages");
const hintBotton = document.querySelector(".hint");
hintBotton.addEventListener("click",getHint);

guessBotton.addEventListener("click",handelGuess);

function handelGuess(){
    let successGuess = true;
    for(let i =1 ; i<=numbersOfLitters ; i++){
        const inputFiled = document.querySelector(`#guess-${currentTry}-${i}`);
        const letter = inputFiled.value.toLocaleLowerCase();
            //  console.log(letter);
        const accualLetter = wordToGuess[i -1];
        
        // game logic
        if(letter === accualLetter) inputFiled.classList.add("yes-in-place");
        else if(wordToGuess.includes(letter) && letter !== '') {
            inputFiled.classList.add("not-in-place");
            successGuess = false;
        }
        else{
            inputFiled.classList.add("no");
            successGuess = false;
        }
    }

    //check if success or fail
    if(successGuess){
       message.innerHTML = `you win and word is <span>${wordToGuess}</span>`;
       guessBotton.disabled = true;
       hintBotton.disabled = true;
       let alltray = document.querySelectorAll(".inputs > div");
       alltray.forEach(tryDiv => {tryDiv.classList.add("disable-inputs");});

    }else{
    document.querySelector(`.try-${currentTry}`).classList.add("disable-inputs");
    const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInputs.forEach((input) => (input.disabled = true));
    currentTry++;
    if(currentTry <= numbersOfTrys){
        document.querySelector(`.try-${currentTry}`).classList.remove("disable-inputs");
        const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryInputs.forEach((input) => (input.disabled = false));
        document.querySelector(`#guess-${currentTry}-1`).focus();
    }else{
        message.innerHTML = `you Lose and word is <span>${wordToGuess}</span>`;
       guessBotton.disabled = true;
       hintBotton.disabled = true;
    }
    }
}

function getHint(){
    if(numberOfHints > 0){
        numberOfHints--;
        document.querySelector("button.hint span").innerHTML = numberOfHints;
    }
    if(numberOfHints === 0) hintBotton.disabled = true;

    const enableInpusts = document.querySelectorAll("input:not([disabled])");
    // console.log(enableInpusts);
    const emptyEnableInputs = Array.from(enableInpusts).filter((input)=> input.value === "");
    // console.log(emptyEnableInputs);
    if(emptyEnableInputs.length > 0){
        const randomIndex = Math.floor(Math.random()*emptyEnableInputs.length);
        // console.log(randomIndex);
        const randomInput = emptyEnableInputs[randomIndex];
        // console.log(randomInput);
        const indexToFill = Array.from(enableInpusts).indexOf(randomInput);
        if(indexToFill !== -1){
            randomInput.value = wordToGuess[indexToFill].toLocaleUpperCase();
        }
    }
}

function handelBackSpace(event){
    if(event.key == "Backspace"){
        const inputs = document.querySelectorAll("input:not([disabled])");
        const currentInedx = Array.from(inputs).indexOf(document.activeElement);
        // console.log(currentInedx);
        if(currentInedx > 0){
            const currentInput = inputs[currentInedx];
            const prevInputs = inputs[currentInedx - 1];
            if(currentInput.value != ""){
                currentInput.value = "";
            }else{
                prevInputs.value = "";
                prevInputs.focus();
            }
            
            
        }
        
    }
};

document.addEventListener("keydown",handelBackSpace);

window.onload = function(){
    generateInputs();
}