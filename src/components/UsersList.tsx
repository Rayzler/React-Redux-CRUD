import {
    Badge,
    Card,
    Table,
    TableBody,
    TableHead,
    TableHeaderCell,
    TableRow, Title
} from "@tremor/react";
import UserRow from "./UserRow.tsx";
import { useAppSelector } from "../hooks/store.ts";

export default function UsersList() {
    const users = useAppSelector((state) => state.users);
    
    return (
        <Card className={""}>
            <Title className={"flex gap-2"}>
                Usuarios
                <Badge>{users.length}</Badge>
            </Title>
            <Table className="mt-5">
                <TableHead>
                    <TableRow>
                        <TableHeaderCell>Id</TableHeaderCell>
                        <TableHeaderCell>Name</TableHeaderCell>
                        <TableHeaderCell>Email</TableHeaderCell>
                        <TableHeaderCell>Actions</TableHeaderCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {users.map((item) => (
                        <UserRow key={item.id} user={item} />
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}