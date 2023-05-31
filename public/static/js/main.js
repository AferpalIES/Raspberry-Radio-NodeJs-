class ImageDiv{
    constructor(size, url, type){
        this.size=size=="big"?'100px':'50px';
        this.url=url=="not found"?null:url;
        this.imgType=type;
        this.src=this.url?`data:image/${this.imgType}; base64, ${this.url}`:"./static/assets/default_cover.png";
    }
    getHtml(){
        return `<img src="${this.src}" alt=${"imgAlt"} style="width:${this.size}; height:${this.size}">`;
    }

}

class FileDiv{
    constructor(file){
        this.img=new ImageDiv('small', file.cover, file.cover.type);
        this.file=file;
    }
    getHtml(){
        let elm=document.createElement('div');
        elm.classList.add('FileDiv'); elm.id=this.file.id;
        elm.innerHTML=`${this.img.getHtml()}
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
        })
        return elm;
    }
}

class PlayButton{
    constructor(){
        this.playingState=true;
        this.button=document.createElement("img")
        this.buttonref=null;
        this.srcStates={
            "on":"./static/assets/play.svg",
            "off":"./static/assets/pause.svg"
        }
    }
    setPlayingState(newState){
        this.playingState=newState;
        this.buttonref.setAttribute("src", this.srcStates[newState?"on":"off"]);

    }
    setButtonRef(btnref){
        this.buttonref=btnref;
    }
    getHtml(){
        let button = document.createElement("img");
        button.setAttribute("id","playbtn")
        button.setAttribute("src", "./static/assets/play.svg")
        button.classList.add("playPauseButton")
        button.onload=()=>{(this.setButtonRef(document.getElementById("playbtn")))};
        button.addEventListener("click", (e)=>{
            this.setPlayingState(!this.playingState);
            switch(this.playingState){
                case(true):
                fetch('/play/resume');
                break;
                case(false):
                fetch('/play/stop');
                break;
            }
        })

        return button;
    }
}




const root=document.getElementById('root');


fetch('/API/getFiles').then(res=>res.json()).then(res=>{
    for(let i=0; i<res.length; i++){
        const fileDiv= new FileDiv(res[i]);
        root.appendChild(fileDiv.getHtml());
    }
});
root.appendChild(new PlayButton().getHtml());