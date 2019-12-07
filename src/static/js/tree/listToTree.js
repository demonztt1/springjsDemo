
/**
 * list 数据转  children
 */


export default   class listToTree {
    constructor(nodes){
        this.res=[];
        if(nodes!=null){
            this.nodes= nodes;
        }else {
            this.nodes= [];
        }


    }
    totree(){
        if(this.nodes.length <=0) return [];
        this.toTow();
        return this.ftTree (0) ;
    }

    ftTree (w) {
        if (this.nodes[w].l == null) {
            let s=  this. nodes[w]
            let list = [];
            list.push(s)
            if (this.nodes[w].r != null) {
                let resli=this.ftTree(this.nodes[w].r);
                list.push(...resli)
            }
            return list
        } else {
            let s=this. nodes[w]

            s.children =     this.ftTree(this.nodes[w].l)
            let list = [];
            list.push(s)
            if (this.nodes[w].r != null) {
                let resli=this.ftTree(this.nodes[w].r);
                list.push(...resli)
            }
            return list
        }
    }

    toTow(){
        for (var i in this.nodes) {
            this.nodes[i].l = this.toL(this.nodes[i].key);  //就是获取每个对象的menu_id
            this.nodes[i].r = this.toR(this.nodes[i].pid,i);//就是获取每个对象的pid
        }
    }
    toL (key) {
        for (var i in this.nodes) {
            if (this.nodes[i].pid == key) {
                return i;
            }
        }
        return null;
    }
    toR (pId,l) {
        for (var i = l; i < this.nodes.length; i++) {
            if (this.nodes[i].pid== pId && i != l) {
                return i;
            }
        }
        return null;
    }



}

