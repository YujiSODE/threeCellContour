/*threeCellContour
* threeCellContour.js
*===================================================================
*	Copyright (c) 2021 Yuji SODE <yuji.sode@gmail.com>
*
*	This software is released under the MIT License.
*	See LICENSE or http://opensource.org/licenses/mit-license.php
*===================================================================
* Tool to extract contour from a image.
*
*===================================================================
*/
//Tool to extract contour from a image
/*
* [to contour] 
* - `threeCellContour.getContour(srcCanvasId,standard);`
* - `threeCellContour.getContour(srcCanvasId,standard,color);`
* - `threeCellContour.getContour(srcCanvasId,standard,color,strokeWidth);`
* ------------------------------------------------------------------
*
* [to fill] 
* - `threeCellContour.getFill(srcCanvasId,standard,color);`
* - `threeCellContour.getFill(srcCanvasId,standard);`
* ------------------------------------------------------------------
*
* [parameters] 
* 	- `srcCanvasId`: id of target canvas element to scan
* 	- `standard`: a standard value, which is in the range of [0.0,1.0]
* 	- `color`: an optional rgba color that is expressed in css hexadecimal notation ("#RRGGBBAA" or "#RGBA"), and "#000f" is default
* 	- `strokeWidth`: an optional width for stroke that is more than 0.0, and 1.0 is default
*/
//===================================================================
//it returns object: {srcId: target canvas id, width: target canvas width, height: target canvas height, log: scan log}
function threeCellContour(srcCanvasId,standard){
	// - srcCanvasId: id of target canvas element to scan
	// - standard: a standard value, which is in the range of [0.0,1.0]
	//===
	//
	let slf=window,srcCanvas=slf.document.getElementById(srcCanvasId),
		/* width and height of target canvas element */
		w=srcCanvas.width,h=srcCanvas.height;
	//
	standard=standard<0.0?0:+standard;
	standard=standard>1.0?1:+standard;
	//
	//=== script for worker ===
	let scpt=[
		/*== head part of eventlistener ==*/
		"self.addEventListener('message',",
		/*== dealing with pixel data ==*/
		`(e)=>{let d=e.data.data,W=${Math.floor(w)},H=${Math.floor(h)},N=${Math.floor(w*h)},std=${255.0*standard},i=0,I1=0,I2=0,delta1=0,delta2=0,R='';`,
		/*
		* ##################
		* while(i<N*4){
		* 	I1=i+4,I2=i+4*W;
		* 	//
		* 	if(i%4*W<4*W-1){
		* 		delta1=Math.sqrt(Math.max((d[I1]-d[i])**2,(d[I1+1]-d[i+1])**2,(d[I1+2]-d[i+2])**2,(d[I1+3]-d[i+3])**2));
		* 		delta1=delta1>std?0b10:0;
		* 	}else{
		* 	//when !(i%4*W!=4*W-1)
		* 		delta1=Math.max(d[i],d[i+1],d[i+2],d[i+3]);
		* 		delta1=delta1>std?0b10:0;
		* 	};
		* 	//
		* 	if(Math.floor(i/(4*W))%H<H-1){
		* 		delta2=Math.sqrt(Math.max((d[I2]-d[i])**2,(d[I2+1]-d[i+1])**2,(d[I2+2]-d[i+2])**2,(d[I2+3]-d[i+3])**2));
		* 		delta2=delta2>std?0b01:0;
		* 	}else{
		* 	//when !(Math.floor(i/(4*W))%H!=H-1)
		* 		delta2=Math.max(d[i],d[i+1],d[i+2],d[i+3]);
		* 		delta2=delta2>std?0b01:0;
		* 	};
		* 	//
		* 	//--------
		* 	//[c0|c1]
		* 	//[c2|--]
		* 	//
		* 	//delta1 := d(c0,c1) = 0bB0, delta2 := d(c0,c2) = 0b0B and B = 0 or 1,
		*	//then q := delta1|delta2
		* 	//q = 0,1,2 or 3
		* 	//--------
		* 	//
		* 	R+=delta1|delta2;
		* 	//
		* 	i+=4;
		* }
		* ##################
		*/
		'while(i<N*4){I1=i+4,I2=i+4*W;if(i%4*W<4*W-1){delta1=Math.sqrt(Math.max((d[I1]-d[i])**2,(d[I1+1]-d[i+1])**2,(d[I1+2]-d[i+2])**2,(d[I1+3]-d[i+3])**2));delta1=delta1>std?0b10:0;}else{delta1=Math.max(d[i],d[i+1],d[i+2],d[i+3]);delta1=delta1>std?0b10:0;};if(Math.floor(i/4*W)%H<H-1){delta2=Math.sqrt(Math.max((d[I2]-d[i])**2,(d[I2+1]-d[i+1])**2,(d[I2+2]-d[i+2])**2,(d[I2+3]-d[i+3])**2));delta2=delta2>std?0b01:0;}else{delta2=Math.max(d[i],d[i+1],d[i+2],d[i+3]);delta2=delta2>std?0b01:0;};R+=delta1|delta2;i+=4;}',
		/*========================*/
		/*== return result: returned value has format of "qq ... q" where q is 0,1,2 or 3 ==*/
		"self.postMessage(R);d=W=H=N=std=i=I1=I2=delta1=delta2=R=null;},",
		/*== tail part of eventlistener ==*/
		'true);'
	].join('');
	//
	//=== generation of worker ===
	//
	let blob=new Blob([scpt],{type:'text/javascript'}),
		objUrl=slf.URL.createObjectURL(blob),
		wk=new Worker(objUrl);
	slf.URL.revokeObjectURL(objUrl);
	blob=objUrl=null;
	//
	//========================================
	//
	let F=()=>{
		let obj={srcId:srcCanvasId,width:w,height:h,log:''};
		wk.addEventListener('message',(e)=>{
			obj.log=e.data;
			wk.terminate();
			srcCanvas=null;
		},true);
		//
		wk.postMessage(srcCanvas.getContext('2d').getImageData(+0,+0,+w,+h));
		//
		return obj;
	};
	//========================================
	//
	//returned value is an object: {srcId: target canvas id, width: target canvas width, height: target canvas height, log: scan log}
	return F();
};
//
//method to draw contour
threeCellContour.getContour=async (srcCanvasId,standard,color,strokeWidth)=>{
	// - srcCanvasId: id of target canvas element to scan
	// - standard: a standard value, which is in the range of [0.0,1.0]
	// - color: an optional rgba color that is expressed in css hexadecimal notation ("#RRGGBBAA" or "#RGBA"), and "#000f" is default
	// - strokeWidth: an optional width for stroke that is more than 0.0, and 1.0 is default
	//===
	let LOG=await threeCellContour(srcCanvasId,standard),
		slf=window,
		outputId=`${srcCanvasId}_OUTPUT`,
		outputCanvas=slf.document.getElementById(outputId),
		ctx={},n=0,i=0,
		getXY=()=>{},
		c0c1=()=>{},c0c2=()=>{},
		PATH={'0':()=>{},'1':()=>{},'2':()=>{},'3':()=>{}};
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
		c0c1=(x,y)=>{
			x=+x,y=+y;
			ctx.moveTo(x+1,y);
			ctx.lineTo(x+1,y+1);
		};
		c0c2=(x,y)=>{
			x=+x,y=+y;
			ctx.moveTo(x,y+1);
			ctx.lineTo(x+1,y+1);
		};
		//PATH={'0':()=>{},'1':()=>{},'2':()=>{},'3':()=>{}};
		//
		PATH[0]=(idx)=>{
			void(0);
		};
		//
		PATH[1]=(idx)=>{
			c0c2(...getXY(idx));
		};
		//
		PATH[2]=(idx)=>{
			c0c1(...getXY(idx));
		};
		//
		PATH[3]=(idx)=>{
			c0c1(...getXY(idx));
			c0c2(...getXY(idx));
		};
		//
		//---------
		ctx.beginPath();
		//---------
		//
		while(i<n){
			PATH[v.log[i]](i);
			i+=1;
		}
		//
		//---------
		ctx.stroke();
		//---------
		LOG=slf=outputId=outputCanvas=ctx=n=i=getXY=c0c1=c0c2=PATH=null;
		//
	}),2000);
};
//
//method to fill the contoured area
threeCellContour.getFill=async (srcCanvasId,standard,color)=>{
	//threeCellContour.getContourFill=async (srcCanvasId,standard,color)=>{
	// - srcCanvasId: id of target canvas element to scan
	// - standard: a standard value, which is in the range of [0.0,1.0]
	// - color: an optional rgba color that is expressed in css hexadecimal notation ("#RRGGBBAA" or "#RGBA"), and "#000f" is default
	//===
	let LOG=await threeCellContour(srcCanvasId,standard),
		slf=window,
		outputId=`${srcCanvasId}_OUTPUT`,
		outputCanvas=slf.document.getElementById(outputId),
		ctx={},n=0,i=0,j=0,
		log01='',regEx=/[01]/g,filled=[],L=0,
		/* Run-length encoding (RLE) */
		RLE=()=>{},
		X0=0,Y0=0,
		arrRLE=[],arrRLE_N=0,fillLength=0;
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
		//Run-length encoding (RLE)
		//returned array: `[l0,l1, ... ,ln] = [length_0,length_1,length_0, ..., length_b]`, and `b` is 0 or 1
		//Lengths: length_0 := `00 ...` and length_1 := `11 ...`
		RLE=(txt)=>{
			// - txt: string that is composed of 0 or 1
			//order: 0 is first
			let l=txt.length,output=[],v0=0,v=0,n=0,i=0;
			//
			while(i<l){
				//
				if(txt[i]!=v0){
					output.push(n);
					v0=+!v0;
					//
					//reset count
					n=1;
					//
					//when !(i != l-1)
					v=i>l-2?output.push(n):0;
				}else{
					//when !(txt[i] != v0)
					n+=1;
					//
					//when !(i != l-1)
					v=i>l-2?output.push(n):0;
				}
				//
				i+=1;
			}
			//
			l=v0=v=n=i=null;
			//
			return output;
		};
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
		//0b00 or 0b01 -> 0 then 0b10 or 0b11 -> 1
		log01=v.log.replaceAll(/[01]/g,0);
		log01=log01.replaceAll(/[23]/g,1);
		//
		i=0;
		n=v.log.length;
		while(i<n){
			filled.push(log01.slice(i,i+v.width));
			i+=v.width;
		}
		//
		L=filled.length;
		//
		//if v.width is not less than 3
		i=v.width-2;
		i=i<1?0:i;
		//
		//to fill: '10 ... 01' -> '11 ... 11'
		while(i>0){
			regEx=new RegExp(`1${'0'.repeat(i)}1`,'g');
			//
			j=0;
			while(j<L){
				filled[j]=filled[j].replaceAll(regEx,`1${'1'.repeat(i)}1`);
				j+=1;
			}
			//
			i+=-1;
		}
		//
		//====== to fill the area ======
		i=0,j=0;
		//
		//
		X0=0,Y0=0,
			arrRLE=filled.map(RLE),
			arrRLE_N=arrRLE.length,fillLength=0;
		//
		while(i<arrRLE_N){
			//
			fillLength=arrRLE[i].length;
			j=0,X0=0,Y0=i;
			while(j<fillLength){
				//
				//`00 ... 0` := arrRLE[i][j] and `11 ... 1` := arrRLE[i][j+1]
				X0+=arrRLE[i][j];
				//
				//when RLE data ends in `[... length_0,length_1]`
				// --- all possible patterns are `0101 ... 01` or `0101 ... 10` ---
				if(!!arrRLE[i][j+1]){
					/*
					* `011110` means `__|***|_`
					*
					* `0,  1, 1, 1,  1, 0`
					* `_, _|, *, *, *|, _`
					*/
					ctx.rect(X0+1,Y0,arrRLE[i][j+1]-1,1);
					//
					X0+=arrRLE[i][j+1];
				}
				//
				j+=2;
			}
			//
			i+=1;
		}
		//
		//---------
		ctx.fill();
		//---------
		//
		LOG=slf=outputId=outputCanvas=ctx=n=i=j=log01=regEx=filled=L=RLE=X0=Y0=arrRLE=arrRLE_N=fillLength=null;
		//
	}),2000);
};
//===================================================================
