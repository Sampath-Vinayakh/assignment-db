const { fetchRepositories } = require("../controllers/repositoryController");

const express = require("express");

const router = express.Router();

router.post('/search',fetchRepositories);

module.exports = router;