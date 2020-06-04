# dots-and-boxes-client
Dots and Boxes Player with Artificial Intelligence developed in JavaScript 

## RUN: 
     npm install
     node client.js
   
### Details
**min_max** directory containes the code for the artificial intelligence. <br/>
***k-look_ahead.js*** constructs the minMax tree. The current configuration has k = 2, files for the minMax tree get saved in '/data' dir. <br/>
***minMax.js*** calculates the Heuristic of every Node and Children-Node, and Prunes unnecesary values of alpha/beta. <br/>
***evalueate_move.js*** loads data from look-ahead files, computes Max() over node's Heuristic when it is my turn and Min() when it is not <br/>

### Look-Ahead Data
* Board: The Board to be played on the next turn 
* Array: 0 if it changes a value from Columns, 1 if it chages a value from Rows
* Position: The position to play in the Array 
* Heuristic: It uses Total Game Points as the Heuristic
* Parent: Parent Node, contains Parent Board and parent attributes
* Useful: Value for Alpha/Beta Pruning, If Parent Node has 'Useful'='Yes' then 'Maybe' is not evaluated and you can Imply that the next turn is yours also. If value of Children is 'Yes' then no 'Maybe' is evaluated, 'Maybe' is only evaluated in conditions where no movement can generate points on Max (Like at the begginig of the game), that means Parent-Heuristic === Children-Heuristic, Otherwise, only 'Yes' nodes are relevant and searched.
* Mine: Indicates if turn is mine *true* of *false* if its not. 

