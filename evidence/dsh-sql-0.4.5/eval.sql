-- dsh-sql 标准测评任务库（可重建）
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, city TEXT);
CREATE TABLE orders (id INTEGER PRIMARY KEY, user_id INTEGER, amount REAL, created_at TEXT);
INSERT INTO users VALUES (1,'Alice','Shanghai'),(2,'Bob','Beijing'),(3,'Cara','Shenzhen'),(4,'Dan','Beijing'),(5,'Eve','Shanghai');
INSERT INTO orders VALUES (1,1,100,'2026-10-01'),(2,1,50,'2026-10-02'),(3,2,300,'2026-10-03'),(4,3,80,'2026-10-04'),(5,4,120,'2026-10-05'),(6,5,200,'2026-10-06'),(7,2,30,'2026-10-07'),(8,1,70,'2026-10-08');
