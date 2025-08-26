const mongoose = require("mongoose");

const repoSchema = new mongoose.Schema({
  github_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  full_name: { type: String, required: true },
  description: String,
  html_url: { type: String, required: true },
  stars: { type: Number, default: 0 },
  forks: { type: Number, default: 0 },
  language: String,
  owner: {
    login: String,
    avatar_url: String,
    html_url: String
  },
  created_at: Date,
  updated_at: Date,
  search_keywords: [String], 
  last_fetched: { type: Date, default: Date.now }
});

const Repository = mongoose.model('Repository', repoSchema);
module.exports = Repository;