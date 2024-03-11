export const ADD_CATEGORY = 'ADD_CATEGORY';

export interface AddCategoryAction {
    type: typeof ADD_CATEGORY;
    payload: string;
  }
  
export const addCategory = (category: string) => ({
  type: ADD_CATEGORY,
  payload: category,
});
