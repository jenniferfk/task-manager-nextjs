
export const COMPLETE_TASK = 'COMPLETE_TASK';
  export const completeTask = (taskId: number) => ({
    type: COMPLETE_TASK,
    payload: {
      taskId,
    },
  });