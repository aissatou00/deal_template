
from pymongo import MongoClient

class Database:

    def __init__(self):
        self.client = MongoClient("mongodb://localhost:27017/")
        self.db = self.client["deal_template"]

    def get_collection(self, name):
        return self.db[name]