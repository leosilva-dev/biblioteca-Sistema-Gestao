export interface ITask{
    id: string;
    order: number;
    title: string;
    done: boolean;
    isRunning:boolean;
}

export const getAll = () => {
    
     const response: ITask[] = [
        //  {id:Math.random().toString(), title: 'task 1', done: false, order:1, isRunning:false },
        //  {id:Math.random().toString(), title: 'task 2', done: false, order:2, isRunning:false },
        //  {id:Math.random().toString(), title: 'task 3', done: true, order:3, isRunning:false },
    ];

    return response
}

export const taskService = {
    getAll
}