-- Adds sender_fiscal_id column added in commit 154c9c3
-- (feat(invoices): add IF fiscal ID field).
-- Production has db.push disabled, so this column is missing in the live DB
-- and SELECTs from the invoices collection 500 in the admin and REST API.

ALTER TABLE invoices ADD COLUMN IF NOT EXISTS sender_fiscal_id varchar;
