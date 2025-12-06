import { getGroupForType, MBTI_DESCRIPTIONS } from '../data/mbtiCompatibility';

export default function MemberList({ members, selectedMember, onSelectMember, onDeleteMember }) {
    if (members.length === 0) {
        return (
            <div className="glass-card">
                <h2 className="section-title">📋 メンバー一覧</h2>
                <div className="empty-state" style={{ minHeight: '150px' }}>
                    <div className="empty-state-icon">👥</div>
                    <p className="empty-state-description">
                        メンバーを追加してください
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card">
            <h2 className="section-title">📋 メンバー一覧 ({members.length}人)</h2>
            <div className="member-list">
                {members.map(member => {
                    const group = getGroupForType(member.mbtiType);
                    const desc = MBTI_DESCRIPTIONS[member.mbtiType];

                    return (
                        <div
                            key={member.id}
                            className={`member-card ${selectedMember?.id === member.id ? 'selected' : ''}`}
                            onClick={() => onSelectMember(member)}
                        >
                            <div className={`member-avatar mbti-${group}`}>
                                {member.name.charAt(0)}
                            </div>
                            <div className="member-info">
                                <div className="member-name">{member.name}</div>
                                <div className="member-type">
                                    {member.mbtiType} - {desc.name}
                                </div>
                            </div>
                            <div className="member-actions">
                                <button
                                    className="btn-icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteMember(member.id);
                                    }}
                                    title="削除"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
