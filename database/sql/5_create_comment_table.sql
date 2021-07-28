CREATE TABLE Comment (
  id INT NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY CHECK (id > 0),
  employee_id SMALLINT NOT NULL CHECK (employee_id > 0),
  post_id INT NOT NULL CHECK (post_id > 0),
  respond_to INT CHECK (respond_to > 0),
  publish_date TIMESTAMPTZ NOT NULL,
  last_modification_date TIMESTAMPTZ,
  text TEXT NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES Post(id) ON DELETE CASCADE,
  FOREIGN KEY (respond_to) REFERENCES Comment(id) ON DELETE CASCADE
);
