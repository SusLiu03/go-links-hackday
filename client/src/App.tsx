import "./App.css";
import { SearchUser } from "./search-user.tsx";
import { UserProvider } from "./user-context.tsx";
function App() {
  return (
    <UserProvider>
      <div>
        <SearchUser />
      </div>
    </UserProvider>
  );
}

export default App;
