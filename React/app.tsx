import { useAuth } from "./auth/AuthContext";
import { useFetchUser } from "./auth/useFetchUser";
import { usePermissions } from "./auth/usePermissions";

function App() {
  useFetchUser(); // auto-load user on startup

  const { user, loading, logout } = useAuth();
  const { can } = usePermissions();

  if (loading) return <Spinner />;

  return (
    <div>
      <h1>Hello, {user?.name}</h1>

      {can("invoice:approve") && <ApproveButton />}

      <button onClick={logout}>Logout</button>
    </div>
  );
}
