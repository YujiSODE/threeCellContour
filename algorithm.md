# threeCellContour
## Algorithm
Tool to extract contour from a image.

    [C0 C1]
    [C2 --]
Let the current cell be as `C0`, and other cells be `C1` and `C2` in 2x2 px area.  
A difference between two cells _`Di`_ using a standard value _`std`_ is as follows:  
_`D`_`1` `:= ` _`D`_`(`_`C`_`0,`_`C`_`1) > std? 0b10: 0b00`  
_`D`_`2` `:= ` _`D`_`(`_`C`_`0,`_`C`_`2) > std? 0b01: 0b00`  

Result reaction from the current cell _`q`_`0` is estimated in the following way,  
_`q`_`0 :=`_`D`_`1|`_`D`_`2 = 0,1,2 or 3`.  
