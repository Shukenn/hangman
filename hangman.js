let inp = document.getElementById("myInput");
let gameOn = true;

let guessList = [
    "APPLE",
    "BANANA",
    "CARROT",
    "DOG",
    "ELEPHANT",
    "FLOWER",
    "GUITAR",
    "HOUSE",
    "ISLAND",
    "JAZZ",
    "KITE",
    "LEMON",
    "MOUNTAIN",
    "NOTEBOOK",
    "OCEAN",
    "PIANO",
    "QUEEN",
    "RAINBOW",
    "SUNSET",
    "TIGER",
    "UMBRELLA",
    "VIOLIN",
    "WATERFALL",
    "XYLOPHONE",
    "YELLOW",
    "ZEBRA",
    "ACORN",
    "BUTTERFLY",
    "CANDLE",
    "DOLPHIN",
    "ECHO",
    "FROG",
    "GRAPES",
    "HAPPY",
    "IGLOO",
    "JUMP",
    "KANGAROO",
    "LANTERN",
    "MANGO",
    "NEST",
    "OCTOPUS",
    "PARADE",
    "QUEST",
    "ROBOT",
    "SANDWICH",
    "TURTLE",
    "UFO",
    "VIOLET",
    "WAGON",
    "XENON",
    "YOGURT",
    "ZIGZAG",
    "AIRPLANE",
    "BALLOON",
    "COFFEE",
    "DREAM",
    "ELEPHANT",
    "FOREST",
    "GARDEN",
    "HARMONY",
    "IGLOO",
    "JOURNEY",
    "KIWI",
    "LANTERN",
    "MAGNOLIA",
    "NIGHT",
    "OCTOBER",
    "PENCIL",
    "QUEST",
    "RAINBOW",
    "SUNFLOWER",
    "TREE",
    "UMBRELLA",
    "VILLAGE",
    "WINDMILL",
    "XYLOPHONE",
    "YOGURT",
    "ZEPPELIN",
    "ANCHOR",
    "BREEZE",
    "COMET",
    "DAISY",
    "ECHO",
    "FIZZ",
    "GALAXY",
    "HORIZON",
    "ILLUMINATE",
    "JADE",
    "KALEIDOSCOPE",
    "LULLABY",
    "MELLOW",
    "NOSTALGIA",
    "OPAL",
    "PACIFIC",
    "QUEST",
    "RADIANT",
    "SYMPHONY",
    "TRANQUIL",
    "UNIVERSE",
    "VORTEX",
    "WHISPER",
    "XANADU",
    "YONDER",
    "ZENITH",
  ];

let toGuess = guessList[parseInt(Math.random()*guessList.length-1)];

let guesses = 6;

let blanksLeft = true;

toGuess.split("").forEach(s => {
    document.getElementById("emptyField").textContent = document.getElementById("emptyField").textContent + "_ "
})


function checkLetter(letter){
    let isIn = false;

    toGuess.split("").forEach(s => {
        s == letter ? isIn = true : isIn = isIn;
    })

    var pElements = document.querySelectorAll("#guesses .inGuesses p");

    pElements.forEach(pElement => {
        if(pElement.textContent == letter){
            isIn ? pElement.style.color = "green" : pElement.style.color = "red";
        }
    });

    if (isIn){
        let field = document.getElementById("emptyField").textContent;
        let index = 0;

        toGuess.split("").forEach(s => {
            if (s == letter){
                
                field = field.split(" ")
                //console.log(field)
                field = field.filter(d => d!="")
                //console.log(field)
                field.splice(index, 1, s)
                //console.log(field)
                field = field.join(" ")
                //console.log(field)
                

                //field.split(" ").filter(d => d=="_").splice(index, 1, s).join("");
            }
            index++;
        })

        document.getElementById("emptyField").textContent = field;


        field = field.split(" ")
        field = field.filter(d => d!="")
        console.log(field)

        let needsFill = false;
        field.forEach(s => {s == "_" ? needsFill = true : needsFill = needsFill})
        
        needsFill ? blanksLeft = true : blanksLeft = false;
        console.log(blanksLeft)
        if (!blanksLeft){
            win();
        }

    } else {
        guesses--;
        if(guesses<=0){
            lose();
        }
    }
}

// Function to update text content
function updateTextContent() {
    if(inp != ""){
        let preWrite = document.getElementById("guessingText").textContent.toString();
        let toWrite = document.getElementById("guessingText").textContent + inp.value;
        toWrite = toWrite.toUpperCase();
        inp.value = inp.value.toUpperCase();
        let confirmation = true;

        preWrite.split("").forEach(s => {
            //console.log("S is "+s);
            if(s == inp.value){
                confirmation = false;
            }
        })

        if(!(/^[A-Z]+$/.test(inp.value))){
            confirmation = false;
        }
        
        if (confirmation == true){
            document.getElementById("guessingText").textContent = toWrite;
            checkLetter(inp.value);
        }

        inp.value = "";
    }
    
}

function lose(){
    gameOn=false;
    elements = document.getElementsByClassName("loseScreen");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "flex";
        elements[i].style.visibility = "visible";
    }
    document.getElementById("ans").textContent = toGuess;

    setTimeout(function() {
    window.scrollTo(0, 0);
    }, 100);  
}

function win(){
    gameOn=false;
    elements = document.getElementsByClassName("winScreen");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = "flex";
        elements[i].style.visibility = "visible";
    }
    document.getElementById("ans").textContent = toGuess;

    setTimeout(function() {
    window.scrollTo(0, 0);
    }, 100);  
}

function allow(){
    if(guesses>0 && gameOn){
        updateTextContent();
        document.querySelector('img').src = ("pngs/"+guesses+".png")
    } 
}

// Add an event listener to detect changes in the input field
inp.addEventListener("input", allow);


// Initial update
updateTextContent();

document.getElementById("playAgain").addEventListener("click", function(){
    location.reload();
})

document.getElementById("playAgainLose").addEventListener("click", function(){
    location.reload();
})


document.addEventListener('DOMContentLoaded', function() {
    if(gameOn){
        inp.focus();
    }
});

inp.onblur = function () {
    if(gameOn){
        inp.focus();
    }
};