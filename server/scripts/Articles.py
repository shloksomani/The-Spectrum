import newspaper
import pymongo
# this connectes to MongoDB server. It creates a database called "news_articles"
client = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0-dfcfv.mongodb.net/test?retryWrites=true&w=majority")
db = client.news_articles

"""
When articles is initialized it accepts a dictionary where the key is the bias, and the value is a list of tuples. 
The tuple holds the url to a news site, and the url to the media bias fact checker site.
At initialization, Articles starts scraping the news sites and updating the database.
"""
class Articles():
    def __init__(self, news_source_url ,bias, mbfc_url ):
        """
        Initialization begins the scraping of articles from saved news sources
        """
        self.mbfc_url = mbfc_url
        
        self.biases = ["left","left_center","least_bias",
                       "right_center","right","pro_science",
                       "conspiracy_pseudoscience",
                       "questionable_sources","satire"]

        # Creates Collections in the database for each bias
        self.left = db.left
        self.left_center = db.left_center
        self.least_bias = db.least_bias
        self.right_center = db.right_center
        self.right = db.right
        self.pro_science = db.pro_science
        self.conspiracy_pseudoscience = db.conspiracy_pseudoscience
        self.questionable_sources = db.questionable_sources
        self.satire = db.satire

        # Scrape urls and add to database
        self.update_db()

    def update_db(self):
        # tuple looks like ("https://www.foxnews.com/", "right_bias")
        for tuple in self.allSources:

            self.news_source_url = tuple[0]
            self.paper = newspaper.build(self.news_source_url)
            self.bias = tuple[1]

            # For every article in the news site
            for article in self.paper.articles:
                print(article)
                self.article = article
                # scrape the article
                self.get_article()

    def add_article_to_db(self):
        """
        Add a document of the articles information to the database

        :return:
        """
        if self.bias == "left_center":
            id = self.left_center.insert_one(self.meta_data).inserted_id
            return id
        if self.bias == "left":
            id = self.left.insert_one(self.meta_data).inserted_id
            return id
        if self.bias == "least_bias":
            id = self.least_bias.insert_one(self.meta_data).inserted_id
            return id
        if self.bias == "right_center":
            id = self.right_center.insert_one(self.meta_data).inserted_id
            return id
        if self.bias == "pro_science":
            id = self.pro_science.insert_one(self.meta_data).inserted_id
            return id
        if self.bias == "conspiracy_pseudoscience":
            id = self.conspiracy_pseudoscience.insert_one(self.meta_data).inserted_id
            return id
        if self.bias == "questionable_sources":
            id = self.questionable_sources.insert_one(self.meta_data).inserted_id
            return id
        if self.bias == "satire":
            id = self.satire.insert_one(self.meta_data).inserted_id
            return id

    def get_news_sources(self):
        db = client.news_sources
        cursor = db.sites.find({})
        self.allSources = []
        for doc in cursor:
            self.allSources.append((doc.url, doc.bias))

    def add_news_source(self, url, bias):
        db = client.news_sources
        db.sites.insert_one({
            "url": url,
            "bias": bias
        })

    def get_article(self):
        """
        Given the url of an article scrape it.
        Uses newspaper to scrape and get information on the article
        :param url:
        :return:
        """
        # try to download the article
        try:
            self.article.download()
        except:
            print("couldnt download")
            return None

        # try to parse the article (break article into text, author, title, etc...)
        try:
            self.article.parse()
        except:
            print("couldnt parse")
            return None

        # Try to use nlp on the article (gets keywords)
        try:
            self.article.nlp()
        except:
            print("couldnt use nlp")
            return None

        # create a "document" that will be added to the database. This is essentiall JSON format of all the 
        # information on one article 
        # {
        # title: "blabla",
        # authors: [bla, bla],
        # etc...
        #  }
        meta_data = {}

        meta_data["title"] = self.article.title
        meta_data["authors"] = self.article.authors
        meta_data["text"] = self.article.text
        if self.article.summary == '':
            return None
        meta_data["summary"] = self.article.summary
        meta_data["published"] = self.article.publish_date
        meta_data["keywords"] = self.article.keywords
        meta_data["top_image"] = self.article.top_image
        meta_data['url'] = self.article.url
        meta_data['brand'] = self.paper.brand
        meta_data["mbfc"] = self.mbfc_url

        print(meta_data)
        self.meta_data = meta_data
        id = self.add_article_to_db()

#CBC = Articles("http://www.nbcnews.com/", "left_center")


if __name__ == "__main__":
    # When this file is run, pass in this information. to Articles. This is hardcoded right now but will be called from
    # an API soon.
    collection = {
        "left_bias": [
            ("https://cnn.com", "https://mediabiasfactcheck.com/cnn/"),
            ("https://www.cosmopolitan.com",
             "https://mediabiasfactcheck.com/cosmopolitan/"),
            ("https://www.huffingtonpost.com",
             "https://mediabiasfactcheck.com/huffington-post/")
        ],

        "left_center_bias": [
            ("https://news.yahoo.com",
             "https://mediabiasfactcheck.com/yahoo-news/"),
            ("https://news.google.com/",
             "https://mediabiasfactcheck.com/google-news/"),
            ("http://www.nbcnews.com/",
             "https://mediabiasfactcheck.com/nbc-news/")
        ],
        "least_bias": [
            ("https://www.economist.com/",
             "https://mediabiasfactcheck.com/the-economist/"),
            ("https://bigthink.com/", "https://mediabiasfactcheck.com/big-think/"),
            ("https://www.ctvnews.ca/",
             "https://mediabiasfactcheck.com/ctv-news/"),
        ],
        "right_center_bias": [
            ("http://gazette.com/",
             "https://mediabiasfactcheck.com/colorado-springs-gazette/"),
            ("https://www.nationalaffairs.com",
             "https://mediabiasfactcheck.com/national-affairs-magazine/"),
            ("https://www.wsj.com/",
             "https://mediabiasfactcheck.com/wall-street-journal/"),
        ],
        "right_bias": [
            ("https://www.foxnews.com/",
             "https://mediabiasfactcheck.com/fox-news/"),
            ("http://ussanews.com", "https://mediabiasfactcheck.com/ussa-news/"),
            ("https://www.thesun.co.uk/",
             "https://mediabiasfactcheck.com/the-sun/"),

        ],
        "pro_science": [
            ("https://www.nationalgeographic.com",
             "https://mediabiasfactcheck.com/national-geographic/"),
            ("http://www.howstuffworks.com/",
             "https://mediabiasfactcheck.com/howstuffworks/"),
            ("http://www.climatecentral.org/",
             "https://mediabiasfactcheck.com/climate-central/"),
        ],
        "questionable_sources": [
            ("https://www.breitbart.com/",
             "https://mediabiasfactcheck.com/breitbart/"),
            ("http://canadafreepress.com/",
             "https://mediabiasfactcheck.com/canada-free-press/"),
            ("https://bipartisanreport.com",
             "https://mediabiasfactcheck.com/bipartisan-report/"),
        ]
    }
    # for each news site, call an instance of Article and start the process of crawling, scraping and adding to the database
    for key in collection:
        for tuple in collection["key"]:
            Article(tuple[0] ,key, tuple[1])
