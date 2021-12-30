# Change Log 
## [Unreleased]

## [0.3] - 2021-12-30
## Changed
- [`threeCellContour_hull.js`] line 136:  
  ```
   threeCellContour.getFill_hull=async (srcCanvasId,standard,vN,color)=>{
  ```
- [`threeCellContour_hull.js`] line 102:
  ```
   		hull=xyArr.polygonalHull(vN).radSort();
  ```

## Removed
- [`threeCellContour_hull.js`] lines 98-101

## Added
- [`threeCellContour_hull.js`] line 55:  
  ```
   	vN=vN<1?1:vN;
  ```

- [`threeCellContour_hull.js`] line 42:  
  ```
   	// - vN: a number of vertices is not greater than 2*vN+1
  ```

## Changed
- [`threeCellContour_hull.js`] line 39:  
  ```
  threeCellContour.getContour_hull=async (srcCanvasId,standard,vN,color,strokeWidth)=>{
  ```

## Added
- [`threeCellContour_hull.js`] line 30:  
  ```
  * 	- `vN`: a number of vertices is not greater than 2*vN+1
  ```

## Changed
- [`threeCellContour_hull.js`] lines 23 and 24:  
  ```
  * - `threeCellContour.getFill_hull(srcCanvasId,standard,vN,color);`
  * - `threeCellContour.getFill_hull(srcCanvasId,standard,vN);`
  ```
- [`threeCellContour_hull.js`] lines 17-19:  
  ```
  * - `threeCellContour.getContour_hull(srcCanvasId,standard,vN);`
  * - `threeCellContour.getContour_hull(srcCanvasId,standard,vN,color);`
  * - `threeCellContour.getContour_hull(srcCanvasId,standard,vN,color,strokeWidth);`
  ```

## Fixed
- [`index.html`] lines 20-22: added to updated CSS
- [`index.html`] lines 45-49: removed second `canvas{...}` to updated CSS
- [`algorithm.md`] line 54:  
  ```
   and _`N`_ is an integer value for _`dt`_`=`_`π`_`/`_`N`_, where _`t`_`= [-`_`π`_`,`_`π`_`]`.
  ```

## [0.3] - 2021-12-29
## Fixed
- [`README.md`] lines 14 and 15:
  ```
  - [`polygonalHull.js`](polygonalHull.js) [v0.2+]: additional Array method to estimate a convex hull with polygonal approximation.
  - [`threeCellContour_hull.js`](threeCellContour_hull.js) [v0.2+]: tool to extract hull contour from a image.
  ```
  
- [`algorithm.md`] line 52:  
  ```
  Let _**`pi`**_ and _**`O`**_ be vector _`Pi`_`-`_`O`_ and vector _`P`_`0 -`_`O`_.  
  ```

## Released: [0.2] - 2021-12-29
## [0.2] - 2021-12-29
## Added
- [`algorithm.md`] lines 42-58: added Algorithm in [`polygonalHull.js`]

## Changed
- [`algorithm.md`] line 4:  
  ```
  ## Algorithm in [`threeCellContour.js`](threeCellContour.js)
  ```

## Added
- [`README.md`] lines 19-21:  
  ```
  
  ## Compatibility
  - Firefox `95.0.1+` (64-bit)
  ```

## [0.2] - 2021-12-26
## Added
- [`README.md`] lines 15:  
```
- [`threeCellContour_hull.js`](threeCellContour_hull.js) (`v0.2+`): tool to extract hull contour from a image.
```

- [`README.md`] line 14:  
```
 - [`polygonalHull.js`](polygonalHull.js) (`v0.2+`): additional Array method to estimate a convex hull with polygonal approximation.
```

- [`README.md`] lines 14 and 15:  
```

### HTML
```

- [`index.html`] lines 204-218: to add tool to extract hull contour  
```
				ScanHullB.addEventListener('click',()=>{
					threeCellContour.getContour_hull('threeCellContourCvs',Std.value,Color.value,StrokeWidth.value);
					//
					//to add scan log
					log.value+=`${!log.value?'':'\n'}time:${(new Date()).toJSON()},standard:${Std.value},color:${Color.value},stroke:${StrokeWidth.value},target:${Width.value}x${Height.value},type:stroke_hull`;
				},false);
				//
				FillHullB.addEventListener('click',()=>{
					threeCellContour.getFill_hull('threeCellContourCvs',Std.value,Color.value);
					//
					//to add scan log
					log.value+=`${!log.value?'':'\n'}time:${(new Date()).toJSON()},standard:${Std.value},color:${Color.value},target:${Width.value}x${Height.value},type:fill_hull`;
				},false);
				//
				//--- download and comment ---
```

- [`index.html`] lines 180 and 181: to add tool to extract hull contour  
>    				//
>   				//--- stroke and fill ---

- [`index.html`] lines 134-137: to add tool to extract hull contour  
>        					/* --- */
>        					ScanHullB=slf.document.getElementById('scan_hullB'),
>        					FillHullB=slf.document.getElementById('fill_hullB'),
>        					/* --- */

- [`index.html`] lines 70-73: to add tool to extract hull contour  
>				<!-- -->
>				<button id='scan_hullB' type='button'>Stroke_hull</button>
>				<button id='fill_hullB' type='button'>Fill_hull</button>
>				<!-- download and comment -->

- [`index.html`] lines 66 and 67: to add tool to extract hull contour  
>    				<br>
>    				<!-- stroke and fill -->

- [`index.html`] lines 52-54: to add tool to extract hull contour  
>    		<!-- -->
>    		<script type='text/javascript' src='polygonalHull.js'></script>
>    		<script type='text/javascript' src='threeCellContour_hull.js'></script>

- [`threeCellContour_hull.js`]: Tool to extract hull contour from a image.
- [`polygonalHull.js`]: additional Array method to estimate a convex hull with polygonal approximation. this algorithm does not require sorting sample in advance.

## [0.2] - 2021-12-24
## Removed
- [`threeCellContour.js`] line 373: `//===================================================================`

## [0.2] - 2021-12-23
## Removed
- [`threeCellContour.js`] lines 252 and 253:  

  >        		//
  >        								//n=v.log.length;

## Released: [0.1] - 2021-12-05

## Released: [0.0] - 2021-12-05

## [0.1] - 2021-11-22
## Fixed
- [`index.html`] line 175:  
  >` 				ScanB.addEventListener('click',()=>{`

## Changed
- [`index.html`] line 179: changed log output by `Stroke` (= `Scan`) can also include `type:stroke`
- [`index.html`] line 63: changed button name from `Scan` to `Stroke`

## Added
- [`index.html`] line 108: added a link to GitHub (`https://github.com/YujiSODE/threeCellContour`)
- [`index.html`] lines 64 and 124: added `Fill` button
- [`index.html`] lines 182-187: added event listener for fill method
- [`threeCellContour.js`] lines 15, 19 and 21-26: added descriptions
- [`threeCellContour.js`] lines 219-374: added a method to fill the contoured area

## [0.0] - 2021-11-22
- original version
