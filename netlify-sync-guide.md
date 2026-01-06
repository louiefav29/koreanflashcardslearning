# Netlify + Supabase Integration Guide

## Setup Instructions

### 1. Database Setup

1. Go to your Supabase dashboard: `https://fdexmgdusliozhxnsovy.supabase.co`
2. Navigate to **SQL Editor**
3. Run the schema from `supabase/schema.sql`
4. This creates tables for users, flashcards, progress, and analytics

### 2. Netlify Environment Variables

1. Go to your Netlify dashboard: `https://app.netlify.com`
2. Select your `koreanflashcardslearning` site
3. Go to **Site settings** → **Build & deploy** → **Environment**
4. Add these variables:

```
VITE_SUPABASE_URL=https://fdexmgdusliozhxnsovy.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkZXhtZ2R1c2xpb3poeG5zb3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MzE5MzEsImV4cCI6MjA4MzMwNzkzMX0.XMQTUGmwEEragSKemiKHkcnHvYRXBHFPXRy_3lLH2Fo
```

### 3. Update Your App

1. Add Supabase client to your `index.html`:

```html
<script src="js/supabase-client.js"></script>
```

2. Initialize Supabase in your main script:

```javascript
// In your main initialization code
await window.supabaseClient.initialize();
```

### 4. Authentication Flow

- **Sign Up**: Creates user in Supabase Auth + user profile
- **Sign In**: Authenticates and loads user data
- **Progress Tracking**: All study data saved to Supabase

### 5. Data Sync Features

- ✅ User profiles and preferences
- ✅ Flashcard progress and scheduling
- ✅ Study session analytics
- ✅ Daily statistics
- ✅ Cross-device synchronization

### 6. Benefits

- **Persistent Data**: User progress saved across devices
- **Real-time Sync**: Instant updates across sessions
- **Offline Support**: Local storage + sync when online
- **Analytics**: Detailed learning insights
- **Scalability**: Handles unlimited users

### 7. Testing the Integration

1. Deploy updated code to Netlify
2. Test user registration/login
3. Verify progress is saved after studying
4. Check data appears in Supabase dashboard

### 8. Monitoring

- **Supabase Dashboard**: Monitor database usage
- **Netlify Analytics**: Track app performance
- **Error Logs**: Debug integration issues

## Files Added

- `supabase/schema.sql` - Database structure
- `js/supabase-client.js` - Supabase integration
- `supabase/config.toml` - Configuration

Your Korean Flashcards Learning app now has full backend integration!
