:root {
  --bg-color: #050505;
  --surface-color: #111111;
  --surface-hover: #1a1a1a;
  --text-main: #ffffff;
  --text-muted: #888888;
  --border-color: #222222;
  --accent: #ffffff;
  --transition-fast: 0.15s ease-out;
  --transition-smooth: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  --shadow-glow: 0 0 20px rgba(255, 255, 255, 0.05);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-main);
  height: 100vh;
  overflow: hidden;
  display: flex;
  -webkit-font-smoothing: antialiased;
}

#app {
  display: flex;
  width: 100%;
  height: 100%;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: rgba(17, 17, 17, 0.6);
  backdrop-filter: blur(20px);
  border-right: 1px solid var(--border-color);
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 10;
}

.logo {
  font-size: 1.75rem;
  font-weight: 800;
  letter-spacing: -1.5px;
  background: linear-gradient(180deg, #ffffff 0%, #aaaaaa 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  margin-bottom: 3rem;
}

.nav-links {
  list-style: none;
  flex-grow: 1;
}

.nav-links li {
  padding: 1rem 1.25rem;
  margin-bottom: 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.95rem;
  transition: var(--transition-smooth);
  border: 1px solid transparent;
}

.nav-links li:hover {
  color: var(--text-main);
  background-color: rgba(255, 255, 255, 0.03);
}

.nav-links li.active {
  color: var(--bg-color);
  background-color: var(--text-main);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.15);
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  cursor: pointer;
  transition: var(--transition-fast);
}

.user-profile:hover {
  opacity: 0.8;
}

.avatar {
  background-color: var(--surface-hover);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.name {
  font-weight: 600;
  font-size: 0.95rem;
}

.lang-toggle {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
  margin-bottom: 2rem;
}

.lang-btn {
  background: transparent;
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 600;
  transition: var(--transition-fast);
  flex: 1;
}

.lang-btn:hover {
  background: var(--surface-hover);
  color: var(--text-main);
}

.lang-btn.active {
  background: var(--text-main);
  color: var(--bg-color);
  border-color: var(--text-main);
}

/* Content Area */
.content-area {
  flex-grow: 1;
  padding: 4rem;
  overflow-y: auto;
  position: relative;
  background: radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 0.5rem;
}

.page-subtitle {
  color: var(--text-muted);
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

/* Animations */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
  to { opacity: 1; transform: translateY(0); filter: blur(0); }
}

.animate-enter {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Dashboard */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.stat-card {
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 2.5rem;
  transition: var(--transition-smooth);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  opacity: 0;
  transition: opacity var(--transition-smooth);
}

.stat-card:hover {
  transform: translateY(-8px);
  border-color: #444;
  box-shadow: var(--shadow-glow);
}

.stat-card:hover::before {
  opacity: 1;
}

.stat-title {
  color: var(--text-muted);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
  margin-bottom: 1rem;
}

.stat-value {
  font-size: 3rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: -2px;
}

/* Subjects */
.subjects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.subject-card {
  background: linear-gradient(145deg, var(--surface-color) 0%, var(--bg-color) 100%);
  border: 1px solid var(--border-color);
  padding: 3rem 2rem;
  border-radius: 24px;
  cursor: pointer;
  transition: var(--transition-smooth);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.subject-card:hover {
  transform: scale(1.03) translateY(-5px);
  border-color: var(--text-main);
  box-shadow: 0 20px 40px rgba(0,0,0,0.8), var(--shadow-glow);
}

.subject-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  transition: transform var(--transition-smooth);
}

.subject-card:hover .subject-icon {
  transform: scale(1.1) rotate(5deg);
}

.subject-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
}

/* Quiz Interface */
.quiz-container {
  max-width: 650px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-weight: 600;
  color: var(--text-muted);
}

.progress-bar-container {
  width: 100%;
  height: 6px;
  background-color: var(--surface-hover);
  border-radius: 6px;
  margin-bottom: 4rem;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background-color: var(--text-main);
  width: 0%;
  transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 6px;
  box-shadow: 0 0 10px rgba(255,255,255,0.5);
}

.question-card {
  width: 100%;
  background: var(--surface-color);
  border: 1px solid var(--border-color);
  padding: 4rem;
  border-radius: 32px;
  text-align: center;
  position: relative;
}

.question-card::after {
  content: '';
  position: absolute;
  top: -1px; left: -1px; right: -1px; bottom: -1px;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
  border-radius: 32px;
  z-index: -1;
  pointer-events: none;
}

.question-text {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 3rem;
  line-height: 1.4;
  letter-spacing: -0.5px;
}

.answers-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.answer-btn {
  background-color: transparent;
  color: var(--text-main);
  border: 2px solid var(--border-color);
  padding: 1.25rem 2rem;
  border-radius: 16px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.answer-btn:hover:not(:disabled) {
  background-color: var(--surface-hover);
  border-color: #555;
  transform: translateY(-2px);
}

.answer-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.answer-btn.correct {
  background-color: var(--text-main);
  color: var(--bg-color);
  border-color: var(--text-main);
  box-shadow: 0 0 20px rgba(255,255,255,0.3);
}

.answer-btn.wrong {
  opacity: 0.3;
  border-color: var(--surface-hover);
}

/* Leaderboard */
.leaderboard-container {
  max-width: 800px;
  margin: 0;
  background: transparent;
}

.leaderboard-header {
  display: flex;
  padding: 1rem 2rem;
  color: var(--text-muted);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1rem;
}

.col-rank { width: 60px; }
.col-user { flex-grow: 1; }
.col-xp { width: 120px; text-align: right; }

.leaderboard-item {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  border: 1px solid transparent;
  border-radius: 16px;
  transition: var(--transition-fast);
  margin-bottom: 0.5rem;
  background: var(--surface-color);
}

.leaderboard-item:hover {
  border-color: var(--border-color);
  background: var(--surface-hover);
  transform: translateX(5px);
}

.leaderboard-item.current-user {
  background: var(--text-main);
  color: var(--bg-color);
  border: none;
  box-shadow: 0 10px 30px rgba(255,255,255,0.1);
  transform: scale(1.02);
}

.leaderboard-item.current-user:hover {
  transform: scale(1.02) translateX(5px);
}

.leaderboard-item.current-user .rank,
.leaderboard-item.current-user .xp {
  color: var(--bg-color);
}

.leaderboard-item.current-user .avatar {
  border-color: rgba(0,0,0,0.1);
  background: rgba(0,0,0,0.05);
}

.rank {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-muted);
}

.pilot-info {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.pilot-info .avatar {
  width: 40px;
  height: 40px;
  font-size: 1rem;
}

.xp {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text-main);
}

/* --- NEW AUTHENTICATION STYLES --- */
.auth-wrapper {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-wrapper::before {
    content: '';
    position: absolute; inset: 0;
    background: rgba(5,5,5,0.85);
    backdrop-filter: blur(10px);
}

.auth-panel {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(40px);
  padding: 4rem 3rem;
  border-radius: 32px;
  border: 1px solid rgba(255,255,255,0.15);
  width: 100%;
  max-width: 480px;
  text-align: center;
  box-shadow: 0 40px 100px rgba(0,0,0,1);
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  z-index: 10;
}

.auth-panel h1 { font-size: 2.5rem; margin-bottom: 0.5rem; }
.auth-panel p { color: var(--text-muted); margin-bottom: 2.5rem; font-size: 1.1rem;}

.auth-input { 
  width: 100%; padding: 1.25rem 1.5rem; margin-bottom: 1rem; 
  border-radius: 12px; border: 1px solid rgba(255,255,255,0.1); 
  background: rgba(0,0,0,0.5); color: #fff; font-size: 1.1rem; 
  outline: none; transition: var(--transition-fast); 
}
.auth-input:focus { border-color: var(--text-main); background: rgba(0,0,0,0.8); }

.google-btn {
  width: 100%; background: #ffffff; color: #000; 
  padding: 1.25rem; border-radius: 12px; font-weight: 700; 
  font-size: 1.1rem; border: none; cursor: pointer; 
  display: flex; align-items: center; justify-content: center; 
  gap: 1rem; transition: var(--transition-fast); margin-top: 1rem;
}
.google-btn:hover { background: #eeeeee; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(255,255,255,0.15); }

.divider {
    display: flex; align-items: center; text-align: center; color: var(--text-muted);
    margin: 2rem 0; font-size: 0.9rem;
}
.divider::before, .divider::after {
    content: ''; flex: 1; border-bottom: 1px solid rgba(255,255,255,0.1);
}
.divider:not(:empty)::before { margin-right: .5em; }
.divider:not(:empty)::after { margin-left: .5em; }

/* Profile Avatars */
.avatars-grid { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2rem; flex-wrap: wrap;}
.avatar-ch { width: 60px; height: 60px; border-radius: 16px; border: 2px solid transparent; background: rgba(255,255,255,0.05); font-size: 2rem; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
.avatar-ch:hover { background: rgba(255,255,255,0.1); transform: translateY(-3px);}
.avatar-ch.active { border-color: var(--text-main); background: rgba(255,255,255,0.15); transform: scale(1.1); box-shadow: 0 0 20px rgba(255,255,255,0.2);}

/* Badges */
.badges-grid { display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 1.5rem; }
.badge-icon { 
    width: 60px; height: 60px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; font-size: 1.8rem;
    opacity: 0.2; filter: grayscale(1); transition: var(--transition-smooth); border: 2px solid transparent; 
    background: rgba(255,255,255,0.05); position: relative;
}
.badge-icon:hover::after {
    content: attr(data-title);
    position: absolute; bottom: -35px; white-space: nowrap;
    background: #fff; color: #000; padding: 0.4rem 0.8rem; border-radius: 6px;
    font-size: 0.85rem; font-weight: 700; pointer-events: none;
    animation: fadeInUp 0.2s forwards;
}
.badge-icon.unlocked { 
    opacity: 1; filter: grayscale(0); border-color: #ffd700; 
    box-shadow: 0 0 20px rgba(255,215,0,0.3); background: rgba(255,215,0,0.15); 
}

/* Notifications Pop-up */
.notification { 
    position: fixed; bottom: 3rem; right: 3rem; 
    background: var(--text-main); color: var(--bg-color); 
    padding: 1.5rem 2rem; border-radius: 16px; font-weight: 700; 
    box-shadow: 0 20px 40px rgba(0,0,0,0.5); z-index: 9999; 
    transform: translateY(150px); opacity: 0; transition: var(--transition-smooth); 
    display: flex; align-items: center; gap: 1.5rem; 
}
.notification.show { transform: translateY(0); opacity: 1; }
.notification-icon { font-size: 2.5rem; }
.notification-text h4 { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.25rem;}
.notification-text p { font-size: 0.95rem; font-weight: 500; opacity: 0.8;}

/* Review Grid */
.review-list { display: flex; flex-direction: column; gap: 1.5rem; max-width: 800px; margin: 2rem auto; }
.review-card { background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 16px; padding: 2rem; text-align: left; }
.review-q { font-size: 1.35rem; font-weight: 700; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05);}
.review-opt { padding: 1.25rem; border-radius: 12px; margin-bottom: 0.5rem; background: rgba(255,255,255,0.02); display: flex; justify-content: space-between; font-weight: 600; font-size: 1.1rem;}
.review-opt.correct { background: rgba(0,255,0,0.15); color: #4ade80; border: 1px solid rgba(0,255,0,0.3); }
.review-opt.wrong { background: rgba(255,0,0,0.15); color: #f87171; border: 1px solid rgba(255,0,0,0.3); text-decoration: line-through; }

/* --- AUTH TAB FORMS --- */
.auth-tabs { display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 1rem; }
.auth-tab { flex: 1; text-align: center; color: var(--text-muted); cursor: pointer; font-size: 1.25rem; font-weight: 700; transition: var(--transition-fast); }
.auth-tab.active { color: var(--text-main); text-shadow: 0 0 15px rgba(255,255,255,0.3); }

/* --- CUSTOM PFP --- */
.avatar-ch.custom-btn { background: rgba(0,255,0,0.1); border: 2px dashed #4ade80; color: #4ade80; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; font-weight: 700; text-align: center; line-height: 1.2;}
.avatar-ch.custom-btn:hover { background: rgba(0,255,0,0.2); transform: translateY(-3px); }
.avatar-ch.custom-btn.active { border-style: solid; box-shadow: 0 0 20px rgba(0,255,0,0.3); }
.avatar-preview { width: 100%; height: 100%; border-radius: 12px; object-fit: cover; }
.avatar-raw { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; }

/* --- ADMIN PANEL & VALIDATION --- */
.input-error { border: 2px solid #ef4444 !important; box-shadow: 0 0 10px rgba(239, 68, 68, 0.4); }
.error-msg { color: #ef4444; font-size: 0.85rem; margin-top: -0.5rem; margin-bottom: 1rem; text-align: left; min-height: 1.2rem; transition: 0.2s;}
.admin-table { width: 100%; border-collapse: collapse; margin-top: 2rem; background: rgba(0,0,0,0.3); border-radius: var(--radius); overflow: hidden; border: 1px solid rgba(255,215,0,0.3); }
.admin-table th { background: rgba(255,215,0,0.1); color: gold; padding: 1rem; text-align: left; font-weight: 700; border-bottom: 1px solid rgba(255,215,0,0.2); }
.admin-table td { padding: 1rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
.admin-input { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 0.5rem; border-radius: 4px; width: 100px; }
.admin-delete-btn { background: rgba(239,68,68,0.2); color: #ef4444; border: 1px solid #ef4444; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; transition: 0.15s;}
.admin-delete-btn:hover { background: #ef4444; color: white; }
.admin-save-btn { background: rgba(74,222,128,0.2); color: #4ade80; border: 1px solid #4ade80; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; transition: 0.15s; margin-right: 0.5rem;}
.admin-save-btn:hover { background: #4ade80; color: black; }

/* --- PROFILE & ADVANCED UI --- */
.xp-bar-container { background: rgba(0,0,0,0.5); width: 100%; height: 16px; border-radius: 8px; margin: 1.5rem 0; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); box-shadow: inset 0 2px 10px rgba(0,0,0,0.5); position: relative;}
.xp-bar-fill { background: linear-gradient(90deg, #4ade80, #3b82f6); height: 100%; transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1); box-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
.profile-card { background: rgba(255,255,255,0.05); padding: 3rem; border-radius: 24px; text-align: center; border: 1px solid rgba(255,255,255,0.1); position: relative; max-width: 600px; margin: 0 auto 2rem auto; box-shadow: 0 10px 40px rgba(0,0,0,0.5);}
.uid-badge { background: #3b82f6; color: white; padding: 0.4rem 1rem; border-radius: 8px; font-weight: 800; font-family: monospace; letter-spacing: 3px; font-size: 1.5rem; display: inline-block; margin-top: 1rem; box-shadow: 0 5px 20px rgba(59, 130, 246, 0.4);}
.friend-item { display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.4); padding: 1.5rem; border-radius: 16px; margin-bottom: 0.75rem; border: 1px solid rgba(255,255,255,0.05); transition: 0.2s; }
.friend-item:hover { background: rgba(255,255,255,0.05); transform: translateY(-2px); border-color: rgba(255,255,255,0.2); }
.setting-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 2rem; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center; transition: 0.2s; cursor: pointer;}
.setting-card:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.08); }

/* --- PUBLIC PROFILE & SOCIAL LINKS --- */
.leaderboard-item[onclick] { cursor: pointer; transition: transform 0.15s, border-color 0.15s; }
.leaderboard-item[onclick]:hover { transform: translateX(4px); border-color: rgba(59,130,246,0.4); }
.profile-card a:hover { transform: scale(1.05); box-shadow: 0 4px 20px rgba(0,0,0,0.4); }
textarea.auth-input { font-family: 'Inter', sans-serif; line-height: 1.5; }

/* --- ROOM SYSTEM --- */
#room-timer-fill { transition: width 0.1s linear; }
@keyframes timerPulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
.room-ans-btn { transition: all 0.15s; }
.room-ans-btn:hover { transform: translateY(-2px); border-color: rgba(255,255,255,0.3); }

/* --- MOBILE RESPONSIVENESS (PHASE 10) --- */
@media (max-width: 768px) {
  body { overflow: hidden; }
  #app { flex-direction: column; }
  .sidebar { 
     width: 100%; height: auto; min-height: 80px; padding: 0.5rem; flex-direction: row; align-items: center; justify-content: space-around;
     border-right: none; border-top: 1px solid var(--border-color); position: fixed; bottom: 0; left: 0; z-index: 1000;
  }
  .logo, .user-profile, .lang-toggle { display: none !important; }
  .nav-links { display: flex; flex-direction: row; width: 100%; justify-content: space-between; padding: 0; margin: 0; overflow-x: auto; white-space: nowrap; }
  .nav-links::-webkit-scrollbar { display: none; }
  .nav-links li { padding: 0.75rem 0.5rem; margin-bottom: 0; margin-right: 0.2rem; flex: 1; text-align: center; border-radius: 8px; font-size: 0.85rem; }
  
  .content-area { padding: 1.5rem; padding-bottom: 100px; }
  .page-title { font-size: 1.8rem; }
  .page-subtitle { font-size: 0.95rem; margin-bottom: 1.5rem; }
  
  .dashboard-grid, .subjects-grid { grid-template-columns: 1fr; gap: 1rem; }
  .stat-card, .subject-card { padding: 1.5rem; }
  .stat-value { font-size: 2.2rem; }
  
  .quiz-container { margin-top: 1rem; }
  .question-card { padding: 1.5rem; border-radius: 20px; }
  .question-text { font-size: 1.4rem; margin-bottom: 1.5rem; }
  .answers-grid { grid-template-columns: 1fr; gap: 0.75rem; }
  .answer-btn { padding: 1rem; font-size: 1rem; }
  
  .auth-panel { padding: 2rem 1.5rem; }
  
  .leaderboard-item { flex-direction: column; align-items: flex-start; padding: 1.5rem 1rem; gap: 1rem; }
  .col-xp { align-self: flex-start; margin-top: 0; font-size: 1.2rem; }
  .profile-card { padding: 1.5rem; box-shadow: none; border-color: rgba(255,255,255,0.05); }
  .friend-item { flex-direction: column; align-items: flex-start; gap: 1rem; }
  .friend-item > div:last-child { text-align: left !important; }
}
