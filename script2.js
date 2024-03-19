const submitButton = document.querySelector('.calcBtn')
submitButton.addEventListener('click', function (event) {
	const day = parseInt(document.getElementById('inputDay').value)
	const month = parseInt(document.getElementById('inputMonth').value)
	const year = parseInt(document.getElementById('inputFullYear').value)

	// Validation results (using boolean flags)
	let isDayValid = true
	let isMonthValid = true
	let isYearValid = true
	let anyEmptyField = false // Flag for empty fields

	// Check for empty fields
	if (!day || !month || !year) {
		anyEmptyField = true
	}

	// Specific validation checks (adjust based on your `isValidDate` function)
	if (!anyEmptyField) {
		// Only proceed if no empty fields
		const validationResults = isValidDate(year, month, day)

		if (validationResults) {
			// If validationResults is not empty (errors found)
			isDayValid = validationResults.hasOwnProperty('dayError') ? false : true
			isMonthValid = validationResults.hasOwnProperty('monthError') ? false : true
			isYearValid = validationResults.hasOwnProperty('yearError') ? false : true
		} else {
			// No errors from validationResults (assuming it returns null for valid date)
			// Additional checks for invalid date formats (like 31st of April)
			if (!checkValidDateCombination(day, month)) {
				isDayValid = false
			}
		}
	}

	// Handle validation results
	if (anyEmptyField) {
		// Handle all empty fields
		document.getElementById('dayError').textContent = 'This field is required'
		document.getElementById('dayError').style.display = 'block'

		document.getElementById('monthError').textContent = 'This field is required'
		document.getElementById('monthError').style.display = 'block'

		document.getElementById('fullyearError').textContent = 'This field is required'
		document.getElementById('fullyearError').style.display = 'block'
	} else if (!isDayValid || !isMonthValid || !isYearValid) {
		// Handle specific validation errors based on flags
		if (!isDayValid) {
			document.getElementById('dayError').textContent = validationResults
				? validationResults.dayError
				: 'Must be a valid day'
			document.getElementById('dayError').style.display = 'block'
		} else {
			document.getElementById('dayError').textContent = ''
			document.getElementById('dayError').style.display = 'none'
		}

		if (!isMonthValid) {
			document.getElementById('monthError').textContent = validationResults
				? validationResults.monthError
				: 'Must be a valid month'
			document.getElementById('monthError').style.display = 'block'
		} else {
			document.getElementById('monthError').textContent = ''
			document.getElementById('monthError').style.display = 'none'
		}

		if (!isYearValid) {
			document.getElementById('fullyearError').textContent = validationResults
				? validationResults.yearError
				: 'Must be in the past'
			document.getElementById('fullyearError').style.display = 'block'
		} else {
			document.getElementById('fullyearError').textContent = ''
			document.getElementById('fullyearError').style.display = 'none'
		}
	} else {
		// Valid date - calculate age (assuming you have a function to calculate age)
		const age = calculateAge(year, month, day)
		console.log('Calculated age:', age)

		// Clear any previous errors (optional)
		document.getElementById('dayError').textContent = ''
		document.getElementById('dayError').style.display = 'none'

		document.getElementById('monthError').textContent = ''
		document.getElementById('monthError').style.display = 'none'

		document.getElementById('fullyearError').textContent = ''
		document.getElementById('fullyearError').style.display = 'none'
	}

	if (anyEmptyField || !isDayValid || !isMonthValid || !isYearValid) {
		event.preventDefault() // Prevent default form submission (if applicable)
	}
})

// Function to check for invalid date combinations (example)
function checkValidDateCombination(day, month) {
	// Check for invalid days in February
	if (month === 2 && day > 29) {
		return false // Invalid date combination for February
	}

	// Check for invalid days in April, June, September, and November (30-day months)
	if (month === 4 || month === 6 || month === 9 || month === 11) {
		if (day > 30) {
			return false // Invalid date combination for those months
		}
	}

	// Check for February 29th in non-leap years
	if (month === 2 && day === 29) {
		// Check if the year is a leap year (divisible by 4, but not by 100 unless also divisible by 400)
		if (year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0)) {
			return false // Not a leap year, invalid date
		}
	}

	// All other date combinations are considered valid
	return true
}
