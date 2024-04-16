/*
 * @Descripttion: 
 * @version: 
 * @Author: zss
 * @Date: 2021-11-21 00:09:55
 * @LastEditors: zss
 * @LastEditTime: 2021-11-21 16:18:41
 */
/*
 * 
 */

function Block(img) {
  // 数据属性，用来存放每一个障碍物
	this.arr = [
		{row: 5,col: 5},
		{row: 10,col: 1},
		{row: 15,col: 5},
		{row: 10,col: 17},
		{row: 7,col: 25},
		{row: 13,col: 30},
		{row: 17,col: 24},
		{row: 12,col: 6},
	];
	this.img = img;
}
