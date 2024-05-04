import { Button, Card, TextInput, Title } from "@tremor/react";
import useUserActions from "../hooks/useUserActions.ts";
import { FormEvent } from "react";

function CreateUser() {
    const { addUser } = useUserActions();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const github = formData.get("github") as string;

        addUser({ name, email, github });
        form.reset();
    };

    return (
        <Card>
            <Title className={"mb-4"}>Create User</Title>

            <form onSubmit={handleSubmit} className={"flex flex-col gap-2"}>
                <TextInput required name={"name"} placeholder={"Ingresa el nombre"} />
                <TextInput required type={"email"} name={"email"} placeholder={"Ingresa el email"} />
                <TextInput required name={"github"} placeholder={"Ingresa el usuario de Github"} />

                <div>
                    <Button type={"submit"} className={"mt-4"}>
                        Crear usuario
                    </Button>
                </div>
            </form>
        </Card>
    );
}

export default CreateUser;