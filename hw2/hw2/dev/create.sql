CREATE TABLE BIKES(id varchar(10) not null primary key, 
name varchar(300) not null, 
wheels integer,
size integer,
motor integer CHECK (motor >= 0 AND motor <= 1),
folding integer CHECK (folding >= 0 AND folding <= 1),
image varchar(100),
available integer);

