-- Backfills invoice client_* snapshot fields from the linked clients row.
--
-- Context: the Invoices.ts beforeChange hook used `typeof data.client === 'string'`
-- to extract the client ID. Postgres relationship IDs come through as numbers,
-- so the check fell through to `.id` on a number, returning undefined, and the
-- subsequent findByID/copy block was skipped. Result: any invoice created
-- through the admin on Postgres with a client selection saved empty
-- client_name / client_address / client_city / client_email / client_ice.
--
-- This migration repairs every affected invoice by joining the snapshot
-- fields back from the linked clients row, without overwriting anything
-- the user may have edited manually.

UPDATE invoices AS i
   SET client_name    = COALESCE(NULLIF(i.client_name, ''),    c.name,    ''),
       client_address = COALESCE(NULLIF(i.client_address, ''), c.address, ''),
       client_city    = COALESCE(NULLIF(i.client_city, ''),    c.city,    ''),
       client_email   = COALESCE(NULLIF(i.client_email, ''),   c.email,   ''),
       client_ice     = COALESCE(NULLIF(i.client_ice, ''),     c.ice,     '')
  FROM clients AS c
 WHERE i.client_id = c.id
   AND (
        i.client_name    IS NULL OR i.client_name    = '' OR
        i.client_address IS NULL OR i.client_address = '' OR
        i.client_city    IS NULL OR i.client_city    = '' OR
        i.client_email   IS NULL OR i.client_email   = '' OR
        i.client_ice     IS NULL OR i.client_ice     = ''
   );
