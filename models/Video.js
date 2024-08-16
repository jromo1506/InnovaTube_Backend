const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    id_usuario:{
        type:String,
        required:true

    },

});

module.exports = mongoose.model('Video',VideoSchema);