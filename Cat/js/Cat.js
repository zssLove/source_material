/*
 * @Descripttion: 
 * @version: 
 * @Author: zss
 * @Date: 2021-11-21 00:09:55
 * @LastEditors: zss
 * @LastEditTime: 2021-11-21 16:17:18
 */
/*
 * 将猫身体的每一块放入数组中
 * 定义一个设置猫的方向
 */
function Cat(pic_obj) {
  // 数组中存放的是猫的每一节身体
	this.arr = [
		{row: 3, col: 3},
		{row: 3, col: 4},
		{row: 3, col: 5}
	];
  // 方向属性
	this.direction = 39;  //left:37  top:38  right:39  down:40
  // 定义suo
	this.lock = true;
	// 定义猫的头部图片
  this.head_pic = pic_obj.head_pic;
  // 定义猫的身体图片
	this.body_pic = pic_obj.body_pic;
  // 定义猫的尾部图片
	this.tail_pic = pic_obj.tail_pic;
  // 定义头部索引值
	this.head_idx = 2;
  // 定义尾部索引值
	this.tail_idx = 0;
}

// 移动的方法
Cat.prototype.move = function() {
  // 创建头部
	var newHead = {
		row: this.arr[this.arr.length - 1].row,
		col: this.arr[this.arr.length - 1].col
	}
  // 判断猫的移动方向
	if(this.direction === 37) {
    // 表示向左，新的头部应该出现在老的头部的左边，行不变，列--
		newHead.col--;
	}else if(this.direction === 38) {
    // 表示向上，新的头部应该出现在上边，列不变，行--
		newHead.row--;
	}else if(this.direction === 39) {
    // 表示向右，新的头部应该出现在右边，行不变，列++
		newHead.col++;
	}else if(this.direction === 40) {
    // 表示向下，新的头部应该出现在下边，列不变，行++
		newHead.row++;
	}
  // 将新的头部添加
	this.arr.push(newHead);
  // 去掉尾部
	this.arr.shift();
  // 开锁
	this.lock = true;
	
  // 在move的时候改变尾部的图片，获取猫的尾部
	var tail = this.arr[0];
  // 获取尾部的上一个
	var pg = this.arr[1];
  // 判断尾部与pg之间的关系
	if(tail.row === pg.row) {
    // 说明在同一行，应该要对列进行比较
		this.tail_idx = tail.col > pg.col ? 2 : 0 ;
	}else{
    // 说明在同一列，应该对行进行比较
		this.tail_idx = tail.row > pg.row ? 3 : 1 ;
	}
}

// 猫的转向方向
Cat.prototype.change = function(direction) {
	if(!this.lock) {
		return;
	}
  // 关闭锁
	this.lock = false;
  // 当用户按下的是与猫相同或相背方向值的时候，这个猫头不会有改变的操作
	var result = Math.abs(direction - this.direction);
	if(result === 0 || result === 2) {
    // 此时什么都不做
		return;
	}else {
    // 传入用户按下的合理值，进行设置
		this.direction = direction;
	}
	
	if (direction === 37) {
		this.head_idx = 0;
	}else if (direction === 38) {
		this.head_idx = 1;
	}else if (direction === 39) {
		this.head_idx = 2;
	}else if(direction === 40) {
		this.head_idx = 3;
	}
}

// 猫成长的方法
Cat.prototype.growUp = function() {
  // 获取猫的尾部
	var tail = this.arr[0];
  // 添加到猫的头部
	this.arr.unshift(tail);
}
