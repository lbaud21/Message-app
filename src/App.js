import "./styles/App.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { ContactsProvider } from "./contexts/ContactsProvider";
import { ConversationsProvider } from "./contexts/ConversationsProvider";
import { SocketProvider } from "./contexts/SocketProvider";

function App() {
  const [username, setUsername] = useLocalStorage("username", "", true);
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
          changeSentForm={setSendForm}
        />
      )}
    </div>
  );
}

export default App;
