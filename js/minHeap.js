class heapValue{
    constructor(name,arrival,burst)
    {
        this.name = name;
        this.arrival = arrival;
        this.burst = burst;
    }
}
class minHeap
{
    constructor()
    {
        this.arr = [];
    }
    getmin(){
        return this.arr[0];
    }
    isempty()
    {
        if(this.arr.length === 0){
            return true;
        }
        else{
            return false;
        }
    }
    parent(i){
        return(Math.ceil((i-1)/2));
    }
    insert(name,arrival,burst){
        let element = new heapValue(name,arrival,burst);
        this.arr.push(element);
        let index = this.arr.length -1;
        while(index > 0 && this.arr[index].burst < this.arr[this.parent(index)].burst)
        {
            let temp = this.arr[index];
            this.arr[index] = this.arr[this.parent(index)];
            this.arr[this.parent(index)] = temp;
            index = this.parent(index);
        }
    }
    min(a,b,c){
        if (this.arr[a].burst <= this.arr[b].burst && this.arr[a].burst <= this.arr[c].burst){
            return a;
        }else if (this.arr[b].burst <= this.arr[a].burst && this.arr[b].burst <= this.arr[c].burst){
            return b;
        }else{
            return c;
        }
    }
    remove(){
        let temp = this.arr[0];
        this.arr[0] = this.arr[this.arr.length-1];
        this.arr[this.arr.length-1] = this.arr[0];
        this.arr.pop();
        this.heapify(0);
    }
    decreaseKey(value){
        this.arr[0].burst-= value;
        if(value <= 0)
        {
            this.remove();
        }
    }
    heapify(index){
        const size = this.arr.length;
        if(2*index+1 >= size && 2*index+2 >= size)
        {
            return 1;
        }
        if(2*index+2 >= size){
            if(this.arr[index].burst > this.arr[2*index+1].burst){
                let temp = this.arr[index];
                this.arr[index] = this.arr[2*index+1]
                this.arr[2*index+1] = temp;
                this.heapify(2*index+1);
            }
        }else if(2*index+1 >= size){
            if(this.arr[index].burst > this.arr[2*index+2].burst){
                let temp = this.arr[index];
                this.arr[index] = this.arr[2*index+2]
                this.arr[2*index+2] = temp;
                this.heapify(2*index+2);
            }
        }else{
            let temp = this.min(index,2*index+1,2*index+2);
            if(temp === index){
                return 1;
            }
            let element = this.arr[temp];
            this.arr[temp] = this.arr[index];
            this.arr[index] = element;
            this.heapify(temp);
        }
    }
}