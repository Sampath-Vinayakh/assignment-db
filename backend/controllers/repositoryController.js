const { getRepositoriesByKeyword, saveRepositories } = require("../services/repositoryService");

async function searchForRepositories(req,res){
  try {
    const { keyword, page = 1, fetchFresh = false } = req.body;
    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        error: 'Keyword is required' 
      });
    }

    const cleanKeyword = keyword.trim();

    if (!fetchFresh) {
      const dbResults = await getRepositoriesByKeyword(cleanKeyword, page);
      if (dbResults.repos.length > 0) {
        return res.json({
          success: true,
          data: dbResults,
          keyword: cleanKeyword
        });
      }
    }

    const githubResponse = await searchForRepositories(cleanKeyword, page);

    if (!githubResponse.success) {
      return res.status(githubResponse.status || 500).json({
        success: false,
        error: githubResponse.error
      });
    }

    const savedRepos = await saveRepositories(
      githubResponse.data.items, 
      cleanKeyword
    );

    res.json({
      success: true,
      data: {
        repos: savedRepos,
        pagination: {
          page: parseInt(page),
          total: githubResponse.data.total_count,
          totalPages: Math.ceil(githubResponse.data.total_count / 30)
        }
      },
      keyword: cleanKeyword
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }

}

module.exports = {
    searchForRepositories
}