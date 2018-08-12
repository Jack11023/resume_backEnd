const conn = require('../model/connect _resume')
var formidable = require('formidable')
const path = require('path')
const config = require('../config')
const move = require('../assets/lib/moveFile')

const handler = (req, res) => {
var form = new formidable.IncomingForm(); //创建上传表单
form.encoding = 'utf-8'; //设置编辑
form.uploadDir = path.join(config.rootDir,'uploads','images'); //设置上传目录 文件会自动保存在这里
form.keepExtensions = true; //保留后缀
form.maxFieldsSize = 5 * 1024 * 1024; //文件大小5M

form.parse(req, function (err, fields, files) {
    if (err) {
        /*
错误处理
                      */
        next(err);
        return;
    }
    var uploadfile;
    for (var imginfo in files) {//这里就是上传每个文件
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
    //文件存储upload物理路径
    const uploadFilePath = uploadfile.path
    //文件名不重复处理
    const uploadFileName = [fields.users,new Date().toLocaleDateString(),Math.random(1000,9999).toString(),uploadfile.name].join('$')
    //验证用户名是否重复
    const user_name = fields.users, user_pwd = fields.pwd
    const q1 = 'select * from users where user_name=?'
    const prom1 = new Promise(function(resolve,reject) {
        conn.query(q1,user_name,(err,result) => {
            if(err) reject({status: 500,msg: '数据库查询失败!'})
            if(result.length > 0 ) {
                reject({status: 501,msg: '用户名重复!'})
            }
            resolve()
        })
    })
    //移动文件
    const prom2 = new Promise(function(resolve,reject) {
        move.images(uploadFilePath,uploadFileName,(result) => {
            if(result.code != 200) 
                reject(result)   
            resolve()
        })
    })
    //写入数据库注册信息
    const q2 = 'insert into users set user_name=?,user_pwd=?,avatar=?'
    const prom3 = new Promise(function(resolve,reject) {
        const newPath = [config.root,'static','images',uploadFileName].join('/')
        conn.query(q2,[user_name,user_pwd,newPath],(err,result) => {
            if(err) reject({status: 500, msg: '查询数据库失败!'})
            if(result.affectedRows == 0) reject({status: 501, msg: '用户注册失败!'})
            resolve()
        })
    })

    prom1
    .then(() =>{ return prom2 },err => res.send(err))
    .then(() => { return prom3 },err => res.send(err))
    .then(() => { res.send({status: 200, msg: '用户注册成功!'}) },err => res.send(err))
});
}


module.exports = handler