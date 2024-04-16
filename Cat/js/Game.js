/*
 * 
 */

function Game(block,food,map,Cat) {
	this.block = block;
	this.food = food;
	this.map = map;
	this.Cat = Cat;
	this.flag = null;
	this.timer = null;
	this.init();
}

// 定义初始化的方法
Game.prototype.init = function() {
	this.renderMap();
	this.renderFood();
	this.renderCat();
	this.bindEvent();
	this.start();
}

// 渲染地图
Game.prototype.renderMap = function() {
	this.map.fill();
}

// 渲染食物
Game.prototype.renderFood = function() {
	var row = this.food.row;
	var col = this.food.col;
	// 渲染食物就是渲染食物在地图中的坐标系和背景图案，我们就可以用地图中的数组来书写。
	this.map.arr[row][col].style.backgroundImage = "url("+this.food.img+")";
	this.map.arr[row][col].style.backgroundSize = "cover";
}

// 渲染猫的方法
Game.prototype.renderCat = function() {
  // 获取猫的头部
	var head = this.Cat.arr[this.Cat.arr.length - 1];
	this.map.arr[head.row][head.col].style.backgroundImage = "url("+this.Cat.head_pic[this.Cat.head_idx]+")";
	// 渲染猫就是在地图中渲染猫的每一节身体坐标元素的背景图案
  for(var i = 1; i < this.Cat.arr.length - 1; i ++) {
		var row = this.Cat.arr[i].row;
		var col = this.Cat.arr[i].col;
    // 渲染背景图片
		this.map.arr[row][col].style.backgroundImage = "url("+this.Cat.body_pic[0]+")";
	}
  // 获取猫的尾部
	var tail = this.Cat.arr[0];  
	this.map.arr[tail.row][tail.col].style.backgroundImage = "url("+this.Cat.tail_pic[this.Cat.tail_idx]+")"
}

// 游戏开始
Game.prototype.start = function() {
	this.flag = true;
  // 备份this
	var me = this;
	this.timer = setInterval(function() {
		me.Cat.move();
		me.checkMap();
		me.checkFood();
		me.checkCat();
		me.checkBlock();
		if(me.flag) {
      // 清屏
			me.map.clear();
      // 渲染食物
			me.renderFood();
      // 渲染猫
			me.renderCat();
			me.renderBlock();
		}
	},160)
}

// 绑定事件
Game.prototype.bindEvent = function() {
  // 备份this
	var me = this;
  // 给document添加onkeydown事件
	document.onkeydown = function(e) {
    // 获取用户按下的数字
		var code = e.keyCode;
		if(code === 37 || code === 38 || code === 39 || code === 40) {
			// 调用猫的转向方法
      me.Cat.change(code);
		}
	}
}

// 游戏结束
Game.prototype.gameOver = function() {
	this.flag = false;
  // 停止定时器
	clearInterval(this.timer);
}

// 检测是否超过边界
Game.prototype.checkMap = function() {
  // 获取猫的头部
	var head = this.Cat.arr[this.Cat.arr.length - 1];
  // 与地图的row、col进行判断
	if(head.row < 0 || head.row >= this.map.row || head.col < 0 || head.col >= this.map.col) {
//		console.log("撞墙了");
		this.gameOver();
	}
}

// 检测猫是否吃到食物鱼
Game.prototype.checkFood = function() {
  // 获取猫的头部
	var head = this.Cat.arr[this.Cat.arr.length - 1];
  // 获取食物
	var food = this.food;
  // 判断猫的头部是否与食物重合
	if(head.row === food.row && head.col === food.col) {
    // console.log("吃到食物了");
    // 调用猫成长的方法
		this.Cat.growUp();
    //将食物进行重置
		this.resetFood();
	}
}

// 重置食物的方法
Game.prototype.resetFood = function() {
  // 随机生成row和col
	var row = parseInt(Math.random() * this.map.row);
	var col = parseInt(Math.random() * this.map.col);
	// 检测食物是否合理，与猫的每一节身体进行比较
	for (var i = 0; i < this.Cat.arr.length; i++) {
		var one = this.Cat.arr[i];
		if(one.row === row && one.col === col) {
    // alert("与猫的身体重合了");
			this.resetFood();
			return;
		}
	}
	for (var i = 0 ; i < this.block.arr.length; i++) {
		var one = this.block.arr[i];
		if (one.row === row && one.col === col) {
      // alert("食物与障碍物重合了");
			this.resetFood();
			return;
		}
	}
	this.food.reset(row,col);
}

// 检测猫是否吃到自己
Game.prototype.checkCat = function() {
  // 获取猫的头部
	var head = this.Cat.arr[this.Cat.arr.length - 1];
  // 循环与猫的每一节身体作比较
	for (var i = 0 ; i < this.Cat.arr.length - 1; i++) {
		var one = this.Cat.arr[i];
		if(head.row === one.row && head.col === one.col) {
      //	console.log("吃到自己身上了");
			// 结束游戏
      this.gameOver();
		}
	}
}

Game.prototype.renderBlock = function() {
	for (var i = 0; i < this.block.arr.length; i++) {
		var row = this.block.arr[i].row;
		var col = this.block.arr[i].col;
		this.map.arr[row][col].style.backgroundImage = "url("+this.block.img+")";
		this.map.arr[row][col].style.backgroundSize = "cover";
	}
}

// 检测猫是否撞到障碍物
Game.prototype.checkBlock = function() {
	var head = this.Cat.arr[this.Cat.arr.length -1];
	for (var i = 0; i < this.block.arr.length; i++) {
		var one = this.block.arr[i];
		if (one.row === head.row && one.col === head.col) {
      //	console.log("撞到障碍物了");
			this.gameOver();
		}
	}
}
