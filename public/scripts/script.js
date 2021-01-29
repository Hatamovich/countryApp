const captureHTML = html => document.querySelector(html);

window
.addEventListener('keypress', event => {
	if(event.key.includes('Esc')) {
		captureHTML('.dropdown')
		.classList.toggle('display');
	}
})


const input = captureHTML('body > input');
input
.addEventListener('change', getCountry);

 async function getCountry() {
	const value = input.value;
	const req = await fetch(`http://localhost:3000/countries/${value}`);
	const res = await req.json();

	function setCountry() {
		const HTML = `
			<h1 class='country'>Country: ${res.country}</h1>
			<h2 class='capital'>Capital: ${res.capital}</h2>
			<h3 class='language'>Language: ${res.language}</h3>
			<h4 class='currency'>Currency: ${res.currency}</h4>
			<img class='flag' src='images/${res.flag}' alt='Image of ${req.country}'>
		`;
		setTimeout(() => captureHTML('.wrapper').innerHTML = HTML, 700);
	}

	setCountry();
}

function addCountry(event) {
	const target = event.currentTarget;
	const values = [target[0].value, target[1].value, target[2].value, target[3].value, target[4].files[0].name];
	const [country, capital, language, currency, flag] = values;
	event.preventDefault();

	async function postCountry() {
		const req = await fetch('http://localhost:3000/countries/country', {
			method: 'POST',
			headers: {
				'accept': 'text/plain',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({country, capital, language, currency, flag})
		});
		const res = await req.text();
		return console.log('Request sent');
	}
	postCountry();
}

const countryForm = captureHTML('form');
countryForm
.addEventListener('submit', (event) => {
	addCountry(event);
	countryForm[0].value = '';
	countryForm[1].value = '';
	countryForm[2].value = '';
	countryForm[3].value = '';
	countryForm[4].value = '';
});
