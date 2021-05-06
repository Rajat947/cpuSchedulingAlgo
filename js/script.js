window.onscroll = function(){
    var element = document.getElementById("navigation");
    var header = document.getElementById("logo");
    var sticky = element.offsetTop;
    if(document.body.scrollTop > 85 || document.documentElement.scrollTop > 85){
        element.style.padding = "20px 0px";
        header.style.padding = "0px 0px";
        element.classList.add("sticky");
    }else{
        element.style.padding = "2px 0px";
        header.style.padding = "20px 0px";
        element.classList.remove("sticky");
    }
    var arr = ["CPUSCHEDULING", "NEED", "ALGORITHMS","PROS","CONS"];
    arr.map(cur => {
        var e = document.getElementById(cur);
        if(e.classList.contains("addPadding")){
            e.classList.remove("addPadding");
        }
    })
}

function addPadding(){
    var e = event.target.parentNode.id;
    var element;
    // href="#CPUSCHEDULING"
    //                      href="#NEED"
    //                      href="#ALGORITHMS"
    //                      href="#PROS"
    //                      href="#CONS"
    console.log(e);
    switch(e)
    {
        case "1":
            element = document.getElementById("CPUSCHEDULING");
            break;
        case "2":
            element = document.getElementById("NEED");
            break;
        case "3":
            element = document.getElementById("ALGORITHMS");
            break;
        case "4":
            element = document.getElementById("PROS");
            break;
        case "5":
            element = document.getElementById("CONS");
            break;
    }
    element.classList.add("addPadding");
}

// function removePad(){
//     var arr = ["CPUSCHEDULING", "NEED", "ALGORITHMS","PROS","CONS"];
//     arr.map(cur => {
//         document.getElementById(cur).style.paddingTop = "0";
//     })
// }

function openNav(){
    console.log("hell yeah");
    document.getElementById("side-menu").style.width = "32%";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closenav(){
    document.getElementById("side-menu").style.width = "0";
    document.body.style.backgroundColor = "white";
}
function showAlgo()
{
    // console.log(event.target);
    var id = event.target.id;
    // console.log(id);
    event.target.classList.toggle("active");
    var content = document.getElementsByClassName(id)[0];
    // console.log(content[0]);
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
    content.style.maxHeight = content.scrollHeight + "px";
    } 
}
function navigate()
{
    var algo = event.target.classList[0]
    location.href = "./algo.html?algorithm="+algo;
}