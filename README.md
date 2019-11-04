# The Spectrum

This website helps users to see the whole spectrum of any global story by classifying which articles and news agencies are known to be biased.

## Table of content

- [Requirements](#Requirements)
- [Installation](#Installation)
- Specification
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

Want to know the benefits of [Nodemon](https://www.npmjs.com/package/nodemon) visit the link

You can also run the server by:

```
$ npm start
```

And then go to:

```
http://localhost:3000/
```

### Specification
#### User Interaction:
- username: user1
- password: user1

New users can sign up with the username of their choice, passwords are safely secured through hashing and salt.
When a user signs up or logs in, they will be taken to their own personal dashboard. This feature does not exist for general users.

A middleware has been added to make sure than the users profile is ONLY visible once they have logged in, and cannot be accessed any other way. They have protected paths.

The dashboard gives insights into your complete media diet. In other words, it shows a breakdown of the biases of the news they have been reading and can be filtered for variying time lengths into the past. This will help users identify if they frequent news that has strong biases or questionable sources.

On the dashboard, under the breakdown of the users news diet, a user is able to enter a new url to an news article that does not currently exist on our news site. By adding a new link, our website will add this article to the news site and inform the user what the biases are. This requires backend functionality and web scraping so we are currently just saving the url in a json and saving which user submitted it.

The user can then select 'Home' or our websites title 'The Spectrum' Where they will br brought to a news agragator. This is real news that has been scraped from different sources. For the purpose of phase1, we have stored several articles in a json file and are using it as dummy data. Each article displays an associated image for the article, the title and summary as well as the bias of the article. The user can select a link to take them to the full article (This will add the article to the users history to calculate their media diet) or they can select the bias breakdown which brings them to an external article that explains why the article has been marked with this bias.

The menu shows an assortment of political biases as well as factual reportings. By selecting one of these, the user is brought to a new view where the news they are show has the selected bias or factual reports.

If the user is interested in seeing news on a certain topic they can use 'search' and type in the topic or topics. Then they will be routed to a page which has an assortment of news on these topics with different biases. Because we are using hard coded data the search results are limited. I recommend using some keywords such as 'president', 'syria', 'trump', 'report'. However you are welcome to test out your own words and see if we have any news on it!

It is important to note that a user remains logged in, even if they cancel out of the page. The session is preserved. They can return back to http://localhost:3000 and still be logged in until they select 'Logout'. 


#### Admin Interaction:

- username: admin
- password admin

Admins have the same functionality as users with some important additional functionality. When an admin logs in they will have an admin button on the top right of their page. If they select this, they are brought to an admin only page which with a table of all existing users, user emails and the option to remove a user. If a user is removed, they will no longer be able to login as their credentials will no longer exist.

#### General Interction:
Our website is available to everyone, even if they do not have an account or are not signed in. The news can still be searched and explored, however there is no dashboard functionality and no history tracking.


### Technology used

- Node.js
- Express
- Express Sessions
- EJS
- Bcrypt.js
- Passport.js
- SASS

### Acknowledge

Et exercitation aute et reprehenderit. Officia adipisicing in commodo sunt exercitation culpa sint sint non. Fugiat Lorem consequat laborum voluptate ea magna consectetur minim consectetur.Laborum consequat veniam duis qui officia est elit tempor laborum in. Consectetur occaecat consectetur minim eiusmod Lorem enim anim cupidatat esse in. Sunt adipisicing tempor consequat incididunt consectetur dolore elit enim velit excepteur incididunt. Ea culpa consectetur dolore culpa fugiat ullamco.

### Idea

In this day and age, we as users are being targeted by complex algorithms that can change or build biases towards global events that are happening in real-time and change our political views in certain regards. With this web application, our aim is to inspire action and a rejection of overtly biased media. We want to return to an era of straight forward news reporting. Through our project, we are building a website that helps users to see the other side of the story and know which articles and news agencies are known to be factual and how they are biased. This will be done by displaying articles from different news outlets and matching it with the news sources known biases which can be found on https://mediabiasfactcheck.com/

### Story

We are four aspiring developers studying at University Of Toronto - Rohit Bansal, Daniel Visca, Shlok Somani and Chinmaya Nathany. We designed this website in hopes .......
...........
Magna officia irure cillum velit esse. Non mollit est pariatur et ullamco duis exercitation eiusmod pariatur Lorem. Eiusmod enim nisi sit laborum aliquip voluptate consectetur id occaecat enim. Minim occaecat ea eu officia ad do eu reprehenderit incididunt nostrud cillum pariatur minim nisi. Aliqua in sint nulla amet ea sint mollit officia. Laborum ea ex esse exercitation mollit irure reprehenderit consectetur excepteur aliqua nisi irure occaecat laborum. Est eu labore ut do laboris dolor amet.

### License

Basic MIT thing
