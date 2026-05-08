-- Seeds the IF (Identifiant Fiscal) field across Site Settings + invoices.
--
-- Context: commit 154c9c3 added a fiscalId field to the Site Settings billing
-- group with default 71837803. With db.push disabled in production, neither
-- the site_settings.billing_fiscal_id column nor the per-invoice
-- sender_fiscal_id value was ever populated. The latter was added in 0001;
-- this migration handles the former, seeds the value, and backfills existing
-- invoices.

-- 1. Make sure the global column exists (idempotent).
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS billing_fiscal_id varchar;

-- 2. Seed the default value on the global row when missing.
UPDATE site_settings
   SET billing_fiscal_id = '71837803'
 WHERE billing_fiscal_id IS NULL
    OR billing_fiscal_id = '';

-- 3. Backfill existing invoices with the company's fiscal ID so the PDF
--    footer renders the IF instead of an em dash.
UPDATE invoices
   SET sender_fiscal_id = (SELECT billing_fiscal_id FROM site_settings LIMIT 1)
 WHERE sender_fiscal_id IS NULL
    OR sender_fiscal_id = '';
