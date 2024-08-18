
// controllers/videoController.js
const Video = require('../models/Video');
const User = require('../models/User');
const mongoose = require("mongoose");

// CREATE
exports.likeVideo = async (req, res) => {
    try {
        const { id_usuario, id_video } = req.body;

        // Verificar si se proporcionaron los datos necesarios
        if (!id_usuario || !id_video) {
            return res.status(400).json({ message: 'id_usuario and id_video are required' });
        }

        // Crear una nueva instancia del modelo
        const newVideo = new Video({ id_usuario, id_video });

        // Guardar el video en la base de datos
        const savedVideo = await newVideo.save();

        res.status(201).json(savedVideo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
exports.dislikeVideo = async (req, res) => {
    try {
        const { id_video } = req.params;

        // Verificar si se proporcionó el id_video
        if (!id_video) {
            return res.status(400).json({ message: 'id_video is required' });
        }

        // Eliminar el video de la base de datos
        const result = await Video.deleteOne({ id_video });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Video not found' });
        }

        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getLikedVideos = async (req,res)=>{
    try {
        const userId = req.params.userId;
        // const objectId = new mongoose.Types.ObjectId(userId);

        // Verificar si el usuario existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Buscar videos que pertenezcan al usuario
        const videos = await Video.find({ id_usuario: userId });

        res.json(videos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error del servidor' });
    }
}