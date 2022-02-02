/*threeCellContour
* threeCellContour_hull_v04.js
*===================================================================
*	Copyright (c) 2021 Yuji SODE <yuji.sode@gmail.com>
*
*	This software is released under the MIT License.
*	See LICENSE or http://opensource.org/licenses/mit-license.php
*===================================================================
* It requires `threeCellContour.js` and `clusteredHull.js`.
* Tool to extract hull contour from a image.
*
*===================================================================
*/
//Tool to extract hull contour from a image
/*
* [to hull contour] 
* - `threeCellContour.getContour_hull(srcCanvasId,standard,dX,dY);`
* - `threeCellContour.getContour_hull(srcCanvasId,standard,dX,dY,color);`
* - `threeCellContour.getContour_hull(srcCanvasId,standard,dX,dY,color,strokeWidth);`
* ------------------------------------------------------------------
*
* [to fill] 
* - `threeCellContour.getFill_hull(srcCanvasId,standard,dX,dY);`
* - `threeCellContour.getFill_hull(srcCanvasId,standard,dX,dY,color);`
* ------------------------------------------------------------------
*
* [parameters] 
* 	- `srcCanvasId`: id of target canvas element to scan
* 	- `standard`: a standard value, which is in the range of [0.0,1.0]
* 	- `vN`: a number of vertices is not greater than 2*vN+1
* 	- `color`: an optional rgba color that is expressed in css hexadecimal notation ("#RRGGBBAA" or "#RGBA"), and "#000f" is default
* 	- `strokeWidth`: an optional width for stroke that is more than 0.0, and 1.0 is default
*/
//===================================================================
//
//`threeCellContour(srcCanvasId,standard)` returns object: {srcId: target canvas id, width: target canvas width, height: target canvas height, log: scan log}
//
//method to draw estimated hull of contour
threeCellContour.getContour_hull=async (srcCanvasId,standard,dX,dY,color,strokeWidth)=>{
	// - srcCanvasId: id of target canvas element to scan
	// - standard: a standard value, which is in the range of [0.0,1.0]
	// - dX and dY: positive values for width and height of a cluster
	// - color: an optional rgba color that is expressed in css hexadecimal notation ("#RRGGBBAA" or "#RGBA"), and "#000f" is default
	// - strokeWidth: an optional width for stroke that is more than 0.0, and 1.0 is default
	//===
	let LOG=await threeCellContour(srcCanvasId,standard),
		slf=window,
		outputId=`${srcCanvasId}_OUTPUT`,
		outputCanvas=slf.document.getElementById(outputId),
		ctx={},n=0,i=0,
		log01='',xyArr=[],hull=[],
		/* --------------------------- */
		getXY=()=>{};
	//
	color=!color?'#000f':color;
	strokeWidth=!strokeWidth?1.0:strokeWidth;
	strokeWidth=+strokeWidth>0?+strokeWidth:1.0;
	//
	if(!outputCanvas){
		outputCanvas=slf.document.createElement('canvas');
		outputCanvas.id=outputId;
		slf.document.getElementById(srcCanvasId).parentNode.appendChild(outputCanvas);
	}
	//
	setTimeout(()=>Promise.resolve(LOG).then((v)=>{
		ctx=outputCanvas.getContext('2d');
		outputCanvas.width=+v.width;
		outputCanvas.height=+v.height;
		//
		ctx.lineWidth=strokeWidth;
		ctx.strokeStyle=color;
		//
		n=v.log.length;
		/* idx is integer, and returned array is [x,y] */
		getXY=(idx)=>[idx%v.width,Math.floor(idx/v.width)%v.height];
		/*== path generators ==*/
		/*
		* --------
		* [c0|c1]
		* [c2|--]
		*
		* delta1 := d(c0,c1) = 0bB0, delta2 := d(c0,c2) = 0b0B and B = 0 or 1,
		* then q := delta1|delta2
		* q = 0,1,2 or 3
		* --------
		*/
		//
		//0b00 -> 0, then 0b01, 0b10 or 0b11 -> 1
		//(0)=>0 and (1, 2 or 3)=>1
		log01=v.log.replaceAll(/[23]/g,1);
		//
		while(i<n){
			if(log01[i]!=0){
				xyArr.push(...getXY(i));
			}
			//
			i+=1;
		}
		//
		//it estimates hull
		hull=xyArr.clusteredHull(dX,dY).radSort();
		//
		//---------
		ctx.beginPath();
		//
		//P(0) := (x0,y0)
		ctx.moveTo(hull[0],hull[1]);
		//---------
		//
		i=2;
		n=hull.length;
		//
		//P(i) -> P(j) := (xi,yj) -> (xj,yj), where i = j-1 and j > 0
		//i = 0 to end
		while(i<n){
			//hull is regarded as [x0,y0,x1,y1, ..., xn,yn]
			//
			ctx.lineTo(hull[i],hull[i+1]);
			//
			i+=2;
		}
		//---------
		//
		//P(end) -> P(0) := (xend,yend) -> (x0,y0)
		ctx.closePath();
		//
		ctx.stroke();
		//---------
		//
		LOG=slf=outputId=outputCanvas=ctx=n=i=log01=xyArr=getXY=null;
	}),2000);
};
//
//method to fill area of estimated hull
threeCellContour.getFill_hull=async (srcCanvasId,standard,dX,dY,color)=>{
	// - srcCanvasId: id of target canvas element to scan
	// - standard: a standard value, which is in the range of [0.0,1.0]
	// - dX and dY: positive values for width and height of a cluster
	// - color: an optional rgba color that is expressed in css hexadecimal notation ("#RRGGBBAA" or "#RGBA"), and "#000f" is default
	//===
	let LOG=await threeCellContour(srcCanvasId,standard),
		slf=window,
		outputId=`${srcCanvasId}_OUTPUT`,
		outputCanvas=slf.document.getElementById(outputId),
		ctx={},n=0,i=0,
		log01='',xyArr=[],hull=[],
		/* --------------------------- */
		getXY=()=>{};
	//
	color=!color?'#000f':color;
	//
	if(!outputCanvas){
		outputCanvas=slf.document.createElement('canvas');
		outputCanvas.id=outputId;
		slf.document.getElementById(srcCanvasId).parentNode.appendChild(outputCanvas);
	}
	//
	setTimeout(()=>Promise.resolve(LOG).then((v)=>{
		ctx=outputCanvas.getContext('2d');
		outputCanvas.width=+v.width;
		outputCanvas.height=+v.height;
		//
		ctx.fillStyle=color;
		//
		n=v.log.length;
		/* idx is integer, and returned array is [x,y] */
		getXY=(idx)=>[idx%v.width,Math.floor(idx/v.width)%v.height];
		/*== path generators ==*/
		/*
		* --------
		* [c0|c1]
		* [c2|--]
		*
		* delta1 := d(c0,c1) = 0bB0, delta2 := d(c0,c2) = 0b0B and B = 0 or 1,
		* then q := delta1|delta2
		* q = 0,1,2 or 3
		* --------
		*/
		//
		//0b00 -> 0, then 0b01, 0b10 or 0b11 -> 1
		//(0)=>0 and (1, 2 or 3)=>1
		log01=v.log.replaceAll(/[23]/g,1);
		//
		while(i<n){
			if(log01[i]!=0){
				xyArr.push(...getXY(i));
			}
			//
			i+=1;
		}
		//
		//it estimates hull
		hull=xyArr.clusteredHull(dX,dY).radSort();
		//
		//---------
		ctx.beginPath();
		//
		//P(0) := (x0,y0)
		ctx.moveTo(hull[0],hull[1]);
		//---------
		//
		i=2;
		n=hull.length;
		//
		//P(i) -> P(j) := (xi,yj) -> (xj,yj), where i = j-1 and j > 0
		//i = 0 to end
		while(i<n){
			//hull is regarded as [x0,y0,x1,y1, ..., xn,yn]
			//
			ctx.lineTo(hull[i],hull[i+1]);
			//
			i+=2;
		}
		//---------
		//
		//P(end) -> P(0) := (xend,yend) -> (x0,y0)
		ctx.closePath();
		//
		ctx.fill();
		//---------
		//
		LOG=slf=outputId=outputCanvas=ctx=n=i=log01=xyArr=getXY=null;
		//
	}),2000);
};
