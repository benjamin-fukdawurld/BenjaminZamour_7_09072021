CREATE TABLE Comment (
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY CHECK (id > 0),
    employeeId SMALLINT NOT NULL CHECK (employeeId > 0),
    postId INT NOT NULL CHECK (postId > 0),
    respondTo INT CHECK (respondTo > 0),
    publishDate DATE NOT NULL,
    lastModificationDate DATE,
    text TEXT NOT NULL,
    FOREIGN KEY (employeeId) REFERENCES employee(id),
    FOREIGN KEY (postId) REFERENCES Post(id),
    FOREIGN KEY (respondTo) REFERENCES Comment(id)
);