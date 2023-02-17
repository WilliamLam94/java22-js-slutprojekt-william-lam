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

	if (mainEl.hasChildNodes()) {
		mainEl.innerHTML = '';
	}

	searchInputValue = searchInputEl.value;
	numberOfPicsValue = numbersOfPicsEl.value;

	radioBtnsEl.forEach((radioBtn) => {
		if (radioBtn.checked) {
			radioValue = radioBtn.value;
		}
	});

	const data = await fetchImages(
		searchInputValue,
		numberOfPicsValue,
		radioValue
	);
	console.log('data', data);

	if (data.length >= 0) {
		const searchParagraph = document.createElement('p');
		searchParagraph.innerText = `Found ${data.length} results of ${searchInputValue} in size ${radioValue}`;

		mainEl.append(searchParagraph);

		data.map((picture) => {
			const img = document.createElement('img');
			img.src = picture;
			mainEl.append(img);
		});
	} else {
		const resultParagraph = document.createElement('p');
		resultParagraph.innerText = `No results of ${searchInputValue}`;
	}
});

async function fetchImages(inputValue, numberOfImages, size) {
	try {
		const result = await fetch(
			`${baseUrl}&text=${inputValue}&per_page=${numberOfImages}&format=json&nojsoncallback=1`
		);
		if (!result.ok) {
			throw new Error('Network response was not OK');
		}
		const data = await result.json();
		const imageIds = data.photos.photo.map((photo) => photo.id);

		const images = await Promise.all(
			imageIds.map((imageId) => fetchImageSize(imageId, size))
		);

		return images;
	} catch (error) {
		const errorMsg = document.createElement('p');

		errorMsg.innerText = error.message;
		mainEl.append(errorMsg);

		console.log('errorImg', error.message);
	}
}

async function fetchImageSize(photoId, sizeValue) {
	try {
		const result = await fetch(
			`${sizeUrl}&photo_id=${photoId}&format=json&nojsoncallback=1`
		);
		if (!result.ok) {
			const text = await result.text();
			throw Error(text);
		}
		const data = await result.json();
		const sizes = data.sizes.size;

		const found = sizes.find((size) => size.label.toLowerCase() === sizeValue);

		return found.source;
	} catch (error) {
		console.log('errorSize', error);
	}
}
