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

    def serialize(self, doc):
        if not doc:
            return doc
        doc = dict(doc)  
        doc["_id"] = str(doc["_id"])
        if "createdAt" in doc:
            doc["createdAt"] = doc["createdAt"].isoformat()
        return doc

    def serialize_list(self, docs):
        return [self.serialize(d) for d in docs]

   
    def create(self, data):
        data["createdAt"] = datetime.datetime.utcnow()
        inserted_id = self.collection.insert_one(data).inserted_id
        data["_id"] = str(inserted_id)
        return data

    def get_all(self, filter={}):
        docs = list(self.collection.find(filter))
        return self.serialize_list(docs)

    def get_by_id(self, obj_id):
        doc = self.collection.find_one({"_id": ObjectId(obj_id)})
        return self.serialize(doc)

    def update(self, obj_id, data):
        self.collection.update_one({"_id": ObjectId(obj_id)}, {"$set": data})
        return self.get_by_id(obj_id)

    def delete(self, obj_id):
        result = self.collection.delete_one({"_id": ObjectId(obj_id)})
        return {"deleted_count": result.deleted_count}