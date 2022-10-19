const contactForm = document.querySelector('.contact-form')
let name = document.getElementById('name');
let email = document.getElementById('email');
let subject = document.getElementById('subject');
let message = document.getElementById('message');
let span = document.getElementById('f-span');



contactForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    // console.log('working')
    let formData = {
        name: name.value,
        email: email.value,
        subject: subject.value,
        message: message.value

    
    }

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/contact');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = function(){
        console.log(xhr.responseText)

        if(xhr.responseText === 'success'){
            // alert('email sent')
            span.innerHTML = `Message sent successfully`
            console.log(span)
            name.value = '';
            email.value = '';
            subject.value = '';
            message.value = '';
        }else{
            span.innerHTML = `Something went wrong, please try again`
            // alert("something went wrong")
        }
    }
    xhr.send(JSON.stringify(formData));
    // console.log(formData)
});