const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuration: Replace these with your actual Supabase project details
// It is recommended to use environment variables (process.env.SUPABASE_URL) in production
const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'YOUR_SUPABASE_SERVICE_ROLE_KEY';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function uploadPatchNotes() {
  const filePath = path.join(__dirname, 'patchNote.json');
  
  try {
    console.log('Reading patchNote.json...');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const patchNotes = JSON.parse(fileContent);

    console.log(`Found ${patchNotes.length} versions. Uploading to Supabase...`);

    // Upsert allows us to update existing versions or insert new ones
    const { data, error } = await supabase
      .from('patch_notes')
      .upsert(patchNotes, { onConflict: 'version' })
      .select();

    if (error) throw error;

    console.log('Upload successful!');
    console.log('Records processed:', data.length);
  } catch (err) {
    console.error('Error during upload:', err.message);
  }
}

uploadPatchNotes();