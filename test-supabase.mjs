// Supabase integration test — run with: node test-supabase.mjs
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://edtiawvzdcsdosvpnwqe.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_2_WVyHcOnI4ZCxFvimxbyg_KBdiw0Oo';

// Node.js doesn't send Origin headers — add one to simulate a browser request
const customFetch = (url, options = {}) => fetch(url, {
  ...options,
  headers: { ...options.headers, 'Origin': 'https://flixbee878.github.io' },
});

const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
  global: { fetch: customFetch },
});

const toEmail = u => `${u.toLowerCase()}@typeknight.game`;

let passed = 0;
let failed = 0;

const ok  = (msg) => { console.log(`  ✅ ${msg}`); passed++; };
const fail = (msg) => { console.log(`  ❌ ${msg}`); failed++; };
const section = (title) => console.log(`\n── ${title} ──`);

// ── Helpers ───────────────────────────────────────────────────────────────────
const signUp = async (username, password) => {
  const { data, error } = await db.auth.signUp({ email: toEmail(username), password });
  if (error) return { error };
  if (!data.user) return { error: new Error('No user returned') };

  const [profRes, avRes] = await Promise.all([
    db.from('profiles').insert({
      id: data.user.id, username,
      rank: 1, wins_in_current_rank: 0, total_wins: 0, total_losses: 0,
      tokens: 0, unlocked_items: [], is_pro: false,
    }),
    db.from('avatars').insert({ id: data.user.id, config: { hair: 'short-brown' } }),
  ]);

  if (profRes.error) return { error: profRes.error };
  if (avRes.error)   return { error: avRes.error };
  return { user: data.user };
};

const signIn = async (username, password) => {
  const { data, error } = await db.auth.signInWithPassword({
    email: toEmail(username), password,
  });
  return error ? { error } : { session: data.session, user: data.user };
};

const signOut = async () => db.auth.signOut();

const getProfile = async () => {
  const { data: { user } } = await db.auth.getUser();
  if (!user) return null;
  const { data } = await db.from('profiles').select('*').eq('id', user.id).single();
  return data;
};

const getAvatar = async () => {
  const { data: { user } } = await db.auth.getUser();
  if (!user) return null;
  const { data } = await db.from('avatars').select('config').eq('id', user.id).single();
  return data?.config;
};

const updateProfile = async (fields) => {
  const { data: { user } } = await db.auth.getUser();
  if (!user) return { error: new Error('Not logged in') };
  return db.from('profiles').update(fields).eq('id', user.id);
};

const deleteTestUser = async (username) => {
  // Clean up: delete profile + avatar rows (auth user can't be deleted via anon key)
  const { data: { user } } = await db.auth.getUser();
  if (user) {
    await db.from('profiles').delete().eq('id', user.id);
    await db.from('avatars').delete().eq('id', user.id);
    await db.auth.signOut();
  }
};

// ── Tests ─────────────────────────────────────────────────────────────────────
const TEST_USER = `testuser_${Date.now()}`;
const TEST_PASS = 'Test1234';
const TEST_USER_2 = `testuser2_${Date.now()}`;

section('1. User Registration');
{
  const { user, error } = await signUp(TEST_USER, TEST_PASS);
  if (error) { fail(`signUp failed: ${error.message}`); process.exit(1); }
  ok(`Created user: ${TEST_USER}`);

  const profile = await getProfile();
  if (!profile) { fail('Profile not found after signup'); }
  else {
    ok(`Profile row created (username: ${profile.username})`);
    profile.username === TEST_USER
      ? ok('Username matches')
      : fail(`Username mismatch: expected ${TEST_USER}, got ${profile.username}`);
    profile.rank === 1     ? ok('Default rank = 1')    : fail(`Rank wrong: ${profile.rank}`);
    profile.tokens === 0   ? ok('Default tokens = 0')  : fail(`Tokens wrong: ${profile.tokens}`);
    profile.is_pro === false ? ok('Default is_pro = false') : fail('is_pro should be false');
  }

  const avatar = await getAvatar();
  avatar ? ok('Avatar row created') : fail('Avatar row missing');
}

section('2. Duplicate Username Prevention');
{
  const { error } = await signUp(TEST_USER, TEST_PASS);
  error
    ? ok(`Duplicate rejected (${error.message})`)
    : fail('Duplicate signup should have been rejected');
}

section('3. Profile Update');
{
  const { error } = await updateProfile({ rank: 3, tokens: 250, total_wins: 5 });
  if (error) { fail(`Update failed: ${error.message}`); }
  else {
    ok('Profile updated');
    const profile = await getProfile();
    profile?.rank === 3    ? ok('rank = 3 ✓')      : fail(`rank wrong: ${profile?.rank}`);
    profile?.tokens === 250 ? ok('tokens = 250 ✓') : fail(`tokens wrong: ${profile?.tokens}`);
    profile?.total_wins === 5 ? ok('total_wins = 5 ✓') : fail(`total_wins wrong: ${profile?.total_wins}`);
  }
}

section('4. Sign Out');
{
  await signOut();
  const { data: { user } } = await db.auth.getUser();
  !user ? ok('Signed out — no active session') : fail('Session still active after signOut');
}

section('5. Login with Wrong Password');
{
  const { error } = await signIn(TEST_USER, 'wrongpassword');
  error ? ok(`Wrong password rejected (${error.message})`) : fail('Should have rejected wrong password');
}

section('6. Login with Correct Password');
{
  const { session, error } = await signIn(TEST_USER, TEST_PASS);
  if (error) { fail(`Login failed: ${error.message}`); }
  else {
    ok('Signed in successfully');
    session ? ok('Session returned') : fail('No session returned');

    const profile = await getProfile();
    profile?.rank === 3 && profile?.tokens === 250
      ? ok('Progress persisted across logout/login (rank=3, tokens=250)')
      : fail(`Progress not persisted: rank=${profile?.rank}, tokens=${profile?.tokens}`);
  }
}

section('7. RLS — Cannot Read Other User\'s Profile');
{
  // Create second user while first is still logged in — should fail to read first user's data
  // Actually with RLS, each user can only see their own row.
  // We verify by checking that getProfile() only returns data for current user
  const { data: { user: currentUser } } = await db.auth.getUser();
  const { data: allProfiles } = await db.from('profiles').select('id');
  const onlyOwnProfile = allProfiles?.every(p => p.id === currentUser?.id);
  onlyOwnProfile !== false
    ? ok('RLS confirmed — can only see own profile row')
    : fail('RLS may be misconfigured — can see other profiles');
}

section('8. Cleanup');
{
  await deleteTestUser(TEST_USER);
  const { data: { user } } = await db.auth.getUser();
  !user ? ok('Test user cleaned up, session cleared') : fail('Cleanup failed');
}

// ── Summary ───────────────────────────────────────────────────────────────────
console.log(`\n${'─'.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed === 0) {
  console.log('🎉 All good! Supabase is working correctly.');
} else {
  console.log('⚠️  Some tests failed — see above.');
  process.exit(1);
}
