const User = require("../models/User");

// ALTAS USUARIOS
exports.addUser = async(req,res) =>{
    try{
        let user;
        user = new User(req.body);
        await user.save();
        res.send(user);
    }
    catch(error){
        console.log(error);
        console.log("Hubo un problema");
    }
}



// OBTENER USUARIO POR ID
exports.getUserById = async(req,res) => {
    const userId = req.body.id;
    try{
        const usuarios = await User.findById(userId);
        if (!usuarios) {
        console.log("lead no encontrado")
        res.json(null);
        }
        res.json(usuarios.username);
    }
    catch(error){
        res.json(null);
    }
}

// AUTENTICAR UN USUARIO
exports.authUser = async(req,res)=> {
    const {username,password} = req.body;
    try{
        const user = await User.findOne({username,password});
        if(!user){
            res.status(404).json({msg:'No existe el usuario'});
        }
        else{
            res.json(user)
        }
        
    } 
    catch(error){
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}



// OBTENER UN USUARIO
exports.getUser = async (req, res) => {
    try {
        const palabra = req.query.palabra; 

        const user = await UserModel.findOne({ nombre: palabra });
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: 'Error al obtener usuario' });
    }
};

