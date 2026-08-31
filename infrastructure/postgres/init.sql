-- Initialize Database Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- Note: pgvector extension can be enabled if using pgvector image
-- CREATE EXTENSION IF NOT EXISTS "vector";
