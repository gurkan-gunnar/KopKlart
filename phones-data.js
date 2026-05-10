(function () {
  const storeRatings = {
    Apple: 4.7,
    Elgiganten: 4.6,
    Google: 4.8,
    Komplett: 4.5,
    NetOnNet: 4.4,
    OnePlus: 4.4,
    Power: 4.3,
    Samsung: 4.7,
    Webhallen: 4.7,
    Xiaomi: 4.3
  };

  const colorHex = {
    Svart: "#151515",
    Vit: "#f4f1ea",
    Blå: "#7c9ebd",
    Blåsvart: "#1e2d45",
    Desert: "#d2b089",
    Dimgrå: "#7b858e",
    Grön: "#8d9f84",
    Hazel: "#8c8a73",
    Korall: "#f06f62",
    Lavendel: "#cbb7e5",
    Peony: "#e7a1b6",
    Iris: "#8186c8",
    "Rose quartz": "#e8b8c8",
    Rosa: "#e8b4c6",
    Sand: "#d9cab4",
    Teal: "#4d9b9b",
    "Blågrön": "#4d9b9b",
    Ultramarin: "#5866d9",
    Lila: "#b8a7d8",
    Silver: "#d7d9dc",
    Grafit: "#3a3d42",
    Gul: "#f3de75",
    Guld: "#d9c28b",
    Orange: "#d96d2c",
    "Disblå": "#a8bfd4",
    "Salvia": "#b7c0a5",
    "Himmelsblå": "#b8d4e8",
    "Ljust guld": "#dbc79a",
    "Molnvit": "#f0ede7",
    "Rymdsvart": "#161719",
    "Kosmiskt orange": "#d06f35",
    "Djupblå": "#1d3557",
    Obsidian: "#1f2328",
    Porslin: "#eee8df",
    Frost: "#dce8ee",
    Indigo: "#33456f",
    "Marinblå": "#243451",
    Mint: "#b9d9c8",
    Titan: "#b8b2a8",
    "Titanium black": "#202124",
    "Titanium jetblack": "#09090b",
    "Titanium silverblue": "#9aa8b8",
    "Titanium whitesilver": "#d9dcdf",
    Jade: "#9fb9aa",
    Månsten: "#c5c9d6"
  };

  const images = {
    fallback: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-1.jpg",
    pixel10: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pixel_10_back_%28Indigo%29.svg/120px-Pixel_10_back_%28Indigo%29.svg.png",
    pixel10Pro: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Pixel_10_Pro_back_%28Moonstone%29.svg/120px-Pixel_10_Pro_back_%28Moonstone%29.svg.png",
    pixel10ProXl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Pixel_10_Pro_XL_back_%28Moonstone%29.svg/120px-Pixel_10_Pro_XL_back_%28Moonstone%29.svg.png",
    pixel9: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-1.jpg",
    pixel9Pro: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-1.jpg",
    pixel9ProXl: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-xl-1.jpg",
    pixelFold: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-fold-1.jpg",
    pixelA: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9a-1.jpg",
    pixel8: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-1.jpg",
    pixel8Pro: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-pro-1.jpg",
    pixel8a: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8a-1.jpg",
    pixel7: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel7-1.jpg",
    pixel7Pro: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel7-pro-1.jpg",
    pixel7a: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-7a-1.jpg",
    pixel6: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6-1.jpg",
    pixel6Pro: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6-pro-1.jpg",
    pixel6a: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-6a-1.jpg",
    samsungS: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/%E7%AC%AC%E4%B8%80%E6%89%8B%EF%BC%81Samsung_Galaxy_S25%E7%B3%BB%E5%88%97%E6%8B%BF%E5%88%B0%E4%BA%86%EF%BC%9A5%E4%B8%AA%E5%8D%87%E7%BA%A7%EF%BC%81S_Pen%E4%B8%8D%E6%94%AF%E6%8C%81%E8%93%9D%E7%89%99%E4%BA%86%EF%BC%9F_%282160p_50fps_VP9-96kbit_AAC%29-00.06.03.789.png/500px-%E7%AC%AC%E4%B8%80%E6%89%8B%EF%BC%81Samsung_Galaxy_S25%E7%B3%BB%E5%88%97%E6%8B%BF%E5%88%B0%E4%BA%86%EF%BC%9A5%E4%B8%AA%E5%8D%87%E7%BA%A7%EF%BC%81S_Pen%E4%B8%8D%E6%94%AF%E6%8C%81%E8%93%9D%E7%89%99%E4%BA%86%EF%BC%9F_%282160p_50fps_VP9-96kbit_AAC%29-00.06.03.789.png",
    samsungUltra: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Rear_view_of_the_Samsung_Galaxy_S25_Ultra_smartphone.jpg/360px-Rear_view_of_the_Samsung_Galaxy_S25_Ultra_smartphone.jpg",
    samsungEdge: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Samsung_Galaxy_S25_Edge_%282%29.jpg/450px-Samsung_Galaxy_S25_Edge_%282%29.jpg",
    samsungA: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a56-1.jpg",
    oneplusNord: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-nord4-1.jpg",
    redmiNote: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-14-5g-1.jpg",
    redmiNotePro: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-redmi-note-14-pro-5g-1.jpg"
  };

  const data = [
    {
      id: "pixel-10",
      brand: "Google Pixel",
      name: "Google Pixel 10",
      series: "Pixel 10",
      image: images.pixel10,
      basePrice: 10490,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Frost", "Indigo"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-10-5g-mobiltelefon-12128gb-frost/943512",
      storeUrls: {
        Google: "https://store.google.com/se/product/pixel_10",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-10/p-943512/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-10"
      },
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Obsidian",
          url: "https://www.komplett.se/product/1326842/mobil-tablets-klockor/mobiltelefoner/google-pixel-10-128gb-obsidian",
          requiredTerms: ["google", "pixel", "10", "128", "obsidian"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Frost",
          url: "https://www.komplett.se/product/1326840/mobil-tablets-klockor/mobiltelefoner/google-pixel-10-128gb-frost",
          requiredTerms: ["google", "pixel", "10", "128", "frost"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Indigo",
          url: "https://www.komplett.se/product/1326853/mobil-tablets-klockor/mobiltelefoner/google-pixel-10-128gb-indigo",
          requiredTerms: ["google", "pixel", "10", "128", "indigo"]
        },
        {
          store: "Komplett",
          storage: "256GB",
          color: "Obsidian",
          url: "https://www.komplett.se/product/1326827/mobil-tablets-klockor/mobiltelefoner/google-pixel-10-256gb-obsidian",
          requiredTerms: ["google", "pixel", "10", "256", "obsidian"]
        }
      ]
    },
    {
      id: "pixel-10-pro",
      brand: "Google Pixel",
      name: "Google Pixel 10 Pro",
      series: "Pixel 10",
      image: images.pixel10Pro,
      basePrice: 12990,
      storages: ["128GB", "256GB"],
      colors: ["Månsten", "Obsidian", "Porslin", "Jade"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-10-pro-5g-smartphone-128gb-mansten/943492",
      storeUrls: {
        Google: "https://store.google.com/se/product/pixel_10_pro",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-10-pro/p-943492/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-10-pro"
      },
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Porslin",
          url: "https://www.komplett.se/product/1326833/mobil-tablets-klockor/mobiltelefoner/google-pixel-10-pro-128gb-porcelain",
          requiredTerms: ["google", "pixel", "10", "pro", "128", "porcelain"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Månsten",
          url: "https://www.komplett.se/product/1326858/mobil-tablets-klockor/mobiltelefoner/google-pixel-10-pro-128gb-moonstone",
          requiredTerms: ["google", "pixel", "10", "pro", "128", "moonstone"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Obsidian",
          url: "https://www.komplett.se/product/1326848/mobil-tablets-klockor/mobiltelefoner/google-pixel-10-pro-128gb-obsidian",
          requiredTerms: ["google", "pixel", "10", "pro", "128", "obsidian"]
        },
        {
          store: "Komplett",
          storage: "256GB",
          color: "Porslin",
          url: "https://www.komplett.se/product/1326855/google-pixel-10-pro-256gb-porcelain",
          requiredTerms: ["google", "pixel", "10", "pro", "256", "porcelain"]
        }
      ]
    },
    {
      id: "pixel-10-pro-xl",
      brand: "Google Pixel",
      name: "Google Pixel 10 Pro XL",
      series: "Pixel 10",
      image: images.pixel10ProXl,
      basePrice: 15990,
      storages: ["256GB", "512GB"],
      colors: ["Porslin", "Jade", "Obsidian", "Månsten"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-10-pro-xl-5g-smartphone-16256gb-porslin/943488",
      storeUrls: {
        Google: "https://store.google.com/se/product/pixel_10_pro",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-10-pro-xl/p-943488/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-10-pro-xl"
      },
      exactOffers: [
        {
          store: "Komplett",
          storage: "256GB",
          color: "Porslin",
          url: "https://www.komplett.se/product/1326849/mobil-tablets-klockor/mobiltelefoner/google-pixel-10-pro-xl-256gb-porcelain",
          requiredTerms: ["google", "pixel", "10", "pro", "xl", "256", "porcelain"]
        },
        {
          store: "Komplett",
          storage: "256GB",
          color: "Månsten",
          url: "https://www.komplett.se/product/1326863/mobil-tablets-klockor/mobiltelefoner/google-pixel-10-pro-xl-256gb-moonstone",
          requiredTerms: ["google", "pixel", "10", "pro", "xl", "256", "moonstone"]
        },
        {
          store: "Komplett",
          storage: "256GB",
          color: "Obsidian",
          url: "https://www.komplett.se/product/1326836/mobil-tablets-klockor/mobiltelefoner/google-pixel-10-pro-xl-256gb-obsidian",
          requiredTerms: ["google", "pixel", "10", "pro", "xl", "256", "obsidian"]
        }
      ]
    },
    {
      id: "pixel-10-pro-fold",
      brand: "Google Pixel",
      name: "Google Pixel 10 Pro Fold",
      series: "Pixel Fold",
      image: images.pixelFold,
      basePrice: 21990,
      storages: ["256GB", "512GB"],
      colors: ["Månsten", "Jade", "Obsidian"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-10-pro-fold-5g-smartphone-16256gb-mansten/943530",
      storeUrls: {
        Google: "https://store.google.com/se/product/pixel_10_pro_fold",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-10-pro-fold/p-943530/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-10-pro-fold"
      }
    },
    {
      id: "pixel-10a",
      brand: "Google Pixel",
      name: "Google Pixel 10a",
      series: "Pixel A",
      image: images.pixelA,
      basePrice: 4990,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Frost", "Porslin"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-10a-5g-smartphone-8128-gb-obsidian/1027603",
      storeUrls: {
        Google: "https://store.google.com/se/product/pixel_10a",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-10a/p-1027603/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-10a"
      },
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Obsidian",
          url: "https://www.komplett.se/product/1334116/mobil-tablets-klockor/mobiltelefoner/google-pixel-10a-128gb-obsidian",
          requiredTerms: ["google", "pixel", "10a", "128", "obsidian"]
        }
      ]
    },
    {
      id: "pixel-9",
      brand: "Google Pixel",
      name: "Google Pixel 9",
      series: "Pixel 9",
      image: images.pixel9,
      basePrice: 7490,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Peony", "Grön", "Porslin"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-9-5g-smartphone-12128gb-obsidian/797296",
      storeUrls: {
        Google: "https://store.google.com/se/product/pixel_9",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-9/p-797296/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-9"
      },
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Obsidian",
          url: "https://www.komplett.se/product/1310737/mobil-tablets-klockor/mobiltelefoner/google-pixel-9-128gb-obsidian",
          requiredTerms: ["google", "pixel", "9", "128", "obsidian"]
        },
        {
          store: "Komplett",
          storage: "256GB",
          color: "Peony",
          url: "https://www.komplett.se/product/1310567/mobil-tablets-klockor/mobiltelefoner/google-pixel-9-256gb-peony",
          requiredTerms: ["google", "pixel", "9", "256", "peony"]
        }
      ]
    },
    {
      id: "pixel-9-pro",
      brand: "Google Pixel",
      name: "Google Pixel 9 Pro",
      series: "Pixel 9",
      image: images.pixel9Pro,
      basePrice: 10990,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Porslin", "Rose quartz", "Hazel"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-9-pro-5g-smartphone-16256gb-obsidian/797325",
      storeUrls: {
        Google: "https://store.google.com/se/product/pixel_9_pro",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-9-pro/p-797325/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-9-pro"
      },
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Rose quartz",
          url: "https://www.komplett.se/product/1310507/mobil-tablets-klockor/mobiltelefoner/google-pixel-9-pro-128gb-rose-quartz",
          requiredTerms: ["google", "pixel", "9", "pro", "128", "rose"]
        }
      ]
    },
    {
      id: "pixel-9-pro-xl",
      brand: "Google Pixel",
      name: "Google Pixel 9 Pro XL",
      series: "Pixel 9",
      image: images.pixel9ProXl,
      basePrice: 11990,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Porslin", "Rosa", "Hazel"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-9-pro-xl-5g-smartphone-16256gb-obsidian/797333",
      storeUrls: {
        Google: "https://store.google.com/se/product/pixel_9_pro",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-9-pro-xl/p-797333/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-9-pro-xl"
      },
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Obsidian",
          url: "https://www.komplett.se/product/1310486/mobil-tablets-klockor/mobiltelefoner/google-pixel-9-pro-xl-128gb-obsidian",
          requiredTerms: ["google", "pixel", "9", "pro", "xl", "128", "obsidian"]
        }
      ]
    },
    {
      id: "pixel-9-pro-fold",
      brand: "Google Pixel",
      name: "Google Pixel 9 Pro Fold",
      series: "Pixel Fold",
      image: images.pixelFold,
      basePrice: 16990,
      storages: ["256GB", "512GB"],
      colors: ["Obsidian", "Porslin"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-9-pro-fold-5g-smartphone-16256gb-obsidian/797347",
      storeUrls: {
        Google: "https://store.google.com/se/product/pixel_9_pro_fold",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-9-pro-fold/p-797347/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-9-pro-fold"
      }
    },
    {
      id: "pixel-9a",
      brand: "Google Pixel",
      name: "Google Pixel 9a",
      series: "Pixel A",
      image: images.pixelA,
      basePrice: 3790,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Porslin", "Peony", "Iris"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-9a-5g-smartphone-8128gb-obsidian/893867",
      storeUrls: {
        Google: "https://store.google.com/se/product/pixel_9a",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-9a/p-893867/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-9a"
      },
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Obsidian",
          url: "https://www.komplett.se/product/1322437/mobil-tablets-klockor/mobiltelefoner/google-pixel-9a-128gb-obsidian",
          requiredTerms: ["google", "pixel", "9a", "128", "obsidian"]
        },
        {
          store: "Komplett",
          storage: "256GB",
          color: "Obsidian",
          url: "https://www.komplett.se/product/1322436/mobil-tablets-klockor/mobiltelefoner/google-pixel-9a-256gb-obsidian",
          requiredTerms: ["google", "pixel", "9a", "256", "obsidian"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Porslin",
          url: "https://www.komplett.se/product/1322434/mobil-tablets-klockor/mobiltelefoner/google-pixel-9a-128gb-porslin",
          requiredTerms: ["google", "pixel", "9a", "128", "porslin"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Peony",
          url: "https://www.komplett.se/product/1322433/mobil-tablets-klockor/mobiltelefoner/google-pixel-9a-128gb-peony",
          requiredTerms: ["google", "pixel", "9a", "128", "peony"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Iris",
          url: "https://www.komplett.se/product/1322432/mobil-tablets-klockor/mobiltelefoner/google-pixel-9a-128gb-iris",
          requiredTerms: ["google", "pixel", "9a", "128", "iris"]
        }
      ]
    },
    {
      id: "pixel-8",
      brand: "Google Pixel",
      name: "Google Pixel 8",
      series: "Pixel 8",
      image: images.pixel8,
      basePrice: 6490,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Hazel", "Rosa"],
      url: "https://store.google.com/se/product/pixel_8",
      storeUrls: {
        Elgiganten: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-8-5g-smartphone-8128gb-obsidian/650467",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-8/p-650467/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-8"
      },
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Rosa",
          url: "https://www.komplett.se/product/1310495/mobil-tablets-klockor/mobiltelefoner/google-pixel-8-128gb-rosa",
          requiredTerms: ["google", "pixel", "8", "128", "rose"]
        }
      ]
    },
    {
      id: "pixel-8-pro",
      brand: "Google Pixel",
      name: "Google Pixel 8 Pro",
      series: "Pixel 8",
      image: images.pixel8Pro,
      basePrice: 8490,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Porslin", "Blå"],
      url: "https://store.google.com/se/product/pixel_8_pro",
      storeUrls: {
        Elgiganten: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-8-pro-5g-smartphone-12256gb-obsidian/650473",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-8-pro/p-650473/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-8-pro"
      },
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Porslin",
          url: "https://www.komplett.se/product/1310541/mobil-klockor/mobiltelefoner/google-pixel-8-pro-128gb-porcelain",
          requiredTerms: ["google", "pixel", "8", "pro", "128", "porcelain"]
        }
      ]
    },
    {
      id: "pixel-8a",
      brand: "Google Pixel",
      name: "Google Pixel 8a",
      series: "Pixel A",
      image: images.pixel8a,
      basePrice: 4490,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Porslin", "Blå", "Grön"],
      url: "https://store.google.com/se/product/pixel_8a",
      storeUrls: {
        Elgiganten: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-8a-5g-smartphone-8128gb-obsidian/767918",
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-8a/p-767918/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-8a"
      }
    },
    {
      id: "pixel-fold",
      brand: "Google Pixel",
      name: "Google Pixel Fold",
      series: "Pixel Fold",
      image: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-fold-1.jpg",
      basePrice: 15990,
      storages: ["256GB", "512GB"],
      colors: ["Obsidian", "Porslin"],
      url: "https://store.google.com/se/product/pixel_fold",
      storeUrls: {
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-fold/p-pixel-fold/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-fold"
      }
    },
    {
      id: "pixel-7",
      brand: "Google Pixel",
      name: "Google Pixel 7",
      series: "Pixel 7",
      image: images.pixel7,
      basePrice: 4990,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Vit", "Grön"],
      url: "https://store.google.com/se/product/pixel_7",
      storeUrls: {
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-7/p-pixel-7/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-7"
      }
    },
    {
      id: "pixel-7-pro",
      brand: "Google Pixel",
      name: "Google Pixel 7 Pro",
      series: "Pixel 7",
      image: images.pixel7Pro,
      basePrice: 6990,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Vit", "Hazel"],
      url: "https://store.google.com/se/product/pixel_7_pro",
      storeUrls: {
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-7-pro/p-pixel-7-pro/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-7-pro"
      }
    },
    {
      id: "pixel-7a",
      brand: "Google Pixel",
      name: "Google Pixel 7a",
      series: "Pixel A",
      image: images.pixel7a,
      basePrice: 3490,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Vit", "Blå", "Korall"],
      url: "https://store.google.com/se/product/pixel_7a",
      storeUrls: {
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-7a/p-pixel-7a/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-7a"
      }
    },
    {
      id: "pixel-6",
      brand: "Google Pixel",
      name: "Google Pixel 6",
      series: "Pixel 6",
      image: images.pixel6,
      basePrice: 3990,
      storages: ["128GB", "256GB"],
      colors: ["Svart", "Grön", "Rosa"],
      url: "https://store.google.com/se/product/pixel_6",
      storeUrls: {
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-6/p-pixel-6/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-6"
      }
    },
    {
      id: "pixel-6-pro",
      brand: "Google Pixel",
      name: "Google Pixel 6 Pro",
      series: "Pixel 6",
      image: images.pixel6Pro,
      basePrice: 5990,
      storages: ["128GB", "256GB"],
      colors: ["Svart", "Vit", "Guld"],
      url: "https://store.google.com/se/product/pixel_6_pro",
      storeUrls: {
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-6-pro/p-pixel-6-pro/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-6-pro"
      }
    },
    {
      id: "pixel-6a",
      brand: "Google Pixel",
      name: "Google Pixel 6a",
      series: "Pixel A",
      image: images.pixel6a,
      basePrice: 2990,
      storages: ["128GB", "256GB"],
      colors: ["Svart", "Vit", "Grön"],
      url: "https://store.google.com/se/product/pixel_6a",
      storeUrls: {
        Power: "https://www.power.se/mobiler-och-foto/mobiltelefoner/google-pixel-6a/p-pixel-6a/",
        NetOnNet: "https://www.netonnet.se/art/mobiler-smartwatch/mobiltelefoner/google-pixel-6a"
      }
    },
    {
      id: "galaxy-s26",
      brand: "Samsung",
      name: "Samsung Galaxy S26",
      series: "Galaxy S",
      image: images.samsungS,
      basePrice: 12990,
      storages: ["256GB", "512GB"],
      colors: ["Svart", "Vit", "Blå", "Mint"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/samsung-galaxy-s26-5g-smartphone-12256gb-white/1039744"
    },
    {
      id: "galaxy-s26-plus",
      brand: "Samsung",
      name: "Samsung Galaxy S26+",
      series: "Galaxy S",
      image: images.samsungS,
      basePrice: 14490,
      storages: ["256GB", "512GB"],
      colors: ["Silver", "Blå", "Svart", "Mint"],
      url: "https://www.samsung.com/se/smartphones/galaxy-s/"
    },
    {
      id: "galaxy-s26-ultra",
      brand: "Samsung",
      name: "Samsung Galaxy S26 Ultra",
      series: "Galaxy S Ultra",
      image: images.samsungUltra,
      basePrice: 15990,
      storages: ["256GB", "512GB"],
      colors: ["Vit", "Titan", "Svart", "Silver"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/samsung-galaxy-s26-ultra-5g-smartphone-12256-gb-vit/1039732"
    },
    {
      id: "galaxy-s25",
      brand: "Samsung",
      name: "Samsung Galaxy S25",
      series: "Galaxy S",
      image: images.samsungS,
      basePrice: 8990,
      storages: ["128GB", "256GB"],
      colors: ["Marinblå", "Mint", "Blåsvart", "Silver", "Svart"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/samsung-galaxy-s25-5g-smartphone-12256gb-navy/877355",
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Marinblå",
          url: "https://www.komplett.se/product/1323811/mobil-tablets-klockor/mobiltelefoner/samsung-galaxy-s25-128gb-marinblaa",
          requiredTerms: ["samsung", "galaxy", "s25", "128", "marinblå"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Mint",
          url: "https://www.komplett.se/product/1318793/mobil-klockor/mobiltelefoner/samsung-galaxy-s25-128gb-mint",
          requiredTerms: ["samsung", "galaxy", "s25", "128", "mint"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Blåsvart",
          url: "https://www.komplett.se/product/1327436/mobil-tablets-klockor/mobiltelefoner/samsung-galaxy-s25-128gb-blueblack",
          requiredTerms: ["samsung", "galaxy", "s25", "128", "blueblack"]
        }
      ]
    },
    {
      id: "galaxy-s25-ultra",
      brand: "Samsung",
      name: "Samsung Galaxy S25 Ultra",
      series: "Galaxy S Ultra",
      image: images.samsungUltra,
      basePrice: 11490,
      storages: ["256GB", "512GB"],
      colors: ["Titanium black", "Titanium jetblack", "Titanium silverblue", "Titanium whitesilver"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/samsung-galaxy-s25-ultra-5g-smartphone-12512gb-titanium-black/877363",
      exactOffers: [
        {
          store: "Komplett",
          storage: "256GB",
          color: "Titanium black",
          url: "https://www.komplett.se/product/1320670/mobil-tablets-klockor/mobiltelefoner/samsung-galaxy-s25-ultra-256gb-titanium-black",
          requiredTerms: ["samsung", "galaxy", "s25", "ultra", "256", "titanium black"]
        },
        {
          store: "Komplett",
          storage: "256GB",
          color: "Titanium jetblack",
          url: "https://www.komplett.se/product/1329620/mobil-tablets-klockor/mobiltelefoner/samsung-galaxy-s25-ultra-256gb-titanium-jetblack",
          requiredTerms: ["samsung", "galaxy", "s25", "ultra", "256", "titanium jetblack"]
        },
        {
          store: "Komplett",
          storage: "256GB",
          color: "Titanium silverblue",
          url: "https://www.komplett.se/product/1329885/mobil-tablets-klockor/mobiltelefoner/samsung-galaxy-s25-ultra-256gb-titanium-silverblue",
          requiredTerms: ["samsung", "galaxy", "s25", "ultra", "256", "titanium silverblue"]
        },
        {
          store: "Komplett",
          storage: "256GB",
          color: "Titanium whitesilver",
          url: "https://www.komplett.se/product/1318762/mobil-tablets-klockor/mobiltelefoner/samsung-galaxy-s25-ultra-256gb-titanium-whitesilver",
          requiredTerms: ["samsung", "galaxy", "s25", "ultra", "256", "titanium whitesilver"]
        }
      ]
    },
    {
      id: "galaxy-a56",
      brand: "Samsung",
      name: "Samsung Galaxy A56",
      series: "Galaxy A",
      image: images.samsungA,
      basePrice: 3490,
      storages: ["128GB", "256GB"],
      colors: ["Grafit", "Grön", "Rosa", "Vit"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/samsung-galaxy-a56-5g-smartphone-8128gb-grafit/897828"
    },
    {
      id: "iphone-17",
      brand: "Apple",
      name: "Apple iPhone 17",
      series: "iPhone 17",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-17-1.jpg",
      basePrice: 10995,
      storages: ["256GB", "512GB"],
      colors: ["Svart", "Vit", "Disblå", "Salvia", "Lavendel"],
      url: "https://www.apple.com/se/iphone-17/"
    },
    {
      id: "iphone-air",
      brand: "Apple",
      name: "Apple iPhone Air",
      series: "iPhone 17",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-air-1.jpg",
      basePrice: 12995,
      storages: ["256GB", "512GB", "1TB"],
      colors: ["Rymdsvart", "Molnvit", "Ljust guld", "Himmelsblå"],
      url: "https://www.apple.com/se/iphone-air/"
    },
    {
      id: "iphone-17-pro",
      brand: "Apple",
      name: "Apple iPhone 17 Pro",
      series: "iPhone 17 Pro",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-17-pro-1.jpg",
      basePrice: 13995,
      storages: ["256GB", "512GB", "1TB"],
      colors: ["Silver", "Djupblå", "Kosmiskt orange"],
      url: "https://www.apple.com/se/iphone-17-pro/"
    },
    {
      id: "iphone-17-pro-max",
      brand: "Apple",
      name: "Apple iPhone 17 Pro Max",
      series: "iPhone 17 Pro",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-17-pro-max-1.jpg",
      basePrice: 15995,
      storages: ["256GB", "512GB", "1TB"],
      colors: ["Silver", "Djupblå", "Kosmiskt orange"],
      url: "https://www.apple.com/se/iphone-17-pro/"
    },
    {
      id: "iphone-16",
      brand: "Apple",
      name: "Apple iPhone 16",
      series: "iPhone 16",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-1.jpg",
      basePrice: 9495,
      storages: ["128GB", "256GB"],
      colors: ["Svart", "Rosa", "Blågrön", "Vit", "Ultramarin"],
      url: "https://www.apple.com/se/iphone-16/",
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Svart",
          url: "https://www.komplett.se/product/1312916/mobil-tablets-klockor/mobiltelefoner/iphone-16-128gb-svart",
          requiredTerms: ["iphone", "16", "128", "svart"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Rosa",
          url: "https://www.komplett.se/product/1312890/mobil-tablets-klockor/mobiltelefoner/iphone-16-128gb-rosa",
          requiredTerms: ["iphone", "16", "128", "rosa"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Blågrön",
          url: "https://www.komplett.se/product/1312910/mobil-tablets-klockor/mobiltelefoner/iphone-16-128gb-blaagron",
          requiredTerms: ["iphone", "16", "128", "blågrön"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Vit",
          url: "https://www.komplett.se/product/1312891/mobil-tablets-klockor/mobiltelefoner/iphone-16-128gb-vit",
          requiredTerms: ["iphone", "16", "128", "vit"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Ultramarin",
          url: "https://www.komplett.se/product/1312900/mobil-tablets-klockor/mobiltelefoner/iphone-16-128gb-ultramarin",
          requiredTerms: ["iphone", "16", "128", "ultramarin"]
        }
      ]
    },
    {
      id: "iphone-16-plus",
      brand: "Apple",
      name: "Apple iPhone 16 Plus",
      series: "iPhone 16",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-plus-1.jpg",
      basePrice: 10495,
      storages: ["128GB", "256GB"],
      colors: ["Blågrön", "Vit", "Rosa", "Svart"],
      url: "https://www.apple.com/se/iphone-16/",
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Svart",
          url: "https://www.komplett.se/product/1312925/mobil-tablets-klockor/mobiltelefoner/iphone-16-plus-128gb-svart",
          requiredTerms: ["iphone", "16", "plus", "128", "svart"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Blågrön",
          url: "https://www.komplett.se/product/1313033/mobil-tablets-klockor/mobiltelefoner/iphone-16-plus-128gb-blaagron",
          requiredTerms: ["iphone", "16", "plus", "128", "blågrön"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Vit",
          url: "https://www.komplett.se/product/1313084/mobil-tablets-klockor/mobiltelefoner/iphone-16-plus-128gb-vit",
          requiredTerms: ["iphone", "16", "plus", "128", "vit"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Rosa",
          url: "https://www.komplett.se/product/1313118/mobil-tablets-klockor/mobiltelefoner/iphone-16-plus-128gb-rosa",
          requiredTerms: ["iphone", "16", "plus", "128", "rosa"]
        }
      ]
    },
    {
      id: "iphone-16-pro",
      brand: "Apple",
      name: "Apple iPhone 16 Pro",
      series: "iPhone 16 Pro",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-1.jpg",
      basePrice: 12995,
      storages: ["128GB", "256GB"],
      colors: ["Titan", "Svart", "Vit", "Desert"],
      url: "https://www.apple.com/se/iphone-16-pro/"
    },
    {
      id: "iphone-16-pro-max",
      brand: "Apple",
      name: "Apple iPhone 16 Pro Max",
      series: "iPhone 16 Pro",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-max-1.jpg",
      basePrice: 14995,
      storages: ["256GB", "512GB"],
      colors: ["Titan", "Guld", "Svart", "Desert"],
      url: "https://www.apple.com/se/iphone-16-pro/"
    },
    {
      id: "iphone-16e",
      brand: "Apple",
      name: "Apple iPhone 16e",
      series: "iPhone 16",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16e-1.jpg",
      basePrice: 6975,
      storages: ["128GB", "256GB"],
      colors: ["Svart", "Vit"],
      url: "https://www.apple.com/se/iphone-16e/",
      exactOffers: [
        {
          store: "Komplett",
          storage: "128GB",
          color: "Svart",
          url: "https://www.komplett.se/product/1321039/mobil-tablets-klockor/mobiltelefoner/iphone-16e-128gb-svart",
          requiredTerms: ["iphone", "16e", "128", "svart"]
        },
        {
          store: "Komplett",
          storage: "128GB",
          color: "Vit",
          url: "https://www.komplett.se/product/1321038/mobil-tablets-klockor/mobiltelefoner/iphone-16e-128gb-vit",
          requiredTerms: ["iphone", "16e", "128", "vit"]
        },
        {
          store: "Komplett",
          storage: "256GB",
          color: "Svart",
          url: "https://www.komplett.se/product/1321037/mobil-tablets-klockor/mobiltelefoner/iphone-16e-256gb-svart",
          requiredTerms: ["iphone", "16e", "256", "svart"]
        },
        {
          store: "Komplett",
          storage: "256GB",
          color: "Vit",
          url: "https://www.komplett.se/product/1321067/mobil-tablets-klockor/mobiltelefoner/iphone-16e-256gb-vit",
          requiredTerms: ["iphone", "16e", "256", "vit"]
        }
      ]
    },
    {
      id: "iphone-15",
      brand: "Apple",
      name: "Apple iPhone 15",
      series: "iPhone 15",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg",
      basePrice: 7995,
      storages: ["128GB", "256GB"],
      colors: ["Svart", "Blå", "Rosa", "Grön", "Gul"],
      url: "https://www.apple.com/se/shop/buy-iphone/iphone-15",
      storeUrls: {
      },
      exactOffers: [
        {
          store: "Elgiganten",
          storage: "128GB",
          color: "Svart",
          url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/iphone-15-5g-smartphone-128gb-svart/650671",
          requiredTerms: ["iphone", "15", "128", "svart"]
        }
      ]
    },
    {
      id: "iphone-15-plus",
      brand: "Apple",
      name: "Apple iPhone 15 Plus",
      series: "iPhone 15",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-plus-1.jpg",
      basePrice: 8995,
      storages: ["128GB", "256GB"],
      colors: ["Svart", "Blå", "Rosa", "Grön", "Gul"],
      url: "https://www.apple.com/se/shop/buy-iphone/iphone-15",
      storeUrls: {
      },
      exactOffers: [
        {
          store: "Elgiganten",
          storage: "128GB",
          color: "Svart",
          url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/iphone-15-plus-5g-smartphone-128gb-svart/650675",
          requiredTerms: ["iphone", "15", "plus", "128", "svart"]
        }
      ]
    },
    {
      id: "iphone-15-pro",
      brand: "Apple",
      name: "Apple iPhone 15 Pro",
      series: "iPhone 15 Pro",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-1.jpg",
      basePrice: 10495,
      storages: ["128GB", "256GB"],
      colors: ["Titan", "Svart", "Vit", "Blå"],
      url: "https://www.apple.com/se/iphone-15-pro/",
      storeUrls: {
      },
      exactOffers: [
        {
          store: "Elgiganten",
          storage: "128GB",
          color: "Svart",
          url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/iphone-15-pro-5g-smartphone-128gb-svart-titanium/650679",
          requiredTerms: ["iphone", "15", "pro", "128", "svart"]
        }
      ]
    },
    {
      id: "iphone-15-pro-max",
      brand: "Apple",
      name: "Apple iPhone 15 Pro Max",
      series: "iPhone 15 Pro",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg",
      basePrice: 11995,
      storages: ["256GB", "512GB"],
      colors: ["Titan", "Svart", "Vit", "Blå"],
      url: "https://www.apple.com/se/iphone-15-pro/",
      storeUrls: {
      },
      exactOffers: [
        {
          store: "Elgiganten",
          storage: "256GB",
          color: "Svart",
          url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/iphone-15-pro-max-5g-smartphone-256gb-svart-titanium/650683",
          requiredTerms: ["iphone", "15", "pro", "max", "256", "svart"]
        }
      ]
    },
    {
      id: "iphone-14",
      brand: "Apple",
      name: "Apple iPhone 14",
      series: "iPhone 14",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-14-1.jpg",
      basePrice: 6995,
      storages: ["128GB", "256GB"],
      colors: ["Svart", "Vit", "Blå", "Rosa", "Gul", "Lila"],
      url: "https://www.apple.com/se/iphone-14/",
      storeUrls: {
        Komplett: "https://www.komplett.se/product/1210614/mobil-tablets-klockor/mobiltelefoner/iphone-14-128gb-midnight",
        Elgiganten: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/iphone-14-5g-smartphone-128gb-midnatt/520042"
      }
    },
    {
      id: "iphone-se-2022",
      brand: "Apple",
      name: "Apple iPhone SE",
      series: "iPhone SE",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-se-2022-1.jpg",
      basePrice: 4995,
      storages: ["64GB", "128GB"],
      colors: ["Svart", "Vit", "Rosa"],
      url: "https://www.apple.com/se/iphone-se/",
      storeUrls: {
        Komplett: "https://www.komplett.se/product/1202584/mobil-tablets-klockor/mobiltelefoner/iphone-se-64gb-midnight",
        Elgiganten: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/iphone-se-5g-smartphone-64gb-midnatt/422574"
      }
    },
    {
      id: "oneplus-13",
      brand: "OnePlus",
      name: "OnePlus 13",
      series: "OnePlus 13",
      image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-13-1.jpg",
      basePrice: 10990,
      storages: ["256GB", "512GB"],
      colors: ["Svart", "Blå", "Vit"],
      url: "https://www.oneplus.com/se/oneplus-13"
    },
    {
      id: "oneplus-13r",
      brand: "OnePlus",
      name: "OnePlus 13R",
      series: "OnePlus 13",
      image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-13r-1.jpg",
      basePrice: 7990,
      storages: ["256GB", "512GB"],
      colors: ["Svart", "Silver", "Blå"],
      url: "https://www.oneplus.com/se/oneplus-13r"
    },
    {
      id: "oneplus-nord-4",
      brand: "OnePlus",
      name: "OnePlus Nord 4",
      series: "OnePlus Nord",
      image: images.oneplusNord,
      basePrice: 5490,
      storages: ["128GB", "256GB"],
      colors: ["Silver", "Grön", "Svart"],
      url: "https://www.oneplus.com/se/oneplus-nord-4"
    },
    {
      id: "oneplus-open",
      brand: "OnePlus",
      name: "OnePlus Open",
      series: "OnePlus Open",
      image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-open-10.jpg",
      basePrice: 16990,
      storages: ["512GB", "1TB"],
      colors: ["Svart", "Grön"],
      url: "https://www.oneplus.com/se/open"
    },
    {
      id: "xiaomi-15",
      brand: "Xiaomi",
      name: "Xiaomi 15",
      series: "Xiaomi 15",
      image: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15-1.jpg",
      basePrice: 9990,
      storages: ["256GB", "512GB"],
      colors: ["Svart", "Vit", "Grön"],
      url: "https://www.mi.com/se/product/xiaomi-15/"
    },
    {
      id: "xiaomi-15-ultra",
      brand: "Xiaomi",
      name: "Xiaomi 15 Ultra",
      series: "Xiaomi 15",
      image: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-15-1.jpg",
      basePrice: 14990,
      storages: ["512GB", "1TB"],
      colors: ["Svart", "Silver", "Vit"],
      url: "https://www.mi.com/se/product/xiaomi-15-ultra/"
    },
    {
      id: "xiaomi-14t-pro",
      brand: "Xiaomi",
      name: "Xiaomi 14T Pro",
      series: "Xiaomi 14T",
      image: "https://fdn2.gsmarena.com/vv/pics/xiaomi/xiaomi-14t-pro-1.jpg",
      basePrice: 7990,
      storages: ["256GB", "512GB"],
      colors: ["Svart", "Blå", "Grön"],
      url: "https://www.mi.com/se/product/xiaomi-14t-pro/"
    },
    {
      id: "redmi-note-14-pro",
      brand: "Xiaomi",
      name: "Xiaomi Redmi Note 14 Pro",
      series: "Redmi Note",
      image: images.redmiNotePro,
      basePrice: 3990,
      storages: ["128GB", "256GB"],
      colors: ["Svart", "Lila", "Grön"],
      url: "https://www.mi.com/se/product/redmi-note-14-pro-5g/"
    },
    {
      id: "redmi-note-14",
      brand: "Xiaomi",
      name: "Xiaomi Redmi Note 14",
      series: "Redmi Note",
      image: images.redmiNote,
      basePrice: 2490,
      storages: ["128GB", "256GB"],
      colors: ["Svart", "Grön", "Blå"],
      url: "https://www.mi.com/se/product/redmi-note-14/"
    }
  ];

  function storageDelta(storage) {
    if (storage === "1TB") return 3500;
    if (storage === "512GB") return 2200;
    if (storage === "256GB") return 900;
    return 0;
  }

  function storeNameFromUrl(url) {
    const hostname = new URL(url).hostname;

    if (hostname.includes("apple.com")) return "Apple";
    if (hostname.includes("elgiganten.se")) return "Elgiganten";
    if (hostname.includes("google.com")) return "Google";
    if (hostname.includes("komplett.se")) return "Komplett";
    if (hostname.includes("mi.com")) return "Xiaomi";
    if (hostname.includes("oneplus.com")) return "OnePlus";
    if (hostname.includes("samsung.com")) return "Samsung";

    return hostname.replace(/^www\./, "");
  }

  function productImageFromUrl(url) {
    const match = url.match(/komplett\.se\/product\/(\d+)/);

    if (match) {
      return `https://www.komplett.se/product-media/b2c/en-us/1200/${match[1]}.jpg`;
    }

    return "";
  }

  function buildOffers(model, variantIndex) {
    const exactStores = [{ name: storeNameFromUrl(model.url), url: model.url }, ...Object.entries(model.storeUrls || {}).map(([name, url]) => ({ name, url }))];
    const variantExactOffers = (model.exactOffers || [])
      .filter((offer) => offer.storage === variantIndex.storage && offer.color === variantIndex.color)
      .map((offer) => ({
        name: offer.store,
        price: null,
        shipping: null,
        rating: storeRatings[offer.store] || 4.2,
        delivery: null,
        stock: null,
        url: offer.url,
        image: offer.image || productImageFromUrl(offer.url),
        exactVariant: true,
        requiredTerms: offer.requiredTerms || [],
        deal: null
      }));

    const storeLinks = exactStores
      .filter((store) => !variantExactOffers.some((offer) => offer.name === store.name && offer.url === store.url))
      .map((store) => ({
        name: store.name,
        price: null,
        shipping: null,
        rating: storeRatings[store.name] || 4.2,
        delivery: null,
        stock: null,
        url: store.url,
        image: productImageFromUrl(store.url),
        exactVariant: false,
        requiredTerms: [],
        deal: null
      }));

    return [...variantExactOffers, ...storeLinks];
  }

  window.phoneModels = data.map((model) => {
    const variants = [];

    model.colors.forEach((color) => {
      model.storages.forEach((storage) => {
        const offers = buildOffers(model, { storage, color });
        variants.push({
          id: `${model.id}-${storage.toLowerCase()}-${color.toLowerCase()}`,
          color,
          colorHex: colorHex[color] || "#d8dde3",
          storage,
          image: offers.find((offer) => offer.exactVariant && offer.image)?.image || model.image,
          offers
        });
      });
    });

    return {
      id: model.id,
      brand: model.brand,
      name: model.name,
      series: model.series,
      category: "Mobiler",
      variants
    };
  });
  window.phoneFallbackImage = images.fallback;
})();
