import { useState, useEffect } from 'react';
import Header from './components/Header';
import MemberForm from './components/MemberForm';
import MemberList from './components/MemberList';
import TeamMap from './components/TeamMap';
import CompatibilityDetail from './components/CompatibilityDetail';
import TeamAnalysis from './components/TeamAnalysis';

// LocalStorage key
const STORAGE_KEY = 'mbti-team-members';

function App() {
    // Dark mode state
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('mbti-dark-mode');
        return saved ? JSON.parse(saved) : false;
    });

    // Members state
    const [members, setMembers] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    // Selected member for highlighting
    const [selectedMember, setSelectedMember] = useState(null);

    // Compatibility detail modal
    const [selectedPair, setSelectedPair] = useState(null);

    // Apply dark mode
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
        localStorage.setItem('mbti-dark-mode', JSON.stringify(darkMode));
    }, [darkMode]);

    // Save members to localStorage
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
    }, [members]);

    // Add member
    const handleAddMember = (member) => {
        if (members.length >= 15) {
            alert('メンバーは15人までです');
            return;
        }
        setMembers(prev => [...prev, member]);
    };

    // Delete member
    const handleDeleteMember = (id) => {
        setMembers(prev => prev.filter(m => m.id !== id));
        if (selectedMember?.id === id) {
            setSelectedMember(null);
        }
    };

    // Select pair for compatibility detail
    const handleSelectPair = (member1, member2) => {
        setSelectedPair({ member1, member2 });
    };

    // Export data
    const handleExport = () => {
        const data = JSON.stringify(members, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'mbti-team-data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    // Import data
    const handleImport = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result);
                if (Array.isArray(data)) {
                    setMembers(data);
                }
            } catch (err) {
                alert('ファイルの読み込みに失敗しました');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    return (
        <div className="app-container">
            <Header darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />

            <main className="main-content">
                <aside>
                    <MemberForm onAddMember={handleAddMember} />
                    <div style={{ marginTop: 'var(--space-lg)' }}>
                        <MemberList
                            members={members}
                            selectedMember={selectedMember}
                            onSelectMember={setSelectedMember}
                            onDeleteMember={handleDeleteMember}
                        />
                    </div>

                    <div className="glass-card" style={{ marginTop: 'var(--space-lg)' }}>
                        <h2 className="section-title">💾 データ管理</h2>
                        <div className="data-actions" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
                            <button className="btn btn-secondary" onClick={handleExport} disabled={members.length === 0}>
                                📤 エクスポート
                            </button>
                            <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                                📥 インポート
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleImport}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        </div>
                    </div>
                </aside>

                <section style={{ minHeight: '600px' }}>
                    <TeamMap members={members} onSelectPair={handleSelectPair} />
                </section>

                <aside>
                    <TeamAnalysis members={members} />
                </aside>
            </main>

            {selectedPair && (
                <CompatibilityDetail
                    member1={selectedPair.member1}
                    member2={selectedPair.member2}
                    onClose={() => setSelectedPair(null)}
                />
            )}
        </div>
    );
}

export default App;
