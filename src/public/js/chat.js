const socket = io();
// DOM Elements
let message = document.querySelector('#message');
let btn = document.querySelector('#send');
let output = document.querySelector('#output');
let actions = document.querySelector('#actions');

//sweet alert
Swal.fire({
  icon: "info",
  title: "Hi you are conected to German chat! c:",
  text: "type your username",
  input: "text",
  inputValidator: (value)=>{
    if (!value){
      return "You must add a user"
    }
  },
  allowOutsideClick: false
}).then(result =>{
  user = result.value
  console.log(user)
});


btn.addEventListener('click', () => {
  socket.emit('client:message', {
    username: user,
    message: message.value
  });
});

message.addEventListener('keypress', () => {
  socket.emit('client:typing', username.value)
});

socket.on('client:message', (data) => {
  console.log(data);
  output.innerHTML += `<p>
  <strong>${data.username}</strong> : ${data.message}
  </p>`
});

socket.on('client:typing', (data) => {
  actions.innerHTML = `<p>
  <em>${data} is typing...</em>
  </p>`
});