const form = document.querySelector('#contact_form')
const loader = document.querySelector('.loader')
const submit_p = document.querySelector('#contact_btn').querySelector('p')
const form_submittion_message_div = document.querySelector('.form_submittion_message')
let form_submittion_message = document.querySelector('#submittion_message')

//hide the appropriate message when 4 seconds have passed.
const hideSubmittionMessage = () => {
    setTimeout(() => {
        form_submittion_message_div.style.display = 'none'
    }, 5000)
}

//display the appropriate message when the form is submitted.
const displaySubmittionMessage = (s) => {
    form_submittion_message_div.style.backgroundColor = 'rgb(73, 216, 73)'
    form_submittion_message_div.style.borderLeftColor = 'rgb(1, 148, 1)'

    if (s === false) {
        form_submittion_message_div.style.backgroundColor = 'rgb(242, 69, 69)'
        form_submittion_message_div.style.borderLeftColor = 'rgb(248, 23, 23)'
    }
    form_submittion_message_div.style.display = 'flex'
    hideSubmittionMessage()
}

//display the loading animation when the form is submitted.
const displayLoader = () => {
    submit_p.style.display = 'none'
    loader.style.display = 'block'
}

//hide the loading animation when the form submittion was succesful or when an error occured.
const hideLoader = (s) => {
    submit_p.style.display = 'block'
    loader.style.display = 'none'
    //display the corresponding message.
    displaySubmittionMessage(submittion_success)
    form.reset();
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    //starting laoder animation
    displayLoader()

    //getting the values of all inputs.
    const name = form.querySelector('input#name').value.toUpperCase()
    const surname = form.querySelector('input#surname').value.toUpperCase()
    const email = form.querySelector('input#email').value
    const message = form.querySelector('input#message').value
    submittion_success = undefined

    fetch('/contact', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name, surname, email, message
        })
    })
    .then(res => res.json())
    .then(res => {
        //stopping animation due to succesfull contact form submittion.
        form_submittion_message.textContent = res.message
        submittion_success = true
        hideLoader(submittion_success)
    })
    .catch(e => {
        form_submittion_message.textContent = e.message
        submittion_success = false
        hideLoader(submittion_success)
    })
})