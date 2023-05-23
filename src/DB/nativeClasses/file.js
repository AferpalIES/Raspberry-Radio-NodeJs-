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
    setName(name){
        return new File(name, this.title, this.durationInSeconds, this.type, this.cover, this.author);
    }
    setTitle(title){
        return new File(this.name, title, this.durationInSeconds, this.type, this.cover, this.author);
    }
    setAuthor(author){
        return new File(this.name, this.title, this.durationInSeconds, this.type, this.cover, author);
    }

}