import  API_AUTH_LOGIN  from "../constants";

export async function login({ email, password }) {
    const body = JSON.stringify({ email, password });

    // Log the email and password being sent (for debugging)
    console.log('Email:', email);
    console.log('Password:', password);

    try {
        // Await the fetch call to get the response
        const response = await fetch(API_AUTH_LOGIN, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body,
        });

        console.log('url', API_AUTH_LOGIN);
        console.log("Response received:", response);

        // Check if the response was successful
        if (response.ok) {
            // Await the JSON response
            const { data } = await response.json();
            console.log("Response data:", data);

            const { accessToken: token, ...user } = data;
            console.log("Token:", token);
            console.log("User:", user);

            // Save token and user data in localStorage
            localStorage.token = token;
            localStorage.user = JSON.stringify(user);

            return data; // Return the data if successful
        } else {
            // Handle non-200 responses
            console.error("Login failed. Status:", response.status);
            throw new Error("Login failed");
        }
    } catch (error) {
        // Catch and log any errors that occur during the fetch
        console.error("Error during login:", error);
        throw error; // Re-throw the error to handle it higher up
    }
}
