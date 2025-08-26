import { useState } from "react";
import RepositoryList from "./components/RepositoryList";
import axios from "axios";
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

function App() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [repoList, setRepoList] = useState([]);
  const [error, setError] = useState("");

  async function getRepoList() {
    try {
      setLoading(true);
      const wait = await new Promise((resolve) =>
        setTimeout(() => resolve(), 5000)
      );
      const response = await axios.post(
        `${VITE_BASE_URL}/api/repository/search`,
        {
          keyword: search,
        }
      );
      if (response.status == 200) {
        const data = response.data.data.repos;
        setRepoList(data);
        return;
      }
      setError("Something went wrong! Please try again later!");
      setTimeout(() => {
        setError("");
      }, 3000);
    } catch (err) {
      setError("Something went wrong! Please try again later!");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
      setSearch("");
    }
  }

  return (
    <>
      <h1 className="mt-3 text-center text-xl">Search for GITHUB Repositories.</h1>
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="flex gap-2 w-full md:w-2/3 lg:w-1/3 text-md mt-5 px-2">
          <input
            type="text"
            placeholder="Search here"
            className="w-full px-3 py-2 border border-gray-200 rounded-3xl outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-400 px-5 py-2 border-none text-white rounded-3xl cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
            onClick={getRepoList}
            disabled={loading}
          >
            Search
          </button>
        </div>
        {loading && (
          <div className="flex flex-col items-center justify-center mt-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-sm text-gray-600 animate-pulse">
              Fetching repositories...
            </p>
          </div>
        )}
        {error && <div className="mt-3 align-middle text-red-400">{error}</div>}
        {repoList.length > 0 && !loading && (
          <div className="m-3">
            <RepositoryList repoList={repoList} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
