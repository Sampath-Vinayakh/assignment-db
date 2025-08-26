const { searchForRepositories } = require("../controllers/repositoryController");

const express = require("express");

const router = express.Router();

router.post('/search',searchForRepositories);

module.exports = router;