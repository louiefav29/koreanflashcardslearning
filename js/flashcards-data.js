const defaultFlashcards = [
  {
    "id": 1,
    "korean": "안녕하세요",
    "romanization": "Annyeonghaseyo",
    "english": "Hello (formal)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 2,
    "korean": "감사합니다",
    "romanization": "Gamsahamnida",
    "english": "Thank you (formal)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 3,
    "korean": "미안합니다",
    "romanization": "Mianhamnida",
    "english": "I'm sorry (formal)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 4,
    "korean": "네",
    "romanization": "Ne",
    "english": "Yes/Okay",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 5,
    "korean": "아니요",
    "romanization": "Aniyo",
    "english": "No",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 6,
    "korean": "주세요",
    "romanization": "Juseyo",
    "english": "Please give me",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 7,
    "korean": "물",
    "romanization": "Mul",
    "english": "Water",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 8,
    "korean": "음식",
    "romanization": "Eumsik",
    "english": "Food",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 9,
    "korean": "사랑해요",
    "romanization": "Saranghaeyo",
    "english": "I love you (polite)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 10,
    "korean": "고마워요",
    "romanization": "Gomawoyo",
    "english": "Thank you (informal polite)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 11,
    "korean": "잘 자요",
    "romanization": "Jal jayo",
    "english": "Good night",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 12,
    "korean": "안녕히 주무세요",
    "romanization": "Annyeonghi jumuseyo",
    "english": "Good night (formal)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 13,
    "korean": "어디예요?",
    "romanization": "Eodiyeyo?",
    "english": "Where is it?",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 14,
    "korean": "얼마예요?",
    "romanization": "Eolmayeyo?",
    "english": "How much is it?",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 15,
    "korean": "이거 주세요",
    "romanization": "Igeo juseyo",
    "english": "Please give me this",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 16,
    "korean": "별",
    "romanization": "Byeol",
    "english": "Star",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 17,
    "korean": "가족",
    "romanization": "Gajok",
    "english": "Family",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 18,
    "korean": "친구",
    "romanization": "Chingu",
    "english": "Friend",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 19,
    "korean": "학교",
    "romanization": "Hakgyo",
    "english": "School",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 20,
    "korean": "선생님",
    "romanization": "Seonsaengnim",
    "english": "Teacher",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 21,
    "korean": "의사",
    "romanization": "Uisa",
    "english": "Doctor",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 22,
    "korean": "병원",
    "romanization": "Byeongwon",
    "english": "Hospital",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 23,
    "korean": "약국",
    "romanization": "Yakguk",
    "english": "Pharmacy",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 24,
    "korean": "버스",
    "romanization": "Beoseu",
    "english": "Bus",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 25,
    "korean": "지하철",
    "romanization": "Jihacheol",
    "english": "Subway",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 26,
    "korean": "공항",
    "romanization": "Gonghang",
    "english": "Airport",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 27,
    "korean": "호텔",
    "romanization": "Hotel",
    "english": "Hotel",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 28,
    "korean": "은행",
    "romanization": "Eunhaeng",
    "english": "Bank",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 29,
    "korean": "화장실",
    "romanization": "Hwajangsil",
    "english": "Restroom",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 30,
    "korean": "도서관",
    "romanization": "Doseogwan",
    "english": "Library",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 31,
    "korean": "영화관",
    "romanization": "Yeonghwagwan",
    "english": "Movie theater",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 32,
    "korean": "식당",
    "romanization": "Sikdang",
    "english": "Restaurant",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 33,
    "korean": "카페",
    "romanization": "Kape",
    "english": "Cafe",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 34,
    "korean": "슈퍼마켓",
    "romanization": "Syupeomaket",
    "english": "Supermarket",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 35,
    "korean": "책",
    "romanization": "Chaek",
    "english": "Book",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 36,
    "korean": "사랑",
    "romanization": "Sarang",
    "english": "Love",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 37,
    "korean": "행복",
    "romanization": "Haengbok",
    "english": "Happiness",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 38,
    "korean": "시간",
    "romanization": "Sigan",
    "english": "Time",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 39,
    "korean": "하늘",
    "romanization": "Haneul",
    "english": "Sky",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 40,
    "korean": "달",
    "romanization": "Dal",
    "english": "Moon",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 43,
    "korean": "학생",
    "romanization": "Haksaeng",
    "english": "Student",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 60,
    "korean": "사무실",
    "romanization": "Samusil",
    "english": "Office",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 61,
    "korean": "컴퓨터",
    "romanization": "Keompyuteo",
    "english": "Computer",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 62,
    "korean": "스마트폰",
    "romanization": "Seumateupon",
    "english": "Smartphone",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 63,
    "korean": "인터넷",
    "romanization": "Inteonet",
    "english": "Internet",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 64,
    "korean": "날씨",
    "romanization": "Nalssi",
    "english": "Weather",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 65,
    "korean": "비",
    "romanization": "Bi",
    "english": "Rain",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 66,
    "korean": "눈",
    "romanization": "Nun",
    "english": "Snow",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 67,
    "korean": "바람",
    "romanization": "Balam",
    "english": "Wind",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 68,
    "korean": "해",
    "romanization": "Hae",
    "english": "Sun",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 69,
    "korean": "구름",
    "romanization": "Gureum",
    "english": "Cloud",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 70,
    "korean": "날씨가 좋아요",
    "romanization": "Nalssi-ga joayo",
    "english": "The weather is nice",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 71,
    "korean": "추워요",
    "romanization": "Chuwoyo",
    "english": "It's cold",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 72,
    "korean": "더워요",
    "romanization": "Deowoyo",
    "english": "It's hot",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 73,
    "korean": "바빠요",
    "romanization": "Bappayo",
    "english": "I'm busy",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 74,
    "korean": "피곤해요",
    "romanization": "Pigonhaeyo",
    "english": "I'm tired",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 75,
    "korean": "기뻐요",
    "romanization": "Gippeoyo",
    "english": "I'm happy",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 76,
    "korean": "슬퍼요",
    "romanization": "Seulpeoyo",
    "english": "I'm sad",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 77,
    "korean": "배고파요",
    "romanization": "Baegopayo",
    "english": "I'm hungry",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 78,
    "korean": "목말라요",
    "romanization": "Mongmallayo",
    "english": "I'm thirsty",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 81,
    "korean": "커피",
    "romanization": "Keopi",
    "english": "Coffee",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 82,
    "korean": "공부하다",
    "romanization": "Gongbuhada",
    "english": "To study",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 85,
    "korean": "먹다",
    "romanization": "Meokda",
    "english": "To eat",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 86,
    "korean": "마시다",
    "romanization": "Masida",
    "english": "To drink",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 87,
    "korean": "사과",
    "romanization": "Sagwa",
    "english": "Apple",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 88,
    "korean": "바나나",
    "romanization": "Banana",
    "english": "Banana",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 89,
    "korean": "의자",
    "romanization": "Uija",
    "english": "Chair",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 90,
    "korean": "책상",
    "romanization": "Chaeksang",
    "english": "Desk",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 91,
    "korean": "아이구",
    "romanization": "Aigu",
    "english": "Oh my/Oh dear (expression of surprise or frustration)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 92,
    "korean": "아이고",
    "romanization": "Aigo",
    "english": "Oh my/Oh dear (similar to 아이구)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 93,
    "korean": "아이고 난",
    "romanization": "Aigo nan",
    "english": "Oh my goodness (more emphatic)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 94,
    "korean": "아이고 맙소사",
    "romanization": "Aigo mapsosa",
    "english": "Oh my God/Good heavens",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 95,
    "korean": "아이고 어쩌지",
    "romanization": "Aigo eojjeoji",
    "english": "Oh my, what should I do?",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 96,
    "korean": "가다",
    "romanization": "Gada",
    "english": "To go",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 97,
    "korean": "오다",
    "romanization": "Oda",
    "english": "To come",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 98,
    "korean": "다니다",
    "romanization": "Danida",
    "english": "To attend/To go regularly",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 99,
    "korean": "들어가다",
    "romanization": "Deureogada",
    "english": "To enter/To go in",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 100,
    "korean": "나가다",
    "romanization": "Nagada",
    "english": "To go out/To exit",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 101,
    "korean": "올라가다",
    "romanization": "Ollagada",
    "english": "To go up",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 102,
    "korean": "내려가다",
    "romanization": "Naeryeogada",
    "english": "To go down",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 103,
    "korean": "돌아가다",
    "romanization": "Doragada",
    "english": "To go back/To return",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 104,
    "korean": "지나가다",
    "romanization": "Jinagada",
    "english": "To go past/To pass by",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 105,
    "korean": "들어오다",
    "romanization": "Deureooda",
    "english": "To come in",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 107,
    "korean": "드시다",
    "romanization": "Deusida",
    "english": "To eat (honorific)",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 108,
    "korean": "식사하다",
    "romanization": "Siksahada",
    "english": "To have a meal (formal)",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 109,
    "korean": "맛있다",
    "romanization": "Masitda",
    "english": "Delicious/Tasty",
    "type": "adjective",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 110,
    "korean": "배고프다",
    "romanization": "Baegopeuda",
    "english": "To be hungry",
    "type": "adjective",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 111,
    "korean": "배부르다",
    "romanization": "Baebureuda",
    "english": "To be full (after eating)",
    "type": "adjective",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 112,
    "korean": "간식",
    "romanization": "Gansik",
    "english": "Snack",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 115,
    "korean": "맛있다",
    "romanization": "Masitda",
    "english": "It's delicious",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 116,
    "korean": "여보세요",
    "romanization": "Yeoboseyo",
    "english": "Hello? (when answering the phone) / Excuse me? (to get attention)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 117,
    "korean": "~ㅂ시다/~읍시다",
    "romanization": "~psida/~eupsida",
    "english": "Let's... (formal suggestion)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 118,
    "korean": "~자",
    "romanization": "~ja",
    "english": "Let's... (informal, among friends)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 119,
    "korean": "먹으러 갈까요?",
    "romanization": "Meogeureo galkkayo?",
    "english": "Shall we go eat?",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 120,
    "korean": "좋아요",
    "romanization": "Joayo",
    "english": "Good/I like it/Okay",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 121,
    "korean": "알았어",
    "romanization": "Arasseo",
    "english": "I see/Okay/Understood (casual)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 122,
    "korean": "알아",
    "romanization": "Ara",
    "english": "I know/I see (casual)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 123,
    "korean": "알아요",
    "romanization": "Arayo",
    "english": "I know/I understand (polite)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 124,
    "korean": "아름답다",
    "romanization": "Areumdapda",
    "english": "Beautiful (dictionary form)",
    "type": "adjective",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 125,
    "korean": "아름다워요",
    "romanization": "Areumdawoyo",
    "english": "It's beautiful (polite)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 126,
    "korean": "예쁘다",
    "romanization": "Yeppeuda",
    "english": "Pretty (dictionary form)",
    "type": "adjective",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 127,
    "korean": "예뻐요",
    "romanization": "Yeppeoyo",
    "english": "It's pretty (polite)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 128,
    "korean": "나",
    "romanization": "Na",
    "english": "I/Me (casual)",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 129,
    "korean": "저",
    "romanization": "Jeo",
    "english": "I/Me (humble/formal)",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 130,
    "korean": "너",
    "romanization": "Neo",
    "english": "You (casual, singular)",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 131,
    "korean": "당신",
    "romanization": "Dangsin",
    "english": "You (formal, can be rude if misused)",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 132,
    "korean": "우리",
    "romanization": "Uri",
    "english": "We/Our",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 133,
    "korean": "그",
    "romanization": "Geu",
    "english": "He/That (thing)",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 134,
    "korean": "그녀",
    "romanization": "Geunyeo",
    "english": "She (from English 'girl')",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 135,
    "korean": "그들",
    "romanization": "Geudeul",
    "english": "They",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 136,
    "korean": "이것",
    "romanization": "Igeot",
    "english": "This (thing)",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 137,
    "korean": "저것",
    "romanization": "Jeogeot",
    "english": "That (thing, over there)",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 138,
    "korean": "그를",
    "romanization": "Geureul",
    "english": "Him (object)",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 139,
    "korean": "그녀를",
    "romanization": "Geunyeoreul",
    "english": "Her (object)",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 140,
    "korean": "걔를/그를",
    "romanization": "Gyaereul/Geureul",
    "english": "Him (casual/formal object)",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 141,
    "korean": "걔를/그녀를",
    "romanization": "Gyaereul/Geunyeoreul",
    "english": "Her (casual/formal object)",
    "type": "pronoun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 142,
    "korean": "축하하다",
    "romanization": "Chukahada",
    "english": "To congratulate (dictionary form)",
    "type": "verb",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 143,
    "korean": "축하해요",
    "romanization": "Chukahaeyo",
    "english": "Congratulations (polite)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 144,
    "korean": "축하합니다",
    "romanization": "Chukahamnida",
    "english": "Congratulations (formal)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 145,
    "korean": "축하해",
    "romanization": "Chukahae",
    "english": "Congrats! (casual)",
    "type": "expression",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 146,
    "korean": "생일",
    "romanization": "Saengil",
    "english": "Birthday",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 147,
    "korean": "선물",
    "romanization": "Seonmul",
    "english": "Gift/Present",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 148,
    "korean": "파티",
    "romanization": "Pati",
    "english": "Party",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 149,
    "korean": "노래",
    "romanization": "Norae",
    "english": "Song",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 150,
    "korean": "춤",
    "romanization": "Chum",
    "english": "Dance",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 151,
    "korean": "음악",
    "romanization": "Eumak",
    "english": "Music",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 152,
    "korean": "영화",
    "romanization": "Yeonghwa",
    "english": "Movie",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 153,
    "korean": "배우",
    "romanization": "Baeu",
    "english": "Actor/Actress",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 154,
    "korean": "가수",
    "romanization": "Gasu",
    "english": "Singer",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 155,
    "korean": "그림",
    "romanization": "Geurim",
    "english": "Picture/Drawing",
    "type": "noun",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 156,
    "korean": "일",
    "romanization": "Il",
    "english": "One (Sino-Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 157,
    "korean": "이",
    "romanization": "I",
    "english": "Two (Sino-Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 158,
    "korean": "삼",
    "romanization": "Sam",
    "english": "Three (Sino-Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 159,
    "korean": "사",
    "romanization": "Sa",
    "english": "Four (Sino-Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 160,
    "korean": "오",
    "romanization": "O",
    "english": "Five (Sino-Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 161,
    "korean": "육",
    "romanization": "Yuk",
    "english": "Six (Sino-Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 162,
    "korean": "칠",
    "romanization": "Chil",
    "english": "Seven (Sino-Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 163,
    "korean": "팔",
    "romanization": "Pal",
    "english": "Eight (Sino-Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 164,
    "korean": "구",
    "romanization": "Gu",
    "english": "Nine (Sino-Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 165,
    "korean": "십",
    "romanization": "Sip",
    "english": "Ten (Sino-Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 166,
    "korean": "하나",
    "romanization": "Hana",
    "english": "One (Native Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 167,
    "korean": "둘",
    "romanization": "Dul",
    "english": "Two (Native Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 168,
    "korean": "셋",
    "romanization": "Set",
    "english": "Three (Native Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 169,
    "korean": "넷",
    "romanization": "Net",
    "english": "Four (Native Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 170,
    "korean": "다섯",
    "romanization": "Daseot",
    "english": "Five (Native Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 171,
    "korean": "여섯",
    "romanization": "Yeoseot",
    "english": "Six (Native Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 172,
    "korean": "일곱",
    "romanization": "Ilgop",
    "english": "Seven (Native Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 173,
    "korean": "여덟",
    "romanization": "Yeodeol",
    "english": "Eight (Native Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 174,
    "korean": "아홉",
    "romanization": "Ahop",
    "english": "Nine (Native Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  },
  {
    "id": 175,
    "korean": "열",
    "romanization": "Yeol",
    "english": "Ten (Native Korean)",
    "type": "number",
    "nextReview": 0,
    "interval": 1,
    "ease": 2.5
  }
];