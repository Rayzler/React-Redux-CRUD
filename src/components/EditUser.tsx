import type { UserWithId } from "../types";
import { Button, Dialog, DialogPanel, TextInput, Title } from "@tremor/react";
import { FormEvent, useRef } from "react";
import useUserActions from "../hooks/useUserActions.ts";

interface Props {
    user: UserWithId;
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}

function EditUser({ user, isOpen, setIsOpen }: Props) {
    const { editUser } = useUserActions();
    const formRef = useRef<HTMLFormElement>(null);

    const handleEdit = (evt: FormEvent<HTMLFormElement>) => {
        console.log("Edit user");
        evt.preventDefault();
        const formData = new FormData(formRef.current!);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const github = formData.get("github") as string;

        editUser(user.id, { name, email, github });
        closeDialog();
    };

    const closeDialog = () => {
        formRef.current!.reset();
        setIsOpen(false);
    };

    return (
        <>
            <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
                <DialogPanel>
                    <Title className={"mb-4"}>Edit User</Title>

                    <form ref={formRef} onSubmit={handleEdit} className={"flex flex-col gap-2"}>
                        <TextInput required name={"name"} placeholder={"Ingresa el nombre"} defaultValue={user.name} />
                        <TextInput required type={"email"} name={"email"} placeholder={"Ingresa el email"}
                                   defaultValue={user.email} />
                        <TextInput required name={"github"} placeholder={"Ingresa el usuario de Github"}
                                   defaultValue={user.github} />
                        <div className={"flex gap-4"}>
                            <Button className="mt-8 grow" type={"submit"}>Edit</Button>
                            <Button className="mt-8 grow" type={"button"}
                                    onClick={() => setIsOpen(false)}>Cancel</Button>
                        </div>
                    </form>
                </DialogPanel>
            </Dialog>
        </>
    );
}

export default EditUser;