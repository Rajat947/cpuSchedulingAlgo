// var inputArray = [["p0",0,27], ["p3",2,4], ["p1",1,25]];
var fcfs = function(inputArray){
    var process = {};
    var blocks = [];
    var timer;
    
    inputArray.sort((a,b) => a[1] - b[1]);
    
    inputArray.map(cur => {
        process[cur[0]] = new Process(cur[1], cur[2]);
    });

    for(var i = 0; i < inputArray.length; i++){
        //Set timer
        if(i === 0){
            timer = inputArray[i][1];
        }else{
            timer = timer + inputArray[i-1][2];
            if(timer < inputArray[i][1])
            {
                timer = inputArray[i][1];
            }
        }
        
        var element = new Block(inputArray[i][0], timer, timer+inputArray[i][2]);
        blocks.push(element);
        process[inputArray[i][0]].completion = timer + inputArray[i][2];
        process[inputArray[i][0]].turnaround = process[inputArray[i][0]].completion - process[inputArray[i][0]].start;
        process[inputArray[i][0]].waiting = process[inputArray[i][0]].turnaround - process[inputArray[i][0]].burst;
    }
    timer = timer + inputArray[inputArray.length-1][2];
    
    blocks.map(cur=>{
        var element = cur.end-cur.start;
        var percentage = Math.floor((element/timer)*95);
        cur.width = parseInt(percentage);
    });
    return [process,blocks];
}