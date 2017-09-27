import List from "./List.js";

export default class ListCollection{
    constructor(options){
        options = options || {};
        this._lists = new Map();
        this.listsData = options.listsData;
        this.local = options.local;
        this.loaded = this.fetchData()
    }
    fetchData(){
        let reqs = [];
        this.listsData.lists.forEach(info => {
            let list = new List({
                slug:info.slug,
                handle:info.user.screen_name,
                path: this.local ? "data/" + info.slug + ".json" : undefined
            });
            list.loaded.then(lst => this._lists.set(lst.slug, lst));
            reqs.push(list.loaded);
        });
        return Promise.all(reqs).then(all => this).catch(err => console.log(err));
    }
    get lists(){
        return this._lists;
    }
    findUnions(keys){
        let larr = keys.map(k => this.lists.get(k));
        return larr.reduce((uall, list, i) => {
            if(i === 0){
                uall.members = new Set(list.handles);
            } else {
                let uset = new Set();
                list.handles.forEach(h => {
                    if(uall.members.has(h)){ uset.add(h) }
                })
                uall.members = uset;
            }
            uall.sets.push(list.slug);
            uall.size = uall.members.size;
            return uall;
        }, {sets:[], size: 0, members: new Set()})
    }

}