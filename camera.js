document.addEventListener('DOMContentLoaded', function() {
	let pages = [... document.querySelectorAll('.page')];
	let nextButtons = [... document.querySelectorAll('.next-button')];
	let backButtons = [... document.querySelectorAll('.back-button')];
	let allButtons = nextButtons.concat(backButtons);

	const hidePages = () => {
		pages.forEach((page) => page.style.display = "none")
	};

	const move = (target) => {
		hidePages();
		let position = parseInt(target.id.match(/\d+/g));
		let isForward = /forward/.test(target.id);
		if (isForward) {
			pages[position].style.display = "block"; }
		else {
			pages[position - 2].style.display = "block";}
	};

	let allSymptoms = document.querySelectorAll('.symptom');
	allSymptoms.forEach((symptom) => {
		symptom.addEventListener('click', (event)=> {
			event.target.classList.add('has-symptom')
		})
	})

	hidePages();
	pages[0].style.display = 'block';
	allButtons.forEach((button)=> button.addEventListener('click', ()=> move(event.target)));
	
	let genderOptions = [... document.querySelectorAll('.genders')];
	genderOptions.forEach((option) => {
		option.addEventListener('click', (event)=> {
			genderOptions.forEach((o) => o.classList.remove('gender-selected'))
			event.target.classList.add('gender-selected')
		})
	})

	let lengthOptions = [... document.querySelectorAll('.time-frame')]
	lengthOptions.forEach((option) => {
		option.addEventListener('click', (event) => {
			lengthOptions.forEach((o) => o.classList.remove('length-selected'))
			event.target.classList.add('length-selected')
		})
	})

	let sendAll = document.querySelector('#send'); 


	sendAll.addEventListener('click', () => {
		// pull all relavant data as is at time of send click
		let age = document.querySelector('#age').value;
		let gender = document.querySelector('.gender-selected').innerHTML;
		let zipCode = document.querySelector('#zip').value;
		let symptomLength = document.querySelector('.length-selected').innerHTML;
		// user Symptoms as Array? 
		let userSymptoms = [...document.querySelectorAll('.has-symptom')];
		let userSymptomsArray = userSymptoms.map((symptom) => {
			return symptom.innerHTML;
		})

		// package data as object literal
		let jsonData = {
			age: age,
			gender: gender,
			symptoms: userSymptomsArray,
			symptomLength: symptomLength,
			// not a secure solution
			token: "xoxb-284170590867-1faIFkh6NLsAN7GFsmSAVfdG",
			zipCode: zipCode
		};

		// create Data AJAX call
		let xhr = new XMLHttpRequest();
		// Is this URL correct
		// let url = "http://techchicago.net";
		let url = "http://rest.privateye.ai/";
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
				var json = JSON.parse(xhr.responseText);
				console.log(json);
				}
		};
		// create JSON and send AJAX
		let data = JSON.stringify(jsonData);
		xhr.send(data);

		// grab the file as FormData
		let fileForm = document.querySelector('#camera');
		let file = fileForm.files[0];
		let fileUpload = new FormData();
		fileUpload.append('file', file);

		// File AJAX call
		let xhrFile = new XMLHttpRequest();
		// Is the URL the same for File upload?
		xhr.open('POST', url, true);
		xhr.send(fileUpload);
	})

});

