const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;

const directory = 'D:\\OBS\\'

const getFiles = async (dir) => {
    const filelist = []
    fs.readdir(dir, (err, files) => {
        let counter = 1
        files.forEach(file => {
            if (path.extname(file) == ".mkv" || path.extname(file) == ".mp4") {
                fs.stat(directory + file, (err, stats) => {
                    try {
                        const year = stats.mtime.getFullYear()
                        const month = stats.mtime.getMonth() + 1
                        const outdir = directory + year + "\\" + month + "\\"
                        console.log(`starting ${file}`)
                        console.log(`Encoding ${counter} of ${files.length} files.`)
                        console.log(`${year}, ${month}`);

                        if(!fs.existsSync(outdir)) {
                            fs.mkdirSync(outdir, {recursive: true});
                        }
                        const command = `ffmpeg -y -i "${directory + file}" -map 0 -threads 10 -hide_banner -loglevel error "${outdir + file}"`
                        // const command = "ffmpeg -h"
                    
                        const output = execSync(command);
                        console.dir(output.toString());
                        fs.unlinkSync(directory + file);
                    } catch (err) {
                        console.log(err);
                    }
                    console.log(`${file} complete.`);
                    counter++;                    

                });
                // console.log(file)
            }

        })
    });
    // console.dir(filelist)
    // fs.stats
    

}


getFiles(directory);

// fs.readdirSync(directory).forEach(file => {
//     console.log(file);
//     const stat = fs.statSync(file)
//     console.log(stat);


//   });

