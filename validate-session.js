const validateSession =  (req, res) => {
    if (req.session.correo) {
        next(); // Continue to the next middleware or route handler  
    } else {
        res.status(401).json({ message: "No autorizado" });
    }      
}

export default validateSession;