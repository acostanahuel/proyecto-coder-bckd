const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(registerForm);
    //console.log(data);
    const obj = {};

    data.forEach((value,key)=>obj[key]=value);
    //console.log("Objeto formado:");
    //console.log(obj);
    fetch('/api/user/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result => {
      if (result.status === 201) {
        result.json();
        alert ('Usuario creado con exito');
        window.location.replace('/users/login');
      }else {
        alert ('No se pudo crear el usuario, ya existe');
      }
    }).then (
        json => console.log(json));
});