const axios = require("axios");

async function searchRepositories(keyword, page = 1, perPage = 30) {
    try {
      const response = await axios.get(`https://api.github.com/search/repositories`, {
        headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`
        },
        params: {
          q: keyword,
          sort: 'stars',
          order: 'desc',
          page: page,
          per_page: perPage
        }
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('GitHub API Error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch from GitHub',
        status: error.response?.status
      };
    }
}

module.exports = {
    searchRepositories
}