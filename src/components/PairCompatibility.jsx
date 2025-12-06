import { useState } from 'react';
import { MBTI_DESCRIPTIONS, getDetailedCompatibility } from '../data/mbtiCompatibility';

export default function PairCompatibility({ members }) {
    const [memberA, setMemberA] = useState('');
    const [memberB, setMemberB] = useState('');
    const [result, setResult] = useState(null);

    const handleDiagnose = () => {
        if (!memberA || !memberB || memberA === memberB) return;

        const member1 = members.find(m => m.id === memberA);
        const member2 = members.find(m => m.id === memberB);

        if (member1 && member2) {
            const compatibility = getDetailedCompatibility(member1.mbtiType, member2.mbtiType);
            setResult({
                ...compatibility,
                member1,
                member2
            });
        }
    };

    const canDiagnose = memberA && memberB && memberA !== memberB;

    if (members.length < 2) {
        return (
            <div className="glass-card">
                <h2 className="section-title">🔍 ペア相性診断</h2>
                <div className="empty-state" style={{ minHeight: '200px' }}>
                    <div className="empty-state-icon">👥</div>
                    <h3 className="empty-state-title">メンバーを追加しよう</h3>
                    <p className="empty-state-description">
                        2人以上のメンバーがいると診断できます
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card">
            <h2 className="section-title">🔍 ペア相性診断</h2>

            {/* Member Selection */}
            <div className="pair-selector">
                <select
                    className="form-select"
                    value={memberA}
                    onChange={(e) => setMemberA(e.target.value)}
                >
                    <option value="">メンバーAを選択</option>
                    {members.map(member => (
                        <option key={member.id} value={member.id}>
                            {member.name} ({member.mbtiType})
                        </option>
                    ))}
                </select>

                <span className="pair-vs">↔</span>

                <select
                    className="form-select"
                    value={memberB}
                    onChange={(e) => setMemberB(e.target.value)}
                >
                    <option value="">メンバーBを選択</option>
                    {members.map(member => (
                        <option key={member.id} value={member.id}>
                            {member.name} ({member.mbtiType})
                        </option>
                    ))}
                </select>
            </div>

            <button
                className="diagnose-btn"
                onClick={handleDiagnose}
                disabled={!canDiagnose}
            >
                🔮 診断する
            </button>

            {/* Result */}
            {result && (
                <div className="compatibility-result">
                    <div className="result-header">
                        {/* Score Display */}
                        <div className="score-display">
                            <div
                                className="score-circle"
                                style={{ background: result.color }}
                            >
                                <span>{result.score}</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="score-bar">
                                <div
                                    className="score-bar-fill"
                                    style={{
                                        width: `${result.score}%`,
                                        background: result.color
                                    }}
                                />
                            </div>

                            {/* Label Badge */}
                            <span className={`score-label-badge ${result.labelClass}`}>
                                {result.emoji} {result.label}
                            </span>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="summary-comment">
                        💬 {result.summary}
                    </div>

                    {/* Good Points */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">
                            ✅ 良いところ
                        </h3>
                        <ul className="detail-list">
                            {result.good.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Caution Points */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">
                            ⚠️ 注意ポイント
                        </h3>
                        <ul className="detail-list">
                            {result.caution.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Tips */}
                    <div className="detail-section">
                        <h3 className="detail-section-title">
                            💡 うまくやるコツ
                        </h3>
                        <ul className="detail-list">
                            {result.tips.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
