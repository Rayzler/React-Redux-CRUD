import { Button, TableCell, TableRow } from "@tremor/react";
import { RiDeleteBin5Line, RiEditLine } from "@remixicon/react";
import { UserWithId } from "../types";
import useUserActions from "../hooks/useUserActions.ts";
import EditUser from "./EditUser.tsx";
import { useState } from "react";

interface Props {
    user: UserWithId;
}

function UserRow({ user }: Props) {
    const { removeUser } = useUserActions();
    const [isOpen, setIsOpen] = useState(false);

    const handleEdit = () => {
        setIsOpen(true);
    };

    const handleDelete = () => {
        removeUser(user.id);
    };

    return (
        <>
            <TableRow>
                <TableCell>{user.id}</TableCell>
                <TableCell className={"flex items-center gap-2"}>
                    <img className={"w-8 h-8 rounded-full"} src={`https://unavatar.io/github/${user.github}`}
                         alt={user.name} />
                    {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                    <Button onClick={handleEdit} className={"me-3 dark:text-white"} variant={"light"}
                            icon={RiEditLine} />
                    <Button onClick={handleDelete} className={"dark:text-white"} variant={"light"}
                            icon={RiDeleteBin5Line} />
                </TableCell>
            </TableRow>
            <EditUser user={user} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
}

export default UserRow;