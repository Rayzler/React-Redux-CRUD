import "./App.css";
import UsersList from "./components/UsersList.tsx";
import CreateUser from "./components/CreateUser.tsx";
import { Toaster } from "sonner";

function App() {
    return (
        <>
            <div className={"flex flex-col gap-4"}>
                <CreateUser />
                <UsersList />
            </div>
            <Toaster richColors />
        </>
    );
}

export default App;
