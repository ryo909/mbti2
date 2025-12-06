import { getGroupForType, getCompatibility, getCompatibilityDescription, getScoreLabel, MBTI_DESCRIPTIONS } from '../data/mbtiCompatibility';

export default function CompatibilityDetail({ member1, member2, onClose }) {
    if (!member1 || !member2) return null;

    const score = getCompatibility(member1.mbtiType, member2.mbtiType);
    const description = getCompatibilityDescription(member1.mbtiType, member2.mbtiType);
    const scoreLabel = getScoreLabel(score);

    const group1 = getGroupForType(member1.mbtiType);
    const group2 = getGroupForType(member2.mbtiType);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">💫 相性詳細</h2>
                    <button className="btn-icon" onClick={onClose}>✕</button>
                </div>
                <div className="modal-body">
                    <div className="compatibility-members">
                        <div style={{ textAlign: 'center' }}>
                            <div className={`member-avatar mbti-${group1}`} style={{ width: '60px', height: '60px', fontSize: '1.5rem', margin: '0 auto' }}>
                                {member1.name.charAt(0)}
                            </div>
                            <div style={{ marginTop: '0.5rem', fontWeight: 600 }}>{member1.name}</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                {member1.mbtiType} - {MBTI_DESCRIPTIONS[member1.mbtiType].name}
                            </div>
                        </div>

                        <div className="compatibility-vs">×</div>

                        <div style={{ textAlign: 'center' }}>
                            <div className={`member-avatar mbti-${group2}`} style={{ width: '60px', height: '60px', fontSize: '1.5rem', margin: '0 auto' }}>
                                {member2.name.charAt(0)}
                            </div>
                            <div style={{ marginTop: '0.5rem', fontWeight: 600 }}>{member2.name}</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                {member2.mbtiType} - {MBTI_DESCRIPTIONS[member2.mbtiType].name}
                            </div>
                        </div>
                    </div>

                    <div className="compatibility-score">
                        <div className="score-value">
                            {'⭐'.repeat(score)}
                        </div>
                        <div className="score-label">{scoreLabel}</div>
                    </div>

                    <div className="compatibility-description">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
}
