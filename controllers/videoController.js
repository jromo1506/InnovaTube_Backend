
// controllers/videoController.js
const Video = require('../models/Video');

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