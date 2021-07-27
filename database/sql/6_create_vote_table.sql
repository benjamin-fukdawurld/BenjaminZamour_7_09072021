CREATE TABLE Vote (
    employeeId SMALLINT NOT NULL CHECK (employeeId > 0),
    postId INT CHECK (postId > 0),
    commentId INT CHECK (commentId > 0),
    value SMALLINT NOT NULL,
    PRIMARY KEY (employeeId, postId, commentId),
    FOREIGN KEY (employeeId) REFERENCES Employee(id),
    FOREIGN KEY (postId) REFERENCES Post(id),
    FOREIGN KEY (commentId) REFERENCES Comment(id)
);