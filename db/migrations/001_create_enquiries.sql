-- 001_create_enquiries
-- Stores consultation enquiries from the five website flows.
-- Data minimisation: no IP address, user agent or other device data is kept here.

CREATE TABLE IF NOT EXISTS enquiries (
  id                         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code             varchar(20)  NOT NULL,
  idempotency_key            uuid         NOT NULL,
  request_hash               char(64)     NOT NULL,
  flow_type                  varchar(20)  NOT NULL,
  full_name                  varchar(100) NOT NULL,
  email                      varchar(254) NOT NULL,
  phone                      varchar(30)  NOT NULL,
  company_name               varchar(120),
  role                       varchar(80),
  interest_area              varchar(100),
  estimated_revenue          varchar(40),
  investment_budget          varchar(40),
  timeline                   varchar(60),
  target_listing_ref         varchar(50),
  message                    varchar(2000),
  privacy_consent_version    varchar(20)  NOT NULL,
  privacy_consent_timestamp  timestamptz  NOT NULL,
  nda_acknowledged           boolean      NOT NULL DEFAULT false,
  status                     varchar(20)  NOT NULL DEFAULT 'new',
  created_at                 timestamptz  NOT NULL DEFAULT now(),
  updated_at                 timestamptz  NOT NULL DEFAULT now(),

  CONSTRAINT enquiries_reference_code_key UNIQUE (reference_code),
  CONSTRAINT enquiries_idempotency_key_key UNIQUE (idempotency_key),
  CONSTRAINT enquiries_reference_code_format
    CHECK (reference_code ~ '^GV-(GEN|SELL|BUY|VAL|ADV)-[0-9A-F]{10}$'),
  CONSTRAINT enquiries_flow_type_check
    CHECK (flow_type IN ('general', 'sell-business', 'buy-business', 'valuation', 'advisory')),
  CONSTRAINT enquiries_status_check
    CHECK (status IN ('new', 'in_review', 'contacted', 'qualified', 'closed', 'spam')),
  -- Business revenue and acquisition budget are different facts and must not be mixed.
  CONSTRAINT enquiries_revenue_flow_check
    CHECK (estimated_revenue IS NULL OR flow_type IN ('sell-business', 'valuation')),
  CONSTRAINT enquiries_budget_flow_check
    CHECK (investment_budget IS NULL OR flow_type = 'buy-business'),
  CONSTRAINT enquiries_listing_flow_check
    CHECK (target_listing_ref IS NULL OR flow_type = 'buy-business')
);

CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS enquiries_status_created_at_idx ON enquiries (status, created_at DESC);

CREATE OR REPLACE FUNCTION enquiries_set_updated_at() RETURNS trigger AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enquiries_set_updated_at ON enquiries;
CREATE TRIGGER enquiries_set_updated_at
  BEFORE UPDATE ON enquiries
  FOR EACH ROW EXECUTE FUNCTION enquiries_set_updated_at();

-- Shared fixed-window rate-limit counters for serverless instances.
-- Keys are HMAC-SHA256 digests, so raw IP addresses and emails are never stored.
CREATE TABLE IF NOT EXISTS enquiry_rate_limits (
  bucket_key    char(64)    NOT NULL,
  window_start  timestamptz NOT NULL,
  hits          integer     NOT NULL DEFAULT 1,
  PRIMARY KEY (bucket_key, window_start)
);

CREATE INDEX IF NOT EXISTS enquiry_rate_limits_window_idx ON enquiry_rate_limits (window_start);
