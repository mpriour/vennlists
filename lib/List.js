import {readJSON} from "./helpers.js";
import User from "./User.js";

export default class List{
    constructor(options){
        const opt = options || {};
        const async = opt.async;
        const path = opt.path;

        this._users = null;
        this._handles = null;
        this._ids = null;
        this._rawList = null;
        
        this.count = 0;
        this.slug = opt.slug;
        this.handle = opt.handle
        this.id = opt.id;
        if(!this.id && (!this.slug || !this.handle)){
            throw new Error("Invalid constructor options. List must have either slug AND username OR id to be valid");
        }
        this.loaded = (async) ? false : this.fetchData(path);
    }
    
    fetchData(path){
        if(!path){
            /* fetch from twitter api */
        } else {
            /* fetch from path */
            const p = fetch(path).then(readJSON).then( result => {
                let userKvp = result.users.map( usr => {
                    let u = new User(usr);
                    return [u.handle, u];
                });
                this._users = new Map(userKvp);
                return this._users;
            }).catch(err => console.log(err));
            return p;
        }
    }

    get users(){
        if(!this._users){
            this._users = new Map();
        }
        return this._users;
    }

    get handles(){
        this._handles = new Set(this.users.keys);
        return this._handles;
    }

    get ids(){
        this._ids = this.asArray().map( u => u.id );
        return this._ids;
    }

    asArray(){
        return Array.from(this.users.values());
    }
}