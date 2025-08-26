const Repository = require("../models/Repo");


  async function saveRepositories(repos, keyword) {
    const savedRepos = [];
    
    for (const repo of repos) {
      try {
        const repoData = {
          github_id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          owner: {
            login: repo.owner.login,
            avatar_url: repo.owner.avatar_url,
            html_url: repo.owner.html_url
          },
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          last_fetched: new Date()
        };

        // Use upsert to update existing or create new
        const updatedRepo = await Repository.findOneAndUpdate(
          { github_id: repo.id },
          { 
            ...repoData,
            $addToSet: { search_keywords: keyword.toLowerCase() }
          },
          { 
            upsert: true, 
            new: true,
            setDefaultsOnInsert: true
          }
        );

        savedRepos.push(updatedRepo);
      } catch (error) {
        console.error('Error saving repository:', error);
      }
    }

    return savedRepos;
  }

  async  function getRepositoriesByKeyword(keyword, page = 1, limit = 30) {
    const skip = (page - 1) * limit;
    
    const repos = await Repository.find({
      search_keywords: { $in: [keyword.toLowerCase()] }
    })
    .sort({ stars: -1 })
    .skip(skip)
    .limit(limit);

    const total = await Repository.countDocuments({
      search_keywords: { $in: [keyword.toLowerCase()] }
    });

    return {
      repos,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

module.exports = {
    saveRepositories,
    getRepositoriesByKeyword
  }