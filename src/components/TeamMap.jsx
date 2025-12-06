import { useCallback, useMemo, useEffect, useState } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { getGroupForType, getCompatibility, MBTI_DESCRIPTIONS } from '../data/mbtiCompatibility';

// Custom node component
function MemberNode({ data }) {
    const group = getGroupForType(data.mbtiType);

    return (
        <div className="node-content">
            <div className={`node-avatar mbti-${group}`}>
                {data.name.charAt(0)}
            </div>
            <div className="node-name">{data.name}</div>
            <span className={`node-type ${group}`}>{data.mbtiType}</span>
        </div>
    );
}

const nodeTypes = { member: MemberNode };

// Get edge color based on compatibility
function getEdgeColor(score) {
    const colors = {
        5: '#10b981',
        4: '#34d399',
        3: '#fbbf24',
        2: '#f97316',
        1: '#ef4444'
    };
    return colors[score] || '#94a3b8';
}

// Calculate node positions in a circle
function calculatePositions(members) {
    const centerX = 300;
    const centerY = 250;
    const radius = Math.min(180, 60 + members.length * 20);

    return members.map((member, index) => {
        const angle = (2 * Math.PI * index) / members.length - Math.PI / 2;
        return {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
        };
    });
}

// Generate nodes from members
function generateNodes(members) {
    const positions = calculatePositions(members);
    return members.map((member, index) => ({
        id: member.id,
        type: 'member',
        position: positions[index],
        data: member
    }));
}

// Generate edges from members
function generateEdges(members) {
    const edges = [];
    for (let i = 0; i < members.length; i++) {
        for (let j = i + 1; j < members.length; j++) {
            const score = getCompatibility(members[i].mbtiType, members[j].mbtiType);
            edges.push({
                id: `${members[i].id}-${members[j].id}`,
                source: members[i].id,
                target: members[j].id,
                style: {
                    stroke: getEdgeColor(score),
                    strokeWidth: score,
                    opacity: 0.6
                },
                data: { score, member1: members[i], member2: members[j] }
            });
        }
    }
    return edges;
}

export default function TeamMap({ members, onSelectPair }) {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    // Update nodes and edges when members change
    useEffect(() => {
        setNodes(generateNodes(members));
        setEdges(generateEdges(members));
    }, [members]);

    const onEdgeClick = useCallback((event, edge) => {
        if (edge.data) {
            onSelectPair(edge.data.member1, edge.data.member2);
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
            <div className="team-map-container">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onEdgeClick={onEdgeClick}
                    nodeTypes={nodeTypes}
                    fitView
                    fitViewOptions={{ padding: 0.3 }}
                    proOptions={{ hideAttribution: true }}
                    nodesDraggable={true}
                    nodesConnectable={false}
                    elementsSelectable={true}
                >
                    <Controls />
                    <Background color="var(--color-border)" gap={20} />
                </ReactFlow>
            </div>
        </div>
    );
}
