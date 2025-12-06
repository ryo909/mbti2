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
