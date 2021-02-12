import sqlite3

class Database:

    def __init__(self, path):
        self.conn = sqlite3.connect(path)
    
    def select(self, sql, parameters=[]):
        c = self.conn.cursor()
        c.execute(sql, parameters)
        return c.fetchall()
    
    def execute(self, sql, parameters=[]):
        c = self.conn.cursor()
        c.execute(sql, parameters)
        self.conn.commit()
    
    def get_bikes(self):
        data = self.select('SELECT * FROM bikes ORDER BY id ASC')
        data_list = [] 

        for cur_data in data:
            block = {
            'id' : cur_data[0],
            'name' : cur_data[1],
            'image' : cur_data[6],
            'available' : cur_data[7]
            }
            data_list.append(block)
        return data_list        

    def get_num_bikes(self):
        data = self.select("SELECT COUNT(*) FROM BIKES")
        return data[0][0]
    
    def update_bikes(self, uid, available):
        print("Updating " + str(uid)  + " available " + str(available))
        self.execute("UPDATE BIKES SET available=? WHERE id=?", [available, uid])

    def reset_bikes(self, num = 3):
        bike_list = self.get_bikes()
        for bike in bike_list:
            self.update_bikes(bike['id'], 3)