import tweepy
import couchdb
import twitter_credentials

dbname = "realtime_tweets"

class TwitterStreamer:
    def __init__(self):
        pass

    def stream_tweets(self):
        # Set up couchDB
        couchdb_stream_listener = CouchDBStreamListener()

        # Twitter APIs Auth
        auth = tweepy.OAuthHandler(twitter_credentials.consumer_key, twitter_credentials.consumer_secret)
        auth.set_access_token(twitter_credentials.access_token, twitter_credentials.access_token_secret)

        api = tweepy.API(auth, wait_on_rate_limit=True)
        stream = tweepy.Stream(auth=api.auth, listener=couchdb_stream_listener)
        stream.filter(locations=[113.155, -43.644, 153.637, -10.689])


class CouchDBStreamListener(tweepy.StreamListener):
    def __init__(self):
        pass
        self.json = tweepy.utils.import_simplejson()
        couch_server = couchdb.Server("http://127.0.0.1:5984/")

        if dbname in couch_server:
            self.db = couch_server[dbname]
        else:
            self.db = couch_server.create(dbname)

    def on_data(self, data):
        jdata = self.json.loads(data)
        print(data)
        self.db.save(jdata)

    def on_error(self, status):
        print(status)

if __name__ == '__main__':
    twitter_streamer = TwitterStreamer()
    twitter_streamer.stream_tweets()
