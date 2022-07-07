export function  userID(){
    return new Promise((resolve, reject)=>{
        const user_id = localStorage.getItem('user_id');
        resolve(user_id);
    });
}

export default {
    userID
}
