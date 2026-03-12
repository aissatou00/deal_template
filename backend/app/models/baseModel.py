
from abc import ABC, abstractmethod

class BaseModel(ABC):

    @abstractmethod
    def getModel(self, name):
        pass

    @abstractmethod
    def create(self, data):
        pass

    @abstractmethod
    def get_all(self, filter={}):
        pass

    @abstractmethod
    def get_by_id(self, obj_id):
        pass

    @abstractmethod
    def update(self, obj_id, data):
        pass

    @abstractmethod
    def delete(self, obj_id):
        pass

