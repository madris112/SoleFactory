# SoleFactory: A one stop solution to all your business needs 🛒
![sole](https://user-images.githubusercontent.com/54909147/120067871-75938c80-c09b-11eb-835d-0688b0b8c1f9.jpg)

With the onset of a huge pandemic many people and small-scale businesses across the globe had to face various problems. Small scale shopkeepers were hit very badly by the pandemic due to **shortage of many products** and **uncontrolled spikes in prices** of various goods by local wholesale distributors and holders. The meagre profit generated was not enough to sustain such expensive business, which led many local businesses to come to a complete halt. 

All of this was happening when many people were losing their jobs and the poor were not able to afford food. Simultaneously, large quantities of food were thrown in waste on a *daily basis*.

We propose a solution to both the problems with our platform, **SoleFactory**!

## Features🏷️
- **Wholesale goods from companies all over India**: Add some exotic products to your local shop by browsing thorugh our *large catalog of products* originating from every corner of India!
- **Reasonable and competitive prices**: Tired of arbitrary price fluctuations due to your local wholeseller? Not anymore! Buy products *directly from producers* at stable and competitive prices.
- **List of bestsellers**: Look at what others are buying and improve your catalog by adding rare products to your local shop
- **Discounted prices for near expiry goods**: Instead of letting goods expire and go to waste, we offer heavy discounts on goods that are about to expire!  
- **Support for NGO's**: We plan to extend our support to NGO's for social welfare. Depending upon the reach and working capability of an NGO, some **coins will be provided** on a monthly basis to NGO's which they can use to buy products from our platform!
- **More profits for you**: Increase your profit margin by **cutting the nuisance created by the middlemen** and get the best offers on your goods!

## Technology used🖥
- **MongoDB**: Database used in our backend
- **node.js**: Evented I/O for the backend
- **Express**: Node.js routing framework
- **Mongoose**: Connecting mongo server with node.js
- **ReactJS**: Enhanced frontend
- **React-Bootstrap**: Responsive and dynamic website
... and many more frameworks!

## Run on your local machine️👨‍💻
🔴**NOTE**: The project is developed and tested on *Ubuntu* and we recommend the same. Few areas of code might break on other operating systems.

### Step 1 
Clone this git repository using
```bash
git clone https://github.com/madris112/SoleFactory.git
```
in terminal.

### Step 2
Download and install mongoDB on your local machine from the official [website](https://www.mongodb.com/)
After installation, start the mongoDB server on your machine according to instruction on the official website.

### Step 3
Open a terminal and go to `SoleFactory/Backend` and then run
```bash
npm install
npm start
```
The backend server should now start with the console logging
```bash
Server started on port:4000
MongoDB Connection Succeeded.
```
If the startup fails, try to save a file from the backend. This should reload the server and the server should now start.

### Step 4
Open another terminal and go to `SoleFactory/frontend` and then run
```bash
npm install
npm start
```
Frontend should now start on port 3000 and your browser should open up, redirecting you to the login screen!
To understand how the platform works and how to interact with the platform, go to our guide.

## Future Aim and Possibilities⌛
- Addition of **location based bestselling products**, so that shopkeepers can buy trending products in their area
- A proper set of **rules and policies** on how NGO's will be awarded coins
- Addition of **deep learning frameworks** to analyse the user's choices and recommend products accordingly
- Formation of **graphs and statistics** for various products over time, so that shopkeepers can analyse what is best for them to buy at that time

## Bugs🐞
Some bugs may have gone undeteced under our radar📡
Make sure to report these issues on the github repository!

## The Team🤝
Made with 💕 by **BitPredators**
- Madhur Malpani Maheshwari
- Srajan Khandelwal
- Sushant Sinha
- Tanishq Malu
