CREATE TABLE Post (
    id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY CHECK (id > 0),
    employeeId SMALLINT NOT NULL CHECK (employeeId > 0),
    title VARCHAR(50) NOT NULL,
    mediaUrl VARCHAR(255),
    tags VARCHAR(100),
    description TEXT,
    publishDate DATE NOT NULL,
    lastModificationDate DATE,
    FOREIGN KEY (employeeId) REFERENCES Employee(id)
);