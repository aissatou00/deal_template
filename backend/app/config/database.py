from pymongo import MongoClient

class Database:
    def init(self, uri="mongodb://localhost:27017/", db_name="dealViewer"):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]

    def get_collection(self, name):
        return self.db[name]