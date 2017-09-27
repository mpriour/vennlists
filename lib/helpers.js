export function readJSON(resp){
    return new Promise( (resolve, reject) => {
        resp.json().then(data => resolve(data)).catch(err => reject(err));
    })
}

export function getCombinations(arr) {
    const result = [];
    const f = function(prefix, arr) {
        for (let i = 0, s = ""; i < arr.length; i++) {
            if(prefix == ""){
                s = arr[i]
            } else {
                s = prefix + "|" + arr[i]
            }
            result.push(s.split("|"));
            f(s, arr.slice(i + 1));
        }
    }
    f('', arr);
    return result;
}