CREATE TABLE user(
	`uid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(60),
	`email` VARCHAR(60),
	`password` VARCHAR(60),
	`full_name` VARCHAR(120),
	`phone_number` VARCHAR(60),
	PRIMARY KEY (`uid`)
);

CREATE TABLE listing(
	`listingid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(200) NOT NULL,
	`price` INT NOT NULL,
	`listing_type` VARCHAR(45) NOT NULL,
	`description` VARCHAR(2000),
	PRIMARY KEY (`listingid`)
);

INSERT INTO user(uid, username, email, password, full_name, phone_number) VALUES(1, "user1", "user1@hotmail.com", "pw1", "user1 test" "123-456-7890");
INSERT INTO user(uid, username, email, password, full_name, phone_number) VALUES(2, "user2", "user2@hotmail.com", "pw2", , "user2 test", "987-654-3210");

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
