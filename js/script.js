const searchInputEl = document.getElementById('search');
const numbersOfPicsEl = document.getElementById('numberOfPics');
const radioBtnsEl = document.querySelectorAll('input[name="size"]');
const formEl = document.getElementById('searchForm');
const mainEl = document.getElementById('main');

let searchInputValue;
let numberOfPicsValue;
let radioValue;

formEl.addEventListener('submit', (e) => {
	e.preventDefault();
	searchInputValue = searchInputEl.value;
	numberOfPicsValue = numbersOfPicsEl.value;

	radioBtnsEl.forEach((radioBtn) => {
		if (radioBtn.checked) {
			radioValue = radioBtn.value;
		}
	});

	const searchParagraph = document.createElement('p');
	searchParagraph.innerText = `Found ${numberOfPicsValue} results of ${searchInputValue} in size ${radioValue}`;

	mainEl.append(searchParagraph);
});
