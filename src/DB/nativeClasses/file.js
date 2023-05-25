export default class File{
    constructor({name=null, title=null, duration=null, type=null, cover=null, author=null, id=null}){
        this.name=name;
        this.type=type;
        this.fullName= (name+"."+type);
        this.durationInSeconds=duration;
        this.durationInMinutes=this.getMinutes(duration);
        this.title=title;
        this.cover=cover;
        this.author=author;
        this.id=id;
    }

    getMinutes(duration){
        const mins=Math.trunc(duration/60);
        const secs=duration%60;
        return mins+":"+secs;
    }

}