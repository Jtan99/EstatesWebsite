CREATE TABLE Users(
	`userid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(60) NOT NULL,
	`email` VARCHAR(60) NOT NULL,
	`password` VARCHAR(60) NOT NULL,
	`full_name` VARCHAR(60) NOT NULL,
	`role` VARCHAR(60) NOT NULL,
	PRIMARY KEY (`userid`)
);


CREATE TABLE building(
  `buildingid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
  `bathrooms` INT NOT NULL,
  `bedrooms` INT NOT NULL,
  `floor_space` INT NULL,
  `building_type` VARCHAR(60) NULL,
  `storeys` INT NULL,
  `appliances` VARCHAR(200) NULL,
  PRIMARY KEY (`buildingid`)
);

CREATE TABLE property(
  `propertyid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
  `property_age` INT NULL,
  `annual_property_tax` DECIMAL(9,2) NULL,
  `parking_type` VARCHAR(60) NULL,
  `amenities` VARCHAR(200) NULL,
  PRIMARY KEY (`propertyid`)
);

CREATE TABLE location(
  `locationid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(60) NOT NULL,
  `province_state` VARCHAR(60) NOT NULL,
  `address` VARCHAR(60) NOT NULL,
  `postal_code` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`locationid`)
);

CREATE TABLE listing(
	`listingid` SMALLINT(6) NOT NULL AUTO_INCREMENT,
	`buildingid` SMALLINT(6) NOT NULL DEFAULT 1,
	`propertyid` SMALLINT(6) NOT NULL DEFAULT 1,
	`locationid` SMALLINT(6) NOT NULL DEFAULT 1,
	`title` VARCHAR(200) NOT NULL,
	`price` INT NOT NULL,
	`listing_type` VARCHAR(60) NOT NULL,
	`description` VARCHAR(2000) NULL,
	PRIMARY KEY (`listingid`),
	FOREIGN KEY (`buildingid`) REFERENCES building(`buildingid`),
	FOREIGN KEY (`propertyid`) REFERENCES property(`propertyid`),
	FOREIGN KEY (`locationid`) REFERENCES location(`locationid`)
);

INSERT INTO Users(username, email, password, full_name, role) VALUES("admin", "admin@hotmail.com", "admin", "admin user", "admin");

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
