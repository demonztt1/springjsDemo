let  Resource =qGuan.find("resource")


@Resource("AAA")
export default class B   {
constructor(){
    console.log("创建B")


}
}
// 加载组件到 DOM 元素 mountNode
const b=qGuan.find("B");
ReactDOM.render(<b.AAA></b.AAA>,  document.getElementById('root'));
