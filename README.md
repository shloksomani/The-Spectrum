# The Spectrum

This website helps users to see the whole spectrum of any global story by classifying which articles and news agencies are known to be biased.

## Table of contents

- [Requirements](#Requirements)
- [Installation](#Installation)
- [Specification](#Specification)
- [Deployment](#Deployment)
- [Technology used](#Technology-used)
- [Idea](#Idea)
- [Story](#Story)
- [License](#License)

### Requirements

- Node 10 or up
- A URL for MongoDb database or your local Database

### Installation

Clone the repo and install the dependencies.

```
$ git clone https://github.com/csc309-fall-2019/team46.git
$ cd team46
```

```
npm install
```

After all the dependencies are installed you can start the server

If you have nodemon installed:

```
$ nodemon
```

If you wish to install nodemon globally:

```
$ npm install -g nodemon
```

Want to know the benefits of [Nodemon](https://www.npmjs.com/package/nodemon)? Visit the link

You can also run the server by:

```
$ npm start
```

And then go to:

```
http://localhost:3000/
```

Alternatively, you can use a fully-functioning version of our web-app on: http://thespectrum.herokuapp.com/

### Deployment
Our application has been deployed to Heroku. It is currently live and hosted on: http://thespectrum.herokuapp.com/

### Specification
We are using a MongoDB database to save articles and user-data. The data persists with changing sessions.

Scraping and collecting news biases is being done using a Python script. We have a MongoDB database with news articles in various collections and different biases.
To clarify, our backend will not be in python, there will just be a single python script that complements our backend.

#### User Interaction:

<strong>User signup is functional if you would like to create a new user</strong>. Alternatively, these are some pre-existing credentials.

    username: user 
    password: user

    username: user2
    password: user2

<strong>New users can sign up with the username of their choice</strong>, passwords are safely secured through hashing and salt.
When a user signs up or logs in, they will be <strong>taken to their own personal dashboard.</strong> This feature does not exist for general users.

A middleware has been added to make sure than the users profile is ONLY visible once they have logged in, and cannot be accessed any other way. They have protected paths.

The dashboard gives insights into their complete media diet. In other words, it shows a breakdown of the biases of the news they have been reading and <strong>can be filtered for variying time lengths into the past</strong>. This will help users identify if they frequent news that has strong biases or questionable sources. We record the time that a user reads an article. This allows our filter to display the correct data as well as being able to add a <strong>history page to view which articles they have read</strong>.

On the dashboard, under the breakdown of the users news diet, <strong>a user is able to enter a new url to an news article that does not currently exist on our news site. By adding a new link, our website will add this article to the news site and inform the user what the biases are</strong>.

<strong>The user can then select 'Home' or our websites title 'The Spectrum' Where they will be brought to a news aggregator</strong>. This is real news that has been scraped from different sources. Each article displays an associated image for the article, the title and summary as well as the bias of the article. <strong>The user can select a link to take them to the full article (This will add the article to the users history to calculate their media diet) or they can select the bias breakdown which brings them to an external article that explains why the article has been marked with this bias</strong>.

The menu shows an assortment of political biases as well as factual reportings. <strong>By selecting one of these, the user is brought to a new view where the news they are show has the selected bias or factual reports.</strong>

If the user is interested in seeing news on a certain topic they <strong>can use 'search' and type in the topic or topics. Then they will be routed to a page which has an assortment of news on these topics with different biases.</strong> The search results are limited to top 20 articles for efficiency and time-saving. I recommend using some keywords such as 
- 'president' 
- 'syria' 
- 'trump' 
- 'report'

However you are welcome to test out your own words and see if we have any news on it!

We can also filter search results by bias, in case a user wants to read articles with a particular bias.

It is important to note that <strong>a user remains logged in, even if they cancel out of the page. The session is preserved. They can return back to http://localhost:3000 and still be logged in until they select 'Logout'. </strong>


#### Admin Interaction:

    username: admin
    password admin

Admins have the same functionality as users with some important additional functionality. When an admin logs in they <strong> will have an admin button on the top right of their page. If they select this, they are brought to an admin only page which with a table of all existing users, user emails and the option to remove a user. If a user is removed, they will no longer be able to login as their credentials will no longer exist. </strong>

#### General Interaction:
Our website is available to everyone, even if they do not have an account or are not signed in. <strong>The news can still be searched and explored, however there is no dashboard functionality and no history tracking.</strong>


### Technology used

- HTML5/CSS3
- JavaScript
- Node.js
- Express
- Express Sessions
- EJS
- Bcrypt.js
- Passport.js
- SASS

### Idea

In this day and age, we as users are being targeted by complex algorithms that can change or build biases towards global events that are happening in real-time and change our political views in certain regards. With this web application, our aim is to inspire action and a rejection of overtly biased media. We want to return to an era of straight forward news reporting. Through our project, we are building a website that helps users to see the other side of the story and know which articles and news agencies are known to be factual and how they are biased. This will be done by displaying articles from different news outlets and matching it with the news sources known biases which can be found on https://mediabiasfactcheck.com/

### Story

We are four aspiring developers studying at University Of Toronto - Rohit Bansal, Daniel Visca, Shlok Somani and Chinmaya Nathany.
