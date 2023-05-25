class ImageDiv{
    constructor(size, url){
        this.size=size=="big"?'100px':'50px';
        this.url=url;
    }
    getHtml(){
        return `<img src=${this.url} alt=${"imgAlt"} style="width:${this.size}; height:${this.size}">`;
    }

}

class MainSection{
    constructor(){

    }
    getHtml(){
        
    }

}

class FileDiv{
    constructor(file){
        this.img=new ImageDiv('small', file.cover);
        this.file=file;
    }
    getHtml(){
        return `<div class="FileDiv" >
            ${this.img.getHtml()}
            <div class="fileDescription">
                <h1><b>${this.file.title}</b></h1>
                <h2>${this.file.author}</h2>
            </div>
            <p>${this.file.durationInMinutes}</p>
        </div>`
    }


}

const file={
    title:"Buleria",
    author:"David Bisbal",
    durationInMinutes: "3:12",
    cover:"img"
}
const file2={
    title:"Ay, Carmela",
    author:"Manuel Azaña",
    durationInMinutes:"2:43",
    cover:"Diagrama_Radio.png"
}
const filediv= new FileDiv(file);
const filediv2= new FileDiv(file2);
const root=document.getElementById('root');
root.innerHTML+=filediv.getHtml();
root.innerHTML+=filediv2.getHtml();
