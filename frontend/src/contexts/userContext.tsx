import { createContext, useContext, useState } from "react";

// User types and context
type User = {
  token: string;
  usedId: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const sampleUser: User = {
    token: "sampleToken",
    usedId: "2",
  }
  const [user, setUser] = useState<User | null>(sampleUser);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

