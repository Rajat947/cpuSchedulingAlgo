function comparision(a,b)
{
    if(a[1] != b[1]){
        return a[1]-b[1];
    }
    return a[2]-b[2];
}
function sjf(inputArray)
{
    var blocks = [];
    var process = {};
    var priorityQueue = new minHeap();

    inputArray.sort(comparision);
    console.log(inputArray);
    var totalCpuTime = 0;
    inputArray.map(cur=>{
        process[cur[0]] = new Process(cur[1], cur[2]);
        totalCpuTime+=cur[2];
    });

    var timer = 0; //To keep track of time

    timer = inputArray[0][1];
    priorityQueue.insert(inputArray[0][0], inputArray[0][1], inputArray[0][2]);
    var element;
    for(let i = 1; i<inputArray.length;){
        element = priorityQueue.getmin();
        console.log(element);
        if(inputArray[i][1] >= (timer+element.burst)){
            let tempBlock = new Block(element.name, timer, timer+element.burst);
            blocks.push(tempBlock);
            priorityQueue.remove();
            priorityQueue.insert(inputArray[i][0],inputArray[i][1], inputArray[i][2]);
            timer += element.burst;
            process[element.name].completion = timer;
            i++;
        }else if(inputArray[i][2] < element.burst-inputArray[i][1]+element.arrival){
            let tempBlock = new Block(element.name, timer, timer+inputArray[i][1]-element.arrival);
            //console.log(tempBlock);
            blocks.push(tempBlock);
            timer=inputArray[i][1];
            element.burst-=(inputArray[i][1]-element.arrival);
            priorityQueue.insert(inputArray[i][0],inputArray[i][1], inputArray[i][2]);
            i++;
        }else{
            let index = i+1;
            let time = timer+element.burst;
            let execute = true;
            while(index < inputArray.length){
                if(time > inputArray[index][1]){
                    execute = false;
                }
                index++;
            }
            if(execute){
                let tempBlock = new Block(element.name, timer, timer+element.burst);
                blocks.push(tempBlock);
                priorityQueue.remove();
                timer += element.burst;
                process[element.name].completion = timer;
            }else{
                let tempBlock = new Block(element.name, timer, inputArray[i][1]);
                blocks.push(tempBlock);
                priorityQueue.decreaseKey((inputArray[i][1]-timer));
                timer=inputArray[i][1];
            }
            priorityQueue.insert(inputArray[i][0],inputArray[i][1], inputArray[i][2]);
            i++;
        }
        while(i<inputArray.length && timer >= inputArray[i][1]){
            priorityQueue.insert(inputArray[i][0],inputArray[i][1], inputArray[i][2]);
            i++;
        }
    }
    while(!priorityQueue.isempty()){
        element = priorityQueue.getmin();
        priorityQueue.remove();
        let tempBlock = new Block(element.name, timer, timer+element.burst);
        blocks.push(tempBlock);
        timer += element.burst;
        process[element.name].completion = timer;

    }
    for (const key in process) {
        if (process.hasOwnProperty(key)) {
            process[key].turnaround = process[key].completion - process[key].start;
            process[key].waiting = process[key].turnaround - process[key].burst;
        }
    }
    blocks.map(cur=>{
        var element = cur.end-cur.start;
        var percentage = Math.floor((element/totalCpuTime)*99);
        cur.width = parseInt(percentage);
    });
    
    return [process,blocks];
}
var inputArray = [["p1",0,8], ["p2",1,4], ["p3",2,2], ["p4",3,1], ["p5",4,3], ["p6",5,2]];