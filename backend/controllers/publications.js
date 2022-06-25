const publications = require('../models/Publications');

const jwt = require('jsonwebtoken');
const db = require('../config/db');

// fs veut dire file-system, c'est ce qui nous permet de
// modifier et supprimer un fichier
const fs = require('fs');
const Publications = require('../models/Publications');



//Créer une publications
exports.createPublication = (req, res) => {
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

// Modifier une publication
exports.updatePublication = (req, res) => {
  const id = req.params.id;
  const titre = req.body.titre;
  const content = req.body.content;

  if (req.file) {
    const image = `${req.protocol}.//${req.get('host')}/images/${req.file.filename}`;
    const sql = `UPDATE publications SET image=?,titre=?, content=? WHERE id=?`;
    db.query(sql, [image, titre, content, id], (err, result) => {
      if (err) {
        res.status(400).json({ err });
      }
      else {
        res.status(200).json(result);
      }
    });
  }
  else {
    const sql = `UPDATE publications SET titre=?, content=? WHERE id=?`;
    db.query(sql, [titre, content, id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ err });
      }
      else {
        res.status(200).json(result);
      }
    });
  }
}

  //supprimer une publications
  exports.deletePublication = (req, res, next) => {
    const id = req.params.id;
    const sqlSelect = `SELECT image FROM publications WHERE id=?`;
    db.query(sqlSelect, [id], (err, result) => {
      if (err) {
        res.status(400).json({ err });
      }
      else {
        if (publications.imageUrl) {
          const filename = publications.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
            console.log('Photo supprimée !');
          });
        }
        const sqlDelete = `DELETE FROM publications WHERE id=?`;
        db.query(sqlDelete, [id], (err, result) => {
          if (err) {
            res.status(400).json({ err });
          }
          else {
            res.status(200).json(result);
          }
        });
      }
    });
  }

  //Afficher une publication
  /**
   * récuperer tous les publications
   * @param {*} req la requête reçue
   * @param {*} res la réponse à la requête
   */

  exports.getAllPublications = (req, res, next) => {
    const sql = `SELECT * FROM publications`;
    db.query(sql, (err, result) => {
      if (err) {
        res.status(400).json({ err });
      }
      else {
        res.status(200).json(result);
      }
    });
  }

  

