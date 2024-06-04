import seedrandom from 'seedrandom'; // npm install seedrandom

// 학생 목록 정의
const students = [
    '간현진',
    '강민준',
    '곽노찬',
    '김재한',
    '김제홍',
    '김현섭',
    '문희원',
    '박성연',
    '박성은',
    '서윤오',
    '송민영',
    '이채린',
    '장수진',
    '조민경',
    '최은미',
    '하성원',
    '황영진',
];

// 시드 설정
const rng = seedrandom('20240604');

// Fisher-Yates 알고리즘을 사용한 무작위 순서 섞기
const shuffle = (array, rng) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        // 무작위 인덱스를 생성
        randomIndex = Math.floor(rng() * currentIndex);
        currentIndex--;

        // 현재 요소와 무작위 요소를 교환
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
};

// 학생 목록을 무작위로 섞기
const shuffledStudents = shuffle(students, rng);

// 발표 순서 출력
console.log('Presentation Order:');
shuffledStudents.forEach((student, index) => {
    console.log(`${index + 1}. ${student}`);
});