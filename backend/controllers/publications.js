const Publications = require('../models/Publications');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
// fs veut dire file-system, c'est ce qui nous permet de
// modifier et supprimer un fichier
const fs = require('fs');

//Créer une publications
exports.createPublication = (req, res, next) => {
  const userId = req.auth.userId;
  console.log("user:", userId);
  const image = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null;
  const titre = req.body.titre ? req.body.titre : null;
  const content = req.body.content ? req.body.content : null;

  const sql = "INSERT INTO publications (user_id, image, titre, content) VALUES (?, ?, ?, ?);";
  const sqlParams = [userId, image, titre, content];
  db.query(sql, sqlParams, (error, results, fields) => {
    if (error) {
      res.status(500).json({ 'error': error.sqlMessage });
    } else {
      console.log(results);
      res.status(201).json({ message: "Publication créer !" });
    }
  });

};

// Modifie une publications
exports.modifyPublications = (req, res, next) => {
  const publicationsObject = req.file ?
    {
      ...JSON.parse(req.body.Publications),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Publications.updateOne({ _id: req.params.id }, { ...publicationsObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Publications modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

//supprimer une publications
//exports.deletePublications = (req, res, next) => {
// publication.findOne({ _id: req.params.id })
// .then(publications => {
// if (!publications) {
// res.status(400).json({ error: new Error("Publication non trouvée !") });
//}
// Vérification que la publication appartient à la personne qui effectue la requête
//if (publications.userId !== req.auth.userId) {
//res.status(400).json({ error: new Error("Requête non autorisée !") });
// }
//Récuperation du nom du fichier à supprimer //
// const filename = publications.imageUrl.split('/images/')[1];
//Suppression le fichier avec la méthode 'unlik' du package 'fs'
//fs.unlink(`images/${filename}`, () => {
//suppression de la sauce dans la base de données // 
//Publications.deleteOne({ _id: req.params.id })
// .then(() => res.status(200).json({ message: 'Publication supprimé !' }))
//       .catch(error => res.status(400).json({ error }));
// });
//})
// .catch(error => res.status(500).json({ error }));
//};

exports.deletePublication = (req, res, next) => {
  const publicationId = req.params.publicationId;
  console.log(publicationId);
  const sqlParams = [publicationId];
  // recherche de l'image de la publication
  const sqlDeleteImg = "SELECT * FROM PUBLICATIONS WHERE publicationId= ?;"
  db.query(sqlDeleteImg, sqlParams, (errImg, results, fields) => {
    if (errImg) {
      res.status(500).json({ 'error': errImg.sqlMessage })
      // si l'image existe, suppression
    } else if (results[0].image != null) {
      const oldImg = results[0].image
      console.log(oldImg)
      const oldFile = oldImg.split('/images/')[1];
      fs.unlink(`images/${oldFile}`, (err => {
        if (err) {
          console.log(err);
          return false
        } else {
          console.log("Image du publication supprimée !");
          return true
        }
      }));
    }
    const sql = "DELETE FROM PUBLICATIONS WHERE publicationId= ?;";
    db.query(sql, sqlParams, (error, result, fields) => {
      if (error) {
        res.status(400).json({ 'error': error.sqlMessage });
      } else {
        res.status(201).json({ message: 'Publication supprimé !' });
      }
    });
  })
};



//Afficher une publication
exports.getOnePublications = (req, res, next) => {
  Publications.findOne({
    _id: req.params.id
  }).then(
    (publication) => {
      res.status(200).json(publication);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

//afficher toutes les publications
exports.getAllPublications = (req, res, next) => {
  Publications.find().then(
    (publications) => {
      res.status(200).json(publications);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

// export de la fonction like
exports.likePublication = (req, res, next) => {
  const like = req.body.like;
  // récupère l'id de l'URL
  const publicationsId = req.params.id;
  // récupère le userId
  const userId = req.body.userId;
  switch (like) {
    // ajout d'un like
    case 1:
      Publications.updateOne({ _id: publicationsId }, {
        $inc: { likes: +1 },
        $push: { usersLiked: req.body.userId }
      })
        .then(() => res.status(201).json({ message: 'Like ajoutée !' }))
        .catch(error => res.status(400).json({ error }));
      break;
    //ajout d'un dislike    
    case -1:
      Publications.updateOne({ _id: publicationsId }, {
        $inc: { dislikes: +1 },
        $push: { usersDisliked: req.body.userId }
      })
        .then(() => res.status(201).json({ message: "Dislike ajoutée ! " }))
        .catch(error => res.status(400).json({ error }));
      break;
    // suppression like et dislike    
    case 0:
      Publications.findOne({ _id: publicationsId })
        .then(publications => {
          //Supprimer son like de UsersLiked
          if (publications.usersLiked.includes(userId)) {
            Publications.updateOne({ _id: publicationsId },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: userId }
              })
              .then(() => res.status(201).json({ message: "Suppression du like !" }))
              .catch((error) => res.status(400).json({ error }));
          } else if (publications.usersDisliked.includes(userId)) {
            // Supprimer son dislike de usersDisliked
            Publications.updateOne({ _id: publicationsId },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: userId }
              })
              .then(() => res.status(201).json({ message: "Suppression du dislike ! " }))
              .catch((error) => res.status(400).json({ error }));
          } else {
            res.status(403).json({ message: "requête impossible !" })
          }
        })
        .catch(() => res.status(404).json({ message: "Publication introuvable !" }));
      break;
  }
};