class Process{
    constructor(start,burst){
        this.start = start;
        this.burst = burst;
        this.completion = null;
        this.waiting = 0;
        this.turnaround = null;
    }
}