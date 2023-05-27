

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
    constructor(){}
    getHtml(){
        let button = document.createElement("img");
        button.setAttribute("src", `../assets/play.svg`)
        button.classList.add("playPauseButton")
        button.addEventListener("click", (e)=>{
            fetch("play/pause")
        })
    }
}




const root=document.getElementById('root');


fetch('/API/getFiles').then(res=>res.json()).then(res=>{
    for(let i=0; i<res.length; i++){
        const fileDiv= new FileDiv(res[i]);
        root.appendChild(fileDiv.getHtml());
    }
});
