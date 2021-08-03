CREATE TABLE Employee (
  id SMALLINT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY CHECK (id > 0),
  email VARCHAR(100) NOT NULL UNIQUE,
  login VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(150) NOT NULL,
  privilege SMALLINT NOT NULL DEFAULT 0 CHECK (privilege >= 0),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  job_title VARCHAR(50),
  avatar_url VARCHAR(255),
  birth_date DATE,
  biography TEXT,
  department_id SMALLINT CHECK (department_id > 0),
  FOREIGN KEY (department_id) REFERENCES Department(id) ON DELETE
  SET
    NULL
);
