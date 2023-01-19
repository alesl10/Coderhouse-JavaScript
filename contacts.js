const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_l6lc2tr';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Su mensaje ha sido enviado',
        showConfirmButton: false,
        timer: 1500
      })
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});