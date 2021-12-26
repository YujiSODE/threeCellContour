/*threeCellContour
* polygonalHull.js
*===================================================================
*	Copyright (c) 2021 Yuji SODE <yuji.sode@gmail.com>
*
*	This software is released under the MIT License.
*	See LICENSE or http://opensource.org/licenses/mit-license.php
*===================================================================
* Additional Array method to estimate a convex hull with polygonal approximation.
* This algorithm does not require sorting sample in advance.
*===================================================================
* - `Array.prototype.polygonalHull(N);`
*   additional Array method to estimate a convex hull with polygonal approximation
*   given and returned arrays are regarded as [x0,y0,x1,y1, ..., xn,yn]
*
*   [parameter] 
*   - N: an integer value for dt = PI/N, where t = [-PI, PI]
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
//additional Array method to estimate a convex hull with polygonal approximation
//given and returned arrays are regarded as [x0,y0,x1,y1, ..., xn,yn]
//N is an integer value for dt = PI/N, where t = [-PI, PI]
Array.prototype.polygonalHull=function(N){
	// - N: an integer value for dt = PI/N, where t = [-PI, PI]
	//
	const PI=Math.PI;
	//
	let arr0=this.map(e=>e),n0=arr0.length,i=0,
		pi_n=0.0,T=0.0,norm2=0.0,tList={},
		X=[],Y=[],
		xMin=0.0,xMax=0.0,yMin=0.0,yMax=0.0,
		xMid=0.0,yMid=0.0,vOP=[],
		/* --- functions --- */
		setVector=()=>{},
		Norm2=()=>{};
	//
	n0=n0%2<1?n0:arr0.push(0);
	//
	N=N<1?1:Math.floor(N);
	pi_n=PI/N;
	//
	//sample averages
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
	//--------------------------------------------------------------------
	//
	//--- functions ---
	//it returns a vector: V = [vx,vy]
	setVector=(a1,b1,a2,b2)=>[b1-a1,b2-a2];
	//
	//it returns norm^2 of a vector
	Norm2=(A)=>Array.$SUM([A[0]*A[0],A[1]*A[1]]);
	//--------------------------------------------------------------------
	//
	//Pj = (Xj, Yj) and O = (X0, Y0)
	//(norm_j)^2 = Norm2(OP)
	//tList := {T0, T1, ..., Tn}, and Tj = [Xj, Yj, (norm_j)^2]
	//
	while(i<n0){
		//
		vOP=setVector(xMid,arr0[i],yMid,arr0[i+1]);
		T=Math.atan2(vOP[1],vOP[0])/pi_n;
		//
		T=Math.floor(T);
		//
		norm2=Norm2(vOP);
		//
		if(!tList[T]){
			tList[T]=[];
			//
			//[0]: X
			tList[T][0]=arr0[i];
			//
			//[1]: Y
			tList[T][1]=arr0[i+1];
			//
			//[2]: norm^2
			//X^2 +Y^2
			tList[T][2]=norm2;
		} else {
			//
			//[0]: X
			tList[T][0]=tList[T][2]<norm2?arr0[i]:tList[T][0];
			//
			//[1]: Y
			tList[T][1]=tList[T][2]<norm2?arr0[i+1]:tList[T][1];
			//
			//[2]: norm^2
			//X^2 +Y^2
			tList[T][2]=tList[T][2]<norm2?norm2:tList[T][2];
		} 
		//
		i+=2;
	}
	//--------------------------------------------------------------------
	//
	arr0=n0=i=pi_n=T=norm2=X=Y=xMin=xMax=yMin=yMax=xMid=0.0,yMid=vOP=setVector=Norm2=null;
	//
	return Object.values(tList).reduce((e1,e2)=>{let E=e1.push(e2[0],e2[1]);E=null;return e1;},[]);
};
