# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About the project

This is a simple inventory management web app where you can check list of all product
and can manage the product available in the inventory like editing the price and quantity,
deleting the product and disabling the product.

## Code conclusions

1. Data is fetched inside a file but a separate folder for APIs can be created to manage all the APIs if project grows.
2. Material UI components are used. Plain inline CSS is used which can be easily shited to app.css file.
3. Redux is implemented. Data to be displayed in KPIs as well as table is fetched from redux store. Actions and reducres are implemented.
4. Individual components for the page are splitted based on their functionality.
5. Status codes for frontend while fetching the data from API or while updating the data from redux are maintained and used inside constant folder.
