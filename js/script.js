//For collapsible algo 
function showAlgo()
{
    var id = event.target.id;
    event.target.classList.toggle("active");
    var content = document.getElementsByClassName(id)[0];
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
    content.style.maxHeight = content.scrollHeight + "px";
    } 
}
//Navigate to algorithm page
function navigate()
{
    var algo = event.target.classList[0]
    location.href = "./algo.html?algorithm="+algo;
}