var rr = function(inputArray, quantum){
    // var inputArray = [["p1",0,10], ["p2",2,20], ["p3",6,30]];
    // var quantum = 2;
    quantum = parseInt(quantum);
    var blocks = [];
    var process = {};
    var queue = new Queue(inputArray.length);

    //sort input on basis of arrival time
    inputArray.sort((a,b) => a[1] - b[1]);
    //Enter process in process object
    inputArray.map(cur=>{
        process[cur[0]] = new Process(cur[1], cur[2]);
    });

    var timer = 0; //To keep track of time
    var index = 0; //Index for inputArray
    var totalCpuTime = 0;

    timer = inputArray[index][1];
    queue.add(inputArray[index++]);

    while(true){
        while(!queue.isEmpty()){
            var element = queue.remove();
            if(element[2] > quantum){
                element[2] = element[2] - quantum;
                let tempBlock = new Block(element[0],parseInt(timer),parseInt(timer+quantum));
                blocks.push(tempBlock);
                timer+=quantum;
                totalCpuTime+=quantum;
                while(index < inputArray.length && timer >= inputArray[index][1])
                {
                    queue.add(inputArray[index++]);
                }
                
                queue.add(element);
                
            }else if(element[2] == 0){
            }else{
                let tempBlock = new Block(element[0],parseInt(timer),parseInt(timer+element[2]));
                blocks.push(tempBlock);
                
                timer+=element[2];
                totalCpuTime+=element[2];
                process[element[0]].completion = timer;
                while(index < inputArray.length && timer >= inputArray[index][1])
                {
                    queue.add(inputArray[index++]);
                }
                element[2] = 0;
                
            }
        }
        if(timer < inputArray[inputArray.length-1][1]){
            for(let i =0; i<inputArray.length; i++)
            {
                if(timer<inputArray[i][1])
                {
                    timer = inputArray[i][1];
                    queue.add(inputArray[i]);
                    break;
                }
            }
        }else{
            break;
        }
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