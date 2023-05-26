class ImageDiv{
    constructor(size, url){
        this.size=size=="big"?'100px':'50px';
        this.url=url;
    }
    getHtml(){
        return `<img src=${this.url} alt=${"imgAlt"} style="width:${this.size}; height:${this.size}">`;
    }

}

class FileDiv{
    constructor(file){
        this.img=new ImageDiv('small', file.cover);
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


const root=document.getElementById('root');


fetch('/API/getFiles').then(res=>res.json()).then(res=>{
    for(let i=0; i<res.length; i++){
        const fileDiv= new FileDiv(res[i]);
        root.appendChild(fileDiv.getHtml());
    }
});
