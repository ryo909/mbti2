import { useMemo } from 'react';
import { MBTI_GROUPS, GROUP_NAMES, getGroupForType, getCompatibility } from '../data/mbtiCompatibility';

export default function TeamAnalysis({ members }) {
    const analysis = useMemo(() => {
        if (members.length === 0) return null;

        // Count by group
        const groupCounts = {
            analysts: 0,
            diplomats: 0,
            sentinels: 0,
            explorers: 0
        };

        members.forEach(member => {
            const group = getGroupForType(member.mbtiType);
            groupCounts[group]++;
        });

        // Calculate average compatibility
        let totalScore = 0;
        let pairCount = 0;

        for (let i = 0; i < members.length; i++) {
            for (let j = i + 1; j < members.length; j++) {
                totalScore += getCompatibility(members[i].mbtiType, members[j].mbtiType);
                pairCount++;
            }
        }

        const avgCompatibility = pairCount > 0 ? (totalScore / pairCount).toFixed(1) : 0;

        // Find most common type
        const typeCounts = {};
        members.forEach(member => {
            typeCounts[member.mbtiType] = (typeCounts[member.mbtiType] || 0) + 1;
        });
        const mostCommonType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0];

        return {
            groupCounts,
            avgCompatibility,
            mostCommonType,
            totalMembers: members.length,
            totalPairs: pairCount
        };
    }, [members]);

    if (!analysis) {
        return (
            <div className="glass-card">
                <h2 className="section-title">📊 チーム分析</h2>
                <div className="empty-state" style={{ minHeight: '150px' }}>
                    <div className="empty-state-icon">📈</div>
                    <p className="empty-state-description">
                        メンバーを追加すると分析が表示されます
                    </p>
                </div>
            </div>
        );
    }

    const groupColors = {
        analysts: 'var(--color-analysts)',
        diplomats: 'var(--color-diplomats)',
        sentinels: 'var(--color-sentinels)',
        explorers: 'var(--color-explorers)'
    };

    return (
        <div className="glass-card">
            <h2 className="section-title">📊 チーム分析</h2>

            <div className="analysis-section">
                <h3 className="analysis-title">統計</h3>
                <div className="stat-grid">
                    <div className="stat-card">
                        <div className="stat-value">{analysis.totalMembers}</div>
                        <div className="stat-label">メンバー数</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{analysis.avgCompatibility}</div>
                        <div className="stat-label">平均相性</div>
                    </div>
                </div>
            </div>

            <div className="analysis-section">
                <h3 className="analysis-title">タイプ分布</h3>
                <div className="type-distribution">
                    {Object.entries(analysis.groupCounts).map(([group, count]) => (
                        <div key={group} className="type-bar">
                            <span className="type-bar-label">{GROUP_NAMES[group]}</span>
                            <div className="type-bar-track">
                                <div
                                    className="type-bar-fill"
                                    style={{
                                        width: `${(count / analysis.totalMembers) * 100}%`,
                                        background: groupColors[group]
                                    }}
                                />
                            </div>
                            <span className="type-bar-count">{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {analysis.mostCommonType && (
                <div className="analysis-section">
                    <h3 className="analysis-title">最多タイプ</h3>
                    <div className="stat-card" style={{ gridColumn: 'span 2' }}>
                        <div className="stat-value">{analysis.mostCommonType[0]}</div>
                        <div className="stat-label">{analysis.mostCommonType[1]}人</div>
                    </div>
                </div>
            )}

            <div className="analysis-section" style={{ marginBottom: 0 }}>
                <h3 className="analysis-title">凡例</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ width: '12px', height: '4px', background: '#10b981', borderRadius: '2px' }}></span>
                        最高
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ width: '12px', height: '3px', background: '#34d399', borderRadius: '2px' }}></span>
                        良好
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ width: '12px', height: '2px', background: '#fbbf24', borderRadius: '2px' }}></span>
                        普通
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span style={{ width: '12px', height: '2px', background: '#f97316', borderRadius: '2px' }}></span>
                        挑戦的
                    </span>
                </div>
            </div>
        </div>
    );
}
