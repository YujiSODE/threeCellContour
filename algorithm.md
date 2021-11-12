# threeCellContour
## Algorithm
Tool to extract contour from a image.

    [C0 C1]
    [C2 --]
Let the current cell be as `C0`, and other cells be `C1` and `C2` in 2x2 px area.  
A difference between two cells _`D`<sub>`i`</sub>_ can be estimated using standard value _`std`_ as follows:  
