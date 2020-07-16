https://buy-where.netlify.app/

## Buy / Where

Want to keep track of what you purchase at the stores and retailers you love to shop at? Buy / Where helps you do that! 

Featuring a React frontend that showcases Redux for state management, functional components that make use of modern hooks, and thoughtful use of reusable components. 

Designed with the Material UI library almost exclusively, delivering a clean aesthetic, responsiveness on all devices and improved accessibility.

Data is managed by a Rails API backend hosted on Heroku, that handles model relationships and keeps the data logic separate from the front end. 

### Routes

https://buy-where.herokuapp.com/api/v1/auth_check - Get request to custom route in Sessions controller to set the CSRF-Token every time App.js component mounts, storing in state, and able to send back with every request.

https://buy-where.herokuapp.com/api/v1/current_user -  Get request to custom route in Users controller to keep a signed-in user logged in, even on page refresh.

https://buy-where.herokuapp.com/api/v1/signup -  POST request to Users controller create action to save a new user to the database.

https://buy-where.herokuapp.com/api/v1/login - POST request to Sessions controller create action to set a session ID for an existing user.

https://buy-where.herokuapp.com/api/v1/logout - DELETE request to the Sessions controller destroy action, deleting the signed-in user's session, logging them out.

https://buy-where.herokuapp.com/api/v1/user_stores/${id} - GET request to custom route in Stores controller to fetch only a specific user's array of stores.

https://buy-where.herokuapp.com/api/v1/stores - POST request to Stores controller create action to add a new store object to the database.

https://buy-where.herokuapp.com/api/v1/stores/${id} - DELETE request to Stores controller destroy action to delete a specific store from the database.

https://buy-where.herokuapp.com/api/v1/user_items/${id} - GET request to custom route in Items controller to fetch only a specific user's array of items.

https://buy-where.herokuapp.com/api/v1/items - POST request to Items controller create action to add a new item object to the database.

https://buy-where.herokuapp.com/api/v1/items/${item.itemId} - PATCH request to Items controller update action to change a item's "complete" status to true or false.

https://buy-where.herokuapp.com/api/v1/items/${id} - DELETE request to Items controller destroy action to delte a specific item from the database.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Rails

https://github.com/jamesncox/what-where-api

Buy / Where Rails API features my first custom rake task, to clean up guest users with a single rake command.

https://github.com/jamesncox/what-where-api/blob/master/lib/tasks/delete_guest_users.rake

Just run "rake delete_guest_users" and all the frontend randomly generated guest users, stores and items will be deleted from the database.