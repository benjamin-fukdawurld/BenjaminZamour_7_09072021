CREATE TABLE Employee (
  id SMALLINT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY CHECK (id > 0),
  email VARCHAR(100) NOT NULL UNIQUE,
  login VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(150) NOT NULL,
  privilege SMALLINT NOT NULL DEFAULT 0 CHECK (privilege >= 0),
  firstName VARCHAR(50),
  lastName VARCHAR(50),
  jobTitle VARCHAR(50),
  avatarUrl VARCHAR(255),
  birthDate DATE,
  biography TEXT,
  departmentId SMALLINT CHECK (departmentId > 0),
  FOREIGN KEY (departmentId) REFERENCES Department(id)
);
