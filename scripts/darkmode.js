const pageModeButton = document.querySelector("#page-mode-buttons");
const body = document.querySelector("body");
const buttonsMode = document.querySelectorAll("#page-mode-buttons img");

pageModeButton.onclick = function(){
    body.classList.toggle("dark-mode");
    buttonsMode.forEach((button)=>{
        button.classList.toggle("button-mode-active");
    });
};