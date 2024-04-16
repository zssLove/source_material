/*
 * @Descripttion: 
 * @version: 
 * @Author: zss
 * @Date: 2021-11-21 00:09:55
 * @LastEditors: zss
 * @LastEditTime: 2021-11-21 16:05:38
 */
/*
 * 
 */
function Food(x,y,img) {
	this.row = x;
	this.col = y;
	this.img = img;
}

// 重置食物
Food.prototype.reset = function(x,y) {
	this.row = x;
	this.col = y;
}
