import tweepy
import couchdb
import twitter_credentials

class TwitterStreamer:
    def __init__(self):
        pass

    def stream_tweets(self):
        # Set up couchDB
        couchdb_stream_listener = CouchDBStreamListener()

        # Twitter APIs Auth
        auth = tweepy.OAuthHandler(twitter_credentials.consumer_key, twitter_credentials.consumer_secret)
        auth.set_access_token(twitter_credentials.access_token, twitter_credentials.access_token_secret)

        # api = tweepy.API(auth)
        stream = tweepy.Stream(auth, couchdb_stream_listener)
        stream.filter(locations=[144.5532, -38.2250, 145.5498, -37.5401])


class CouchDBStreamListener:
    def __init__(self):
        pass
        # dbname = "realtime_tweets"
        # self.json = tweepy.utils.import_simplejson()
        # couch_server = couchdb.Server("http://localhost:5984/")
        #
        # if dbname in couch_server:
        #     self.db = couch_server[dbname]
        # else:
        #     self.db = couch_server.create(dbname)
        #     print("Creat new db:", dbname)

    def on_data(self, data):
        print(data)
        return True
        # jdata = self.json.loads(data)
        # self.db.save(jdata)

    def on_error(self, status):
        print(status)

if __name__ == '__main__':
    twitter_streamer = TwitterStreamer()
    twitter_streamer.stream_tweets()