import "./styles/App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";

function App() {
  const [rememberMe, setRememberMe] = useState(() => {
    const storedValue = JSON.parse(
      localStorage.getItem("message-app-username")
    );
    return storedValue ? true : false;
  });
  const [username, setUsername] = useLocalStorage("username", "", rememberMe);
  const [sendForm, setSendForm] = useState(false);

  const dashboard = (
    <SocketProvider username={username}>
      <ContactsProvider>
        <ConversationsProvider>
          <Dashboard username={username} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return (
    <div className="app-wrapper">
      {sendForm ? (
        dashboard
      ) : (
        <Login
          changeUsername={setUsername}
          username={username}
          changeRememberMe={setRememberMe}
          rememberMe={rememberMe}
          changeSentForm={setSendForm}
        />
      )}
    </div>
  );
}

export default App;
