import couchdb

dbname = "historical_tweets"

if __name__ == '__main__':

    # init my couchdb
    myCouchdb = couchdb.Server("http://127.0.0.1:5984/")
    if dbname in myCouchdb:
        myDatabase = myCouchdb[dbname]
    else:
        myDatabase = myCouchdb.create(dbname)

    # init source couchdb
    sourceCouchdb = couchdb.Server("http://readonly:ween7ighai9gahR6@45.113.232.90/couchdbro/")
    sourceDatabase = sourceCouchdb["twitter"]
    mango = {
        "selector": {
            "doc.place.country": {"$eq": "Australia"}
        },
        "fields": ["id"],
        "reduce": False,
        "limit": 2
    }

    skip = 0
    limit = 50
    max = 10000

    while (skip < max):
        for item in sourceDatabase.view(name="_design/twitter/_view/summary",
                                        reduce=False, include_docs=True, limit=limit, skip=skip):
            itemJson = item["doc"]
            itemJson.pop("_id", None)
            itemJson.pop("_rev", None)

            # pre-filter
            if "place" in itemJson and itemJson["place"] is not None and itemJson["place"]["country"] is "Australia":
                myDatabase.save(itemJson)
                skip += 1