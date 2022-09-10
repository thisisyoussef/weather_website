const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const resultOne = document.querySelector('#message-1')
const resultTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(event)=>{
    resultOne.textContent = ''
    resultTwo.textContent =''
    event.preventDefault();
    
const data = fetch('/weather?address=' +search.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            resultTwo.textContent = data.error
            return
        }
        resultOne.textContent = data.location
        resultTwo.textContent = data.forecast
    }    
    )
    })
})