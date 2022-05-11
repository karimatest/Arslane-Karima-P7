const Publications = require('../models/Publications')

// fs veut dire file-system, c'est ce qui nous permet de
// modifier et supprimer un fichier
const fs = require('fs');

//Créer une publications
exports.createPublication = (req, res) => {
  console.log(req.auth);
  let publicationImage;
  //Si l'utilisateur publie une image
  if (req.file) {
    publicationImage = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  };
  // Création de l'objet publication
  const newPublication = {
    titre: req.body.titre,
    content: req.body.content,
    //imageUrl: publicationImage,
    userId: req.body.userId
  };
  // Création de la publications
  Publications.create(newPublication)
    .then(publication => res.status(201).json(publication))
    .catch(error => res.status(500).json({ error }));
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
exports.deletePublications = (req, res, next) => {
  publication.findOne({ _id: req.params.id })
    .then(publications => {
      if (!publications) {
        res.status(400).json({ error: new Error("Publication non trouvée !") });
      }
      // Vérification que la publication appartient à la personne qui effectue la requête
      if (publications.userId !== req.auth.userId) {
        res.status(400).json({ error: new Error("Requête non autorisée !") });
      }
      //Récuperation du nom du fichier à supprimer //
      const filename = publications.imageUrl.split('/images/')[1];
      //Suppression le fichier avec la méthode 'unlik' du package 'fs'
      fs.unlink(`images/${filename}`, () => {
        //suppression de la sauce dans la base de données // 
        Publications.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Publication supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
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