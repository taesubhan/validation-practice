function addInputValidation() {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('.sign-up-input');

    //Adds event listener that checks for any errors on the input elements when user clicks "Submit"
    form.addEventListener('submit', (e) => {
        form.classList.remove('invalid-form');
        
        for (const input of inputs) {
            const inputBox = input.querySelector('.validation-input');
            const errorBox = input.querySelector('.error-message');

            showError(inputBox, errorBox);

            if (!inputBox.validity.valid) {
                e.preventDefault();
                form.classList.add('invalid-form');
            }
        }

        if (!form.classList.contains('invalid-form')){
            alert('High Five!');
        }
    })

    //Add event listener that validates inputs when user leaves the input box
    for (const input of inputs) {
        const inputBox = input.querySelector('.validation-input');
        const errorBox = input.querySelector('.error-message');

        inputBox.addEventListener('blur', () => {
            console.log('blurred');
            showError(inputBox, errorBox);
        })
    }
}

//Takes an input element and span element. Displays any errors that the element may have
function showError(elem, errorBox) {
    if (elem.validity.valueMissing) {
        errorBox.textContent = 'This field is required!';
    } else if (elem.validity.typeMismatch) {
        errorBox.textContent = 'The value type does not match this field';
    } else if (elem.validity.tooShort) {
        errorBox.textContent = `The ${elem.id} is too short. Value should be at least ${elem.getAttribute('minlength')} characters`;
    } else if (elem.validity.tooLong) {
        errorBox.textContent = `The ${elem.id} is too long. Value should not exceed ${elem.getAttribute('maxlength')} characters`;
    }

    else if (elem.id === 'zip' && isZipInvalid()) {
        const country = document.querySelector('#country').value;
        const errorMessage = getZipConstraints()[country][1];
        errorBox.textContent = errorMessage;
        elem.setCustomValidity(errorMessage);
    }
    
    else if (elem.id === 'password-confirm' && passwordNotMatch()) {
        errorBox.textContent = 'Password does not match';
        elem.setCustomValidity('Password mismatch');
    }

    else {
        errorBox.textContent = '';
        elem.setCustomValidity('');
    }
}

function passwordNotMatch() {
    const password = document.querySelector('#password');
    const passwordConfirm = document.querySelector('#password-confirm');

    return password.value !== passwordConfirm.value;
}

function getZipConstraints() {
    return {
        usa: [
            '^\\d{5}$',
            'USA\'s zip code must be 5 digits',
        ],
    };
}

function isZipInvalid() {
    const constraints = getZipConstraints();

    const country = document.querySelector('#country').value; 
    const zip = document.querySelector('#zip').value;

    const constraint = new RegExp(constraints[country][0],'');

    return !constraint.test(zip);
}

addInputValidation();
console.log('test');