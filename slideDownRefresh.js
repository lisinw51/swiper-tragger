var startY = 0;
var moveY = 0;
var endY = 0;
var num = 1;
//调整滑动速度，越大越慢
var aJ = 100;
//调整计时器速度,越大越慢
var clock = 5;
//设置容器内外差
var Difference = 0;
var _parent = [];
var _son = [];
var singleH = 0;
//设置偏移量
var pianyi = 0;

function Elastic(dom,clocktime){
	clock = clocktime;
	_parent = dom;
	_son = dom.children[0];
	//设置容器内外差
	Difference = _son.offsetHeight-dom.offsetHeight;
	if(Difference>0){
		//超出容器时候，设置尾部节点，作为刷新提示部分
		var node=document.createElement("li");
		var textnode=document.createTextNode("");
		node.setAttribute('id',"bottomtab");
		node.innerHTML = "<i id='rotate'></i><span>释放刷新</span>";
		node.appendChild(textnode);
		dom.children[0].append(node);
		Difference = _son.offsetHeight-dom.offsetHeight;
	}
	//单个子节点的高度
	singleH = dom.children[0].children[0].offsetHeight;
	
	_son.addEventListener('touchstart',touchStart,false);
    _son.addEventListener('touchmove',touchMove,false);
    _son.addEventListener('touchend',touchEnd,false);

}
function touchStart(e){
	startY = e.touches[0].pageY;
	num=1;
}
function touchMove(e){
	if(_parent.scrollTop>0&&_parent.scrollTop<Difference){
		//考虑两个边界的移动情况
		startY = e.touches[0].pageY;
	}else{
		moveY = (e.touches[0].pageY - startY)/2;
		var opa = -moveY/singleH;
		if(Difference>0){
			document.getElementById('bottomtab').style.opacity = opa;
			document.getElementById('rotate').style.transform = 'rotate('+opa*180+'deg)';
		}
		_son.style.transform = "translate(0px,"+moveY+"px)";
	}
}
function touchEnd(e){
	if(_parent.scrollTop>0&&_parent.scrollTop<Difference){

	}else{
		if(-moveY>(1/2*singleH)&&Difference>0){
			refresh();
		}
		var tick = setInterval(function(){
			if(moveY>=0)
				moveY = moveY-adjust(num)<0?0:moveY-adjust(num);
			else{
				moveY = moveY+adjust(num)>0?0:moveY+adjust(num);
			}
		     _son.style.transform = "translate(0px,"+moveY+"px)";
	        if(moveY==0||moveY==singleH){
	            clearInterval(tick);
	            var sub = setInterval(function(){
	            	if(_parent.scrollTop>Difference){
	            		_parent.scrollTop--;
	            	}else{
	            		clearInterval(sub);
	            	}
	            },clock)
	        }
		},clock)
	}
}
function adjust(param){
	num++;
	return (param++/aJ)
}