// MBTI Types and Compatibility Data
// Based on cognitive function theory

export const MBTI_TYPES = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',  // Analysts
    'INFJ', 'INFP', 'ENFJ', 'ENFP',  // Diplomats
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',  // Sentinels
    'ISTP', 'ISFP', 'ESTP', 'ESFP'   // Explorers
];

export const MBTI_GROUPS = {
    analysts: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
    diplomats: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
    sentinels: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
    explorers: ['ISTP', 'ISFP', 'ESTP', 'ESFP']
};

export const GROUP_NAMES = {
    analysts: '分析家',
    diplomats: '外交官',
    sentinels: '番人',
    explorers: '探検家'
};

export const MBTI_DESCRIPTIONS = {
    INTJ: { name: '建築家', desc: '戦略的で独立心が強い思想家' },
    INTP: { name: '論理学者', desc: '革新的な発明家で、知識を渇望する' },
    ENTJ: { name: '指揮官', desc: '大胆で想像力豊かな強い意志のリーダー' },
    ENTP: { name: '討論者', desc: '知的な挑戦を愛する賢くて好奇心旺盛な思想家' },
    INFJ: { name: '提唱者', desc: '静かで神秘的だが、とても鼓舞的で理想主義的' },
    INFP: { name: '仲介者', desc: '詩的で親切、利他的、常に良い目的のために熱心' },
    ENFJ: { name: '主人公', desc: 'カリスマ的で鼓舞的なリーダー、聴衆を魅了する' },
    ENFP: { name: '運動家', desc: '熱心で創造的、社交的な自由人' },
    ISTJ: { name: '管理者', desc: '実用的で事実重視、信頼性が高い' },
    ISFJ: { name: '擁護者', desc: '非常に献身的で温かい保護者' },
    ESTJ: { name: '幹部', desc: '優秀な管理者、物事や人を管理する能力が高い' },
    ESFJ: { name: '領事', desc: '思いやりがあり社交的で人気者' },
    ISTP: { name: '巨匠', desc: '大胆で実践的な実験者、あらゆるツールの達人' },
    ISFP: { name: '冒険家', desc: '柔軟で魅力的な芸術家、新しい経験を探求する' },
    ESTP: { name: '起業家', desc: 'スマートでエネルギッシュ、非常に知覚的' },
    ESFP: { name: 'エンターテイナー', desc: '自発的でエネルギッシュ、人生を楽しむ' }
};

// Get the group name for an MBTI type
export function getGroupForType(type) {
    for (const [group, types] of Object.entries(MBTI_GROUPS)) {
        if (types.includes(type)) return group;
    }
    return 'analysts';
}

// Compatibility matrix (1-5 scale)
// Based on cognitive function compatibility theory
const COMPATIBILITY_MATRIX = {
    // Analysts (NT)
    INTJ: { INTJ: 3, INTP: 4, ENTJ: 4, ENTP: 5, INFJ: 4, INFP: 3, ENFJ: 4, ENFP: 5, ISTJ: 3, ISFJ: 2, ESTJ: 3, ESFJ: 2, ISTP: 4, ISFP: 2, ESTP: 3, ESFP: 2 },
    INTP: { INTJ: 4, INTP: 3, ENTJ: 5, ENTP: 4, INFJ: 3, INFP: 4, ENFJ: 5, ENFP: 4, ISTJ: 3, ISFJ: 2, ESTJ: 4, ESFJ: 2, ISTP: 4, ISFP: 3, ESTP: 4, ESFP: 2 },
    ENTJ: { INTJ: 4, INTP: 5, ENTJ: 3, ENTP: 4, INFJ: 4, INFP: 5, ENFJ: 4, ENFP: 4, ISTJ: 4, ISFJ: 3, ESTJ: 4, ESFJ: 3, ISTP: 5, ISFP: 3, ESTP: 4, ESFP: 3 },
    ENTP: { INTJ: 5, INTP: 4, ENTJ: 4, ENTP: 3, INFJ: 5, INFP: 4, ENFJ: 4, ENFP: 4, ISTJ: 2, ISFJ: 2, ESTJ: 3, ESFJ: 2, ISTP: 4, ISFP: 3, ESTP: 4, ESFP: 3 },
    // Diplomats (NF)
    INFJ: { INTJ: 4, INTP: 3, ENTJ: 4, ENTP: 5, INFJ: 3, INFP: 4, ENFJ: 4, ENFP: 5, ISTJ: 2, ISFJ: 3, ESTJ: 2, ESFJ: 3, ISTP: 2, ISFP: 4, ESTP: 2, ESFP: 3 },
    INFP: { INTJ: 3, INTP: 4, ENTJ: 5, ENTP: 4, INFJ: 4, INFP: 3, ENFJ: 5, ENFP: 4, ISTJ: 2, ISFJ: 3, ESTJ: 2, ESFJ: 3, ISTP: 2, ISFP: 4, ESTP: 2, ESFP: 4 },
    ENFJ: { INTJ: 4, INTP: 5, ENTJ: 4, ENTP: 4, INFJ: 4, INFP: 5, ENFJ: 3, ENFP: 4, ISTJ: 3, ISFJ: 4, ESTJ: 3, ESFJ: 4, ISTP: 3, ISFP: 5, ESTP: 3, ESFP: 4 },
    ENFP: { INTJ: 5, INTP: 4, ENTJ: 4, ENTP: 4, INFJ: 5, INFP: 4, ENFJ: 4, ENFP: 3, ISTJ: 2, ISFJ: 3, ESTJ: 2, ESFJ: 3, ISTP: 3, ISFP: 4, ESTP: 3, ESFP: 4 },
    // Sentinels (SJ)
    ISTJ: { INTJ: 3, INTP: 3, ENTJ: 4, ENTP: 2, INFJ: 2, INFP: 2, ENFJ: 3, ENFP: 2, ISTJ: 3, ISFJ: 4, ESTJ: 4, ESFJ: 5, ISTP: 4, ISFP: 3, ESTP: 5, ESFP: 3 },
    ISFJ: { INTJ: 2, INTP: 2, ENTJ: 3, ENTP: 2, INFJ: 3, INFP: 3, ENFJ: 4, ENFP: 3, ISTJ: 4, ISFJ: 3, ESTJ: 5, ESFJ: 4, ISTP: 3, ISFP: 4, ESTP: 4, ESFP: 5 },
    ESTJ: { INTJ: 3, INTP: 4, ENTJ: 4, ENTP: 3, INFJ: 2, INFP: 2, ENFJ: 3, ENFP: 2, ISTJ: 4, ISFJ: 5, ESTJ: 3, ESFJ: 4, ISTP: 5, ISFP: 3, ESTP: 4, ESFP: 4 },
    ESFJ: { INTJ: 2, INTP: 2, ENTJ: 3, ENTP: 2, INFJ: 3, INFP: 3, ENFJ: 4, ENFP: 3, ISTJ: 5, ISFJ: 4, ESTJ: 4, ESFJ: 3, ISTP: 4, ISFP: 5, ESTP: 4, ESFP: 4 },
    // Explorers (SP)
    ISTP: { INTJ: 4, INTP: 4, ENTJ: 5, ENTP: 4, INFJ: 2, INFP: 2, ENFJ: 3, ENFP: 3, ISTJ: 4, ISFJ: 3, ESTJ: 5, ESFJ: 4, ISTP: 3, ISFP: 4, ESTP: 4, ESFP: 5 },
    ISFP: { INTJ: 2, INTP: 3, ENTJ: 3, ENTP: 3, INFJ: 4, INFP: 4, ENFJ: 5, ENFP: 4, ISTJ: 3, ISFJ: 4, ESTJ: 3, ESFJ: 5, ISTP: 4, ISFP: 3, ESTP: 5, ESFP: 4 },
    ESTP: { INTJ: 3, INTP: 4, ENTJ: 4, ENTP: 4, INFJ: 2, INFP: 2, ENFJ: 3, ENFP: 3, ISTJ: 5, ISFJ: 4, ESTJ: 4, ESFJ: 4, ISTP: 4, ISFP: 5, ESTP: 3, ESFP: 4 },
    ESFP: { INTJ: 2, INTP: 2, ENTJ: 3, ENTP: 3, INFJ: 3, INFP: 4, ENFJ: 4, ENFP: 4, ISTJ: 3, ISFJ: 5, ESTJ: 4, ESFJ: 4, ISTP: 5, ISFP: 4, ESTP: 4, ESFP: 3 }
};

// Get compatibility score between two types
export function getCompatibility(type1, type2) {
    return COMPATIBILITY_MATRIX[type1]?.[type2] ?? 3;
}

// Get compatibility description
export function getCompatibilityDescription(type1, type2) {
    const score = getCompatibility(type1, type2);
    const desc1 = MBTI_DESCRIPTIONS[type1];
    const desc2 = MBTI_DESCRIPTIONS[type2];

    const descriptions = {
        5: `${desc1.name}と${desc2.name}は理想的な組み合わせです。認知機能が補完し合い、お互いの強みを引き出すことができます。コミュニケーションも自然で、深い理解が生まれやすい関係です。`,
        4: `${desc1.name}と${desc2.name}は良好な相性です。基本的な価値観や考え方に共通点があり、協力しやすい関係を築けます。多少の違いはありますが、それがかえってチームに多様性をもたらします。`,
        3: `${desc1.name}と${desc2.name}は標準的な相性です。大きな問題なく協力できますが、お互いの違いを意識的に理解する努力が必要かもしれません。`,
        2: `${desc1.name}と${desc2.name}は挑戦的な組み合わせです。考え方やアプローチが異なるため、最初は理解し合うのに時間がかかるかもしれません。しかし、この違いを乗り越えれば、お互いから多くを学べる関係になります。`,
        1: `${desc1.name}と${desc2.name}は正反対の特性を持つ組み合わせです。相互理解には相当な努力が必要ですが、異なる視点を持つことでチーム全体のバランスを取る役割を果たせます。`
    };

    return descriptions[score];
}

// Get score label
export function getScoreLabel(score) {
    const labels = {
        5: '最高の相性',
        4: '良好',
        3: '普通',
        2: '成長の機会',
        1: 'チャレンジング'
    };
    return labels[score] || '普通';
}

// Convert 1-5 scale to 0-100 scale
export function getScore100(type1, type2) {
    const score = getCompatibility(type1, type2);
    // Map: 1->20, 2->40, 3->60, 4->80, 5->100
    return score * 20;
}

// Get score label for 0-100 scale
export function getScoreLabel100(score) {
    if (score >= 90) return { label: 'ベストマッチ', class: 'best-match', emoji: '⭐' };
    if (score >= 75) return { label: '良好', class: 'good', emoji: '👍' };
    if (score >= 55) return { label: '普通', class: 'normal', emoji: '😊' };
    if (score >= 35) return { label: '要注意', class: 'caution', emoji: '⚠️' };
    return { label: 'カオスコンビ', class: 'chaos', emoji: '🔥' };
}

// Get score color for progress bar
export function getScoreColor(score) {
    if (score >= 90) return '#10b981';
    if (score >= 75) return '#34d399';
    if (score >= 55) return '#fbbf24';
    if (score >= 35) return '#f97316';
    return '#ef4444';
}

// Detailed compatibility data for pair analysis
const PAIR_DETAILS = {
    // Default templates based on score
    templates: {
        5: {
            summary: 'このペアは理想的な補完関係にあり、お互いの強みを最大限に活かせます。',
            good: [
                '自然なコミュニケーションが取れる',
                'お互いの考え方を直感的に理解できる',
                '協力することで1+1=3以上の成果を生み出せる'
            ],
            caution: [
                '相性が良すぎて馴れ合いになる可能性',
                '外部の意見を取り入れることを忘れずに'
            ],
            tips: [
                'お互いの強みを活かした役割分担を明確に',
                '定期的に成果を振り返り、改善点を共有する'
            ]
        },
        4: {
            summary: '良好な関係を築きやすいペアです。多少の違いがあっても、それがチームの多様性につながります。',
            good: [
                '基本的な価値観が共通している',
                '建設的な議論ができる',
                'お互いから学べることが多い'
            ],
            caution: [
                'アプローチの違いで意見が分かれることがある',
                '相手の視点を理解する努力が必要'
            ],
            tips: [
                '定期的に1on1でコミュニケーションを取る',
                '違いを強みとして捉えるマインドを持つ'
            ]
        },
        3: {
            summary: 'バランスの取れた関係です。意識的なコミュニケーションを心がけることで、良好な協力関係を築けます。',
            good: [
                '異なる視点をチームにもたらせる',
                '中立的な立場で協力できる',
                '大きな衝突は起きにくい'
            ],
            caution: [
                'お互いの考え方の違いを理解する必要がある',
                '暗黙の了解が通じにくい場合がある'
            ],
            tips: [
                '明確なコミュニケーションを心がける',
                '期待値を事前にすり合わせる',
                '相手の良い点を積極的に見つける'
            ]
        },
        2: {
            summary: '挑戦的な組み合わせですが、違いを乗り越えることで大きな成長が期待できます。',
            good: [
                '全く異なる視点をチームに提供できる',
                '盲点を補い合える可能性がある',
                '成長の機会が多い'
            ],
            caution: [
                'コミュニケーションに齟齬が生じやすい',
                '価値観の違いで衝突する可能性',
                '相手の行動が理解しづらい場合がある'
            ],
            tips: [
                '相手の行動の意図を確認する習慣をつける',
                '共通の目標を明確に設定する',
                '第三者のファシリテーションを活用する'
            ]
        },
        1: {
            summary: '正反対の特性を持つペアです。相互理解には努力が必要ですが、チーム全体のバランスを取る重要な役割を果たせます。',
            good: [
                'チームに必要な多様性を提供',
                'お互いの盲点を完全にカバーできる',
                '成功すれば非常に強力なペアになる'
            ],
            caution: [
                '根本的な価値観の違いがある',
                '誤解が生じやすい',
                'ストレスが溜まりやすい関係'
            ],
            tips: [
                '共通点を意識的に見つける努力をする',
                '短い会議を頻繁に行い、認識を合わせる',
                'お互いの専門領域を尊重する',
                '衝突した時は一度冷却期間を置く'
            ]
        }
    }
};

// Get detailed compatibility analysis for a pair
export function getDetailedCompatibility(type1, type2) {
    const score = getCompatibility(type1, type2);
    const score100 = getScore100(type1, type2);
    const labelInfo = getScoreLabel100(score100);
    const template = PAIR_DETAILS.templates[score];
    const desc1 = MBTI_DESCRIPTIONS[type1];
    const desc2 = MBTI_DESCRIPTIONS[type2];

    return {
        score: score100,
        label: labelInfo.label,
        labelClass: labelInfo.class,
        emoji: labelInfo.emoji,
        color: getScoreColor(score100),
        summary: `${desc1.name}と${desc2.name}：${template.summary}`,
        good: template.good,
        caution: template.caution,
        tips: template.tips
    };
}
