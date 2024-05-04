import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User, UserId, UserWithId } from "../types";

const DEFAULT_STATE: UserWithId[] = [
    {
        id: "1",
        name: "Alain Berset",
        email: "alain@gmail.com",
        github: "Alain"
    },
    {
        id: "2",
        name: "Guy Parmelin",
        email: "guy@gmail.com",
        github: "midudev"
    },
    {
        id: "3",
        name: "Ray Olsen",
        email: "rayzler@gmail.com",
        github: "Rayzler"
    }
];

const initialState: UserWithId[] = (() => {
    const state = localStorage.getItem("__redux__state__");
    const users: UserWithId[] = state ? JSON.parse(state).users : DEFAULT_STATE;
    return users.sort((a, b) => Number(a.id) - Number(b.id));
})();

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, { payload }: PayloadAction<User>) => {
            const id = (() => {
                const sortedUsers = state.sort((a, b) => Number(a.id) - Number(b.id));
                return String(Number(sortedUsers[sortedUsers.length - 1].id) + 1);
            })();
            state.push({ ...payload, id });
            return state.sort((a, b) => Number(a.id) - Number(b.id));
        },
        editUser: (state, { payload }: PayloadAction<UserWithId>) => {
            const index = state.findIndex((item) => item.id === payload.id);
            if (index !== -1) {
                state[index] = payload;
                return state.sort((a, b) => Number(a.id) - Number(b.id));
            }
        },
        deleteUserById: (state, { payload: id }: PayloadAction<UserId>) => {
            return state.filter((item) => item.id !== id);
        },
        rollbackAddedUser: (state, { payload: id }: PayloadAction<UserId>) => {
            return state.filter((item) => item.id !== id);
        },
        rollbackEditedUser: (state, { payload: user }: PayloadAction<UserWithId>) => {
            const index = state.findIndex((item) => item.id === user.id);
            if (index !== -1) {
                state[index] = user;
                return state.sort((a, b) => Number(a.id) - Number(b.id));
            }
        },
        rollbackDeletedUser: (state, { payload }: PayloadAction<UserWithId>) => {
            const user = state.find((item) => item.id === payload.id) as UserWithId;
            if (!user) {
                state.push(payload);
                return state.sort((a, b) => Number(a.id) - Number(b.id));
            }
        }
    }
});

export default usersSlice.reducer;

export const {
    addUser,
    editUser,
    deleteUserById,
    rollbackAddedUser,
    rollbackEditedUser,
    rollbackDeletedUser
} = usersSlice.actions;