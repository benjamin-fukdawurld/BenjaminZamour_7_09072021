CREATE TABLE Post (
  id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY CHECK (id > 0),
  employee_id SMALLINT NOT NULL CHECK (employee_id > 0),
  title VARCHAR(50) NOT NULL,
  media_url VARCHAR(255),
  tags VARCHAR(100),
  description TEXT,
  publish_date TIMESTAMPTZ NOT NULL,
  last_modification_date TIMESTAMPTZ,
  FOREIGN KEY (employee_id) REFERENCES Employee(id) ON DELETE CASCADE
);
