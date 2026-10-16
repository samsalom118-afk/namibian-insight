'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { ArrowUpRight, BookOpen, Check, ChevronLeft, ChevronRight, ExternalLink, FileImage, Globe2, Instagram, Mail, Menu, Moon, Newspaper, Plus, Send, ShieldCheck, Sun, Trash2, UploadCloud, UserRound, X, LogIn, LogOut, Pencil, Search, Sparkles } from 'lucide-react';

const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  : null;

const categories = [
  { name: 'National', slug: 'national', kicker: 'At home' },
  { name: 'International', slug: 'international', kicker: 'Beyond borders' },
  { name: 'Sports', slug: 'sports', kicker: 'The scoreboard' },
  { name: 'Entertainment & Lifestyle', slug: 'entertainment', kicker: 'Arts & culture' },
  { name: 'Fashion & Styling', slug: 'fashion', kicker: 'Personal expression' }
];

const demoSeeds = [
  ['National','Campus conversations put student voices in focus','A demo feature about the everyday experiences and ideas shaping student life.','photo-1523050854058-8df90110c9f1'],
  ['National','Community storytellers bring local issues into view','A demo feature on the people and projects connecting neighbourhoods.','photo-1511632765486-a01980e01a18'],
  ['National','Youth-led ideas imagine a more connected Namibia','A demo feature on student initiative, creativity and civic participation.','photo-1521737711867-e3b97375f902'],
  ['National','Inside the conversations shaping campus life','A demo feature prepared to preview the national news layout.','photo-1523580494863-6f3031224c94'],
  ['International','Southern African voices look toward shared opportunity','A demo feature on regional connection, learning and collaboration.','photo-1489493585363-d69421e0edd3'],
  ['International','Young people rethink how the world stays connected','A demo feature about global communities and digital culture.','photo-1451187580459-43490279c0fa'],
  ['International','Across borders, culture keeps communities in conversation','A demo feature prepared to preview international coverage.','photo-1529107386315-e1a2ed48a620'],
  ['International','A changing world through an African lens','A demo feature about broad global themes and their local relevance.','photo-1470770841072-f978cf4d019e'],
  ['Sports','Campus teams build momentum through teamwork','A demo sports feature about preparation, competition and belonging.','photo-1461896836934-ffe607ba8211'],
  ['Sports','The discipline behind every personal best','A demo sports feature for the student sport section.','photo-1517649763962-0c623066013b'],
  ['Sports','Local sport creates room for the next generation','A demo feature about participation, coaching and ambition.','photo-1521412644187-c49fa049e84d'],
  ['Sports','More than a match: sport brings campus together','A demo sports feature prepared for layout preview.','photo-1508098682722-e99c43a406b2'],
  ['Entertainment & Lifestyle','Local creativity finds new ways to tell familiar stories','A demo culture feature about art, film, music and community.','photo-1492684223066-81342ee5ff30'],
  ['Entertainment & Lifestyle','The soundtracks that shape a generation','A demo feature prepared for the entertainment and lifestyle page.','photo-1516280440614-37939bbacd81'],
  ['Entertainment & Lifestyle','Behind the scenes with emerging creatives','A demo feature celebrating creative practice and collaboration.','photo-1514525253161-7a46d19cd819'],
  ['Entertainment & Lifestyle','Everyday rituals, wellbeing and a sense of belonging','A demo lifestyle feature for editorial layout preview.','photo-1517248135467-4c7edcad34c4'],
  ['Fashion & Styling','Street style makes personal identity visible','A demo fashion feature on individuality, colour and confidence.','photo-1529139574466-a303027c1d8b'],
  ['Fashion & Styling','Second-hand finds, fresh looks and thoughtful choices','A demo feature on thrifting and considered personal style.','photo-1490481651871-ab68de25d43d'],
  ['Fashion & Styling','Meet the students shaping a look of their own','A demo fashion profile for layout preview.','photo-1483985988355-763728e1935b'],
  ['Fashion & Styling','The small details that make an outfit feel personal','A demo styling feature about accessories, layering and expression.','photo-1485968579580-b6d095142e6e']
];

const demoStories = demoSeeds.map((s, i) => ({
  id: 'demo-' + (i + 1), category: s[0], slug: 'demo-story-' + (i + 1),
  title: s[1], excerpt: s[2], author: 'Insight Desk', published_at: '2026-10-' + String(16 - (i % 12)).padStart(2, '0'),
  image_url: 'https://images.unsplash.com/' + s[3] + '?auto=format&fit=crop&w=1400&q=82',
  image_credit: 'Demo image — replace with the exact Question 1 image and credit',
  body: 'DEMO COPY — replace this article with the exact story your group used in Question 1 before submitting the website.\n\nKeep paragraphs brief for mobile readers. Add clear subheadings, bold key terms where useful, and credit the original image creator. Verify all names, dates, quotations and figures before publication.',
  featured: i === 0 || i === 4, published: true
}));

const blankForm = { title: '', category: 'National', excerpt: '', body: '', author: '', image_url: '', image_credit: '', featured: false, published: true };
const slugify = (s) => (s || 'story').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70);
const dateLabel = (d) => { try { return new Intl.DateTimeFormat('en-NA', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(d)); } catch { return 'Latest edition'; } };
const localStories = () => { try { const s = JSON.parse(localStorage.getItem('ni-stories') || 'null'); return Array.isArray(s) && s.length ? s : demoStories; } catch { return demoStories; } };

function StoryCard({ story, onOpen, compact = false }) {
  return <article className={'story-card ' + (compact ? 'story-compact' : '')}>
    <button className="story-image image-zoom" onClick={() => onOpen(story)} aria-label={'Read ' + story.title}>
      {story.image_url ? <img src={story.image_url} alt={story.title} loading="lazy" /> : <span className="image-fallback"><Newspaper size={38}/></span>}
      <span className="image-label">{story.category}</span>
    </button>
    <div className="story-card-copy"><div className="meta-line">{dateLabel(story.published_at || story.created_at || '2026-10-16')} <span>·</span> {story.author || 'Insight Desk'}</div>
      <button className="story-title" onClick={() => onOpen(story)}>{story.title}</button>
      <p>{story.excerpt}</p>
      <button className="read-link" onClick={() => onOpen(story)}>Read story <ArrowUpRight size={15}/></button>
    </div>
  </article>;
}

export default function Home() {
  const [stories, setStories] = useState(demoStories);
  const [view, setView] = useState('home');
  const [activeStory, setActiveStory] = useState(null);
  const [slide, setSlide] = useState(0);
  const [dark, setDark] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [loginMessage, setLoginMessage] = useState('');
  const [editorMessage, setEditorMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [imageFile, setImageFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [contact, setContact] = useState({ name: '', email: '', topic: 'Story idea', message: '' });
  const [contactStatus, setContactStatus] = useState('');
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    try { setDark(localStorage.getItem('ni-theme') === 'dark'); } catch {}
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
    let authSub;
    async function init() {
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        setSession(data?.session || null);
        const { data: auth } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
        authSub = auth?.subscription;
        const { data: remote } = await supabase.from('stories').select('*').eq('published', true).order('published_at', { ascending: false });
        if (remote?.length) setStories(remote);
        else setStories(demoStories);
      } else {
        const local = localStories(); setStories(local);
        try { setMessages(JSON.parse(localStorage.getItem('ni-messages') || '[]')); } catch {}
      }
      setLoading(false);
    }
    init();
    return () => authSub?.unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('ni-theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);

  const featured = useMemo(() => {
    const picks = stories.filter(s => s.featured && s.published !== false);
    return picks.length ? picks : stories.filter(s => s.published !== false);
  }, [stories]);
  const hero = featured[(slide % Math.max(featured.length, 1))] || demoStories[0];
  const visibleStories = useMemo(() => stories.filter(s => s.published !== false && (s.title + ' ' + s.excerpt + ' ' + s.category).toLowerCase().includes(searchTerm.toLowerCase())), [stories, searchTerm]);
  const currentCategory = categories.find(c => c.slug === view);
  const setPage = (page) => { setView(page); setActiveStory(null); setMobileMenu(false); setSearchTerm(''); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const openStory = (story) => { setActiveStory(story); setView('story'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const persistLocalStories = (next) => { setStories(next); try { localStorage.setItem('ni-stories', JSON.stringify(next)); } catch {} };

  async function signIn(e) {
    e.preventDefault(); setLoginMessage('Signing in…');
    if (!supabase) { setLoginMessage('Supabase is not configured. Local preview editing is available below.'); return; }
    const { error } = await supabase.auth.signInWithPassword(login);
    setLoginMessage(error ? error.message : 'Signed in.'); 
  }
  async function signOut() { if (supabase) await supabase.auth.signOut(); setSession(null); setPage('home'); }

  async function saveStory(e) {
    e.preventDefault(); setBusy(true); setEditorMessage('');
    try {
      let image_url = form.image_url;
      let image_path = form.image_path || null;
      if (imageFile) {
        if (supabase && session) {
          const path = Date.now() + '-' + slugify(imageFile.name);
          const { error: upErr } = await supabase.storage.from('story-images').upload(path, imageFile, { upsert: true, contentType: imageFile.type });
          if (upErr) throw upErr;
          image_path = path;
          image_url = supabase.storage.from('story-images').getPublicUrl(path).data.publicUrl;
        } else {
          image_url = await new Promise((resolve, reject) => { const r = new FileReader(); r.onload = () => resolve(r.result); r.onerror = reject; r.readAsDataURL(imageFile); });
          image_path = null;
        }
      }
      const row = { ...form, title: form.title.trim(), slug: slugify(form.title), image_url, image_path: image_path || null, author: form.author.trim() || 'Insight Desk', published_at: new Date().toISOString() };
      if (supabase) {
        if (!session) throw new Error('Please sign in to publish stories.');
        const result = editingId
          ? await supabase.from('stories').update(row).eq('id', editingId).select().single()
          : await supabase.from('stories').insert(row).select().single();
        if (result.error) throw result.error;
        const { data: remote } = await supabase.from('stories').select('*').eq('published', true).order('published_at', { ascending: false });
        setStories(remote || []);
      } else {
        let next;
        if (editingId) next = stories.map(s => s.id === editingId ? { ...row, id: editingId } : s);
        else next = [{ ...row, id: 'local-' + Date.now(), published: form.published }, ...stories];
        persistLocalStories(next);
      }
      setForm(blankForm); setImageFile(null); setEditingId(null); setEditorMessage('Story saved. Check the public view before sharing it.'); 
    } catch (err) { setEditorMessage(err.message || 'Could not save this story. Check Supabase configuration and policies.'); }
    finally { setBusy(false); }
  }

  async function deleteStory(story) {
    if (!confirm('Delete "' + story.title + '"? This cannot be undone.')) return;
    setEditorMessage('');
    try {
      if (supabase) {
        if (!session) throw new Error('Sign in to manage published stories.');
        if (story.image_path) await supabase.storage.from('story-images').remove([story.image_path]);
        const { error } = await supabase.from('stories').delete().eq('id', story.id);
        if (error) throw error;
        const { data } = await supabase.from('stories').select('*').eq('published', true).order('published_at', { ascending: false });
        setStories(data || []);
      } else persistLocalStories(stories.filter(s => s.id !== story.id));
      setEditorMessage('Story deleted.');
    } catch (err) { setEditorMessage(err.message || 'Could not delete story.'); }
  }

  async function removeImage(story) {
    try {
      if (supabase) {
        if (!session) throw new Error('Sign in to manage images.');
        if (story.image_path) await supabase.storage.from('story-images').remove([story.image_path]);
        const { error } = await supabase.from('stories').update({ image_url: null, image_path: null }).eq('id', story.id);
        if (error) throw error;
        setStories(stories.map(s => s.id === story.id ? { ...s, image_url: null, image_path: null } : s));
      } else {
        persistLocalStories(stories.map(s => s.id === story.id ? { ...s, image_url: '', image_path: null } : s));
      }
      setEditorMessage('Story image removed.');
    } catch (err) { setEditorMessage(err.message || 'Could not remove image.'); }
  }

  async function startEdit(story) {
    setEditingId(story.id);
    setForm({ ...blankForm, ...story });
    setImageFile(null);
    setEditorMessage('Editing: ' + story.title);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function submitContact(e) {
    e.preventDefault(); setBusy(true); setContactStatus('');
    try {
      if (supabase) {
        const { error } = await supabase.from('contact_messages').insert(contact);
        if (error) throw error;
      } else {
        const next = [{ ...contact, id: 'msg-' + Date.now(), created_at: new Date().toISOString() }, ...messages];
        setMessages(next); setSentCount(n => n + 1);
        try { localStorage.setItem('ni-messages', JSON.stringify(next)); } catch {}
      }
      setContact({ name: '', email: '', topic: 'Story idea', message: '' });
      setContactStatus('Thank you — your message has been recorded for the newsroom.');
    } catch (err) { setContactStatus(err.message || 'Could not send the message. Please try again.'); }
    finally { setBusy(false); }
  }

  async function loadMessages() {
    if (supabase && session) {
      const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
      if (!error) setMessages(data || []);
      else setEditorMessage(error.message);
    } else {
      try { setMessages(JSON.parse(localStorage.getItem('ni-messages') || '[]')); } catch {}
    }
  }
  async function deleteMessage(message) {
    try {
      if (supabase) {
        if (!session) throw new Error('Sign in to manage messages.');
        const { error } = await supabase.from('contact_messages').delete().eq('id', message.id);
        if (error) throw error;
      }
      const next = messages.filter(m => m.id !== message.id); setMessages(next);
      try { localStorage.setItem('ni-messages', JSON.stringify(next)); } catch {}
      setEditorMessage('Message deleted.');
    } catch (err) { setEditorMessage(err.message || 'Could not delete message.'); }
  }

  return <main className={dark ? 'app dark-app' : 'app'}>
    <div className="topline"><span><Sparkles size={12}/> Independent student journalism</span><span>Namibia · Southern Africa · The world</span></div>
    <header className="site-header">
      <button className="brand" onClick={() => setPage('home')} aria-label="Namibian Insight home"><span className="brand-mark"><Newspaper size={23}/></span><span><strong>Namibian <i>Insight</i></strong><small>Stories that move us.</small></span></button>
      <nav className={mobileMenu ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
        <button className={view === 'home' ? 'nav-active' : ''} onClick={() => setPage('home')}>Home</button>
        {categories.map(c => <button key={c.slug} className={view === c.slug ? 'nav-active' : ''} onClick={() => setPage(c.slug)}>{c.name === 'Entertainment & Lifestyle' ? 'Culture' : c.name === 'Fashion & Styling' ? 'Style' : c.name}</button>)}
        <button className={view === 'contact' ? 'nav-active' : ''} onClick={() => setPage('contact')}>Contact</button>
      </nav>
      <div className="header-actions"><button className="icon-btn theme-button" aria-label="Toggle dark theme" onClick={() => setDark(!dark)}>{dark ? <Sun size={18}/> : <Moon size={18}/>}</button><button className="editor-button" onClick={() => { setPage('admin'); loadMessages(); }}><ShieldCheck size={15}/> Newsroom</button><button className="icon-btn mobile-toggle" aria-label="Toggle menu" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={19}/> : <Menu size={19}/>}</button></div>
    </header>

    {view === 'home' && <>
      <section className="hero-wrap page-wrap">
        <div className="section-overline"><span><Sparkles size={13}/> THE DIGITAL EDITION</span><span>Vol. 01 / October 2026</span></div>
        <div className="hero-grid">
          <div className="hero-feature">
            <img src={hero.image_url} alt={hero.title} />
            <div className="hero-shade"></div>
            <div className="hero-copy"><div className="hero-meta"><span className="pill-rust">EDITOR'S PICK · DEMO</span><span>{hero.category}</span></div><h1>{hero.title}</h1><p>{hero.excerpt}</p><div className="hero-bottom"><button className="cream-btn" onClick={() => openStory(hero)}>Explore the story <ArrowUpRight size={16}/></button><div className="dots">{featured.map((s,i) => <button key={s.id} aria-label={'Show feature ' + (i + 1)} className={slide === i ? 'dot dot-active' : 'dot'} onClick={() => setSlide(i)}/>)}</div></div><span className="hero-count">0{(slide % Math.max(featured.length,1)) + 1} / 0{featured.length}</span></div>
          </div>
          <div className="hero-side"><div className="welcome-card"><span className="eyebrow">WELCOME TO THE CONVERSATION</span><h2>A closer look at the stories shaping us.</h2><p>Namibian Insight brings together campus voices, national developments, global perspectives and the culture moving our communities forward.</p><button className="text-link" onClick={() => setPage('contact')}>Send us a story idea <ArrowUpRight size={15}/></button></div><div className="category-card"><div className="row-between"><span className="eyebrow">INSIDE THIS EDITION</span><ArrowUpRight size={17}/></div><div className="category-mini-grid">{categories.map((c,i)=><button key={c.slug} onClick={() => setPage(c.slug)}><small>0{i+1}</small><strong>{c.name}</strong><ArrowUpRight size={15}/></button>)}</div></div></div>
        </div>
      </section>
      <div className="promise-strip"><div><b>OUR PROMISE</b><span>Local perspective</span><i>✳</i><span>Curious reporting</span><i>✳</i><span>Culture worth celebrating</span><i>✳</i><span>Stories with context</span></div></div>
      <section className="page-wrap latest-section"><div className="section-heading"><div><span className="eyebrow">STAY INFORMED</span><h2>The latest stories<span>.</span></h2></div><button className="text-link" onClick={() => setPage('national')}>Explore all coverage <ArrowUpRight size={15}/></button></div><div className="story-grid">{visibleStories.filter(s => s.id !== hero.id).slice(0,6).map(s => <StoryCard key={s.id} story={s} onOpen={openStory}/>)}</div></section>
      <section className="page-wrap coverage-section"><div className="coverage-banner"><span className="eyebrow">YOUR VOICE BELONGS HERE</span><h2>Have a story worth sharing?</h2><p>Tell us what is happening on campus, in your community or in the creative scene. Our newsroom wants to hear from you.</p><button className="cream-btn" onClick={() => setPage('contact')}>Reach the newsroom <ArrowUpRight size={16}/></button><div className="orbit orbit-one"/><div className="orbit orbit-two"/></div></section>
      <section className="page-wrap team-section"><div className="team-panel"><span className="eyebrow">MEET THE TEAM</span><h2>The people behind the stories.</h2><p>Replace these placeholders with every group member’s full name and student number before submitting.</p><div className="team-grid">{[1,2,3,4,5,6].map(n=><div key={n}><small>TEAM 0{n}</small><strong>Member {n} · Full name</strong><span>Student number: Add number</span></div>)}</div></div></section>
    </>}

    {currentCategory && <section className="page-wrap category-page"><div className="category-hero"><span className="eyebrow">{currentCategory.kicker}</span><h1>{currentCategory.name}<span>.</span></h1><p>Reporting, perspectives and stories selected for our readers. Demo drafts must be replaced with your group’s approved Question 1 content.</p><div className="search-box"><Search size={17}/><input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} placeholder={'Search ' + currentCategory.name.toLowerCase() + ' stories'}/></div></div><div className="category-results-head"><strong>{visibleStories.filter(s => s.category === currentCategory.name).length} stories</strong><span>Latest edition · Demo content</span></div><div className="story-grid">{visibleStories.filter(s => s.category === currentCategory.name).map(s=><StoryCard key={s.id} story={s} onOpen={openStory}/>)}</div></section>}

    {view === 'story' && activeStory && <section className="page-wrap article-page"><button className="back-link" onClick={() => setPage(categories.find(c => c.name === activeStory.category)?.slug || 'home')}><ChevronLeft size={16}/> Back to {activeStory.category}</button><div className="article-head"><span className="eyebrow">{activeStory.category} · DEMO DRAFT</span><h1>{activeStory.title}</h1><p className="article-deck">{activeStory.excerpt}</p><div className="article-byline"><UserRound size={17}/><span>{activeStory.author || 'Insight Desk'}</span><i>·</i><span>{dateLabel(activeStory.published_at || activeStory.created_at)}</span></div></div>{activeStory.image_url && <figure className="article-image"><img src={activeStory.image_url} alt={activeStory.title}/><figcaption>{activeStory.image_credit || 'Image credit: add original creator / source'}</figcaption></figure>}<div className="article-body"><p className="article-warning">EDITORIAL PLACEHOLDER: Replace this draft with the exact story used in Question 1.</p>{(activeStory.body || '').split('\n').filter(Boolean).map((p,i)=><p key={i}>{p}</p>)}<div className="article-credit"><BookOpen size={17}/><span>Image credit: {activeStory.image_credit || 'Please add credit before publication.'}</span></div></div><button className="back-link" onClick={() => setPage('home')}><ChevronLeft size={16}/> Return to the front page</button></section>}

    {view === 'contact' && <section className="page-wrap contact-page"><div className="contact-intro"><span className="eyebrow">CONTACT THE NEWSROOM</span><h1>Every good story starts with a conversation<span>.</span></h1><p>Send a news tip, propose a feature, share feedback or tell us about something happening in your community. We welcome thoughtful ideas and respectful conversation.</p><div className="contact-info"><div><span><Mail size={18}/></span><div><strong>Email the editorial team</strong><p>Add your group’s official email address before publishing.</p></div></div><div><span><Globe2 size={18}/></span><div><strong>Our perspective</strong><p>Namibia · Southern Africa · The world</p></div></div><div><span><Instagram size={18}/></span><div><strong>Follow the conversation</strong><p>Add working links to your group’s official social pages.</p></div></div></div><div className="editorial-credits"><span className="eyebrow">EDITORIAL CREDITS</span><p>Editor-in-chief: Add name · News editor: Add name · Digital editor: Add name · Photography: credit original creators.</p></div></div><form className="contact-form" onSubmit={submitContact}><span className="eyebrow">WRITE TO US</span><h2>What’s on your mind?</h2><div className="form-row"><label>Your name<input required value={contact.name} onChange={e=>setContact({...contact,name:e.target.value})} placeholder="Name and surname"/></label><label>Email address<input required type="email" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})} placeholder="you@example.com"/></label></div><label>What are you contacting us about?<select value={contact.topic} onChange={e=>setContact({...contact,topic:e.target.value})}><option>Story idea</option><option>News tip</option><option>Feedback</option><option>Photo submission</option><option>Correction request</option><option>Other</option></select></label><label>Your message<textarea required minLength={10} rows={6} value={contact.message} onChange={e=>setContact({...contact,message:e.target.value})} placeholder="Tell us a little more…"/></label><button className="submit-btn" disabled={busy}>{busy ? 'Sending…' : 'Send to the newsroom'} <Send size={16}/></button>{contactStatus && <p role="status" className="status-message">{contactStatus}</p>}<small className="fine-print">Avoid sending confidential or sensitive personal information. Connect Supabase to receive messages centrally.</small></form></section>}

    {view === 'admin' && <section className="page-wrap admin-page"><div className="admin-heading"><div><span className="eyebrow">THE NEWSROOM</span><h1>Editorial studio<span>.</span></h1><p>Publish stories, manage images and review messages from readers.</p></div><span className="admin-chip"><ShieldCheck size={15}/>{supabase ? (session ? 'Authenticated editor' : 'Editor sign-in required') : 'Local preview mode'}</span></div>
      {supabase && !session ? <form className="login-panel" onSubmit={signIn}><span className="eyebrow">EDITOR ACCESS</span><h2>Sign in to your newsroom</h2><p>Use an editor account created in Supabase Authentication.</p><label>Email<input required type="email" value={login.email} onChange={e=>setLogin({...login,email:e.target.value})}/></label><label>Password<input required type="password" value={login.password} onChange={e=>setLogin({...login,password:e.target.value})}/></label><button className="submit-btn">Sign in <LogIn size={16}/></button>{loginMessage && <p role="status">{loginMessage}</p>}</form> : <div className="admin-layout"><div className="admin-main"><form className="editor-form" onSubmit={saveStory}><div className="row-between"><div><span className="eyebrow">{editingId ? 'UPDATE CONTENT' : 'CREATE CONTENT'}</span><h2>{editingId ? 'Edit story' : 'Publish a story'}</h2></div>{editingId && <button type="button" className="small-button" onClick={()=>{setEditingId(null);setForm(blankForm);setImageFile(null);}}>Cancel edit <X size={14}/></button>}</div><label>Headline<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Write a clear, engaging headline"/></label><div className="form-row"><label>Section<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>{categories.map(c=><option key={c.name}>{c.name}</option>)}</select></label><label>Byline<input value={form.author || ''} onChange={e=>setForm({...form,author:e.target.value})} placeholder="Reporter name"/></label></div><label>Short summary<textarea required rows={3} value={form.excerpt} onChange={e=>setForm({...form,excerpt:e.target.value})} placeholder="Summarise the story for readers on mobile"/></label><label>Story body<textarea required rows={8} value={form.body} onChange={e=>setForm({...form,body:e.target.value})} placeholder="Keep paragraphs short. Use blank lines between paragraphs."/></label><label>Image URL (optional)<input value={form.image_url || ''} onChange={e=>setForm({...form,image_url:e.target.value})} placeholder="https://…"/></label><label className="upload-zone"><UploadCloud size={21}/><strong>{imageFile ? imageFile.name : 'Upload story image'}</strong><span>JPG, PNG or WebP — upload to Supabase Storage when connected</span><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>setImageFile(e.target.files?.[0] || null)}/></label><label>Image credit<input value={form.image_credit || ''} onChange={e=>setForm({...form,image_credit:e.target.value})} placeholder="Photographer / source"/></label><div className="checks-row"><label className="check-label"><input type="checkbox" checked={!!form.featured} onChange={e=>setForm({...form,featured:e.target.checked})}/> Featured story</label><label className="check-label"><input type="checkbox" checked={form.published !== false} onChange={e=>setForm({...form,published:e.target.checked})}/> Published</label></div><button className="submit-btn" disabled={busy}>{busy ? 'Saving…' : editingId ? 'Save changes' : 'Save story'} <Check size={16}/></button>{editorMessage && <p role="status" className="status-message">{editorMessage}</p>}</form></div><aside className="admin-side"><div className="admin-list"><div className="row-between"><div><span className="eyebrow">CONTENT LIBRARY</span><h2>{stories.length} stories</h2></div><FileImage size={19}/></div>{stories.map(s=><div className="admin-story" key={s.id}><div className="admin-thumb">{s.image_url ? <img src={s.image_url} alt=""/> : <FileImage size={17}/>}</div><div className="admin-story-name"><strong>{s.title}</strong><small>{s.category} · {s.published === false ? 'Draft' : 'Published'}</small><div className="admin-actions"><button title="Edit story" onClick={()=>startEdit(s)}><Pencil size={14}/> Edit</button><button title="Remove image" onClick={()=>removeImage(s)}><FileImage size={14}/> Image</button><button title="Delete story" onClick={()=>deleteStory(s)}><Trash2 size={14}/> Delete</button></div></div></div>)}</div><div className="admin-list"><div className="row-between"><div><span className="eyebrow">READER FEEDBACK</span><h2>{messages.length} messages</h2></div><button className="small-button" onClick={loadMessages}>Refresh</button></div>{messages.map(m=><div key={m.id} className="message-item"><div className="row-between"><strong>{m.name}</strong><button className="delete-icon" onClick={()=>deleteMessage(m)} title="Delete message"><Trash2 size={14}/></button></div><small>{m.email} · {m.topic}</small><p>{m.message}</p></div>)}{!messages.length && <p className="empty-note">No messages yet.</p>}</div>{supabase && session && <button className="signout-btn" onClick={signOut}><LogOut size={15}/> Sign out</button>}</aside></div>}
      <div className="demo-warning"><ShieldCheck size={17}/><p><strong>Before marking:</strong> replace all demo drafts and images with the exact Question 1 stories; add real group-member names and student numbers; verify editorial contacts and social links. Without Supabase variables this studio stores changes only in this browser.</p></div>
    </section>}

    <footer className="site-footer"><div className="footer-main"><button className="brand footer-brand" onClick={() => setPage('home')}><span className="brand-mark"><Newspaper size={21}/></span><span><strong>Namibian <i>Insight</i></strong><small>Stories that move us.</small></span></button><p>A student-led digital newsroom sharing perspectives from Namibia and beyond.</p><div className="footer-links">{categories.map(c=><button key={c.slug} onClick={()=>setPage(c.slug)}>{c.name}</button>)}<button onClick={()=>setPage('contact')}>Contact</button></div></div><div className="footer-bottom"><span>© 2026 Namibian Insight · Student publication</span><span>Independent voices. Thoughtful stories.</span></div></footer>
  </main>;
}
