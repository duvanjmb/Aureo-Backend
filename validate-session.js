const validateSession = (req, res) => {
    if (req.session && req.session.correo) {
        return res.status(200).json({ 
            authenticated: true, 
            message: 'Sesión válida',
            user: req.session.correo 
        });
    } else {
        return res.status(401).json({ 
            authenticated: false, 
            message: "No hay una sesión activa" 
        });
    }      
}

export default validateSession;