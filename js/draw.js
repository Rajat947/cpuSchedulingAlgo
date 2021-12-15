var algo;
var input;
var quantum = null;

function updateTable(processes){
    console.log(processes);
    var waitingTime=0;
    var turnaroundTime=0;
    var count=0;
    for (const key in processes) {
        if (processes.hasOwnProperty(key)) {
            const element = processes[key];
            document.getElementById(key+"-waiting").innerHTML = element.waiting;
            document.getElementById(key+"-turnaround").innerHTML = element.turnaround;
            document.getElementById(key+"-completion").innerHTML = element.completion;
            turnaroundTime+=element.turnaround;
            waitingTime+=element.waiting;
            count++;
        }
    }
    let rows = document.getElementsByClassName("table-visiblity");
    for(let i = 0; i<rows.length; i++)
    {
        rows[i].style.display = "table-cell";
    }
    document.getElementById("averageTime").innerHTML=`Average waiting time : ${(waitingTime/count).toFixed(2)} unit time<br>Average Turnaround time: ${(turnaroundTime/count).toFixed(2)} unit time`
}

function addBlocks(blocks){
    var element = document.getElementById("root");
    blocks.map( (cur,index)=>{
        if(index === 0)
        {
            let html = `<div class="algos" style="width: ${cur.width}%;">
                            <div class="line title" style="background-color: #65BC7B;">${cur.name}</div>
                            <div class="line justify-content-between" style="text-align: left;background-color: white;border-right: 0px;">
                                <div style="position: absolute; left: -4px; padding-left: 5px;">${cur.start}</div>
                                <div class="times" style="position: absolute; right: -2px">${cur.end}</div>
                            </div>
                        </div>`
            element.insertAdjacentHTML('beforeend',html);
        }else if(index === blocks.length-1){
            let html = ` <div class="algos" style="width: ${cur.width}%;">
                            <div class="line title" style="background-color: #65BC7B;">${cur.name}</div>
                            <div class="line justify-content-between" style="text-align: left;background-color: white;border-right: 0px;">
                                <div style="position: absolute; left: 1px; padding-left: 5px;">${cur.start}</div>
                                <div class="times" style="position: absolute; right: -2px">${cur.end}</div>
                            </div>
                        </div>` 
            element.insertAdjacentHTML('beforeend',html);
        }else{
            let html = `<div class="algos" style="width: ${cur.width}%;">
                            <div class="line title" style="background-color: #65BC7B;">${cur.name}</div>
                            <div class="line justify-content-between" style="text-align: left;background-color: white;border-right: 0px;">
                                <div style="position: absolute; left: -1px; padding-left: 5px;">${cur.start}</div>
                                <div class="times" style="position: absolute; right: -2px">${cur.end}</div>
                            </div>
                        </div>`
            element.insertAdjacentHTML('beforeend',html);
        }
    });
    element.parentNode.style.maxWidth = "100%";
}

function runSimulation()
{
    let targetElement = event.target;
    if(!targetElement.classList.contains("done")){
        document.getElementById("addRowBtn").classList.add("simulation-done");
        document.getElementById("removeRowBtn").classList.add("simulation-done");
        let elements = document.getElementsByClassName("input-value");
        var processes = [];
        for(let i = 0; i<elements.length; i++){
            let [name,] = elements[i].id.split("-");
            processes.push( [name, parseInt(elements[i].value), parseInt(elements[++i].value)] );
        }
        if(algo === "RR")
        {
            quantum = document.getElementById("quantum").value;
        }
        var process, blocks;
        switch(algo){
            case "FCFS":{
                [process, blocks]=fcfs(processes);
                break;
            }
            case "RR":{
                [process, blocks]=rr(processes,quantum);
                break;
            }
            case "SJF":{
                [process, blocks]=sjfNonPreemption(processes);
                break;
            }
            case "SRTF":{
                [process, blocks] = sjf(processes);
            }
        }
        addBlocks(blocks);
        updateTable(process);
        targetElement.classList.add("done");
    }
}

function addRow()
{
    if(!document.getElementById("addRowBtn").classList.contains("simulation-done")){
        let element = document.getElementById("table");
        let noOfRows = element.rows.length;
        let html = `<tr id="${noOfRows}"><td>P${noOfRows}</td><td><input id="p${noOfRows}-arival" class="input-value" type="number" min="0" value="0" required></td><td><input id="p${noOfRows}-burst" class="input-value" type="number" min="0" value="0" required></td><td  class="table-visiblity"  id="p${noOfRows}-waiting">3</td><td  class="table-visiblity" id="p${noOfRows}-turnaround">5</td><td class="table-visiblity" id="p${noOfRows}-completion">5</td></tr>`
        element.insertAdjacentHTML('beforeend',html);
    }
}
function refresh()
{
    document.getElementById("averageTime").innerHTML = "";
    document.getElementById("addRowBtn").classList.remove("simulation-done");
    document.getElementById("removeRowBtn").classList.remove("simulation-done");
    let elements = document.getElementsByClassName("input-value");
    for(let i = 0; i<elements.length; i++){
        elements[i].value = "0";
    }
    let rootElement = document.getElementById("root");
    rootElement.innerHTML = "";
    rootElement.parentNode.style.maxWidth = "0%";
    document.getElementById("submit").classList.remove("done");
    let rows = document.getElementsByClassName("table-visiblity");
    for(let i = 0; i<rows.length; i++)
    {
        rows[i].style.display = "none";
    }
}
function removeRow()
{
    if(!document.getElementById("removeRowBtn").classList.contains("simulation-done")){
        let element = document.getElementById("table");
        let noOfRows = element.rows.length;
        if(noOfRows>3)
        {
            let rowToDelete = document.getElementById(`${noOfRows-1}`);
            rowToDelete.parentNode.removeChild(rowToDelete);
        }
    }
}
(function(){
    let url = window.location.href;
    let url_str = new URL(url);
    algo = url_str.searchParams.get("algorithm");
    document.getElementById(algo).style.display = "block";
    if(algo === "RR"){
        document.getElementById("quantum").parentNode.style.display = "block";
    }
})();