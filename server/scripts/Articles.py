import newspaper
import pymongo
import imghdr
import mimetypes
import urllib3

client = pymongo.MongoClient(
    "mongodb+srv://admin:admin@cluster0-dfcfv.mongodb.net/test?retryWrites=true&w=majority")
db = client.news_articles
keyword_lookup = {}


class Articles():
    def __init__(self, news_source_url, bias, mbfc_url):
        """
        Initialization begins the scraping of articles from saved news sources
        """
        self.news_source_url = news_source_url
        self.mbfc_url = mbfc_url
        self.bias = bias
        self.biases = ["left", "left_center", "least_bias",
                       "right_center", "right", "pro_science",
                       "conspiracy_pseudoscience",
                       "questionable_sources", "satire"]

        # Collections
        self.one_collection = db.articles
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

        self.paper = newspaper.build(self.news_source_url)

        for article in self.paper.articles:

            self.article = article
            self.get_article()

    def add_article_to_db(self):
        """
        Add a document of the articles information to the database

        :return:
        """
        id = self.one_collection.insert_one(self.meta_data).inserted_id
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
        if not is_url_image(self.article.top_image):
            print(self.article.top_image)
            print("Not an image URL")
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
        meta_data["mbfc"] = self.mbfc_url
        meta_data['bias'] = self.bias

        # print(meta_data)
        self.meta_data = meta_data
        id = self.add_article_to_db()


def is_url_image(url):
    mimetype, encoding = mimetypes.guess_type(url)
    return (mimetype and mimetype.startswith('image'))


def check_url(url):
    """Returns True if the url returns a response code between 200-300,
       otherwise return False.
    """
    try:
        headers = {
            "Range": "bytes=0-10",
            "User-Agent": "MyTestAgent",
            "Accept": "*/*"
        }

        req = urllib3.Request(url, headers=headers)
        response = urllib3.urlopen(req)
        return response.code in range(200, 209)
    except Exception:
        return False


def is_image_and_ready(url):
    return is_url_image(url) and check_url(url)


if __name__ == "__main__":
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
    for key in collection:
        for tuple in collection[key]:
            Articles(tuple[0], key, tuple[1])
