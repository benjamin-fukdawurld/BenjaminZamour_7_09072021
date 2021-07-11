CREATE TABLE Post (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId SMALLINT UNSIGNED NOT NULL,
    title VARCHAR(50) NOT NULL,
    mediaUrl VARCHAR(255),
    tags VARCHAR(100),
    description TEXT,
    publishDate DATE NOT NULL,
    lastModificationDate DATE,
    FOREIGN KEY (userId) REFERENCES User(id)
) ENGINE = INNODB;