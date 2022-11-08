const Commentaires = require('../models/Commentaires');
const db = require('../config/db');


// Fonction création d'un commentaire
/*exports.createCommentaire = (req, res) => {
    const content = req.body.content;
    const userId = req.auth.userId;
    const publicationsId = req.params.id;
    const sql = "INSERT INTO commentaires (content, userId, publicationsId) VALUES (?, ?, ?);";
    db.query(sql, [content, userId, publicationsId], (err, result) => {
        if (err) {
            res.status(400).json({ err });
        }
        else {
            res.status(201).json({ message: 'Commentaire ajouté !' });
        }
    });
};*/


  