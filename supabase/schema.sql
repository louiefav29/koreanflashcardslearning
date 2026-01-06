-- Korean Flashcards Learning Database Schema

-- Users table for authentication and progress tracking
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  total_cards_studied INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  xp_total INTEGER DEFAULT 0,
  daily_goal INTEGER DEFAULT 20,
  preferences JSONB DEFAULT '{}'
);

-- Flashcards table
CREATE TABLE flashcards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  korean TEXT NOT NULL,
  romanization TEXT,
  english TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- User progress tracking for each flashcard
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  flashcard_id UUID REFERENCES flashcards(id) ON DELETE CASCADE,
  last_reviewed TIMESTAMP WITH TIME ZONE,
  next_review TIMESTAMP WITH TIME ZONE,
  interval_days INTEGER DEFAULT 1,
  ease_factor FLOAT DEFAULT 2.5,
  review_count INTEGER DEFAULT 0,
  correct_count INTEGER DEFAULT 0,
  streak_count INTEGER DEFAULT 0,
  last_result TEXT CHECK (last_result IN ('correct', 'incorrect', 'easy', 'hard')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, flashcard_id)
);

-- Study sessions for analytics
CREATE TABLE study_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  cards_studied INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  xp_gained INTEGER DEFAULT 0,
  session_type TEXT DEFAULT 'review' CHECK (session_type IN ('review', 'new', 'mixed')),
  notes TEXT
);

-- Daily statistics
CREATE TABLE daily_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  cards_studied INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  xp_gained INTEGER DEFAULT 0,
  accuracy_rate FLOAT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own progress" ON user_progress FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own sessions" ON study_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own sessions" ON study_sessions FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own stats" ON daily_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own stats" ON daily_stats FOR ALL USING (auth.uid() = user_id);

-- Flashcards are public for reading
CREATE POLICY "Everyone can view flashcards" ON flashcards FOR SELECT USING (is_active = true);

-- Insert sample flashcards
INSERT INTO flashcards (korean, romanization, english, category, difficulty) VALUES
('안녕하세요', 'annyeonghaseyo', 'Hello', 'greetings', 1),
('감사합니다', 'gamsahamnida', 'Thank you', 'greetings', 1),
('사랑해', 'saranghae', 'I love you', 'emotions', 2),
('미안해', 'mianhae', 'Sorry', 'emotions', 1),
('학교', 'hakgyo', 'School', 'places', 1),
('집', 'jip', 'Home', 'places', 1),
('물', 'mul', 'Water', 'objects', 1),
('밥', 'bap', 'Rice/Meal', 'food', 1),
('사과', 'sagwa', 'Apple', 'food', 1),
('책', 'chaek', 'Book', 'objects', 1);
