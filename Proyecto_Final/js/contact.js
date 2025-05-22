
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('contact-form').addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('name').value.trim();
    const email=document.getElementById('email').value.trim();
    const phone=document.getElementById('phone').value.trim();
    const message=document.getElementById('message').value.trim();
    if(!name||!email||!phone||!message){
      alert('Por favor, completa todos los campos.');
      return;
    }
    alert('Formulario enviado con éxito');
    e.target.reset();
  });
});
