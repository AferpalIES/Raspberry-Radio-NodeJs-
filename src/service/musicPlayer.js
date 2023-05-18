const { exec } = require('child_process');
function playMusicFile(filePath){
    exec (`mpg123 ${filePath}`, (err, stdout, stderr) => {
        if (err) {
            console.log("No se ha podido ejecutar")
        }
    })
}

export default playMusicFile