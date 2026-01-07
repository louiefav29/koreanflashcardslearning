# Deploy Korean Flashcards Learning to Supabase Hosting

## Manual Deployment Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/login to your account
3. Click "New Project"
4. Choose your organization
5. Set project name: `korean-flashcards`
6. Set database password (save it securely)
7. Choose region closest to your users
8. Click "Create new project"

### 2. Get Project Details

After project creation:

- Copy your **Project URL** (e.g., `https://xxxxxxxx.supabase.co`)
- Copy your **Anon Key** from Settings > API
- Copy your **Project Reference** (the `xxxxxxxx` part)

### 3. Deploy Static Files

#### Method A: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **Storage** section
3. Create a new bucket named `website`
4. Set bucket as **public** in settings
5. Upload all files from your project folder:
   - `index.html`
   - `login.html`, `signup.html`, `recovery.html`, `modals.html`, `tests.html`, `log.html`
   - `styles.css`
   - `manifest.json`
   - `patchNote.json`
   - `service-worker.js`
   - `js/` folder (all JavaScript files)
   - `.vscode/` folder (if needed)

#### Method B: Using Supabase CLI (if available)

```bash
# Update config.toml with your project details
supabase login
supabase link --project-ref your-project-ref
supabase db push
supabase functions deploy
```

### 4. Configure PWA Settings

1. In Storage bucket settings, set:
   - File size limit: 50MB
   - Enable image transformations
2. Update CORS settings to allow your domain

### 5. Access Your App

Your app will be available at:

```
https://fdexmgdusliozhxsnsovy.supabase.co/storage/v1/object/public/website/index.html
```

### 6. Custom Domain (Optional)

1. Go to Settings > Custom Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `manifest.json` with your custom domain

## Files to Deploy

- ✅ `index.html` - Main app
- ✅ `styles.css` - All styles
- ✅ `js/` folder - All JavaScript modules
- ✅ `manifest.json` - PWA manifest
- ✅ `service-worker.js` - PWA service worker
- ✅ `patchNote.json` - Version history
- ✅ HTML files: `login.html`, `signup.html`, `recovery.html`, `modals.html`, `tests.html`, `log.html`

## Post-Deployment Checklist

- [ ] Test all app features work correctly
- [ ] Verify PWA installation works
- [ ] Check offline functionality
- [ ] Test responsive design on mobile
- [ ] Verify all links and navigation work
- [ ] Check service worker registration

## Troubleshooting

- **404 errors**: Check file paths and ensure all files are uploaded
- **CORS issues**: Configure CORS settings in Supabase Storage
- **PWA not installing**: Verify manifest.json paths are correct
- **Service worker errors**: Check service-worker.js registration
