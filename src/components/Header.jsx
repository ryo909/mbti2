export default function Header({ darkMode, onToggleDarkMode }) {
    return (
        <header className="header">
            <div className="header-content">
                <div>
                    <h1 className="header-title">🧠 MBTI Team Map</h1>
                    <p className="header-subtitle">チームの相性を可視化しよう</p>
                </div>
                <button className="theme-toggle" onClick={onToggleDarkMode}>
                    {darkMode ? '☀️ ライト' : '🌙 ダーク'}
                </button>
            </div>
        </header>
    );
}
