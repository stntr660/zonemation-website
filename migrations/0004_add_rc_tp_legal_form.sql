-- Adds the RC (registre de commerce), TP (taxe professionnelle) and legal
-- form to Site Settings and to every invoice / devis.
--
-- Context: CGI art. 145 requires the RC and the TP number on invoices. They
-- were missing from the billing settings, so no invoice carried them.
-- Values come from the official documents (modèle J of 04/03/2026, TP
-- attestation of 13/03/2026): ZONEMATION SARL, capital 100 000 MAD,
-- RC 717965 Casablanca, TP 32653091.
--
-- Production has db.push disabled, so the columns are created here. The
-- existing invoices are backfilled; nothing else on them changes (number,
-- dates, amounts, verification token stay the same).

ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS billing_rc varchar;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS billing_tp_id varchar;
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS billing_legal_form varchar;

UPDATE site_settings SET billing_rc = '717965'
 WHERE billing_rc IS NULL OR billing_rc = '';
UPDATE site_settings SET billing_tp_id = '32653091'
 WHERE billing_tp_id IS NULL OR billing_tp_id = '';
UPDATE site_settings SET billing_legal_form = 'SARL au capital de 100 000 MAD'
 WHERE billing_legal_form IS NULL OR billing_legal_form = '';

ALTER TABLE invoices ADD COLUMN IF NOT EXISTS sender_rc varchar;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS sender_tp_id varchar;
ALTER TABLE invoices ADD COLUMN IF NOT EXISTS sender_legal_form varchar;

UPDATE invoices
   SET sender_rc         = COALESCE(NULLIF(sender_rc, ''),         (SELECT billing_rc FROM site_settings LIMIT 1)),
       sender_tp_id      = COALESCE(NULLIF(sender_tp_id, ''),      (SELECT billing_tp_id FROM site_settings LIMIT 1)),
       sender_legal_form = COALESCE(NULLIF(sender_legal_form, ''), (SELECT billing_legal_form FROM site_settings LIMIT 1));
