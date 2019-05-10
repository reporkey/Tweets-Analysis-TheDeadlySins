import couchdb

dbname = "historical_tweets_melb"
# cities = ["adelaide", "melbourne", "sydney", "canberra", "brisbane", "hobart", "perth"]
cities = ["melbourne"]
years = [[2017,1,1, 2017,12,31]
         ]
# [2014,1,1, 2014,12,31],
#          [2015,1,1, 2015,12,31],
#          [2016,1,1, 2016,12,31],

# [2018,1,1, 2018,12,31]

if __name__ == '__main__':
    # init my couchdb
    myCouchdb = couchdb.Server("http://127.0.0.1:5984/")
    myDatabase = None
    if dbname in myCouchdb:
        myDatabase = myCouchdb[dbname]
    else:
        myDatabase = myCouchdb.create(dbname)

    # init source couchdb
    sourceCouchdb = couchdb.Server("http://readonly:ween7ighai9gahR6@45.113.232.90/couchdbro/")
    sourceDatabase = sourceCouchdb["twitter"]

    for city in cities:
        for year in years:
            print(city, year)
            skip = 0
            limit = 50
            count = 0
            max = 10000
            noMore = False
            while (count < max):
                noMore = False
                for item in sourceDatabase.view(name="_design/twitter/_view/summary", reduce=False, include_docs=True,
                                                limit=limit, skip=skip, start_key=[city, year[0], year[1], year[2]],
                                                end_key=[city, year[3], year[4], year[5]]):
                    itemJson = item["doc"]
                    itemJson.pop("_id", None)
                    itemJson.pop("_rev", None)

                    # pre-filter
                    if "place" in itemJson and itemJson["place"] is not None:
                        myDatabase.save(itemJson)
                        count += 1
                    noMore = True
                if noMore is False:
                    break
                skip += limit

