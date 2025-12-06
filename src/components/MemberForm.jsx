import { useState } from 'react';
import { MBTI_TYPES, MBTI_DESCRIPTIONS, getGroupForType, GROUP_NAMES } from '../data/mbtiCompatibility';

export default function MemberForm({ onAddMember }) {
    const [name, setName] = useState('');
    const [mbtiType, setMbtiType] = useState('INTJ');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        onAddMember({
            id: Date.now().toString(),
            name: name.trim(),
            mbtiType
        });

        setName('');
    };

    return (
        <div className="glass-card">
            <h2 className="section-title">👤 メンバー追加</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="member-name">名前</label>
                    <input
                        type="text"
                        id="member-name"
                        className="form-input"
                        placeholder="例: 田中太郎"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={20}
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="mbti-type">MBTIタイプ</label>
                    <select
                        id="mbti-type"
                        className="form-select"
                        value={mbtiType}
                        onChange={(e) => setMbtiType(e.target.value)}
                    >
                        {Object.entries({
                            analysts: MBTI_TYPES.slice(0, 4),
                            diplomats: MBTI_TYPES.slice(4, 8),
                            sentinels: MBTI_TYPES.slice(8, 12),
                            explorers: MBTI_TYPES.slice(12, 16)
                        }).map(([group, types]) => (
                            <optgroup key={group} label={`${GROUP_NAMES[group]} (${group.charAt(0).toUpperCase() + group.slice(1)})`}>
                                {types.map(type => (
                                    <option key={type} value={type}>
                                        {type} - {MBTI_DESCRIPTIONS[type].name}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                {mbtiType && (
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                        {MBTI_DESCRIPTIONS[mbtiType].desc}
                    </p>
                )}

                <button type="submit" className="btn btn-primary btn-full">
                    ➕ 追加
                </button>
            </form>
        </div>
    );
}
