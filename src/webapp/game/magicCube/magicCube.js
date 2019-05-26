import magicCubeHtml from  './magicCube.html'
//import THREE from 'three'
import * as THREE from "three";

import OrbitControls from "three-orbitcontrols"
//import FBXLoader from "three/examples/js/loaders/FBXLoader"

var scene,camera,renderer,controls,light;//场景，相机，渲染器，视角,光线
var raycaster,mouse;//光投射器，鼠标位置对应的二维向量
var cubes ;//魔方
var cubemat;
var isRotating;//旋转控制器
var startPoint;//触发点
var movePoint;

var tx;
var ty;
var cubeParams = {//魔方参数
    x:-75,
    y:75,
    z:75,
    num:3,
    len:50,
    colors:['rgba(255,193,37,1)','rgba(0,191,255,1)',
        'rgba(50,205,50,1)','rgba(178,34,34,1)',
        'rgba(255,255,0,1)','rgba(254,254,254,20)']
};

var solid=new Array();
var liquid=new Array();
init();


function init() {

    var container = document.getElementById("drawArea");

    /*
        1、初始化渲染器
    */
    renderer = new THREE.WebGLRenderer();
    // renderer.setClearColor('white');//设置渲染出来的背景色
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(window.innerWidth,window.innerHeight);
    container.appendChild(renderer.domElement);

    /*
        2、初始化相机
            创建相机【远景相机，与人眼观察类似，近大远小】
            param1:视角【视角越大  物体渲染到屏幕时则看着越小，反之越大】
            param2:相机拍摄面的长宽比
            param3:近裁剪面
            param4:远裁剪面
    */
    camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,2000);
    camera.position.set(10,10,800);


    /*
        3、初始化场景
    */
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);　//背景

    light = new THREE.AmbientLight(0xfefefe); //光线
    scene.add(light);
    scene.add( new THREE.PointLightHelper( light, 15 ) );
    /*
        4、添加辅助坐标轴
    */
    var axes = new THREE.AxisHelper(800);
    scene.add(axes);

    /*
        5、添加地面网格
    */
    /**
     * size 网格总边长
     * step 网格个数
     * colorCenterLine  网格中心线颜色
     * colorGrid    网格其他线颜色
     */
    var gridHelper = new THREE.GridHelper( 300, 10, 'red', 'gray' );
    gridHelper.position.y = -100;
    gridHelper.position.x = 0;
    scene.add( gridHelper );

    /*
        6、添加正方体
    */

//创建展示场景所需的各种元素
    var geometry = new THREE.BoxGeometry(20,20,20);//盒子模型
    var material = new THREE.MeshBasicMaterial({color:"red"});//材料
    var materials = [];
    var myFaces = [];
    //一个小正方体有六个面，每个面使用相同材质的纹理，但是颜色不一样
    myFaces.push(faces(cubeParams.colors[1]));
    myFaces.push(faces(cubeParams.colors[2]));
    myFaces.push(faces(cubeParams.colors[4]));
    myFaces.push(faces(cubeParams.colors[5]));
    myFaces.push(faces(cubeParams.colors[3]));
    myFaces.push(faces(cubeParams.colors[0]));
    for (var k = 0; k < 6; k++) {
        var texture = new THREE.Texture(myFaces[k]);
        texture.needsUpdate = true;

        materials.push(new THREE.MeshLambertMaterial({
            name:"----------------"+k,
            map: texture
        }));
       //materials.specular = new THREE.Color(this.specular);
    }
    cubemat = new THREE.MeshFaceMaterial(materials);
    for(let l=0;l<27;l++){
        solid.push(new THREE.Mesh( geometry, cubemat ));
        solid[l].position.x =    ((l%3)%9) *21;
        solid[l].position.y =  parseInt(l/9) *21;
        solid[l].position.z =  parseInt((l/3)%3) *21;
        scene.add( solid[l] );
    }


    /*
        7、添加光投射器 及 鼠标二维向量 用于捕获鼠标移入物体

            下次渲染时，通过mouse对于的二维向量判断是否经过指定物体
    */
    raycaster = new THREE.Raycaster();//光线投射器
    mouse = new THREE.Vector2();//二维向量
    render();
    var tx;
    var ty;
    /**
     * 触摸开始事件
     * */
    renderer.domElement.addEventListener( 'touchstart', startCube , false );
    renderer.domElement.addEventListener( 'touchmove', moveCube, false  );
    renderer.domElement.addEventListener( 'touchend',  endCube , false );
    /*
      添加视图控制器
        */
   controls = new THREE.OrbitControls( camera, renderer.domElement);
}


function render() {
    requestAnimationFrame(render);
    renderer.render( scene, camera);
}



var projectiveObj;//定义上次投射到的对象


//生成canvas素材
function faces(rgbaColor) {
    var canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    var context = canvas.getContext('2d');
    if (context) {
        //画一个宽高都是256的黑色正方形


        context.fillStyle = 'rgba(256,256,256,1)';
        context.fillRect(0, 0, 256, 256);
        //在内部用某颜色的16px宽的线再画一个宽高为224的圆角正方形并用改颜色填充
        context.rect(16, 16, 224, 224);
        context.lineJoin = 'round';
        context.lineWidth = 16;
        context.fillStyle = rgbaColor;
        context.strokeStyle = rgbaColor;
        context.stroke();
        context.fill();
    } else {
        alert('您的浏览器不支持Canvas无法预览.\n');
    }
    return canvas;
}
// 触摸中的事件
function onDocumentMouseMove(raycaster,scene,camera,e) {
    var mouse={};
    var touch = e.touches[0]; //获取第一个触点
    var Sx = touch.clientX;//鼠标单击位置横坐标
    var Sy = touch.clientY;//鼠标单击位置纵坐标
    //屏幕坐标转标准设备坐标
    mouse.x = (Sx / window.innerWidth) * 2 - 1;//标准设备横坐标
    mouse.y = -(Sy / window.innerHeight) * 2 + 1;//标准设备纵坐标
    console.log(Sx+"对象数量"+Sy );
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    // var intersects = raycaster.intersectObjects(scene.children);
    console.log("对象数量"+intersects.length );
    if (intersects.length > 0) {
        var currentProjectiveObjT = intersects[0].object;
        if (projectiveObj != currentProjectiveObjT) {

            if((currentProjectiveObjT instanceof THREE.AxisHelper) || (currentProjectiveObjT instanceof THREE.GridHelper)){
                //穿过的是坐标轴线和网格线
                return;
            }

            // projectiveObj.material.color.setHex(projectiveObj.currentHex);
            projectiveObj = intersects[0].object;
        }
        // intersects[0].object.scale.set(1000, 1000, 1000);
        // intersects[0].object.rotation.x = 1
    } else {
        projectiveObj = null;
    }
}

function startCube(e){
    e.preventDefault();
    console .log("触摸"+e)
    var touch = e.touches[0]; //获取第一个触点
    tx = touch.clientX;//鼠标单击位置横坐标
    ty = touch.clientY;//鼠标单击位置纵坐标
    onDocumentMouseMove(raycaster,scene,camera,e);

    if(projectiveObj){

     controls.enabled=false;
        startPoint= touch;
        console.log("选中"+startPoint)

    }

}
//滑动操作魔方
function moveCube(event){
    if(projectiveObj&&!isRotating) {
        isRotating=true;
        var touch = event.touches[0]; //获取第一个触点
        movePoint= touch;
        var sub = getSub(startPoint,movePoint);//计算转动向量
        console.log("sub==============>"+sub)
        //  var direction = getDirection(sub);//获得方向;//获得方向
        var elements = solid;
        requestAnimationFrame(function (timestamp) {
            rotateAnimation(elements, sub, timestamp, 0);
        });

    }
    event.preventDefault();
}

function endCube(event) {
    event.preventDefault();
    console .log("触摸结束"+event)
    tx=0;
    ty=0;
    if(projectiveObj){
        projectiveObj=null;
        controls.enabled=true;
        isRotating=false;
       controls.addEventListener( 'change', render );//恢复全局控制事件


    }

}
function rotateAroundWorldZ(obj,rad){
    var x0 = obj.position.x;
    var y0 = obj.position.y;
    var q = new THREE.Quaternion();
    q.setFromAxisAngle( new THREE.Vector3( 0, 0, 1 ), rad );
    obj.quaternion.premultiply( q );
    //obj.rotateZ(rad);
    obj.position.x = Math.cos(rad)*x0-Math.sin(rad)*y0;
    obj.position.y = Math.cos(rad)*y0+Math.sin(rad)*x0;
}
/**
 * 旋转动画
 */
function rotateAnimation(elements,direction,currentstamp,startstamp,laststamp){
    var totalTime = 500;//转动的总运动时间
    if(startstamp===0){
        startstamp = currentstamp;
        laststamp = currentstamp;
    }
    if(currentstamp-startstamp>=totalTime){
        currentstamp = startstamp+totalTime;
        isRotating = false;
        startPoint = null;
        updateCubeIndex(elements);
    }
    switch(direction){
        //绕z轴顺时针
        case 0.1:
        case 0.3:
            for(var i=0;i<elements.length;i++){
                rotateAroundWorldZ(elements[i],-90*Math.PI/180*(currentstamp-laststamp)/totalTime);
            }
            break;
        //绕z轴逆时针
        case 0.2:
        case 0.4:
            for(var i=0;i<elements.length;i++){
                rotateAroundWorldZ(elements[i],90*Math.PI/180*(currentstamp-laststamp)/totalTime);
            }
            break;

        default:
            break;
    }
    if(currentstamp-startstamp<totalTime){
        requestAnimationFrame(function(timestamp){
            rotateAnimation(elements,direction,timestamp,startstamp,currentstamp);
        });

    }
}

function getSub(obj,obj2) {
    var x=obj.clientX -obj2.clientX;
    var y=obj.clientY-obj2.clientY;

    if(x>0||y>0){
        if(x>y){
            return 0.4;
        }
        return 0.2;
    }
    if(x>y){
        return 0.3;
    }
    return 0.1;
}


//更新位置索引
function updateCubeIndex(elements){
    for(var i=0;i<elements.length;i++){
        var temp1 = elements[i];
        for(var j=0;j<elements.length;j++){
            var temp2 = elements[j];
            if( Math.abs(temp1.position.x - temp2.x)<=cubeParams.len/2 &&
                Math.abs(temp1.position.y - temp2.y)<=cubeParams.len/2 &&
                Math.abs(temp1.position.z - temp2.z)<=cubeParams.len/2 ){
                temp1.cubeIndex = temp2.cubeIndex;
                break;
            }
        }
    }
}
//魔方操作结束
function stopCube(){
    intersect = null;
    startPoint = null
}