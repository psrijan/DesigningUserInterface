from index import Index
import json

class Database():

    INDEX_DIR =  './index/'

    def __init__(self):
        self.indexer = Index(self.INDEX_DIR);
        charities = []
        with open('./dev/orgs.json') as file:
            charities = json.load(file)

        if self.indexer.is_empty(): 
            self.indexer.populate(charities, ['mission'])
    
    def get_charity(self, uuid):
        return self.indexer.get(uid=uuid)

    def search_charities(self, query_string):
        print(query_string)
        charities = self.indexer.search(query_string, 'mission') 
        print(charities)
        return charities

    def search_more_charities(self, uuid):
        charity = self.get_charity(uuid)
        charities = self.indexer.search(charity.mission, 'mission', n = 6, join = 'or', avoid = uuid)
        return charities 



if __name__ == '__main__':
    db = Database()
    ch = db.get_charity(1)
    print(repr(ch))
    ch1 = db.search_charities('great')

