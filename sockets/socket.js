const {io} = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('The Killers'));
bands.addBand(new Band('Winds of winter'));
bands.addBand(new Band('Slayer'));
bands.addBand(new Band('Scorpions'));


io.on('connection',client=>{
    console.log("Cliente Conectado");

    client.emit('bands',bands.getBands())

    client.on('disconnect' ,()=>{
        console.log('client disconnected');
    });

    client.on('message',(payload)=> {
        console.log(payload);
        client.broadcast.emit("message",{admin: payload})
    });

    client.on('hello', (payload)=>{
        console.log(payload);
        client.broadcast.emit('hello',{'hello': payload});
    });

    client.on('flutter',(payload)=>{
        console.log(payload);
        client.broadcast.emit('flutter',payload);
    });

    client.on('vote-band',(payload)=>{
        console.log(payload.id);
        bands.voteBand(payload.id);
        io.emit('bands',bands.getBands());  
    });

    client.on('add-band',(payload)=>{
        console.log(payload);
        bands.addBand(new Band(payload.name));
        io.emit('bands',bands.getBands());
    });

    client.on('delete-band',(payload)=>{
        console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('bands',bands.getBands());
    });
});