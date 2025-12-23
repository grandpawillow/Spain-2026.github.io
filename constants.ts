
import { DayItinerary } from './types';

export const ITINERARY_DATA: DayItinerary[] = [
    {
        day: 0,
        date: "行前準備",
        title: "西班牙之旅準備事項",
        events: [
            {
                id: "d0-e1",
                time: "交通",
                description: "Renfe 訂票教學",
                location: "官網訂票",
                mapUrl: "https://www.renfe.com/",
                details: "西班牙國鐵 Renfe 訂票教學、官網訂票、西班牙國鐵搭乘心得。"
            },
            {
                id: "d0-e2",
                time: "景點",
                description: "自由行攻略整理",
                location: "網誌",
                mapUrl: "https://www.bring-you.info/zh-tw/spain-travel-guide",
                details: "2025 西班牙自由行攻略｜精選必去西班牙景點、行程安排與美食推薦全攻略。"
            },
            {
                id: "d0-e3",
                time: "裝備",
                description: "防盜袋 & 手機繩",
                location: "網購",
                mapUrl: "",
                details: "Branden 斜畔&細袋, New Protective case ✅, 手機手繩 ❓"
            }
        ]
    },
    {
        day: 1,
        date: "4/6 (一)",
        title: "啟程前往西班牙",
        events: [
            {
                id: "d1-e1",
                time: "12:40",
                description: "香港出發 (HKG)",
                location: "香港國際機場",
                mapUrl: "",
                details: "Bye HK! 準備迎接西班牙之旅。"
            }
        ]
    },
    {
        day: 2,
        date: "4/7 (二)",
        title: "抵達巴塞隆拿",
        events: [
            {
                id: "d2-e1",
                time: "09:25",
                description: "抵達巴塞隆拿 (BCN)",
                location: "Josep Tarradellas Airport",
                mapUrl: "https://maps.app.goo.gl/9ZpLgE4g4g4g4g4g4",
                details: "WE HAVE ARRIVED! 巴塞隆拿-埃爾普拉特機場。"
            },
            {
                id: "d2-e2",
                time: "11:00",
                description: "入住/寄存行李",
                location: "巴塞隆拿中心公寓",
                mapUrl: "",
                details: "入住 Catalunya (L'Hospitalet de Llobregat) 整間出租單位。"
            },
            {
                id: "d2-e3",
                time: "14:00",
                description: "巴特略之家 Casa Batlló",
                location: "Passeig de Gràcia, 43",
                mapUrl: "https://maps.app.goo.gl/r6R6R6R6R6R6R6R6R",
                details: "高第建築：最漂亮、最上鏡的建築。門票：成人 24.5€ 起。",
                websiteUrl: "https://www.casabatllo.es/"
            },
            {
                id: "d2-e4",
                time: "16:00",
                description: "格拉西亞大道購物",
                location: "Passeig de Gràcia",
                mapUrl: "",
                details: "巴塞隆拿購物街，有眾多知名景點及品牌。"
            },
            {
                id: "d2-e5",
                time: "19:00",
                description: "晚餐：Les Quinze Nits",
                location: "Plaça Reial, 6",
                mapUrl: "",
                details: "海鮮燉飯名店，位於皇家廣場。"
            }
        ]
    },
    {
        day: 3,
        date: "4/8 (三)",
        title: "高第藝術深度遊",
        events: [
            {
                id: "d3-e1",
                time: "09:30",
                description: "聖家堂 Sagrada Família",
                location: "巴塞隆拿聖家堂",
                mapUrl: "",
                details: "必看景點。高第未竟之作。"
            },
            {
                id: "d3-e2",
                time: "12:30",
                description: "奎爾公園 Park Güell",
                location: "Park Güell",
                mapUrl: "",
                details: "色彩繽紛的馬賽克建築與俯瞰市景。"
            },
            {
                id: "d3-e3",
                time: "15:00",
                description: "文生之家 Casa Vicens",
                location: "Casa Vicens",
                mapUrl: "",
                details: "穆德哈爾風格，高第首件重要作品。"
            },
            {
                id: "d3-e4",
                time: "17:00",
                description: "米拉之家 La Pedrera",
                location: "Passeig de Gràcia, 92",
                mapUrl: "",
                details: "建築結構最有趣。門票：成人 22€ 起。"
            }
        ]
    },
    {
        day: 4,
        date: "4/9 (四)",
        title: "蒙特塞拉特山脈",
        events: [
            {
                id: "d4-e1",
                time: "09:00",
                description: "Monistrol de Montserrat",
                location: "Montserrat",
                mapUrl: "",
                details: "西班牙聖山，靈修與自然交織。可參觀黑面聖母。"
            }
        ]
    },
    {
        day: 5,
        date: "4/10 (五)",
        title: "Outlet 購物趣",
        events: [
            {
                id: "d5-e1",
                time: "10:00",
                description: "La Roca Village",
                location: "Outlet",
                mapUrl: "",
                details: "歐洲超強大Outlet集團，精品林立，動線完整。"
            },
            {
                id: "d5-e2",
                time: "14:00",
                description: "Nike Factory Store",
                location: "Barcelona",
                mapUrl: "",
                details: "買好搭多Nike鞋。"
            }
        ]
    },
    {
        day: 6,
        date: "4/11 (六)",
        title: "藝術與夜景",
        events: [
            {
                id: "d6-e1",
                time: "11:00",
                description: "加泰隆尼亞國家藝術博物館",
                location: "MNAC",
                mapUrl: "",
                details: "宮殿式建築，山丘上的博物館。有免費燈光噴泉演出。"
            },
            {
                id: "d6-e2",
                time: "15:00",
                description: "Arenas de Barcelona",
                location: "Arenas",
                mapUrl: "",
                details: "鬥牛場改建的購物中心，頂樓可眺望西班牙廣場美景。"
            }
        ]
    },
    {
        day: 7,
        date: "4/12 (日)",
        title: "移師塞維亞",
        events: [
            {
                id: "d7-e1",
                time: "09:25",
                description: "飛往塞維亞 (SVQ)",
                location: "BCN -> SVQ",
                mapUrl: "",
                details: "預計航班 IB1752，1小時10分鐘。"
            },
            {
                id: "d7-e2",
                time: "11:00",
                description: "抵達塞維亞機場",
                location: "Seville Airport",
                mapUrl: "",
                details: "塞維亞機場機場建築設計受清真寺影響。"
            },
            {
                id: "d7-e3",
                time: "14:00",
                description: "西班牙廣場 Plaza de España",
                location: "Seville",
                mapUrl: "",
                details: "西班牙最美廣場之一，濃厚藝術氣息與藝術陶瓷。"
            },
            {
                id: "d7-e4",
                time: "16:00",
                description: "瑪麗亞路易莎公園",
                location: "Parque de María Luisa",
                mapUrl: "",
                details: "綠意盎然的大公園。"
            }
        ]
    },
    {
        day: 8,
        date: "4/13 (一)",
        title: "塞維亞經典古蹟",
        events: [
            {
                id: "d8-e1",
                time: "09:30",
                description: "塞維亞王宮 Royal Alcázar",
                location: "Seville",
                mapUrl: "",
                details: "歐洲最古老皇家宮殿，《冰與火之歌》取景地。*星期一免費入場(需預約)。"
            },
            {
                id: "d8-e2",
                time: "13:00",
                description: "聖十字區 Santa Cruz",
                location: "Seville",
                mapUrl: "",
                details: "塞維亞最靚、最迷人的小巷區域。"
            },
            {
                id: "d8-e3",
                time: "15:00",
                description: "塞維亞主教座堂",
                location: "Catedral de Sevilla",
                mapUrl: "",
                details: "世界最大哥德式教堂，有哥倫布靈柩及吉拉達塔。"
            }
        ]
    },
    {
        day: 9,
        date: "4/14 (二)",
        title: "黃金塔與佛朗明哥",
        events: [
            {
                id: "d9-e1",
                time: "10:00",
                description: "黃金塔 Torre del Oro",
                location: "Seville",
                mapUrl: "",
                details: "河畔防禦塔，可登頂跳望市景。"
            },
            {
                id: "d9-e2",
                time: "13:00",
                description: "佛朗明哥舞蹈博物館",
                location: "Flamenco Museum",
                mapUrl: "",
                details: "塞維亞是起源地，必看佛朗明哥表演。"
            },
            {
                id: "d9-e3",
                time: "16:00",
                description: "都市陽傘 Setas de Sevilla",
                location: "Metropol Parasol",
                mapUrl: "",
                details: "世界最大木結構建築，頂樓看夕陽絕佳。"
            }
        ]
    },
    {
        day: 10,
        date: "4/15 (三)",
        title: "前往馬德里",
        events: [
            {
                id: "d10-e1",
                time: "08:32",
                description: "搭火車前往馬德里 (MAD)",
                location: "AVE Train",
                mapUrl: "",
                details: "Sevilla-Santa Justa -> Madrid-Puerta De Atocha (約2小時40分)。"
            },
            {
                id: "d10-e2",
                time: "14:00",
                description: "馬德里王宮 Royal Palace",
                location: "Palacio Real",
                mapUrl: "",
                details: "氣派萬千的皇室宮殿。門票 12€。"
            },
            {
                id: "d10-e3",
                time: "17:00",
                description: "太陽門廣場 Puerta del Sol",
                location: "Madrid",
                mapUrl: "",
                details: "馬德里市中心，有熊與莓樹雕像。"
            }
        ]
    },
    {
        day: 11,
        date: "4/16 (四)",
        title: "馬德里公園與藝術",
        events: [
            {
                id: "d11-e1",
                time: "10:00",
                description: "麗池公園 El Retiro Park",
                location: "Madrid",
                mapUrl: "",
                details: "馬德里最大公園，有水晶宮。"
            },
            {
                id: "d11-e2",
                time: "14:00",
                description: "普拉多博物館 Museo del Prado",
                location: "Madrid",
                mapUrl: "",
                details: "世界頂級美術館，收藏維拉斯奎茲、哥雅作品。"
            },
            {
                id: "d11-e3",
                time: "17:00",
                description: "格蘭大道 Gran Vía",
                location: "Madrid",
                mapUrl: "",
                details: "購物、劇院集中地，馬德里最熱鬧的大道。"
            }
        ]
    },
    {
        day: 12,
        date: "4/17 (五)",
        title: "古城托雷多",
        events: [
            {
                id: "d12-e1",
                time: "09:00",
                description: "托雷多一日遊 Toledo",
                location: "Toledo",
                mapUrl: "",
                details: "中世紀古城，西班牙前首都。推薦必食炭烤豬肋排。"
            }
        ]
    },
    {
        day: 13,
        date: "4/18 (六)",
        title: "古蹟塞哥維亞",
        events: [
            {
                id: "d13-e1",
                time: "09:00",
                description: "塞哥維亞一日遊 Segovia",
                location: "Segovia",
                mapUrl: "",
                details: "著名景點：羅馬水道橋、迪士尼城堡原型。推薦必食烤乳豬。"
            }
        ]
    },
    {
        day: 14,
        date: "4/19 (日)",
        title: "馬德里跳蚤市場",
        events: [
            {
                id: "d14-e1",
                time: "10:00",
                description: "El Rastro 跳蚤市場",
                location: "Madrid",
                mapUrl: "",
                details: "週日限定，馬德里最著名跳蚤市場。千萬別錯過！"
            },
            {
                id: "d14-e2",
                time: "14:00",
                description: "Mercado de San Miguel",
                location: "聖米格爾市場",
                mapUrl: "",
                details: "馬德里最古老市場，各種 Tapas 小食。"
            }
        ]
    },
    {
        day: 15,
        date: "4/20 (一)",
        title: "告別西班牙",
        events: [
            {
                id: "d15-e1",
                time: "11:00",
                description: "Leaving Spain",
                location: "Airport",
                mapUrl: "",
                details: "前往機場準備回程。"
            }
        ]
    }
];

export const TRIP_INFO = {
    hotel: "Various Apartments",
    flights: "BCN 4/7, SVQ 4/12, MAD 4/15",
    preTrip: [
        { label: "Renfe 訂票", url: "https://www.renfe.com/" },
        { label: "巴塞隆拿攻略", url: "https://www.bring-you.info/zh-tw/spain-travel-guide" },
        { label: "王宮預約", url: "" }
    ],
    shopping: {
        title: "西班牙購物指南",
        desc: "巴塞隆拿格拉西亞大道及馬德里格蘭大道為主要熱點。",
        link: ""
    }
};
