// var inputArray = [["p1",1,7], ["p2",3,3], ["p3",6,2], ["p4",7,10], ["p5",9,8]];
function comparator(a,b){
    if(a[1] === b[1])
    {
        return a[2]-b[2];
    }else{
        return a[1]-b[1];
    }
}
var sjfNonPreemption = function(inputArray){
    // console.log(inputArray);
    inputArray.sort(comparator);
    var blocks = [];
    var process = {};
    var count = 0;
    var index = 0;
    var timer = inputArray[index][1];
    var element = new Block(inputArray[index][0], timer, timer+inputArray[index][2]);
    blocks.push(element);
    timer = timer+inputArray[index][2];
    var min = null;
    count++;
    index++;
    // console.log(timer);

    inputArray.map(cur => {
        process[cur[0]] = new Process(cur[1], cur[2]);
    });

    while(count < inputArray.length){

        for(let i = 1; i < inputArray.length; i++){
            if(inputArray[i] == null){
                continue;
            }
            if(timer < inputArray[i][1]){
                break;
            }
            if(min == null){
                min = inputArray[i][2];
                element = inputArray[i];
                index = i;
            }else if(min > inputArray[i][2]){
                min = inputArray[i][2];
                element = inputArray[i];
                index = i;
            }
        }
        let temp = new Block(element[0], timer, timer+element[2]);
        blocks.push(temp);
        timer += element[2];
        count++;
        min = null;
        inputArray[index] = null;
        // console.log(timer);
        // console.log(element);
    }
    blocks.map(cur => {
        process[cur.name].completion = cur.end;
        process[cur.name].turnaround = process[cur.name].completion - process[cur.name].start;
        process[cur.name].waiting = process[cur.name].turnaround - process[cur.name].burst;
        cur.width = parseInt(Math.floor(((cur.end-cur.start)/timer)*99));
    });
    return [process,blocks];
}