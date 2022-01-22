//3CC_sample01_v03.js
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
		arr.push(Math.random(),Math.random(),Math.random());
		//
		i+=1;
	}
	//
	return ()=>{
		let ctx=document.getElementById('threeCellContourCvs').getContext('2d'),
			W=ctx.canvas.width,H=ctx.canvas.height,
			R0=Math.sqrt(W*W+H*H),
			R=0.025*R0,
			X=0.0,Y=0.0,
			i=0,n=arr.length;
			//
			const PI2=2.0*Math.PI;
			//
			ctx.fillStyle='#00ff';
			ctx.clearRect(0,0,W,H);
			ctx.beginPath();
			//
			while(i<n){
				X=W*arr[i];
				Y=H*arr[i+1];
				//
				ctx.moveTo(X,Y);
				ctx.arc(X,Y,R*arr[i+2],0.0,PI2,false);
				ctx.fill();
				//
				i+=3;
			}
		ctx=W=H=R0=R=X=Y=i=n=null;
	};
};
//
SAMPLE=setSample(100);
SAMPLE();
//
//=== to reset data set ===
//SAMPLE=setSample(sampleSize);
//=========================
