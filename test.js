const randomQuoteUrl = "https://baconipsum.com/api/?type=all-meat&sentences=2";
const quoteDisplayElement = document.querySelector("#quoteDisplay");
const quoteInputElement = document.querySelector("#quoteInput");
const timer = document.querySelector("#timer");
const container = document.querySelector(".container");
const buttonsSection = document.querySelector(".buttons");
const buttons = document.querySelectorAll("#timeSelect");
const finish = document.querySelector(".finish");
const result = document.querySelector("#result");
const restart = document.querySelector("#restart");
let currentSymbols = 0;
let correctSymbols = 0;
let correct = true;
let minutes;
buttons.forEach(button=>{
	button.addEventListener("click",()=>{
		timer.textContent = +button.textContent;
		container.classList.toggle("hide");
		buttonsSection.classList.toggle("hide");
		start();
	})
})

quoteInputElement.addEventListener("input",()=>{
	const arrayQuote = quoteDisplayElement.querySelectorAll("span");
	const arrayValue = quoteInputElement.value.split("");
	arrayQuote.forEach((characterSpan,index)=>{
		const character = arrayValue[index];
		if(character ==null ){
			characterSpan.classList.remove("correct");
			characterSpan.classList.remove("incorrect");
			correct = false;
		}
		 else if(character === characterSpan.innerText){
			characterSpan.classList.add("correct")
			characterSpan.classList.remove("incorrect")
			correct = true;
		} else {
			characterSpan.classList.remove("correct")
			characterSpan.classList.add("incorrect")
			correct = false;
		} 
		
	})
	if(arrayQuote.length === arrayValue.length){
			if(correct){
				correctSymbols += arrayQuote.length;
				renderNewQuote();
			}
	}
})
function getRandomQuote(){
	return fetch(randomQuoteUrl)
	.then(response=>response.json())
	.then(data=>data[0]);
}
async function renderNewQuote(){

	const quote = await getRandomQuote();
	quoteDisplayElement.innerHTML = "";
	quote.split("").forEach(character => {
		const characterSpan = document.createElement("span");
		characterSpan.innerText = character;
		quoteDisplayElement.appendChild(characterSpan);
	})
	quoteInputElement.value = null;
}
renderNewQuote();
function start(){
	minutes = timer.textContent/60;

	const ticking = setInterval(()=>{
	if(timer.textContent > 0){
		timer.textContent = +timer.textContent -1;
	} else {
		clearInterval(ticking);
		stop();

	}
},1000)
}
function stop(){
	container.classList.toggle("hide");
	finish.classList.toggle("hide");
	quoteDisplayElement.querySelectorAll("span").forEach(span=>{
		if(span.classList.contains("correct")){
			currentSymbols++;
		}
	})
	result.textContent = `${(correctSymbols + currentSymbols)} symbols per minutes`
}

restart.addEventListener("click",()=>{
	finish.classList.toggle("hide");
	buttonsSection.classList.toggle("hide")
	correctSymbols = 0;
	currentSymbols = 0;
})