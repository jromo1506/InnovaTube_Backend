const User = require("../models/User");
const crypto = require('crypto');
const emailService = require('../services/nodemailer');
const bcrypt = require('bcrypt');

// ALTAS USUARIOS

exports.addUser = async (req, res) => {
  try {
    console.log("GUARDAR");
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un problema");
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -resetPwdToken -resetPwdExpires');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener usuarios');
  }
};



// OBTENER USUARIO POR ID
exports.getUserById = async(req,res) => {
    const userId = req.body._id;
    try{

        const usuarios = await User.findById(userId);
        if (!usuarios) {
        console.log(userId,"lead no encontrado")
        res.json(null);
        }
        res.json(usuarios.username);
    }
    catch(error){
        res.json(null);
    }
}

// AUTENTICAR UN USUARIO
exports.authUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ msg: 'Contraseña incorrecta' });
    }

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
}
// Enviar email reset password
exports.forgotPasswordEmail = async(req,res)=>{
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'No user found with this email' });
    }

    // Generar token
    const token = crypto.randomBytes(32).toString('hex');
    
    // Guardar token en el usuario
    user.resetPwdToken = token;
    user.resetPwdExpires = Date.now() + 3600000; // 1 hora desde ahora
    await user.save();

    const resetLink = `http://localhost:4200/reset-password/${token}`;

    await emailService.sendMail(
        email,
        'Password Reset',
        `Click the following link to reset your password: ${resetLink}`,
        `<p>Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`
    );

    res.status(200).json({ message: 'Password reset link sent to your email' });
}


exports.resetPassword = async(req,res)=>{
    const { token } = req.params;
    const user = await User.findOne({
        resetPwdToken: token,
        resetPwdExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    // Aquí puedes mostrar un formulario para ingresar la nueva contraseña
    res.status(200).json({ message: 'Token is valid, proceed with resetting password' });
}

exports.resetPassword = async(req,res)=>{
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({
        resetPwdToken: token,
        resetPwdExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ message: 'Password reset token is invalid or has expired' });
    }

    // Hashear la nueva contraseña y guardar
    user.password = password;
    user.resetPwdToken = undefined;
    user.resetPwdExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password has been reset' });
}



