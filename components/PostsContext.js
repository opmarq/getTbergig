import { createContext, useContext, useState } from "react";

const Context = createContext();

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  return (
    <Context.Provider value={[posts, setPosts]}>{children}</Context.Provider>
  );
}

export function usePostsContext() {
  return useContext(Context);
}
