/*
 * @Descripttion: 
 * @version: 
 * @Author: zss
 * @Date: 2021-11-21 00:09:55
 * @LastEditors: zss
 * @LastEditTime: 2021-11-21 15:35:27
 */
/*
 * 定义地图的每一行
 * 定义地图的每一列
 * 定义地图的总宽
 * 定义地图的
 */
function Map(row,col,width,height) {
	this.arr = [];
	this.row = row;
	this.col = col;
	this.width = width;
	this.height = height;
	// 因为最终要渲染到页面中，所以我们要创建一个元素
	this.dom = document.createElement("div");
}

// 填充的方法
Map.prototype.fill = function() {
	for(var j = 0; j < this.row; j++) {
    // 首页创建一个行容器，因为需要一行一行的创建
		var row_dom = document.createElement("div");
    // 每一行添加类名
		row_dom.className = "row";
    // 创建一个数组
		var row_arr = [];
    // 循环每一行进行填满
		for(var i = 0; i < this.col; i++) {
      // 创建每一个小方格元素
      var col_dom = document.createElement("span");
      // 给每一个小方格元素添加类名
      col_dom.className = "grid";
      // 然后追加到行容器中
      row_dom.appendChild(col_dom);
      // 再追加到行数组中
      row_arr.push(col_dom);
		}	
    // 每创建一行要追加到dom中去
		this.dom.appendChild(row_dom);
    // 将行数组放入到数组中
		this.arr.push(row_arr);
	}
  // 给dom添加类名
	this.dom.className = "box";
  // 执行上树操作
	document.body.appendChild(this.dom);
}

Map.prototype.clear = function() {
	for (var i = 0 ; i < this.arr.length; i++) {
		for (var j = 0 ; j < this.arr[i].length; j++) {
			this.arr[i][j].style.backgroundColor = "#4bbffe";
			this.arr[i][j].style.backgroundImage = "none";
		}
	}
}
