/*threeCellContour
* clusteredHull.js
*===================================================================
*	Copyright (c) 2021 Yuji SODE <yuji.sode@gmail.com>
*
*	This software is released under the MIT License.
*	See LICENSE or http://opensource.org/licenses/mit-license.php
*===================================================================
* Additional Array method to approximate a convex hull with clustering.
* This algorithm does not require sorting sample in advance.
*===================================================================
* - `Array.prototype.clusteredHull(dX,dY);`
*   additional Array method to approximate a convex hull with clustering
*   given and returned arrays are regarded as [x0,y0,x1,y1, ..., xn,yn]
*   cluster size is dX*dX or optionally dX*dY
*
*   [parameter] 
*   - dX: a positive value for width of a cluster
*   - dY: an optional positive value for height of a cluster, and default value is dX
* ------------------------------------------------------------------
*
* - `Array.prototype.radSort();`
*   additional Array method returns sorted array based on radians
*   given and returned arrays are regarded as [x0,y0,x1,y1, ..., xn,yn]
* ------------------------------------------------------------------
*
* - `Array.prototype.hullArea();`
*   additional Array method to estimate the area of convex hull
*   given array is a list of vertices that is regarded as [x0,y0,x1,y1, ..., xn,yn]
* ------------------------------------------------------------------
*
* [static method]
* - `Array.$SUM(array);`
*   static method that returns the sum of elements in a given array
*   method format: `Array.$SUM(array) -> value`
*/
//===================================================================
//
//-------------------------------------------------------------------
//static method that returns the sum of elements in a given array
Array.$SUM=(array)=>array.reduce((e1,e2)=>e1+e2,0.0);
//-------------------------------------------------------------------
//
//additional Array method returns sorted array based on radians
//given and returned arrays are regarded as [x0,y0,x1,y1, ..., xn,yn]
Array.prototype.radSort=function(){
	//
	let arr0=this.map(e=>e),n0=arr0.length,
		i=0,midXArr=[],midYArr=[],midX=0.0,midY=0.0,
		list=[],output=[];
	//
	n0=n0%2<1?n0:arr0.push(0);
	//
	while(i<n0){
		midXArr.push(arr0[i]);
		midYArr.push(arr0[i+1]);
		//
		i+=2;
	}
	//
	midX=2.0*Array.$SUM(midXArr)/n0;
	midY=2.0*Array.$SUM(midYArr)/n0;
	//
	i=0;
	while(i<n0){
		list.push({idx:i,rad:Math.atan2(arr0[i+1]-midY,arr0[i]-midX)});
		//
		i+=2;
	}
	//
	list=list.sort((a,b)=>a.rad-b.rad);
	//
	output=list.reduce((e1,e2)=>{
		let E=e1.push(arr0[e2.idx],arr0[e2.idx+1]);
		E=null;return e1;
	},[]);
	//
	arr0=n0=i=midX=midXArr=midY=midYArr=list=null;
	//
	return output;
};
//
//additional Array method to estimate the area of convex hull
//given array is a list of vertices that is regarded as [x0,y0,x1,y1, ..., xn,yn]
Array.prototype.hullArea=function(){
	let arr0=this.map(e=>e),
		subArr=[],n0=arr0.length,i=0,list=[],
		/* --- functions --- */
		cross=()=>{};
	//
	n0=n0%2<1?n0:arr0.push(0);
	arr0=arr0.radSort();
	//--------------------------------------------------------------------
	//
	//it returns value of cross product with two-dimensional vectors: A = (a1,a2,0) and B = (b1,b2,0)
	cross=(a1,b1,a2,b2)=>a1*b2-a2*b1;
	//--------------------------------------------------------------------
	//
	//=== {X:arr0[n0-2], Y:arr0[n0-1]} and {X:arr0[0], Y:arr0[1]} ===
	list.push(cross(arr0[n0-2],arr0[0],arr0[n0-1],arr0[1]));
	//
	//i=0 to n0-2
	//=== {X:arr0[i], Y:arr0[i+1]} and {X:arr0[i+2], Y:arr0[i+3]} ===
	while(i<n0-2){
		//
		list.push(cross(arr0[i],arr0[i+2],arr0[i+1],arr0[i+3]));
		//
		i+=2;
	}
	//
	return Array.$SUM(list)*0.5;
};
//
//additional Array method to approximate a convex hull with clustering
//given and returned arrays are regarded as [x0,y0,x1,y1, ..., xn,yn]
//cluster size is dX*dX or optionally dX*dY
Array.prototype.clusteredHull=function(dX,dY){
	// - dX: a positive value for width of a cluster
	// - dY: an optional positive value for height of a cluster, and default value is dX
	//
	let arr0=this.map(e=>e),n0=arr0.length,i=0,
		X=[],Y=[],xMin=0.0,xMax=0.0,yMin=0.0,yMax=0.0,
		xMid=0.0,yMid=0.0,xIdx=0,yIdx=0,
		clusters={},element='',
		/* ∂/∂X and ∂/∂Y of indices */
		/* --- indices: ranges of v when W = w --- */
		/* --- vRangeW[w] := [vMin, vMax] --- */
		xRangesY={},yRangesX={};
	//
	n0=n0%2<1?n0:arr0.push(0);
	//
	dX=dX>0?+dX:1;
	dY=!dY?dX:dY;
	dY=dY>0?+dY:1;
	//
	// === sample: X,Y,Xmin,Ymin,Xmax,Ymax,Xmid,Ymid,dX and dY ===
	X=arr0.reduce((e1,e2,idx)=>{let E=idx%2<1?e1.push(e2):e1;E=null;return e1;},[]);
	Y=arr0.reduce((e1,e2,idx)=>{let E=idx%2<1?e1:e1.push(e2);E=null;return e1;},[]);
	//
	xMin=Math.min(...X);
	xMax=Math.max(...X);
	yMin=Math.min(...Y);
	yMax=Math.max(...Y);
	//
	xMid=Array.$SUM([xMin,xMax])*0.5;
	yMid=Array.$SUM([yMin,yMax])*0.5;
	//
	//=== clustering ===
	while(i<n0){
		//
		//indices
		xIdx=Math.floor((arr0[i]-xMin)/dX);
		yIdx=Math.floor((arr0[i+1]-yMin)/dY);
		//
		/*
		* <box model of each cluster>
		* 
		*   :         :
		*   |         |
		* --+---------+-- ...
		*   | p1---p2 |
		* dY| |    |  |
		*   | p4---p3 |
		* --+---------+-- ...
		*   |   dX    |
		*   :         :
		* 
		* cluster size: dW x dH
		* 
		* coordinate of a point in a cluster: (X, Y)
		* Xmin = Min(X) and Ymin = Min(Y) 
		* Xmax = Max(X) and Ymax = Max(Y) 
		* 
		* box model in a cluster
		* p1 = (Xmin, Ymin), p2 = (Xmax, Ymin), p3 = (Xmax, Ymax) and p4 = (Xmin, Ymax)
		*/
		//
		element=`${xIdx},${yIdx}`;
		if(!clusters[element]){
			clusters[element]={};
			//
			//indices for X and Y
			clusters[element].Xindex=xIdx;
			clusters[element].Yindex=yIdx;
			//
			//X
			//max and min
			clusters[element].Xmin=arr0[i];
			clusters[element].Xmax=arr0[i];
			//
			//X value of this cluseter
			clusters[element].X=arr0[i];
			//
			//Y
			//max and min
			clusters[element].Ymin=arr0[i+1];
			clusters[element].Ymax=arr0[i+1];
			//
			//Y value of this cluseter
			clusters[element].Y=arr0[i+1];
			//
			// ∂/∂X and ∂/∂Y of indices
			//--- indices: ranges of v when W = w ---
			//--- vRangeW[w] := [vMin, vMax] ---
			//generate range value when the value is not exist
			xRangesY[yIdx]=!xRangesY[yIdx]?[xIdx,xIdx]:xRangesY[yIdx];
			yRangesX[xIdx]=!yRangesX[xIdx]?[yIdx,yIdx]:yRangesX[xIdx];
			//
			//--- indices: min values ---
			xRangesY[yIdx][0]=xIdx<xRangesY[yIdx][0]?xIdx:xRangesY[yIdx][0];
			yRangesX[xIdx][0]=yIdx<yRangesX[xIdx][0]?yIdx:yRangesX[xIdx][0];
			//
			//--- indices: max values ---
			xRangesY[yIdx][1]=xIdx>xRangesY[yIdx][1]?xIdx:xRangesY[yIdx][1];
			yRangesX[xIdx][1]=yIdx>yRangesX[xIdx][1]?yIdx:yRangesX[xIdx][1];
		}else{
			//X
			//max and min
			clusters[element].Xmin=clusters[element].Xmin>arr0[i]?arr0[i]:clusters[element].Xmin;
			clusters[element].Xmax=clusters[element].Xmax<arr0[i]?arr0[i]:clusters[element].Xmax;
			//
			//X value of this cluseter: max or min
			clusters[element].X=(clusters[element].Xmax-xMid)**2>(clusters[element].Xmin-xMid)**2?clusters[element].Xmax:clusters[element].Xmin;
			//
			//Y
			//max and min
			clusters[element].Ymin=clusters[element].Ymin>arr0[i+1]?arr0[i+1]:clusters[element].Ymin;
			clusters[element].Ymax=clusters[element].Ymax<arr0[i+1]?arr0[i+1]:clusters[element].Ymax;
			//
			//Y value of this cluseter: max or min
			clusters[element].Y=(clusters[element].Ymax-yMid)**2>(clusters[element].Ymin-yMid)**2?clusters[element].Ymax:clusters[element].Ymin;
		}
		//
		i+=2;
	}
	//
	//--------------------------------------------------------------------
	arr0=n0=i=X=Y=xMin=xMax=yMin=yMax=xMid=yMid=xIdx=yIdx=element=null;
	//
	return Object.values(clusters).reduce((e1,e2)=>{
		//indices: !(xMin < x && x < xMax && yMin < y && y < yMax)
		let E=!(xRangesY[e2.Yindex][0]<e2.Xindex&&e2.Xindex<xRangesY[e2.Yindex][1]&&yRangesX[e2.Xindex][0]<e2.Yindex&&e2.Yindex<yRangesX[e2.Xindex][1])?e1.push(e2.X,e2.Y):0;
		E=null;return e1;
	},[]);
};
