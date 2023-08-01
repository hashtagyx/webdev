var buttons = document.querySelectorAll(".drum")
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", handleClick);
}

function handleClick() {
    // this.style.color = "white";
    var character = this.innerHTML;
    playAudio(character);
    buttonAnimation(character);
}

document.addEventListener("keydown", (event) => {
    playAudio(event.key);
    buttonAnimation(event.key);
})

function buttonAnimation(character) {
    var activeButton = document.querySelector("." + character);
    activeButton.classList.add("pressed");
    setTimeout(function() {
        activeButton.classList.remove("pressed")
    }, 100);
}

function playAudio(character) {
    switch (character) {
        case "w":
            var tom1 = new Audio('./sounds/tom-1.mp3');
            tom1.play();
            break;
        case "a":
            var tom2 = new Audio('./sounds/tom-2.mp3');
            tom2.play();
            break;
        case "s":
            var tom3 = new Audio('./sounds/tom-3.mp3');
            tom3.play();
            break;
        case "d":
            var tom4 = new Audio('./sounds/tom-4.mp3');
            tom4.play();
            break;
        case "j":
            var snare = new Audio('./sounds/snare.mp3');
            snare.play();
            break;
        case "k":
            var crash = new Audio('./sounds/crash.mp3');
            crash.play();
            break;
        case "l":
            var kick = new Audio('./sounds/kick-bass.mp3');
            kick.play();
            break;

        default:
            console.log(character);
    }
}