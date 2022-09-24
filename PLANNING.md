# Statflix Project

**DEADLINE**: Friday Sept 20th @ 10:00 pm

This is a proof of concept, created to both practice and deminstrate my frontend development skills. This project is to be done in 5 hours increments for four nights in a row.

## Requirements

- Create a responsive dashboard accessible from both a desktop/mobile device that displays the data.
    - Examples:
        - Table of data with search, filter, sorting, and pagination
        - Graphs to help guide the user to a conclusion about the data
- Use Angular for the front-end and back-end code if necessary
- Unit Testing, Linting implemented
- Check in the code to your personal GitHub account

### Strech Goals

- Continuous Integration/Continuous Deployment features set up (CI/CD)
- Authentication implemented so that only authenticated users are capable of accessing the dashboard.

## Stories

- As Alex
    - [Done] I would like the frontend application to be an Angular application.
    - [Done] I would like the code to be tested and linted to the angular specifications.
    - [Done] I would like the code to be open source and accessable by other GitHub users.
    - [Done] [TP] I would like the application to be follow CI practices.
    - [TP] I would like the application to be continusely deployed with updates.
- As tammy
    - [Done] I would like to have my data displayed in a table.
    - [Done] I would like my structured data to be sortable in both acending and decending order.
    - [Done] I would like my structured data to be filterable.
    - [Done] I would like my structured data to be paginated.
    - [Done] I would like my structured data to be searchable.
    - [Done] I would like to have control over what columns are shown or hidden.
- As grace
    - [Done] I would like my data to be displayed as graphs
- As sam
    - [Done] [TP] I would like to have my data be secured.

*Done*:
    Indicates that the story has been completed.

*TP*:
    Indicates that this story should only be done if time permits.

### Personas

Tammy:
    Prefers data to be displayed in a table format. They like to have complete access to the set of data and then widle it down.

Grace: 
    Prefers to view data in graphs, not enough time to pick a table appart. Prefers to get directly to the point.

Sam:
    Extreamly security cautious, wants to make sure everything is as secure as possible.

Alex:
    The owner and administrator of the application, enviroment, and buisness. Wants anything and everything to be automated to reduce the number of engineers needed to complete something.

## Development Notes / Decision Log

- My thought is to create a repository that leans as much as possible on the angular framework. When given a kitchen sink, use the kicken sink unless the job calls for a bath tub (But then you should be asking why you are putting a bath tub in the kitchen). Additionally, given that limited time to create an application as flushed out as possible I am also going to rely heavily on the Angular Material library, treating their components as an external design system.
- I really want to acomplish the streach goal of incoperating GitHub Actions to do CI, but I'll have to see if there is enough time left to implement it fully.
- Angular has a companion library for implementing a UI that follows the material design principles. To help save time and energy that library is going to be used to construct the components.
- Because this is, for now, just a frontend application, husky seems like a good fit for running githooks to automatically execute linting prior to commiting. This is to shift left the checks ran on the origin server, but does not replace them.
- To consume the data in an easy way to get things rolling I created a little script (which I am including with the repo) that preprocessed the data into javascript objects within an array. This made it relatively straight forward to add to a datasource.
- I'm leaning heavily on Angular Material's datasource object to create the appearence of having data pulled in from a backend. If there is time for it I would love to add a backend API for this to call and then rewire just that part to support it thoughout the app.
- I figured I would start with the Tammy experience, given that tables are significantly easier to handle then graphs. Once the table is done and the data is loaded into the application and manipulatable graphs should become easier to implement.
- Not sure how I feel about the linter forcing the ngrx selectors to start with the word `select`, but sometimes when you are on a project you have to conform to what the team decides togeather. Given the linter configuration comes from NGRX I am not going to change it here and will act as though I've voiced my opinion but democrocy has chosen.
- I got really excited when I looked at NGRX again and found that they have flushed out their unit testing framework & documentation. <3
- Managed to add some additional unit tests to the dashboard page's datasource, found an interesting library called `jasmine-marbles` with the help of ngrx's documentation.
- Created a join pipe so `myArray.join(', ')` is not sprinkeled throughout the templates, i'm planning to move this to a shared module at some point.
- I could not resist, i've already moved the pipe into a seperate common module shortly after my last comment. Figured if there are going to be multiple "pages" needing the pipe it should be defined now in a reusable manner that results in less headacks later.
- Here soon with the implementation of sort on the table I am going to need to make a decision on the best user experience when sorting data. Should the page reset upon sort or keep the user on the page they have listed?
- I decided that upon sorting it would take the user to the first page so they are not lost in the middle of the data, mainly because I know that would drive me up a wall.
- Something I would like to do as a nice bonus is create a docker container image that VS Code can use to have as the development environment. This would make it so if someone reviewing the code pulled it down and opened it in VS Code they would have the same environment setup that I do for development, removing the need to install any extra dependencies themselves.
- I've added search via a toolbar actions component that plugs into an router outlet. I decided on making it a search on enter to reduce lag from live searching through all values in 8000+ objects. Perhaps if I have more time I will come back and add debounce + live search.
- Found a bug that if I page ahead, then search something... I need to update the state to take Tammy to the first page.
- I've found a way to address the bug. Although I am not thrilled with the solution.
- Might be random, but I want to make the login's background image randomized from a selection of photos I found on pixabay.com. Figured the theme would be moving trafic in city streets.
- Finally got around to setting up prettier
- I wired up the login page and was extreamly happy when I found that I can login with touch id on my laptop. I guess sometimes it's the little things.
- Not sure if there is issues with the CSV reader I chose or the dataset itself but I had to smooth some data out after noticing that some of the ratings had the durations in them.
- If I did this over again there would be several things I would change with the design and approch. For instance, I would probably not have put all of the data into the table's redux store and instead had some data in the app's dedicated redux store. As a result most other pages are loading the table module which is defeting the purpose of the lazy loading of the angular modules within the router.
- Managed to add a multi select to the table so that the user can select what columns are displayed.
- Did a little refactoring of the table selectors. Still not where I want them to be, but it will have to do for now.
- I just want to take some time and say thank you, both because this was a lot of fun to do and because if you've read this you've likely looked over more of this repo. You're time is valuable, and I apprichate that you gave some of it to see what I could make in 4 days with 5 hours each night. There are quite a few things I would change, but all in all I am quite proud of the progress that was able to be done in the short period of time. As an added bonus I have made sure to include some of the extra credit items in my todo list above.