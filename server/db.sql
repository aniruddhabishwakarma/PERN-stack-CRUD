-- \l to see all the database
-- \c connect to database
-- \d see the table
CREATE DATABASE registration;
CREATE TABLE people(
    user_id INT PRIMARY KEY,
    fullname VARCHAR (255) NOT NULL,
    username VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL
);
INSERT INTO people(user_id,fullname,username,password) VALUES ('1','Aniruddha','Aniruddha123','aniruddha');
UPDATE people SET fullname = 'Ram Bahadur' WHERE user_id = 3;
DELETE FROM people where user_id = 4;

