import { useState, useEffect } from 'react';
import Header from './components/Header';
import MemberForm from './components/MemberForm';
import MemberList from './components/MemberList';
import TeamMap from './components/TeamMap';
import CompatibilityDetail from './components/CompatibilityDetail';
import TeamAnalysis from './components/TeamAnalysis';
import PairCompatibility from './components/PairCompatibility';

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
                </aside>

                <section style={{ minHeight: '600px' }}>
                    <TeamMap members={members} onSelectPair={handleSelectPair} />
                </section>

                <aside>
                    <PairCompatibility members={members} />
                    <div style={{ marginTop: 'var(--space-lg)' }}>
                        <TeamAnalysis members={members} />
                    </div>
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
