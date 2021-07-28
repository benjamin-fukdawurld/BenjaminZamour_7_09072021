CREATE OR REPLACE FUNCTION publishDateTrigger_function()
RETURNS TRIGGER AS $$
BEGIN
  NEW.publish_date = NOW();
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER publishDateTrigger
BEFORE INSERT ON post
FOR EACH ROW
EXECUTE PROCEDURE publishDateTrigger_function();

CREATE TRIGGER publishDateTrigger
BEFORE INSERT ON comment
FOR EACH ROW
EXECUTE PROCEDURE publishDateTrigger_function();

CREATE OR REPLACE FUNCTION lastModificationDateTrigger_function()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_modification_date = NOW();
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER lastModificationDateTrigger
BEFORE UPDATE ON post
FOR EACH ROW
EXECUTE PROCEDURE lastModificationDateTrigger_function();

CREATE TRIGGER lastModificationDateTrigger
BEFORE UPDATE ON comment
FOR EACH ROW
EXECUTE PROCEDURE lastModificationDateTrigger_function();
