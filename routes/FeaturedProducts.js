const express = require('express');
const router = express.Router(); 

const {getFeatureds,AddFeatured,EditFeatured,getByFeaturedID,deleteFeatured} = require('../controllers/FeaturedProducts');

router.get('/',getFeatureds);
router.get('/:id',getByFeaturedID);
router.delete('/:id',deleteFeatured);
router.post('/',AddFeatured);
router.patch('/:id',EditFeatured);

module.exports =router;