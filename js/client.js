const socket=io('http://localhost:8000');

const form=document.getElementById('send-container')
const messageInput=document.getElementById('messageInp')
const messageContainer=document.querySelector(".container")
var audio= new Audio('ting.mp3');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
    
}

form.addEventListener('submit',(e)=>{
    e.preventDefault(); //no reloading of page
    const message= messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);// I am telling node that i am sending message
    messageInput.value='' //once message is sent..it should be emptied back
})
const name =prompt("Enter your name to join the chat");
socket.emit('new-user-joined', name);

socket.on('user-joined',name=>{
append(`${name} joined the chat`,'right')
})

//if recieving(recieve namak event vo progrem bejega)
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})
//receive event is giving me message and name
// index.js alliruva broadcast tells if 10 ppl connected in node server and any one of user puts message it notifies all 9 ppl that this person put the message


//listening the leave event

socket.on('left',name=>{
    append(`${name} left the chat`,'right')
})