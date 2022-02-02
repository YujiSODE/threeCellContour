# threeCellContour
Tool to extract contour from a image.  
GitHub: https://github.com/YujiSODE/threeCellContour  
>Copyright (c) 2021 Yuji SODE \<yuji.sode@gmail.com\>  
>This software is released under the MIT License.  
>See LICENSE or http://opensource.org/licenses/mit-license.php  
______
<!-- ![3CC_sample01_v03_20220109Stroke_Fill.png](3CC_sample01_v03_20220109Stroke_Fill.png) -->
<img width=800 src='3CC_sample01_v03_20220109Stroke_Fill.png' alt='3CC_sample01_v03_20220109Stroke_Fill.png'>

## [Algorithm](algorithm.md)
This algorithm returns a definition of contour paths.

## Scripts
### JavaScript
- [`threeCellContour.js`](threeCellContour.js): main script
- [`polygonalHull.js`](polygonalHull.js) [v0.2 to v0.4]: additional Array method to estimate a convex hull with polygonal approximation.
- [`threeCellContour_hull.js`](threeCellContour_hull.js) [v0.2 to v0.4]: tool to extract hull contour from a image.

**[v0.4+]**
- [`clusteredHull.js`](clusteredHull.js) [v0.4+]: new Array method to approximate a convex hull with clustering.
- [`threeCellContour_hull_v04.js`]([threeCellContour_hull_v04.js): new tool to extract hull contour from a image.

### HTML
- [`index.html`](index.html) [v0.3]: GUI

**[v0.4+]**
- [`index_v04.html`](index_v04.html) [v0.4+]: new interface

## Compatibility
- Firefox `95.0.1+` (64-bit)

______
<!-- ![3CC_sample01_v03_20220109StrokeHulls_lowQuality.jpg](3CC_sample01_v03_20220109StrokeHulls_lowQuality.jpg) -->
<img width=800 src='3CC_sample01_v03_20220109StrokeHulls_lowQuality.jpg' alt='3CC_sample01_v03_20220109StrokeHulls_lowQuality.jpg'>

