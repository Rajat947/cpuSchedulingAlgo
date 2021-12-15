<p align="center">
<img src="Images/logo.png">
</p>
<h1 align="center">Simulator for CPU Scheduling Algorithms</h1>
CPU scheduling is a process that allows one process to use the CPU while the execution of another process is on hold(in waiting state) due to unavailability of any resource like I/O etc, thereby making full use of CPU.<br>
It is a basic simulator that taked input from user and simulate <b>CPU scheduling algorithms</b> using gantt chart<br>

# Algorithms simulated
1. <b>First Come First serve</b> : Process that arrive first get CPU first
2. <b>Shortest Job First without Preemption</b>: Process with shortest CPU time get CPU first.
3. <b>Shortest Job First with Preemption</b>: Process with shortest remaining CPU time get CPU first.
4. <b>Round Robin</b>: All processes get CPU for some fixed time.

# Implementation Details
- Data structures implemented in javaScript
	- Min Heap/Priority Queue
	- Queue
- About.html contains developers page
- Algo.html contains template for each algorithm
- js/draw.js draws gantt chart for each algorithm