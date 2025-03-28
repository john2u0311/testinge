ALTER TABLE video_ideas
ADD COLUMN age_group VARCHAR(20),
ADD COLUMN story_theme VARCHAR(100),
ADD COLUMN educational_value TEXT,
ADD COLUMN moral_lesson TEXT;

ADD COLUMN last_attempt TIMESTAMP DEFAULT NULL,
ADD COLUMN processing_time BIGINT DEFAULT 0,
ADD COLUMN retry_count INTEGER DEFAULT 0,
ADD COLUMN error_message TEXT DEFAULT NULL,
ADD COLUMN processing_status TEXT DEFAULT NULL,
ADD COLUMN api_response_logs JSONB DEFAULT NULL,
ADD COLUMN last_successful_step TEXT DEFAULT NULL,
ADD COLUMN total_tokens_used INTEGER DEFAULT 0;

CREATE INDEX idx_video_ideas_status ON video_ideas(status);
CREATE INDEX idx_video_ideas_created_at ON video_ideas(created_at);