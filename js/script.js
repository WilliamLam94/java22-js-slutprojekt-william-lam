const searchInputEl = document.getElementById('search');
const numbersOfPicsEl = document.getElementById('numberOfPics');
const radioBtnsEl = document.querySelectorAll('input[name="size"]');
const formEl = document.getElementById('searchForm');
const mainEl = document.getElementById('main');

const apiKey = '70a64a1669eb5ab759a61c3abb0d285f';
const baseUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}`;
const sizeUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}`;

let searchInputValue;
let numberOfPicsValue;
let radioValue;

formEl.addEventListener('submit', async (e) => {
	e.preventDefault();
	searchInputValue = searchInputEl.value;
	numberOfPicsValue = numbersOfPicsEl.value;

	radioBtnsEl.forEach((radioBtn) => {
		if (radioBtn.checked) {
			radioValue = radioBtn.value;
		}
	});

	const data = await fetchImages(searchInputValue, numberOfPicsValue);

	console.log('data', data);

	// const images = data.forEach((photo) => fetchImageSize(photo.id));

	// console.log('images', images);

	const searchParagraph = document.createElement('p');
	searchParagraph.innerText = `Found ${numberOfPicsValue} results of ${searchInputValue} in size ${radioValue}`;

	mainEl.append(searchParagraph);
});

async function fetchImages(inputValue, numberOfImages) {
	try {
		const data = await fetch(
			`${baseUrl}&text=${inputValue}&per_page=${numberOfImages}&format=json&nojsoncallback=1`
		).then((response) => response.json());

		return data.photos.photo;
	} catch (error) {
		console.log('error', error);
	}
}

function fetchImageSize(photoId, size) {
	const data = fetch(
		`${sizeUrl}&photo_id=${photoId}&format=json&nojsoncallback=1`
	);

	// forEach on all images
	// match size value
	// return source url

	return data;
}
