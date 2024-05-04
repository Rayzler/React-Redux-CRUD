import type { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";
import type { User, UserId, UserWithId } from "../types";
import { rollbackAddedUser, rollbackDeletedUser, rollbackEditedUser } from "./users.slice.ts";

export const persistanceLocalStorage: Middleware = (store) => (next) => (action) => {
    next(action);
    localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
};

export const syncWithDatabase: Middleware = (store) => (next) => (action) => {
    const { type, payload } = action as PayloadAction<UserId | User | UserWithId>;
    const prevState = store.getState();

    next(action);

    if (type === "users/addUser") {
        fetch("https://jsonplaceholder.typicode.com/users/", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if (res.ok) {
                toast.success("Usuario creado correctamente");
                return;
            }
            throw new Error("Error al crear el usuario");
        }).catch(() => {
            toast.error("Error al crear el usuario");
            const addedUser = store.getState().users.find(
                (user: UserWithId) => !prevState.users.some((item: UserWithId) => item.id === user.id)
            );
            if (addedUser) store.dispatch(rollbackAddedUser(addedUser.id));
        });
    } else if (type === "users/editUser") {
        const user = payload as UserWithId;
        fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(res => {
            if (res.ok) {
                toast.success("Usuario actualizado correctamente");
                return;
            }
            throw new Error("Error al actualizar el usuario");
        }).catch(() => {
            toast.error("Error al actualizar el usuario");
            const prevUser = prevState.users.find((item: UserWithId) => item.id === user.id);
            store.dispatch(rollbackEditedUser(prevUser));
        });
    } else if (type === "users/deleteUserById") {
        const user = prevState.users.find((item: UserWithId) => item.id === payload);
        fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
            method: "DELETE"
        }).then(res => {
            if (res.ok) {
                toast.success("Usuario eliminado correctamente");
                return;
            }
            throw new Error("Error al eliminar el usuario");
        }).catch(() => {
            toast.error("Error al eliminar el usuario");
            if (user) store.dispatch(rollbackDeletedUser(user));
        });
    }
};