# TO DO 

[] Create a better landing page for users. Description of the app. Links to login. Etc.

[] Create an edit/delete component that gets opened when clicking on a specefic item

[x] Create errors components for users/items/stores etc

[x] Figure out how to render a newly created Item immediately to the DOM (not wait for page refresh).
    I DID IT! Had to create a custom route for Rails API and add the fetch action in Items action, and 
    create a filter method to display the items stores. It works perfectly now!!!