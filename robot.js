//这个机器人目前只需要完成菜谱推荐的显示
/*
 * 未来可以实现，机器人学习使用网站。
 */
window.$ = function(id){
    //目前只支持id
    return document.getElementById(id);
}
//第一步需要实现可拖拽
               
 var div1=document.getElementById("robotImg");
  var   maskDiv, //透明mask层，用于跟随鼠标
        clientX, //鼠标按下时水平坐标
        clientY, //鼠标按下时垂直坐标
        divLeft, //原始div左距离
        divTop, //原始div上距离
        unit = "px"; //距离样式的单位
        var dsq;
var rm = function(ev){
    
     //处理event对象浏览器兼容
     ev = ev || window.event;
     //设置鼠标按下时水平坐标
     clientX = ev.clientX;
     //设置鼠标按下时垂直坐标
     clientY = ev.clientY;
     //设置原始div左距离
     divLeft = parseFloat(div1.style.left);
     //设置原始div上距离
     divTop = parseFloat(div1.style.top);
     maskDiv = div1.cloneNode(false);
     //设置克隆层的透明
     maskDiv.setAttribute("className", "opacity");
     maskDiv.setAttribute("class", "opacity");
     //将透明层加入DOM
      div1.parentNode.appendChild(maskDiv);               
     }
                //在文档上注册鼠标移动事件
  window.document.onmousemove = function (event) {
                        //处理event对象浏览器兼容
                        event = event || window.event;
                        //如果有克隆层
                        if (maskDiv) {
                               // document.body.removeChild(div1)
                                //使div随鼠标移动
                                div1.style.left = divLeft + event.clientX - clientX + unit;
                                div1.style.top = divTop + event.clientY - clientY + unit;
                        }
                }
                //在文档上注册鼠标弹起事件
 window.document.onmouseup = function () {
                        //如果有克隆层
                        if (maskDiv) {
                                //移除克隆层
                                div1.parentNode.removeChild(maskDiv);
                                maskDiv = null;
                        }
                }
//第二步实现鼠标悬停时所出现的随机语句
var message = [
    '我的小宝贝',
    '我的菜谱呢？',
    '你要订餐吗?'
];
var action =[
    'heng',
    'hidden',
    'shu',
    'notmove'
];

//横着走
action['heng'] = function(obj){
    var actTime=2000;
    
   dsq= setInterval(function(){
         actTime-=50;
        if(actTime>0){
            var l=parseFloat(obj.style.left);
            obj.style.left=l+1+unit;
        }else{

           clearInterval(dsq);
        }
    },50);
}
//隐藏自己
action['hidden'] = function(obj){
    var actTime=2000;
   dsq = setInterval(function(){
        actTime-=50;
        if(actTime>0){
            obj.style.display="none";
        }else{
           obj.style.display="block";
           clearInterval(dsq);
        }
    },50);
}
action['notmove'] = function(obj){
    return false;
}
//竖向走
action['shu'] = function(obj){
    var actTime=2000;
    dsq =setInterval(function(){
        actTime-=50;
        if(actTime>0){
            var t=parseFloat(obj.style.top);
            obj.style.top=t+1+unit;
        }else{

           clearInterval(dsq);
        } 
    },50);
}
var mdiv = document.getElementById("me");
var getMess = function(ev){
      clearInterval(dsq);
      ev = ev||window.event;
     var mess =getRand(message,1);
    
      //alert(action[act]);
     mdiv.innerHTML =mess;
    mdiv.style.opacity="1"; 
     var act =getRand(action,1);
    evalActstr(action[act],div1);
    
}
function evalActstr(str,obj){
     var ac=eval("("+str+")");
    var ex = {takeAct:ac};
    ex.takeAct(obj);
}
function getRand(arr, len) { 
    //这儿用到了js的函数式写法 
    arr.sort(function () { 
        return Math.random()-0.5; 
    }); 
    return arr.slice(0, len); 
} 
var messOver = function(ev){
      ev = ev||window.event;
     // mdiv.style.opacity="0";               
}
//第三步就是将图片实现按固定时间进行随机时间------------即完成了机器人推广
var totdsq =setInterval(function(){
     var mess =getRand(message,1);
    
      //alert(action[act]);
     mdiv.innerHTML =mess;
    mdiv.style.opacity="1"; 
     var act =getRand(action,1);
    evalActstr(action[act],div1);
},5000)
