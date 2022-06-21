//3CC_wallClockTime_randomN_v04.js
//random sample
//
//function that draws sample data on canvas element
var SAMPLE=()=>{};
//
//n is sample set size
var setSample=(n)=>{
	let arr=[],i=0,N=Math.floor(n);
	N=N<1?1:N;
	//
	while(i<N){
		//x,y = [0,1)
		arr.push(Math.random(),Math.random());
		//
		i+=1;
	}
	//
	return ()=>arr;
};
//
//=== to reset data set ===
//SAMPLE=setSample(sampleSize);
//=========================
//
var DX=(0.25*Math.random()).toExponential(4),DY=(0.25*Math.random()).toExponential(4);
//
var TRY=(sampleSize,dX,dY)=>{
	SAMPLE=setSample(sampleSize);
	//
	let arr0=SAMPLE(),n=arr0.length,
		NAME=`sampleSize:${sampleSize}`;
	//
	console.time(NAME);
	arr0.clusteredHull(dX,dY);
	console.timeEnd(NAME);
};
//
var TEST=()=>{
	let i=0,sampleSizes=[],n=0;
	//
	//####################################################
	sampleSizes=[1.0e1,3.0e1,5.0e1,1.0e2,3.0e2,5.0e2,1.0e3,3.0e3,5.0e3,1.0e4,3.0e4,5.0e4,1.0e5,3.0e5,5.0e5];
	n=sampleSizes.length;
	//####################################################
	//
	while(i<n){
		//
		TRY(sampleSizes[i],DX,DY);
		//
		i+=1;
	}
};
//
console.log(`dx:${DX}@dy:${DY}`);
TEST();
