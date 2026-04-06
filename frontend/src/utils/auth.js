// Authentication and authorization utility functions for jwt token management

export const decodeToken = (token) =>{
    try {

        // split the token by '.' to get [ header, payload , signature]
        //then taking second part( index 1) which is the payload
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;  
    }
};

export const getUserFromToken = () =>{

    //get stored Jwt token from browser's localstorage
    const token = localStorage.getItem('token');
    if(!token) return null;

    //decode and return the token payload
     return decodeToken(token);
};

//Extracts the role of the currently logged-in user
export const getUserRole = () => {
    const user = getUserFromToken();
    return user?.role || null;
};

//checks if the current  user has administrator privileges
export const isAdmin = () =>{
    return getUserRole() === 'admin'
};

//Check if currently logged user is a buyer
export const isBuyer = () =>{
    return getUserRole() === 'user'
};

//Retrieves the username of the currently logged-in user
export const getUsername = () =>{
    const user = getUserFromToken();
    return user?.username || null;
}
