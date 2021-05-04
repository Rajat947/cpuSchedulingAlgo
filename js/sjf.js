class Process{
    constructor(start,burst){
        this.start = start;
        this.burst = burst;
        this.completion = null;
        this.waiting = 0;
        this.turnaround = null;
    }
}
class Block{
    constructor(name,start,end){
        this.name = name;
        this. start = start;
        this.end = end;
        this. width = null;
    }
}

var inputArray = [["p1",2,6], ["p2",5,2], ["p3",1,8], ["p4",0,3], ["p5",4,4]];

function add(arr,value){
    if(arr[0][2] > value[2]){
        arr.unshift(value);
    }else if(arr[arr.length-1][2] < value[2]){
        arr.push(value);
    }else{
        var index;
        for(index = 0; index < arr.length; index++){
            if(arr[index][2] > value[2]){
                break;
            }
        }
        arr.splice(index,0,element);
    }
}

var sjf = function(){
    inputArray.sort((a,b) => a[1] - b[1]);
    var blocks = [];
    var process = {};

    inputArray.map(cur => {
        process[cur[0]] = new Process(cur[1], cur[2]);
    });
    
    var index = 0;
    // var completed = false;
    var timer = inputArray[index][1];
    var element = inputArray[index];
    var readyQueue = [];
    readyQueue.push(inputArray[index]);
    index++;
    var time = timer;
    var  i = index;
    while(time <= inputArray[inputArray.length-1][1]){
        if(time == inputArray[i]){
            if(element[2] <= inputArray[i][1]){
                temp = new Block(element[0], timer, timer+element[2]);
                element = inputArray[index];
                timer++;
                index++;
            }else {
                if(element[2] < inputArray[index][2]){
                    timer+=inputArray[index][1];
                    element[2]  = element[2] - timer + element[1];
                    add(readyQueue,inputArray[index]);
                    index++;
                }
            }
        }
    }
    
    while(readyQueue.length != 0){
        let temp;
        if(element[2] <= inputArray[index][1]){
            temp = new Block(element[0], timer, timer+element[2]);
            element = inputArray[index];
            timer++;
            index++;
        }else {
            if(element[2] < inputArray[index][2]){
                timer+=inputArray[index][1];
                element[2]  = element[2] - timer + element[1];
                add(readyQueue,inputArray[index]);
                index++;
            }
        }
    }
}