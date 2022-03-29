// console.log('This is client side JavaScript From (/js/app.js)');
// Here the value is stored in new variable x 
// myFunction = () => {
//     let x = document.getElementById("myname").value;
//     document.getElementById("demo").innerHTML = x;
// }

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data);
//     })
// })

// Challenge:- Fetch weather!
// 1. Setup a call to fetch to fetch weather for boston
// 2. Get the parse JSON response
//  - If error property, print error
//  - If no error property, print location and forecast
// 3. Refresh the browser and test your work 

// Challenge:-  Use input value to get weather
// 1. Migrate fetch call into the submit callback
// 2. Use the search text as the address query string value
// 3. Submit the form with a valiid and invalid value to test

// Challenge:- Render content to paragraphs
// 1. Select the second message p from Javascript
// 2. Just before fetch, render loading message and empty p
// 3. If error, render error
// 4. If no error, render location and forecast 
// 5. Test your work! Search for errors and valid locations


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'From JavaScript';
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error);
                messageOne.textContent = data.error;
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast
                // console.log(data.location);
                // console.log(data.forecast);
            }
        })
    })
    // console.log(location); 
})