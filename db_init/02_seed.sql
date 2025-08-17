-- Seed tiny sample data (for wiring/dev only)
COPY titanic_passengers FROM '/datasets/titanic_sample.csv' WITH (FORMAT csv, HEADER true);
COPY wine_quality_red FROM '/datasets/winequality-red-sample.csv' WITH (FORMAT csv, HEADER true);
COPY wine_quality_white FROM '/datasets/winequality-white-sample.csv' WITH (FORMAT csv, HEADER true);
