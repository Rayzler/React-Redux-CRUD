import { useAppDispatch } from "./store.ts";
import { addUser as addUserAction, editUser as editUserAction, deleteUserById } from "../store/users.slice.ts";
import type { User, UserId } from "../types";

export default function useUserActions() {
    const dispatch = useAppDispatch();

    const addUser = (user: User) => {
        dispatch(addUserAction(user));
    };

    const editUser = (id: UserId, user: User) => {
        dispatch(editUserAction({ id, ...user }));
    };

    const removeUser = (id: UserId) => {
        dispatch(deleteUserById(id));
    };

    return { addUser, editUser, removeUser };
}