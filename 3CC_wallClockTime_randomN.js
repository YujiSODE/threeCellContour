//3CC_wallClockTime_randomN.js
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
var TRY=(sampleSize,N)=>{
	SAMPLE=setSample(sampleSize);
	//
	let arr0=SAMPLE(),n=arr0.length,NAME=`sampleSize:${sampleSize},N:${N}`;
	//
	console.time(NAME);
	arr0.polygonalHull(N);
	console.timeEnd(NAME);
};
//
var TEST=(N)=>{
	let i=0,sampleSizes=[],n=0;
	//
	//####################################################
	sampleSizes=[1.0e1,3.0e1,5.0e1,1.0e2,3.0e2,5.0e2,1.0e3,3.0e3,5.0e3,1.0e4,3.0e4,5.0e4,1.0e5,3.0e5,5.0e5];
	n=sampleSizes.length;
	//####################################################
	//
	while(i<n){
		//
		TRY(sampleSizes[i],N);
		//
		i+=1;
	}
};
//
//u = [0, 1)
//1+5*u = [1.0, 6.0), 10**(1+5*u) = [1.0e1, 1.0e6)
var u=Math.random(),V=0;
//
V=Math.floor(10**(1+5*u));
console.log(`TEST(${V});`);
TEST(V);
