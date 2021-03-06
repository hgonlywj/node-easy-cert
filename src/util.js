const fs = require('fs');
const path = require('path');

function deleteFolderContentsRecursive(dirPath) {
  if (!dirPath.trim() || dirPath === '/') {
    throw new Error('can_not_delete_this_dir');
  }

  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file, index) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderContentsRecursive(curPath);
      } else { // delete all files
        fs.unlinkSync(curPath);
      }
    });
    // keep the folder
    // fs.rmdirSync(dirPath);
  }
}

module.exports.getUserHome = function () {
  return process.env.HOME || process.env.USERPROFILE;
};

module.exports.getDefaultRootDirName = function () {
  return '.node_easy_certs';
};

module.exports.deleteFolderContentsRecursive = deleteFolderContentsRecursive;
