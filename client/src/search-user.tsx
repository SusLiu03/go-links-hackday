import { useEffect, useState } from "react";
import { useUserRepos } from "./user-context";

export const SearchUser = () => {
  const [username, setUsername] = useState<string>("");
  const [userRepos, setUserRepos] = useState<any[]>([]);
  const { totalRepoCount, fetchRepos } = useUserRepos();
  const [totalForkCount, setTotalForkCount] = useState<number>(0);
  const [usedLanguages, setUsedLanguages] = useState<{ [key: string]: number }>(
    {}
  );

  useEffect(() => {
    setUsername("");
    const forksCount = userRepos.reduce((acc, repo) => acc + repo.forks, 0);
    setTotalForkCount(forksCount);

    const languages: { [key: string]: number } = {};
    userRepos.forEach((repo) => {
      if (repo.language) {
        const language = repo.language;
        languages[language] = (languages[language] || 0) + 1;
      }
    });
    setUsedLanguages(languages);
  }, [userRepos]);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const repos = await fetchRepos(username);
      console.log(repos);
      setUserRepos(repos);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          required
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
      </form>
      <div>
        <h2>Total Count of Repositories: {totalRepoCount}</h2>
        <h3>Total Fork Count for All Repositories: {totalForkCount}</h3>
        <h3>Languages Used:</h3>
        <ul>
          {Object.entries(usedLanguages)
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([language, count]) => (
              <li key={language}>
                {language}: {count}
              </li>
            ))}
        </ul>
        <h3>Repositories:</h3>
        <ul>
          {userRepos.map((repo: any) => (
            <li key={repo.id}>
              {repo.name} : {repo.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
