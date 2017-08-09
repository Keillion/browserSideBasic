var TaskQueue = function(){
	/// <summary>
	/// @class TaskQueue
	/// </summary>

	this._queue = [];
	this._isWorking = false;

	/// <param name="timeout" type="int">
	/// Timeout between task.
	/// Between the interval, other work can be done, such as UI-response work.
	/// </param>
	this.timeout = 100;
};

TaskQueue.prototype.push = function(task, context, arguments){
	/// <summary>
	/// Push task. If <span>!isWorking</span>, start the task queue automatically.
	/// </summary>

	this._queue.push({
		"task": task,
		"context": context,
		"arguments": arguments
	});
	if(!this._isWorking){
		this.next();
	}
};

TaskQueue.prototype.unshift = function(task, context, arguments){
	/// <summary>
	/// Push task. If <span>!isWorking</span>, start the task queue automatically.
	/// </summary>

	this._queue.unshift({
		"task": task,
		"context": context,
		"arguments": arguments
	});
	if(!this._isWorking){
		this.next();
	}
};

TaskQueue.prototype.next = function(){
	/// <summary>
	/// Do the next task.
	/// You need to call it manually in the end of your task.
	/// To assure <function>next</function> will be called,
	/// in some case you can put the function in <span>finally</span>,
	/// in other case you should carefully handle <span>setTimeout</span>.
	/// </summary>

	if(this._queue.length == 0){
		this._isWorking = false;
		return;
	}
	this._isWorking = true;
	var item = this._queue.shift();
	var task = item.task;
	var taskContext = item.context ? item.context : window;
	var taskArguments = item.arguments ? item.arguments : [];
	setTimeout(task.apply(taskContext, taskArguments), this.timeout);
};

/*
TaskQueue.test = function(){
	var taskQueue = new TaskQueue();
	var task = function(mess){
		console.log(mess);
		taskQueue.next();
	};
	for(var i = 0; i < 100; ++i){
		taskQueue.push(task, null, [i]);
	}
};*/