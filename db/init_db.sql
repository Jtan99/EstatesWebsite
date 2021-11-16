CREATE TABLE User(
	`uid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(60),
	`email` VARCHAR(60),
	`password` VARCHAR(60)
	`full_name` VARCHAR(120),
	`phone_number` VARCHAR(60)
	PRIMARY KEY (`uid`)
);

INSERT INTO User(first_name, last_name, email, phone_number, notes) VALUES("user1", "user1@hotmail.com", "user1", "user1 test" "123-456-7890");
INSERT INTO User(first_name, last_name, email, phone_number, notes) VALUES("user2", "user2@hotmail.com", "user2", "user2 test", "987-654-3210");

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
