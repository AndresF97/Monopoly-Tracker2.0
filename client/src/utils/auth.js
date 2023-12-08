import decode from "jwt-decode"

class AuthService {
    getProfile(){
        return decode(this.getToken())
    }
    loggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    isTokenExpired(token){
    try{
        const decoded = decode(token)
        if(decoded.exp< Date.now()/1000){
            return true
        } else return false
    }catch(err){
        return false
    }
    }
    getToken(){
        return localStorage.getItem('id_token')
    }
    logIn(idToken){
        localStorage.setItem('id_item', idToken);
        window.location.assign('/')
    }
    logOut(){
        localStorage.removeItem('id_item');
        window.location.assign('/')
    }
};


export default new AuthService();