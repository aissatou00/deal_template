from .baseModel import BaseModel
from app.config.database import Database
from bson.objectid import ObjectId
import datetime

class Deal(BaseModel):

    def __init__(self):
        self.db = Database()
        self.collection = self.getModel("deals")

    def getModel(self, name):
        return self.db.get_collection(name)

    def create(self, data):
        data["createdAt"] = datetime.datetime.utcnow()
        return self.collection.insert_one(data).inserted_id

    def get_all(self, filter={}):
        return list(self.collection.find(filter))

    def get_by_id(self, obj_id):
        return self.collection.find_one({"_id": ObjectId(obj_id)})

    def update(self, obj_id, data):
        return self.collection.update_one(
            {"_id": ObjectId(obj_id)},
            {"$set": data}
        )

    def delete(self, obj_id):
        return self.collection.delete_one({"_id": ObjectId(obj_id)})