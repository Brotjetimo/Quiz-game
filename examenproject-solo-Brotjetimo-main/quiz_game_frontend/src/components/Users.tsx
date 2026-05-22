import { useState, useEffect } from 'react'

type User = {
    user_id: number;
    username: string;
    password: string
}

export default function Users() {

    // This state is used to store the values of the edit inputs for each user. The keys are the user IDs to seperate the values for each user.
    const [editValues, setEditValues] = useState<
        Record<number, { username?: string; password?: string }>
    >({});

    const [message, setMessage] = useState("");
    const [currentUsers, setUsers] = useState<User[]>([]);

    async function loadUsers(): Promise<void> {
        const res = await fetch("http://localhost:3000/users", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const currentUsers = await res.json();
        setUsers(currentUsers);
    }

    async function updateUser(Event: React.SubmitEvent, id: number,): Promise<void> {
        Event.preventDefault();

        if (!editValues[id]?.username && !editValues[id]?.password) {
            setMessage("Provide at least one field to update");
            return;
        }

        const inputs: { user_id: number; username?: string; password?: string } = {
            user_id: id
        };

        if (editValues[id]?.username) inputs.username = editValues[id].username;
        if (editValues[id]?.password) inputs.password = editValues[id].password;

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            });
            // If the response is not ok, get the error message from the response and throw it as an error to be caught in the catch block
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to update user");
            }
            else {
                setMessage("User updated successfully");
                setEditValues(prev => ({
                    ...prev,
                    [id]: { ...prev[id], username: "", password: "" }
                }));
            }
            loadUsers();
        } catch (error) {
            setMessage((error as Error).message);
        }
    }

    async function deleteUser(id: number): Promise<void> {
        if (!confirm("Delete this user?")) return;

        try {
            await fetch("http://localhost:3000/users", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: id
                })
            });
            setMessage("User deleted successfully");

            loadUsers();
        } catch (error) {
            setMessage("Error deleting user");
            return;
        }
    }

    // Load the users when arriving on the page
    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <>
            <div className='user-list_container'>
                <h2>User list:</h2>
                {currentUsers.map((user) => (
                    <ul key={user.user_id}>
                        <li>{user.user_id}</li>
                        <li>{user.username}</li>
                        <li>{user.password}</li>

                        <form
                            className="user-list_update-form"
                            onSubmit={(event) => updateUser(event, user.user_id)}
                        >
                            <input
                                type="text"
                                placeholder="New username"
                                defaultValue={user.username}
                                onChange={(event) => setEditValues(prev => ({
                                    ...prev,
                                    [user.user_id]: { ...prev[user.user_id], username: event.target.value }
                                }))}
                            />

                            <input
                                type="password"
                                placeholder="New password"
                                onChange={(event) => setEditValues(prev => ({
                                    ...prev,
                                    [user.user_id]: { ...prev[user.user_id], password: event.target.value }
                                }))}
                            />

                            <button type="submit">Update</button>
                        </form>

                        <button onClick={() => deleteUser(user.user_id)}>Delete</button>
                    </ul>
                ))}
                <p>{message}</p>
            </div>
        </>
    )
}