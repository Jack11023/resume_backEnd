const conn = require('../model/connect _resume')
var formidable = require('formidable')
const path = require('path')
const config = require('../config')

const handler = (req, res) => {
var form = new formidable.IncomingForm(); //创建上传表单
form.encoding = 'utf-8'; //设置编辑
form.uploadDir = path.join(config.rootDir,'static','images'); //设置上传目录 文件会自动保存在这里
form.keepExtensions = true; //保留后缀
form.maxFieldsSize = 5 * 1024 * 1024; //文件大小5M

form.parse(req, function (err, fields, files) {
    //这里可以直接：
    // console.dir(fields) //这里就是post的XXX 的数据
    // console.dir(files) //这里就是上传的文件
    if (err) {
        /*
错误处理
                      */
        next(err);
        return;
    }
    var uploadfile;
    for (var imginfo in files) {
        console.dir(files[imginfo]) //这里就是上传每个文件
        uploadfile = files[imginfo];
    }
    // imginfo 得到一个文件
    if (uploadfile._writeStream.bytesWritten > form.maxFieldsSize) {
        logger.error('图片不能大于5M');
        respObject.msg = '图片不能大于5M';
        res.send(respObject);
        return;
    }


    var extName = ''; //后缀名
    switch (uploadfile.type) {
        case 'image/pjpeg':
            extName = 'jpg';
            break;
        case 'image/jpeg':
            extName = 'jpg';
            break;
        case 'image/png':
            extName = 'png';
            break;
        case 'image/x-png':
            extName = 'png';
            break;
        case 'image/gif':
            extName = 'gif';
            break;
    }


    if (extName.length == 0) {
        logger.error('只支持png,jpg,gif格式图片');
        respObject.msg = '只支持png,jpg,gif格式图片';
        res.send(respObject);
        return;
    }

    const uploadfilename = uploadfile.path

    const upload_filename = uploadfile.name;
    const upload_filetype = uploadfile.type;

});
}


module.exports = handler