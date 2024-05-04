import { store } from "./store";

type UserId = string;

interface User {
    name: string;
    email: string;
    github: string;
}

interface UserWithId extends User {
    id: UserId;
}

type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch