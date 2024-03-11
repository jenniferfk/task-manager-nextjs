# Task Management App with Next.js and Redux

Live demo: https://dapper-axolotl-0a7855.netlify.app/ 
(deployment made with netifly)

## App Features:

- Users can create, delete and access categories
- Categories are stored locally using browser localStorage for persistence.
- Users can add, edit, mark as completed, and delete tasks within each category
- Tasks are stored locally using browser localStorage for persistence.
- Tasks can be marked as completed, with completed tasks visually distinguished from active tasks.
- Completed tasks can be viewed separately from active tasks
- When a category is selected, only tasks belonging to that category are displayed.
- Integration with external APIs to fetch and manage tasks.
- The application is designed to be responsive, ensuring usability across various devices and screen sizes.

## Challenges Faced:

- Server-Side rendering task wasn't clear in instructions so I had to make a category for API Tasks that can't be edited or deleted, containing tasks titles with a view details button to actually view the title and image of the task. When I opened the API in Postman, only the titles showing in the task fields were shown, so I considered them as task titles and their image too (first task doesn't contain any image ) and i fetched them in the tasks list. But in other categories i used the localStorage to stock the tasks 
- I had problems with useDispatch and Provider when i tried to include them in my project but realized later that i can't use them along with many more such as connect, useStore...
- Router in next.js was a bit challenging but I researched for help on the web and I think I got it right.

## More Information:
Still got more work and practice to do with next.js but i managed to finish this assignment in two days. 
