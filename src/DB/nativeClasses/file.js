export default class File{
    constructor({name=null, title=null, duration=null, type=null, cover=null, author=null, id=null}){
        this.name=name??title;
        this.type=type;
        this.fullName= (this.name&&this.type)?(this.name+"."+type):null;
        this.durationInSeconds=Math.round(duration);
        this.durationInMinutes=this.getMinutes(duration);
        this.title=title;
        this.cover=cover;
        this.author=author;
        this.id=id;
    }

    getMinutes(duration){
        const mins=Math.trunc(duration/60);
        const secs=Math.round(duration%60);
        return mins+":"+secs;
    }

}