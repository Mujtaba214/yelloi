-- lib/db/schema.sql

CREATE TABLE visitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT UNIQUE NOT NULL,
  user_agent TEXT,
  ip_address TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  first_visit TIMESTAMP DEFAULT NOW(),
  last_visit TIMESTAMP DEFAULT NOW(),
  visit_count INT DEFAULT 1
);

CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id TEXT REFERENCES visitors(visitor_id),
  page_url TEXT NOT NULL,
  referrer TEXT,
  session_id TEXT,
  time_spent INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE image_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id TEXT NOT NULL,
  visitor_id TEXT REFERENCES visitors(visitor_id),
  session_id TEXT,
  view_duration INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE image_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_id TEXT NOT NULL,
  visitor_id TEXT REFERENCES visitors(visitor_id),
  interaction_type TEXT CHECK (interaction_type IN ('like', 'dislike', 'download', 'share')),
  session_id TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE daily_analytics (
  date DATE PRIMARY KEY,
  total_visitors INT DEFAULT 0,
  total_page_views INT DEFAULT 0,
  total_image_views INT DEFAULT 0,
  total_likes INT DEFAULT 0,
  total_downloads INT DEFAULT 0,
  total_shares INT DEFAULT 0,
  avg_session_duration INT DEFAULT 0
);

CREATE INDEX idx_page_views_visitor ON page_views(visitor_id);
CREATE INDEX idx_page_views_created ON page_views(created_at);
CREATE INDEX idx_image_views_image ON image_views(image_id);
CREATE INDEX idx_image_interactions_image ON image_interactions(image_id);
CREATE INDEX idx_image_interactions_type ON image_interactions(interaction_type);