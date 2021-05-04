class Queue{
    constructor(size){
        this.arr = new Array(size+1);
        this.front = 0;
        this.rear = 0;
        this.size = size+1;
    }
    add(value){
        if(this.isFull()){
            return false;
        }
        this.rear = (this.rear+1)%this.size;
        this.arr[this.rear] = value;
        return true;
    }
    remove(){
        if(this.isEmpty()){
            return false;
        }
        this.front = (this.front+1)%this.size;
        return this.arr[this.front];
    }
    isFull(){
        if(this.front === (this.rear+1)%this.size){
            return true;
        }
        return false;
    }
    isEmpty(){
        if(this.front === this.rear){
            return true;
        }
        return false;
    }
}