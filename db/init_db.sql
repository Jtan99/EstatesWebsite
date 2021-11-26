CREATE TABLE Users(
	`userid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(60),
	`email` VARCHAR(60),
	`password` VARCHAR(60),
	`full_name` VARCHAR(60),
	`role` VARCHAR(60),
	PRIMARY KEY (`userid`)
);

INSERT INTO Users(username, email, password, full_name, role) VALUES("admin", "admin@hotmail.com", "admin", "admin user", "admin");

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;
