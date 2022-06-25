const commentaires = require('../models/Commentaires');
const db = require('../config/db');


// Fonction création d'un commentaire
exports.createComment = (req, res) => {
    commentaires.create ({
     user_id : req.auth.user_id,
     content : req.body.content,
     publications_id : req.body.publications_id,
    })
    .then (() => 
    res.status(200).json({ message: "commentaire créer"})
    )
    .catch ((error) =>
    res.status(400).json({ error: "Mauvaise requête:" + error})
    );
};
 