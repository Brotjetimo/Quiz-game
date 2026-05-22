import { useState } from "react";

export default function CreateUserForm() {
    const [createUsername, setCreateUsername] = useState("");
    const [createPassword, setCreatePassword] = useState("");
    const [validateCreatePassword, setValidateCreatePassword] = useState("");

    const [message, setMessage] = useState("");

    async function createUser(Event: React.SubmitEvent): Promise<void> {
        Event.preventDefault();

        if (!createUsername || !createPassword) {
            setMessage("Create user fields may not be empty");
            return;
        }

        if (createPassword !== validateCreatePassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: createUsername,
                    password: createPassword
                })
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to create user");
            }
            setMessage("User created successfully");

        } catch (error) {
            setMessage((error as Error).message);
        }

        setCreateUsername("");
        setCreatePassword("");
        setValidateCreatePassword("");
    }
    return (
        <>
            <div className='create-user-form__container'>
                <form className='create-user-form__form' onSubmit={createUser}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={createUsername}
                        onChange={(event) => setCreateUsername(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={createPassword}
                        onChange={(event) => setCreatePassword(event.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Validate password"
                        value={validateCreatePassword}
                        onChange={(event) => setValidateCreatePassword(event.target.value)}
                    />

                    <button type="submit">Create User</button>
                </form>
            </div>
            <h3>{message}</h3>

            <p>
                Don't have an account yet? Creating an account is quick and easy.
                An account gives you access to view scores after completing quizzes, along with the ability to put that score on the leaderboard.
                Account information is stored securely and will not be shared with any third parties or used for anything outside of this website.
            </p>
        </>
    );
}