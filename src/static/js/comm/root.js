


class  root{
    constructor(){

    }

    newRoot(){

    }

    findRoot(){
        // 检索
        let root=   localStorage.getItem("1110");
        if(!root){
            let root ='root'
            this.seveRoot(root)
        }

        return blobToDataURL(root);
    }

    seveRoot(root){
        // 存储
        localStorage.setItem("1110",dataURLtoBlob(root) );
    }

        //Blob 转 Base64
      dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    //Blob 转 Base64
    blobToDataURL(blob, callback) {
        let a = new FileReader();
        a.onload = function (e) { callback(e.target.result); }
        a.readAsDataURL(blob);
    }

}