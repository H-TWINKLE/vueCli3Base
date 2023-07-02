const ora = require('ora')
const loading = ora('正在部署中');
const Client = require('ssh2').Client;
const compressing = require('compressing');
const fs = require('fs');

const service = {
  host: 'xxx.xxx.xxx.xxx',// 服务器IP
  port: 22,// 服务器端口
  username:'root',// 服务器ssh登录用户名
  password: 'rootpwd',// 服务器ssh登录密码
  path: '/usr/local/nginx/html/',// 服务器web目录，注意结尾真的要斜杠的
  name:'myProject'
}

// 为上传zip文件名起后缀名字做准备
const d = new Date()
const year = (d.getFullYear()+'').substring(2)
const month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)
const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
const hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
const minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
let time = year + month + day + hour + minute

/**
 * 1.进入目录
 * 2.删除旧的项目
 * 3.解压缩上传的zip文件
 * 4.将dist文件目录名称改为项目名称
 *  // 5.删除zip文件 保留zip文件万一要回滚呢~ rm -rf ${service.name}${time}.zip
 * 6.退出
 * @type {string[]}
 */
const uploadShellList = [
  `cd ${service.path}\n`,
  `rm -rf ${service.name}\n`,
  `unzip ${service.name}${time}.zip\n`,
  `mv dist ${service.name}\n`,
  `rm -rf ${service.name}${time}.zip\n`,
  `exit\n`
]

function deployFile() {
  let conn = new Client();
  loading.start();
  conn.on('ready', function () {
    // 判断部署前，是否dist.zip文件已删除
    fs.exists('dist.zip', function(exists) {
      if(exists) {
        fs.unlinkSync('dist.zip')
      }
    });
    // npm run build 以后的dist文件 打包成dist.zip文件
    compressing.zip.compressDir('./dist/', 'dist.zip')
      .then(()=>{
        conn.sftp(function(err, sftp){
          if(err){
            throw(err);
          }else{
            // 上传dist.zip文件到服务器指定位置,并更改文件名 例如 yjyy202306010835.zip
            sftp.fastPut('./dist.zip', `${service.path}${service.name}${time}.zip`, function(err, result){
              conn.shell((err, stream) => {
                if (err) throw err;
                stream.on('close', () => {
                  loading.stop();
                  console.log('部署结束');
                  conn.end();
                }).on('data', (data) => {
                  // console.log('输出: ' + data);
                });
                stream.end(uploadShellList.join('')); // 执行解压重命名的脚本
              });
            });
          }
        });
      })
      .catch(()=>{});
  }).connect(service);
}

deployFile()
