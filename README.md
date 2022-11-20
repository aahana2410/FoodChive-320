# Foodchive
## Implemented Features
- For FoodChive’s beta release, we were not able to fully implement all the features that we had planned, however, we were still able to build out many of the important aspects of the system in addition to a solid architecture that will allow us to be more efficient in developing later on. As of now we currently have:
- Routing between different pages
- A discovery page that is able to fetch recipes and display one at a time (temporarily only showing the first recipe fetched)
- A general feed page that displays all available recipes
- A search bar in the general feed page that allows the user to sort through recipes
- A saving functionality that allows users to save recipes from the general feed page
- A saved recipes page, which allows users to view their previously saved recipes
- A delete functionality that allows users to delete recipes from the saved recipes page

## Missing Features
- Due to unexpected complexity of implementing some of the aforementioned features as well as taking some time to refactor our codebase, we were not able to implement all of the planned features. These features include:
- A functioning filter system
- Account logins
- Adding dietary restrictions
- Updating dietary restrictions

## How to Install and Run the Software
In the zipped beta release, we have provided a folder named ‘FoodChive-320-deployment’. This folder contains the code that we are using to host the web app. In order to host it locally, there are a few steps that you must follow. First, decompress the folder and open it with an IDE of your choice. Make sure you have Node.js installed (found here: https://nodejs.org/en/). 

### Development Environment
To start, in the server directory, create a .env file. Open the file and add the following code:
**Contact one of the team members for the link to the database**

Navigate to the client folder and create another .env file in the client directory. Open the file and add the following code:
NODE_ENV="development"

Next, open up the terminal and run the following commands from the root directory of the repository:

```console
cd .\server\

npm install 

npm start

```

After, open a second terminal and run the following commands:

```console
cd .\client\

npm install

npm start
```


npm install is used to install all the necessary packages for the build. After this, the app should be in development mode. Open http://localhost:3000 to view it in your browser. The page will reload when you make changes. You may also see temporary lint errors in the console.

### Front Page URL
The app is being hosted remotely and can be accessed here: https://foodchive.onrender.com/. 

### Which Command are Working
All the previously mentioned commands in regards to installing and running the software should be working, and there are no related issues that we are aware of.

### A list of any known issues
We are not aware of any known issues regarding building and running the app, however we do have a list of bugs documented on our JIRA board, which we go into more detail on further down in the document.

## Bug Tracking
Description of Tools
Currently, our bug tracking system uses three tools: Google Forms, Zapier, and Jira. Google Forms is an easy way to fill out information about the reported bug. Zapier connects this form directly to our team's Jira board to create an issue. This issue has a description of the bug, as well as a due date and priority level which can be set. The status of the bug is tracked from it needing to be done to a finished state. 

## Directions
The bug tracking system is within our team’s Jira board. Since our Jira plan requires us to have at most 10 people on the board, the client must request access by emailing one of our members (rjcai@umass.edu). To find the bug dashboard, navigate to the FoodChive software project and go to the Backlog section under Planning in Jira. All filed bugs can be found underneath the Backlog. The bugs can be examined based on name and are to be organized based on priority level. To see more information, the bug can be selected to view a description of the issue, the due date (if decided), priority level, and who the issue is assigned to. The status can also be seen. To file a bug, the Google Form (found <a href="https://docs.google.com/forms/d/e/1FAIpQLSfzwa4ZXh1r9lum_oauGXypcubzs3NjYhWT2sWud0ZYK-8GNQ/viewform?usp=sf_link">here<a>) must be filled out. It requires three things: a summary, description, and priority level. This information will be directly connected to Jira. Once a bug has been filed, it gets assigned to one of the developers for further review.

## Use
Throughout the development process, our team has run into various issues or bugs. As they have risen, the issues have been logged into our tracking system. From there, depending on the size of the issue, developers have assigned and fixed the bugs themselves, or requested further help from the rest of the team. The tracking system itself has been helpful in understanding how certain issues have occurred and their status. 
