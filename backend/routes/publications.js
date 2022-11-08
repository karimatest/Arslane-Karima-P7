const express = require('express');
const router = express.Router();

// import middleware d'authentification
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const publicationsCtrl = require('../controllers/publications');


router.post('/', auth, multer, publicationsCtrl.createPublication);//Router pour créer une publication
router.delete('/:id', auth, publicationsCtrl.deletePublication);//Router pour supprimer une publication
router.put('/:id', auth, multer, publicationsCtrl.updatePublication);
router.get('/', auth, publicationsCtrl.getAllPublications);//Router pour ajouter tous les publications



module.exports = router; 