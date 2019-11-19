import newspaper
import pymongo
client = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0-dfcfv.mongodb.net/test?retryWrites=true&w=majority")
db = client.news_articles

class Articles():
    def __init__(self, news_source_url ,bias ):
        """
        Initialization begins the scraping of articles from saved news sources
        """

        self.biases = ["left","left_center","least_bias",
                       "right_center","right","pro_science",
                       "conspiracy_pseudoscience",
                       "questionable_sources","satire"]

        # Collections
        self.left = db.left
        self.left_center = db.left_center
        self.least_bias = db.least_bias
        self.right_center = db.right_center
        self.right = db.right
        self.pro_science = db.pro_science
        self.conspiracy_pseudoscience = db.conspiracy_pseudoscience
        self.questionable_sources = db.questionable_sources
        self.satire = db.satire

        self.update_db()

    def update_db(self):
        for tuple in self.allSources():

            self.news_source_url = tuple[0]
            self.paper = newspaper.build(self.news_source_url)
            self.bias = tuple[1]

            for article in self.paper.articles:
                print(article)
                self.article = article
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
        Given the url of an article
        :param url:
        :return:
        """
        # try to download the article
        try:
            self.article.download()
        except:
            print("couldnt download")
            return None

        # try to parse the article
        try:
            self.article.parse()
        except:
            print("couldnt parse")
            return None

        # Try to use nlp on the article
        try:
            self.article.nlp()
        except:
            print("couldnt use nlp")
            return None

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
        print(meta_data)
        self.meta_data = meta_data
        id = self.add_article_to_db()

#CBC = Articles("http://www.nbcnews.com/", "left_center")


