const prompt = require("prompt-sync")();
const bcrypt = require('bcrypt');

async function main() {
    console.log("Welcome to Password Security App");
    console.log("Please enter your password (minimum 8 characters):");
    const password = prompt("> ");

    if (password.length < 8) {
        console.log("Error: Password must be at least 8 characters long");
        return;
    }

    try {
        const hashedPassword = await hashPassword(password);
        console.log("Your password has been securely hashed:");
        console.log(hashedPassword);

        const match = await verifyPassword(password, hashedPassword);
        if (match) {
            console.log("Password verification successful");
        } else {
            console.log("Password verification failed");
        }
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

async function hashPassword(password) {
    const saltRounds = 10; // Strength of the salt
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
}

main();