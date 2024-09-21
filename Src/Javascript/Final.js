const username = document.getElementById("username");

username.addEventListener("keyup",()=>{
    console.log(username.value);
});





saveHighScore = e =>  {
console.log("quando clickado no botao de salvar");
e.preventDefault();
};