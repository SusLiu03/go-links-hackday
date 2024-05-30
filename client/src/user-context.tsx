import { createContext, useContext, useEffect, useState } from "react";

export interface UserRepo {
  login: string;
  public_repos: number;
}
interface UserContextType {
  totalRepoCount: number;
  fetchRepos: (username: string) => Promise<UserRepo[]>;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalRepoCount, setTotalRepoCount] = useState<number>(0);

  const fetchRepos = async (username: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/getRepos/${username}`
      );
      if (response.ok) {
        const repos = await response.json();
        console.log(repos);
        setTotalRepoCount(repos.length);
        return repos;
      } else {
        throw new Error("Failed to fetch");
      }
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  };
  //   const value: UserContextType = {
  //     repos,
  //     fetchRepos,
  //   };

  return (
    <UserContext.Provider value={{ totalRepoCount, fetchRepos }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserRepos = () => {
  const context = useContext<UserContextType | undefined>(UserContext);
  if (!context) {
    throw new Error("No context");
  }
  return context;
};
