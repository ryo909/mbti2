import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { getGroupForType, getCompatibility } from '../data/mbtiCompatibility';

// Get edge color based on compatibility
const getEdgeColor = (score) => {
    const colors = {
        5: '#10b981',
        4: '#34d399',
        3: '#fbbf24',
        2: '#f97316',
        1: '#ef4444'
    };
    return colors[score] || '#94a3b8';
};

// Calculate node positions in a circle
const calculatePositions = (count, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    return Array.from({ length: count }, (_, index) => {
        const angle = (2 * Math.PI * index) / count - Math.PI / 2;
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    });
};

// Member node component
function MemberNodeSVG({ member, x, y, isSelected, onClick }) {
    const group = getGroupForType(member.mbtiType);
    const groupColors = {
        analysts: '#8b5cf6',
        diplomats: '#10b981',
        sentinels: '#3b82f6',
        explorers: '#f59e0b'
    };
    const color = groupColors[group] || '#8b5cf6';

    return (
        <g
            className={`member-node ${isSelected ? 'selected' : ''}`}
            transform={`translate(${x}, ${y})`}
            onClick={() => onClick(member)}
            style={{ cursor: 'pointer' }}
        >
            {/* Node background */}
            <rect
                x="-50"
                y="-45"
                width="100"
                height="90"
                rx="12"
                fill="rgba(255, 255, 255, 0.9)"
                stroke={isSelected ? color : 'rgba(148, 163, 184, 0.3)'}
                strokeWidth={isSelected ? 2 : 1}
                filter="url(#shadow)"
            />

            {/* Avatar circle */}
            <circle cx="0" cy="-10" r="22" fill={color} />
            <text
                x="0"
                y="-3"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
            >
                {member.name.charAt(0)}
            </text>

            {/* Name */}
            <text
                x="0"
                y="25"
                textAnchor="middle"
                fill="#1e293b"
                fontSize="12"
                fontWeight="500"
            >
                {member.name.length > 8 ? member.name.slice(0, 8) + '...' : member.name}
            </text>

            {/* MBTI Type badge */}
            <rect
                x="-25"
                y="32"
                width="50"
                height="18"
                rx="9"
                fill={color + '20'}
            />
            <text
                x="0"
                y="44"
                textAnchor="middle"
                fill={color}
                fontSize="10"
                fontWeight="500"
            >
                {member.mbtiType}
            </text>
        </g>
    );
}

// Compatibility edge component
function CompatibilityEdge({ x1, y1, x2, y2, score, isSelected, onClick }) {
    const color = getEdgeColor(score);
    const strokeWidth = Math.max(2, score);

    return (
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth={strokeWidth}
            opacity={isSelected ? 1 : 0.6}
            strokeLinecap="round"
            onClick={onClick}
            style={{ cursor: 'pointer' }}
            className="compatibility-edge"
        />
    );
}

export default function TeamMap({ members, onSelectPair }) {
    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 600, height: 500 });
    const [selectedMemberId, setSelectedMemberId] = useState(null);
    const [hoveredEdge, setHoveredEdge] = useState(null);

    // Update dimensions when container resizes
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ width: width || 600, height: height || 500 });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Calculate positions
    const positions = useMemo(() => {
        return calculatePositions(members.length, dimensions.width, dimensions.height);
    }, [members.length, dimensions]);

    // Generate edges data
    const edges = useMemo(() => {
        const edgeList = [];
        for (let i = 0; i < members.length; i++) {
            for (let j = i + 1; j < members.length; j++) {
                const score = getCompatibility(members[i].mbtiType, members[j].mbtiType);
                edgeList.push({
                    id: `${members[i].id}-${members[j].id}`,
                    source: i,
                    target: j,
                    score,
                    member1: members[i],
                    member2: members[j]
                });
            }
        }
        return edgeList;
    }, [members]);

    const handleNodeClick = useCallback((member) => {
        setSelectedMemberId(prev => prev === member.id ? null : member.id);
    }, []);

    const handleEdgeClick = useCallback((edge) => {
        if (onSelectPair) {
            onSelectPair(edge.member1, edge.member2);
        }
    }, [onSelectPair]);

    if (members.length === 0) {
        return (
            <div className="glass-card" style={{ height: '100%' }}>
                <h2 className="section-title">🗺️ 相性マップ</h2>
                <div className="empty-state">
                    <div className="empty-state-icon">🎯</div>
                    <h3 className="empty-state-title">メンバーを追加しよう</h3>
                    <p className="empty-state-description">
                        左のフォームからチームメンバーを追加すると、相性マップが表示されます
                    </p>
                </div>
            </div>
        );
    }

    if (members.length === 1) {
        return (
            <div className="glass-card" style={{ height: '100%' }}>
                <h2 className="section-title">🗺️ 相性マップ</h2>
                <div className="empty-state">
                    <div className="empty-state-icon">👤</div>
                    <h3 className="empty-state-title">もう1人追加しよう</h3>
                    <p className="empty-state-description">
                        2人以上のメンバーを追加すると、相性の線が表示されます
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="glass-card" style={{ height: '100%', padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: 'var(--space-lg)', paddingBottom: 0 }}>
                <h2 className="section-title">🗺️ 相性マップ</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
                    線をクリックすると詳細が表示されます。線が太いほど相性が良いです。
                </p>
            </div>
            <div
                ref={containerRef}
                className="team-map-container"
                style={{
                    width: '100%',
                    height: 'calc(100% - 80px)',
                    minHeight: '400px'
                }}
            >
                <svg
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                    style={{ overflow: 'visible' }}
                >
                    {/* SVG Definitions */}
                    <defs>
                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.1" />
                        </filter>
                    </defs>

                    {/* Draw edges first (behind nodes) */}
                    <g className="edges-layer">
                        {edges.map(edge => (
                            <CompatibilityEdge
                                key={edge.id}
                                x1={positions[edge.source]?.x || 0}
                                y1={positions[edge.source]?.y || 0}
                                x2={positions[edge.target]?.x || 0}
                                y2={positions[edge.target]?.y || 0}
                                score={edge.score}
                                isSelected={
                                    selectedMemberId === edge.member1.id ||
                                    selectedMemberId === edge.member2.id ||
                                    hoveredEdge === edge.id
                                }
                                onClick={() => handleEdgeClick(edge)}
                            />
                        ))}
                    </g>

                    {/* Draw nodes on top */}
                    <g className="nodes-layer">
                        {members.map((member, index) => (
                            <MemberNodeSVG
                                key={member.id}
                                member={member}
                                x={positions[index]?.x || 0}
                                y={positions[index]?.y || 0}
                                isSelected={selectedMemberId === member.id}
                                onClick={handleNodeClick}
                            />
                        ))}
                    </g>
                </svg>
            </div>

            {/* Legend */}
            <div style={{
                position: 'absolute',
                bottom: 'var(--space-md)',
                left: 'var(--space-md)',
                background: 'var(--color-bg-glass)',
                backdropFilter: 'blur(10px)',
                padding: 'var(--space-sm) var(--space-md)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem',
                display: 'flex',
                gap: 'var(--space-md)',
                alignItems: 'center'
            }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>相性:</span>
                {[5, 4, 3, 2, 1].map(score => (
                    <div key={score} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <div style={{
                            width: '20px',
                            height: `${Math.max(2, score)}px`,
                            background: getEdgeColor(score),
                            borderRadius: '2px'
                        }} />
                        <span style={{ color: 'var(--color-text-muted)' }}>{score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
