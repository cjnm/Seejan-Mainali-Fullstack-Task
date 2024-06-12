import { saveUserInfo } from "../model/Users.js"

// Save/Update user info to dynamoDB after successful login or signup
const saveUser = async (user) => {
    try {
        await saveUserInfo(user);
    } catch {
        console.log("Error saving user");
    }
}

export { saveUser };
