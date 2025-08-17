-- Core tables
CREATE TABLE IF NOT EXISTS tasks(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dataset TEXT NOT NULL,
  template TEXT,
  prompt TEXT,
  status TEXT NOT NULL DEFAULT 'Queued',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS artifacts(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,          -- 'table' | 'figure'
  ref_id TEXT NOT NULL,        -- 'T1', 'F1', etc.
  title TEXT NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reports(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
  markdown TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Datasets
CREATE TABLE IF NOT EXISTS titanic_passengers(
  pclass INT, survived INT, name TEXT, sex TEXT, age REAL,
  sibsp INT, parch INT, ticket TEXT, fare REAL, cabin TEXT, embarked TEXT
);

CREATE TABLE IF NOT EXISTS wine_quality_red(
  fixed_acidity REAL, volatile_acidity REAL, citric_acid REAL, residual_sugar REAL,
  chlorides REAL, free_sulfur_dioxide REAL, total_sulfur_dioxide REAL, density REAL,
  pH REAL, sulphates REAL, alcohol REAL, quality INT
);

CREATE TABLE IF NOT EXISTS wine_quality_white(
  fixed_acidity REAL, volatile_acidity REAL, citric_acid REAL, residual_sugar REAL,
  chlorides REAL, free_sulfur_dioxide REAL, total_sulfur_dioxide REAL, density REAL,
  pH REAL, sulphates REAL, alcohol REAL, quality INT
);
