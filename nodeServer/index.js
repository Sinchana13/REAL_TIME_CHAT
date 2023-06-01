//Node Server will handle socket io connection
const io=require('socket.io')(8000,{
    cors:{
        origin: "*"
    }
})
const users={};
 //jaise connection aaye socket mein run the arrow function
io.on("connection",socket=>{
    socket.on('new-user-joined',name=>{
        // console.log("new user",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);  //rest comes to know user has joined
    });
    //agar koi chat bhej raha hey to kya karna
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, name:users[socket.id]})  //others comes to know that someone has texted
    });

//I want to use socket.io  on port 8000
//i have initialized io. I want to run socket.io server bcoz it attaches instance of http
//This attached socket.io listens to the incoming events
//socket is aparticular connection
//Here io,on is instance of socket which listens to lot of socket connections
//socket.on matlab jab bhi koi particular connection ke saath kuch hoga   vo socket.on handle kar dega
//if socket.on sending new-user-joined, then users ko ek key dedo socket.id

//socket.on is accepting an event, kabhi new-user-joined event mila, name ko append kar dega users ke andar
//also if person enters in a group chatting rest persons need to know a particular person joined


//search for socket.io.disconnect
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id]; 

    });
      
})
