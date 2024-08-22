export function getDay(str)
{
    let day = "";
    switch(str)
    {
        case 0:
            day = "일요일"
            break;
        case 1:
            day = "월요일"
            break;
        case 2:
            day = "화요일"
            break;
        case 3:
            day = "수요일"
            break;
        case 4:
            day = "목요일"
            break;
        case 5:
            day = "금요일"
            break;            
        case 6:
            day = "토요일"
            break;    
    }
    return day;
}

export const choicRankingCategory = {
    skinCare : [
        "전체", "스킨/토너", "로션/에멀젼", "에센스/앰플/세럼", 
        "페이스오일", "크림", "아이케어", "미스트",
        "젤", "스킨/토너 패드", "밤/멀티밤"
    ],
    cleanSing : [
        "전체", "클렌징 폼", "클렌징 워터", "클렌징 젤", "클렌징 오일",
        "클렌징 로션/ 크림", "클렌징 비누", "클렌징 티슈/패드", "립/아이 리무버",
        "스크럽/필링", "스크럽/필링 패드", "클렌징 파우더", "클렌징 밤"
    ],
    maskPack : [
        "전체", "시트마스크", "부분마스크/팩", "워시오프 팩",
        "필오프 팩", "슬리핑팩", "코팩", "부분마스크 패드"
    ],
    sunCare : [
        "전체", "선크림/로션", "선스프레이", "선케어 기타",
        "선스틱", "선쿠션/팩트"
    ],
    body : [
        "전체", "바디워시", "바디로션", "바디크림/젤",
        "바디오일/에센스", "바디스크럽", "바디미스트/샤워코롱",
        "핸드크림/밤", "풋케어", "입욕제", "여성청결제",
        "데오드란트", "바디기타", "바디케어 패드",
        "핸드워시", "핸드케어 기타",
    ],
    hair : [
        "전체", "샴푸", "린스/컨디셔너", "헤어에센스/오일", "헤어미스트",
        "스타일링", "헤어컬러링", "트리트먼트/팩", "두피 스케일러",
    ],
    nail : [
        "전체", "네일컬러", "네일케어", "네일리무버 ",
    ],
    perfume : [
        "전체", "여성향수", "남성향수", "리빙퍼퓸"
    ],
    other : [
        "전체", "물티슈", "기타"
    ],

}

export const titleList = [
    "카테고리 전체", "스킨케어", "클랜징/필링", "마스크/팩", "선케어", 
    "바디", "헤어", "네일", "향수", "기타"
]

export const userTypeList = [
    '건성', '지성', '복합성', '민감성', '중성'
]

export const userAgeList = [
    '10대', '20대', '30대', '40대', "50대~"
]

export const isStrCheck = (str) => {
    let isCheck = false;
    if(userTypeList.indexOf(str) !== -1)
    {
        return !isCheck;
    }

    if(userAgeList.indexOf(str) !== -1)
    {
        return !isCheck;
    }
}

