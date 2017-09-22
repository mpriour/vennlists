export function readJSON(resp){
    return new Promise( (resolve, reject) => {
        resp.json().then(data => resolve(data)).catch(err => reject(err));
    })
}