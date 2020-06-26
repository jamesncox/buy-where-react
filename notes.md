# TO DO 

[] Figure out how to close a form once it's successfully submitted (to database) and be able to re-open immediately

[] Add a "close" icon to each form so user can manually close it

[x] Pre-populate the edit forms with the data props, and a user can edit it

[x] Better background for "home / my stores" page

[x] Change opacity on all the new/edit forms

[x] Add loading/spinner to user Sign In / Sign Up like I did with creating/editing stores/items

[x] Create an edit/delete component that gets opened when clicking on a specefic item
    [x] Create Edit Item component, working correctly. 
        [x] Add isEditItemOpen/Closed actions/reducers to only open one component
    [x] Create Delete Item functionality.

[x] Create delete store functionatlity / probably just refactor the EditStore component to include a delete button.

[x] When store is updated, not automatically rendering to the DOM. Need a reducer action to handle this.
    (refer to Memes vs Gifs delete actions/reducer for Gifs/Memes to see how specific item was removed)
    GOT IT! Used a .map to update the specific store's properties / replacing old array

[x] Error message isn't rendering when a store is incorrectly updated. Add error component to edit form!


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