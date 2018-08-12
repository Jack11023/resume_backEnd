const fs = require('fs')
const config = require('../../config')
const path = require('path')

const images = (oldPath,newFname,callback) => {
    fs.readFile(oldPath,(err,data) => {
        if(err) callback({code: 500, msg: '读取文件失败!'})
        fs.writeFile(path.join(config.rootDir,'static','images',newFname),data,(err) => {      
            if(err) callback({code: 501, msg: '写入文件失败!'})
            callback({code: 200, msg: '移动文件成功!'})
        })
    })
}

module.exports = {
    images
}