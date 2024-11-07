import axios from "axios";


const url = "https://flash-language-5bfe9-default-rtdb.europe-west1.firebasedatabase.app/users";

export async function createOrUpdateUser(user) {
    
    const userDataUrl = `${url}/${user.uid}.json`;

    const uid = user.uid;
    const email = user.email;
    const displayName = user.displayName || "Anonymous";
    const lastLogin = new Date().toISOString();
    
    const userData = {
        uid: uid,
        email: email,
        displayName: displayName,
        lastLogin: lastLogin,
    }

    //console.log("userData just composed ready to posted ..",userData)

    axios.post(userDataUrl,userData)
    .then((response) => console.log('User data saved successfully:', response.data))
    .catch((e) => console.log("Error sending users data:",e))

}