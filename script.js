//INPUTS
const inputDay = document.getElementById('inputDay').value
const inputMonth = document.getElementById('inputMonth').value
const inputFullYear = document.getElementById('inputFullYear').value

//OUTPUTS
const outputDays = document.getElementById('outputDays').value
const outputMonths = document.getElementById('outputMonths').value
const outputYears = document.getElementById('outputYears').value

//ADDING EVENTLISTENER
const submitButton = document.getElementById('calcBtn')

function isValidDate(inputFullYear, inputMonth, inputDay) {
	if (inputFullYear === '' || inputMonth < 1 || inputMonth > 12 || inputDay)
		if (inputFullYear > 2024 || inputMonth < 1 || inputMonth > 12 || inputDay < 1) {
			// basic check of inputs
			return false
		}
	if (inputMonth === 2) {
		//february check: if year is divisible by 4, max is 29, otherwise 28
		return inputDay <= (inputFullYear % 4 === 0 ? 29 : 28)
		// checking months with 30days in them
	} else if (inputMonth === 4 || inputMonth === 6 || inputMonth === 9 || inputMonth === 11) {
		if (inputDay > 30) {
			return false
		}
	}
	//all other can be up to 31
	else if (inputDay > 31) {
		return false
	}
	//if no "violation" found :D
	return true
}

if (!isValidDate(inputFullYear, inputMonth, inputDay)) {
	//error messages
	const dayError = document.getElementById('dayError')
	dayError.textContent = 'Must be a valid day'
	dayError.style.display = 'block'

	const monthError = document.getElementById('monthError')
	monthError.textContent = 'Must be a valid month'
	monthError.style.display = 'block'

	const fullyearError = document.getElementById('fullyearError')
	fullyearError.textContent = 'Must be in the past'
	fullyearError.style.display = 'block'

	return false
}
