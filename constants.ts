
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
                details: "西班牙國鐵 Renfe 建議提前購買。官網介面有時較難使用，建議先註冊帳號。早鳥票價最高可省 60%。",
                imageUrl: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca13?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d0-e2",
                time: "景點",
                description: "自由行攻略整理",
                location: "網誌",
                mapUrl: "https://www.bring-you.info/zh-tw/spain-travel-guide",
                details: "2026 西班牙自由行全攻略。包含各城市的治安注意事項（特別是巴塞隆拿的扒手）、必吃餐廳與省錢套票資訊。",
                imageUrl: "https://images.unsplash.com/photo-1509840144521-888971480028?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d0-e3",
                time: "裝備",
                description: "防盜袋 & 手機繩",
                location: "網購",
                mapUrl: "",
                details: "西班牙大城市扒手較多，強烈建議手機掛繩及隱形腰包。手機繩要選粗款防割，貴重財物建議放內袋。",
                imageUrl: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 1,
        date: "4/7 (二)",
        title: "抵達巴塞隆拿",
        events: [
            {
                id: "d1-e1",
                time: "09:25",
                description: "抵達巴塞隆拿 (BCN)",
                location: "機場",
                mapUrl: "https://maps.app.goo.gl/9ZpLgE4g4g4g4g4g4",
                details: "終於到啦！巴塞隆拿機場 (El Prat) 出關後可搭 Aerobús 或火車 R2N 進市區。第一天有 Jet lag 慢慢行，感受地中海氣息。",
                imageUrl: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d1-e2",
                time: "14:00",
                description: "格拉西亞大道 Passeig de Gràcia",
                location: "Passeig de Gràcia",
                mapUrl: "https://maps.app.goo.gl/PasseigDeGracia",
                details: "巴塞隆拿最豪華的街道。除了名牌店，也是欣賞建築藝術的精華區，高第的兩座名建築就在這條路上。",
                imageUrl: "https://images.unsplash.com/photo-1582281227099-c2c503023927?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d1-e3",
                time: "16:00",
                description: "英國宮百貨 El Corte Inglés",
                location: "加泰隆尼亞廣場",
                mapUrl: "https://maps.app.goo.gl/ElCorteIngles",
                details: "西班牙最大的百貨連鎖。推薦去頂樓的美食廣場，可以免費俯瞰加泰隆尼亞廣場 (Plaça de Catalunya) 的全景。",
                imageUrl: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d1-e4",
                time: "17:30",
                description: "聖卡特琳娜市場",
                location: "Mercat de Santa Caterina",
                mapUrl: "https://maps.app.goo.gl/SantaCaterina",
                details: "以彩色波浪屋頂聞名。比波蓋利亞市場更在地、不那麼擁擠。可以在這裡買些當季水果或火腿回住宿慢慢享用。",
                imageUrl: "https://images.unsplash.com/photo-1543084901-443376722c2a?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 2,
        date: "4/8 (三)",
        title: "高第之日 (1)",
        events: [
            {
                id: "d2-e1",
                time: "09:30",
                description: "奎爾公園 Park Güell",
                location: "Park Güell",
                mapUrl: "https://maps.app.goo.gl/ParkGuell",
                details: "原本是高檔住宅區開發案，後來變成魔幻般的公園。必看著名的彩色大蜥蜴和馬賽克長椅。從這裡看市景超美！",
                imageUrl: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d2-e2",
                time: "14:00",
                description: "文生之家 Casa Vicens Gaudí",
                location: "Carrer de les Carolines",
                mapUrl: "https://maps.app.goo.gl/CasaVicens",
                details: "高第的第一件重要作品。融合了伊斯蘭與穆德哈爾風格，使用了大量的磁磚與異國元素，是高第才華初露的轉捩點。",
                imageUrl: "https://images.unsplash.com/photo-1529154036614-a60975f5c760?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 3,
        date: "4/9 (四)",
        title: "蒙特塞拉特聖山",
        events: [
            {
                id: "d3-e1",
                time: "09:00",
                description: "Montserrat 蒙特塞拉特",
                location: "Montserrat",
                mapUrl: "https://maps.app.goo.gl/Montserrat",
                details: "距離巴塞隆拿約1小時車程。奇岩怪石的山坡上有著著名的修道院。一定要去參觀「黑面聖母」，並聽全世界最古老的少年合唱團演出。",
                imageUrl: "https://images.unsplash.com/photo-1558231021-171d5ff70661?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 4,
        date: "4/10 (五)",
        title: "高第之日 (2)",
        events: [
            {
                id: "d4-e1",
                time: "10:00",
                description: "米拉之家 La Pedrera",
                location: "Passeig de Gràcia, 92",
                mapUrl: "https://maps.app.goo.gl/LaPedrera",
                details: "被戲稱為「採石場」。其波浪狀的石造外觀和著名的煙囪頂樓（像星際大戰的武士）是最大亮點。夜間也有燈光秀演出。",
                imageUrl: "https://images.unsplash.com/photo-1579670498717-385567c8702c?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d4-e2",
                time: "14:00",
                description: "巴特略之家 Casa Batlló",
                location: "Passeig de Gràcia, 43",
                mapUrl: "https://maps.app.goo.gl/CasaBatllo",
                details: "充滿海洋氣息的建築，外觀像龍的鱗片，內部幾乎沒有直線。語音導覽結合了擴增實境 (AR)，非常精彩好玩。",
                imageUrl: "https://images.unsplash.com/photo-1590497184293-1996720f135b?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 6,
        date: "4/12 (日)",
        title: "塞維亞地標行程",
        events: [
            {
                id: "d6-e1",
                time: "10:00",
                description: "都市陽傘 Metropol Parasol",
                location: "Pl. de la Encarnación",
                mapUrl: "https://maps.app.goo.gl/MetropolParasol",
                details: "世界上最大的木結構建築，被當地人稱為「大蘑菇」。頂部的步道可以全方位俯瞰塞維亞老城區，一定要上去行吓。",
                imageUrl: "https://images.unsplash.com/photo-1628174780614-c2c62f275eb1?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d6-e2",
                time: "14:00",
                description: "西班牙廣場 Plaza de España",
                location: "Seville",
                mapUrl: "https://maps.app.goo.gl/PlazaDeEspana",
                details: "美得令人屏息的廣場，建築細節滿分。有護城河可以划船，還有代表西班牙各省的精美瓷磚。必看！",
                imageUrl: "https://images.unsplash.com/photo-1559564484-e48b3e040ff4?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d6-e3",
                time: "16:00",
                description: "瑪麗亞路易莎公園",
                location: "公園",
                mapUrl: "https://maps.app.goo.gl/MariaLuisaPark",
                details: "就在西班牙廣場對面，是一個充滿南國風情的花園，非常適合在炎熱的塞維亞下午找個陰影處歇一歇。",
                imageUrl: "https://images.unsplash.com/photo-1528660356133-77405e60802c?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 7,
        date: "4/13 (一)",
        title: "塞維亞經典古蹟",
        events: [
            {
                id: "d7-e1",
                time: "09:30",
                description: "塞維亞王宮 Alcázar",
                location: "Seville",
                mapUrl: "https://maps.app.goo.gl/RealAlcazar",
                details: "星期一有免費飛（要提早網上book）。它是歐洲最古老的皇家宮殿，穆德哈爾建築的極致表現，花園大到可以蕩失路。",
                imageUrl: "https://images.unsplash.com/photo-1590001158193-79013063870b?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d7-e2",
                time: "15:00",
                description: "塞維亞主教座堂",
                location: "Catedral",
                mapUrl: "https://maps.app.goo.gl/SevilleCathedral",
                details: "世界第三大教堂。哥倫布的靈柩就在這裡由四個國王抬著。還有著名的希拉達塔 (Giralda) 可以登頂看全景。",
                imageUrl: "https://images.unsplash.com/photo-1594806544079-99f57997996c?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 8,
        date: "4/14 (二)",
        title: "馬德里藝術之旅",
        events: [
            {
                id: "d8-e1",
                time: "11:00",
                description: "普拉多國家博物館",
                location: "Museo del Prado",
                mapUrl: "https://maps.app.goo.gl/PradoMuseum",
                details: "世界級美術館。必看維拉斯奎茲的《侍女圖》和哥雅的黑畫系列。建議預留至少3小時。",
                imageUrl: "https://images.unsplash.com/photo-1554907106-aa437f814674?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d8-e2",
                time: "15:00",
                description: "麗池公園 Retiro Park",
                location: "Retiro",
                mapUrl: "https://maps.app.goo.gl/RetiroPark",
                details: "馬德里的「肺」。水晶宮 (Palacio de Cristal) 在陽光下超美，還可以在人工湖上划船。",
                imageUrl: "https://images.unsplash.com/photo-1590002129524-73c33282b834?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 9,
        date: "4/15 (三)",
        title: "馬德里皇家風采",
        events: [
            {
                id: "d9-e1",
                time: "10:00",
                description: "馬德里王宮 Palacio Real",
                location: "Madrid",
                mapUrl: "https://maps.app.goo.gl/RoyalPalaceMadrid",
                details: "西歐最大的王宮，內部奢華至極。參觀時不能拍照，但絕對震撼。門票一定要先網上預訂。",
                imageUrl: "https://images.unsplash.com/photo-1563720223185-11003d5179bb?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d9-e2",
                time: "17:00",
                description: "太陽門廣場 Puerta del Sol",
                location: "中心廣場",
                mapUrl: "https://maps.app.goo.gl/PuertaDelSol",
                details: "馬德里的中心。必找「熊與莓樹」雕像和「零公里」地標。這裡是馬德里最熱鬧的逛街起點。",
                imageUrl: "https://images.unsplash.com/photo-1550133730-6954307507ef?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 10,
        date: "4/16 (四)",
        title: "古城托雷多",
        events: [
            {
                id: "d10-e1",
                time: "09:00",
                description: "Toledo 一日遊",
                location: "Toledo",
                mapUrl: "https://maps.app.goo.gl/Toledo",
                details: "靚到癲嘅近郊小鎮。整座城市都被列為世界遺產。它是基督徒、穆斯林與猶太教共存的「三文化之城」。",
                imageUrl: "https://images.unsplash.com/photo-1511210103770-0a370e0523f2?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 11,
        date: "4/17 (五)",
        title: "塞哥維亞古蹟",
        events: [
            {
                id: "d11-e1",
                time: "09:00",
                description: "Segovia 一日遊",
                location: "Segovia",
                mapUrl: "https://maps.app.goo.gl/Segovia",
                details: "必看著名的羅馬水道橋 (Aqueduct of Segovia)。還有據說是迪士尼城堡原型的阿爾卡薩城堡。中午一定要食著名的烤乳豬！",
                imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 13,
        date: "4/19 (日)",
        title: "市場與夕陽",
        events: [
            {
                id: "d13-e1",
                time: "10:00",
                description: "El Rastro 跳蚤市場",
                location: "Embajadores",
                mapUrl: "https://maps.app.goo.gl/ElRastro",
                details: "週日限定！是馬德里最大、最具歷史的跳蚤市場。可以在這裡挖到很多古董家具、藝術品或有趣的小玩意。",
                imageUrl: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d13-e2",
                time: "17:00",
                description: "德波神殿夕陽",
                location: "Temple of Debod",
                mapUrl: "https://maps.app.goo.gl/TempleDebod",
                details: "從埃及搬來的真實神殿。這裡是馬德里看夕陽最靚嘅地點。夕陽西下時神殿倒映在水面非常迷人。",
                imageUrl: "https://images.unsplash.com/photo-1628174780614-c2c62f275eb1?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 14,
        date: "4/20 (一)",
        title: "巴塞終極衝刺",
        events: [
            {
                id: "d14-e1",
                time: "09:30",
                description: "聖家堂 Sagrada Família",
                location: "Sagrada Família",
                mapUrl: "https://maps.app.goo.gl/SagradaFamilia",
                details: "高第的畢生心血。內部光影效果如同走入森林。一定要上塔，俯瞰巴塞隆拿的棋盤格城市景觀。",
                imageUrl: "https://images.unsplash.com/photo-1583779457094-0efa11891283?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    },
    {
        day: 15,
        date: "4/21 (二)",
        title: "Last Day 🥹",
        events: [
            {
                id: "d15-e1",
                time: "10:00",
                description: "加泰羅尼亞國家藝術博物館",
                location: "MNAC",
                mapUrl: "https://maps.app.goo.gl/MNAC",
                details: "壯觀的宮殿式建築。館內收藏了世界上最精美的羅曼式壁畫。從博物館門口看下去就是魔幻噴泉 (Magic Fountain)。",
                imageUrl: "https://images.unsplash.com/photo-1594917578763-71a74d412be6?auto=format&fit=crop&w=1000&q=80"
            },
            {
                id: "d15-e2",
                time: "13:00",
                description: "西班牙鬥牛場 Arenas",
                location: "Plaça d'Espanya",
                mapUrl: "https://maps.app.goo.gl/ArenasBCN",
                details: "由舊鬥牛場改裝而成的圓形商場。搭透明電梯上頂樓可以360度看風景，是最後影相的好地方。",
                imageUrl: "https://images.unsplash.com/photo-1533055640609-24b498dfd74c?auto=format&fit=crop&w=1000&q=80"
            }
        ]
    }
];

export const TRIP_INFO = {
    hotel: "Various Apartments",
    flights: "BCN 4/7, SVQ 4/11, MAD 4/14, BCN 4/19",
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
