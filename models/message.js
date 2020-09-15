const {Schema, model} = require('mongoose');

const MessageSchema = Schema({
    from:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },

    to:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    message:{
        type:String,
        required:true
    }
  
},{
    timestamps: true
});

MessageSchema.method('toJSON',function(){
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('Message',MessageSchema);