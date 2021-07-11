CREATE TABLE Vote (
    userId SMALLINT UNSIGNED NOT NULL,
    postId INT UNSIGNED,
    commentId INT UNSIGNED,
    value TINYINT NOT NULL,
    PRIMARY KEY (userId, postId, commentId),
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (postId) REFERENCES Post(id),
    FOREIGN KEY (commentId) REFERENCES Comment(id)
) ENGINE = INNODB