const play= new Event('play');


class ImageDiv{
    constructor(size, url, type){
        this.size=size=="big"?'100px':'50px';
        this.url=url=="not found"?null:url;
        this.imgType=type;
        this.src=this.url?`data:image/${this.imgType}; base64, ${this.url}`:"./static/assets/default_cover.png";
    }
    getHtml(){
        let elm= document.createElement('img');
        elm.setAttribute('src', this.src);
        elm.setAttribute('alt', "imgAlt");
        elm.style.width=this.size;
        elm.style.height=this.size;
        return elm;
    }

}

class FileDiv{
    constructor(file){
        this.img=new ImageDiv('small', file.cover, file.cover.type);
        this.file=file;
        this.fileRef=null;
        this.elm=this.createDiv();
    }
    createDiv(){
        let elm=document.createElement('div');
        elm.classList.add('FileDiv'); 
        elm.id=this.file.id;
        elm.appendChild(this.img.getHtml());
        elm.innerHTML+=`
        <div class="fileDescription">
            <h1><b>${this.file.title}</b></h1>
            <h2>${this.file.author}</h2>
        </div>
        <p>${this.file.durationInMinutes}</p>`;
        elm.addEventListener('click', (e)=>{
            const {id}=this.file;
            fetch('/play/'+id, {
                method: 'POST', 
                body: "", 
                headers:{
                  'Content-Type': 'application/json'
                }
              }).then(res => res.json()).then(res2=>console.log(res2));
              elm.dispatchEvent(play);
        })
        return elm;
    }
    getHtml(){
        
        return this.elm;
    }
}

class PlayButton{
    constructor(){
        this.playingState=true;
        this.button=document.createElement("img")
        this.srcStates={
            "off":"./static/assets/play.svg",
            "on":"./static/assets/pause.svg"
        }
        this.button=this.createButton();
    }
    setPlayingState(newState){
        this.playingState=newState;
        this.button.setAttribute("src", this.srcStates[newState?"on":"off"]);

    }
    setButtonRef(btnref){
        this.buttonref=btnref;
    }
    createButton(){
        let button = document.createElement("img");
        button.setAttribute("id","playbtn")
        button.setAttribute("src", "./static/assets/play.svg")
        button.classList.add("playPauseButton")
        button.onload=()=>{this.setButtonRef(document.getElementById("playbtn"));};
        button.addEventListener("click", (e)=>{
            this.setPlayingState(!this.playingState);
            fetch(`/play/${this.playingState?"resume":"stop"}`)
        })
        return button;
    }
    getHtml(){
        return this.button;
    }
}

class FileSection{
    constructor(){
        this.filedivs=[];
    }
    getHtml(){
        let fileSection= document.createElement('div');
        fileSection.classList.add('fileSection');
        fileSection.id="fileSection";
        for(let i=0; i<this.filedivs.length; i++){
            fileSection.appendChild(this.filedivs[i].getHtml());
        }
        return fileSection;
    }
}
class MusicBar{
    constructor(){
        this.button=new PlayButton();
        this.musicBar=this.createMusicBar()
    }
    createMusicBar(){
        let musicBar= document.createElement('div');
        musicBar.classList.add('musicBar');
        musicBar.id= "musicBar";
        musicBar.appendChild(this.button.getHtml());
        return musicBar
    }
    getHtml(){
        return this.musicBar;
    }
}
class SideInfoSection{
    constructor(){
        this.sideInfoSection=document.createElement('div');
        this.sideInfoSection.classList.add('sideInfoSection');
        this.sideInfoSection.id= "sideInfoSection";
        this.image= new ImageDiv("big", "", "").getHtml();
        this.sideInfoSection.appendChild(this.image);
        this.title= document.createElement('h1');
        this.sideInfoSection.appendChild(this.title);
    }
    render(id){
        fetch('/API/getFileById/'+id).then((response)=>response.json()).then(res=>{
            this.createSelf(res[0]);
        })
    }
    createSelf(file){
        this.image.src=new ImageDiv("BIG", file.cover, file.cover.type).src;
        this.title.innerText=file.title;
    }   
    getHtml(){
        return this.sideInfoSection;
    }
}

class App{
    constructor(){
    }
    async intialize(){
        this.fileSection= new FileSection();
        this.sectionBar= new MusicBar();
        this.button=this.sectionBar.button;
        this.sideInfoSection= new SideInfoSection();
        await this.loadFileDivs();
    }
    async loadFileDivs(){
        return fetch('/API/getFiles').then(res=>res.json()).then(res=>{
            for(let i=0; i<res.length; i++){
                const fileDiv= new FileDiv(res[i]);
                fileDiv.elm.addEventListener('play', (e)=>{
                    this.button.setPlayingState(true);
                    this.sideInfoSection.render(e.target.id);
                })
                this.fileSection.filedivs.push(fileDiv);
            }
        });
    }
    getHtml(){
        let html=document.createElement('div');
        html.appendChild(this.fileSection.getHtml());
        html.appendChild(this.sideInfoSection.getHtml());
        html.appendChild(this.sectionBar.getHtml());
        return html;
    }
}


const root=document.getElementById('root');
async function startApp(){
    const app= new App();
    await app.intialize();
    root.appendChild(app.getHtml());
}
startApp();




