# TO DO 

[] Create an edit/delete component that gets opened when clicking on a specefic item

[x] Function to close the new item and new store forms when new item or store is created
    (tried creating a bunch of action creators and reducers to handle when components are open...not working right now)
    (GOT IT!!!! A combo of redux state and local in StoreTables)

[x] StoreTable columns changing size with item name. Make them sticky / set width.
    (had to give a width property to the item.name column, pushed the other columns out)

[x] Create a better landing page for users. Description of the app. Links to login. Etc.

[x] Create errors components for users/items/stores etc

[x] Figure out how to render a newly created Item immediately to the DOM (not wait for page refresh).
    I DID IT! Had to create a custom route for Rails API and add the fetch action in Items action, and 
    create a filter method to display the items stores. It works perfectly now!!!