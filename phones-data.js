(function () {
  const storeRatings = {
    Apple: 4.7,
    Elgiganten: 4.6,
    Komplett: 4.5,
    OnePlus: 4.4,
    Samsung: 4.7,
    Xiaomi: 4.3
  };

  const colorHex = {
    Svart: "#151515",
    Vit: "#f4f1ea",
    Bla: "#7c9ebd",
    Gron: "#8d9f84",
    Rosa: "#e8b4c6",
    Lila: "#b8a7d8",
    Silver: "#d7d9dc",
    Grafit: "#3a3d42",
    Guld: "#d9c28b",
    Obsidian: "#1f2328",
    Porslin: "#eee8df",
    Frost: "#dce8ee",
    Indigo: "#33456f",
    Mint: "#b9d9c8",
    Titan: "#b8b2a8",
    Jade: "#9fb9aa",
    Mansten: "#c5c9d6"
  };

  const images = {
    fallback: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-1.jpg",
    pixel10: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Pixel_10_back_%28Indigo%29.svg/120px-Pixel_10_back_%28Indigo%29.svg.png",
    pixel10Pro: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Pixel_10_Pro_back_%28Moonstone%29.svg/120px-Pixel_10_Pro_back_%28Moonstone%29.svg.png",
    pixel10ProXl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Pixel_10_Pro_XL_back_%28Moonstone%29.svg/120px-Pixel_10_Pro_XL_back_%28Moonstone%29.svg.png",
    pixelFold: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9-pro-fold-1.jpg",
    pixelA: "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-9a-1.jpg",
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
      colors: ["Obsidian", "Frost"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-10-5g-mobiltelefon-12128gb-frost/943512"
    },
    {
      id: "pixel-10-pro",
      brand: "Google Pixel",
      name: "Google Pixel 10 Pro",
      series: "Pixel 10",
      image: images.pixel10Pro,
      basePrice: 12990,
      storages: ["128GB", "256GB"],
      colors: ["Mansten", "Obsidian"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-10-pro-5g-smartphone-128gb-mansten/943492"
    },
    {
      id: "pixel-10-pro-xl",
      brand: "Google Pixel",
      name: "Google Pixel 10 Pro XL",
      series: "Pixel 10",
      image: images.pixel10ProXl,
      basePrice: 15990,
      storages: ["256GB", "512GB"],
      colors: ["Porslin", "Jade"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-10-pro-xl-5g-smartphone-16256gb-porslin/943488"
    },
    {
      id: "pixel-10-pro-fold",
      brand: "Google Pixel",
      name: "Google Pixel 10 Pro Fold",
      series: "Pixel Fold",
      image: images.pixelFold,
      basePrice: 21990,
      storages: ["256GB", "512GB"],
      colors: ["Mansten", "Jade"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-10-pro-fold-5g-smartphone-16256gb-mansten/943530"
    },
    {
      id: "pixel-10a",
      brand: "Google Pixel",
      name: "Google Pixel 10a",
      series: "Pixel A",
      image: images.pixelA,
      basePrice: 4990,
      storages: ["128GB", "256GB"],
      colors: ["Obsidian", "Frost"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/google-pixel-10a-5g-smartphone-8128-gb-obsidian/1027603"
    },
    {
      id: "galaxy-s26",
      brand: "Samsung",
      name: "Samsung Galaxy S26",
      series: "Galaxy S",
      image: images.samsungS,
      basePrice: 12990,
      storages: ["256GB", "512GB"],
      colors: ["Svart", "Vit"],
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
      colors: ["Silver", "Bla"],
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
      colors: ["Vit", "Titan"],
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
      colors: ["Bla", "Mint"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/samsung-galaxy-s25-5g-smartphone-12256gb-navy/877355"
    },
    {
      id: "galaxy-s25-ultra",
      brand: "Samsung",
      name: "Samsung Galaxy S25 Ultra",
      series: "Galaxy S Ultra",
      image: images.samsungUltra,
      basePrice: 11490,
      storages: ["256GB", "512GB"],
      colors: ["Titan", "Svart"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/samsung-galaxy-s25-ultra-5g-smartphone-12512gb-titanium-black/877363"
    },
    {
      id: "galaxy-a56",
      brand: "Samsung",
      name: "Samsung Galaxy A56",
      series: "Galaxy A",
      image: images.samsungA,
      basePrice: 3490,
      storages: ["128GB", "256GB"],
      colors: ["Grafit", "Gron"],
      url: "https://www.elgiganten.se/product/mobiler-tablets-smartklockor/mobiltelefon/samsung-galaxy-a56-5g-smartphone-8128gb-grafit/897828"
    },
    {
      id: "iphone-16",
      brand: "Apple",
      name: "Apple iPhone 16",
      series: "iPhone 16",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-1.jpg",
      basePrice: 9495,
      storages: ["128GB", "256GB"],
      colors: ["Svart", "Rosa"],
      url: "https://www.komplett.se/product/1312916/mobil-tablets-klockor/mobiltelefoner/iphone-16-128gb-svart"
    },
    {
      id: "iphone-16-plus",
      brand: "Apple",
      name: "Apple iPhone 16 Plus",
      series: "iPhone 16",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-plus-1.jpg",
      basePrice: 10495,
      storages: ["128GB", "256GB"],
      colors: ["Bla", "Vit"],
      url: "https://www.apple.com/se/iphone-16/"
    },
    {
      id: "iphone-16-pro",
      brand: "Apple",
      name: "Apple iPhone 16 Pro",
      series: "iPhone 16 Pro",
      image: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-16-pro-1.jpg",
      basePrice: 12995,
      storages: ["128GB", "256GB"],
      colors: ["Titan", "Svart"],
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
      colors: ["Titan", "Guld"],
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
      url: "https://www.komplett.se/product/1321039/mobil-tablets-klockor/mobiltelefoner/iphone-16e-128gb-svart"
    },
    {
      id: "oneplus-13",
      brand: "OnePlus",
      name: "OnePlus 13",
      series: "OnePlus 13",
      image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-13-1.jpg",
      basePrice: 10990,
      storages: ["256GB", "512GB"],
      colors: ["Svart", "Bla"],
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
      colors: ["Svart", "Silver"],
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
      colors: ["Silver", "Gron"],
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
      colors: ["Svart", "Gron"],
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
      colors: ["Svart", "Vit"],
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
      colors: ["Svart", "Silver"],
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
      colors: ["Svart", "Bla"],
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
      colors: ["Svart", "Lila"],
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
      colors: ["Svart", "Gron"],
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
    if (hostname.includes("komplett.se")) return "Komplett";
    if (hostname.includes("mi.com")) return "Xiaomi";
    if (hostname.includes("oneplus.com")) return "OnePlus";
    if (hostname.includes("samsung.com")) return "Samsung";

    return hostname.replace(/^www\./, "");
  }

  function buildOffers(model, variantIndex) {
    const exactStores = [{ name: storeNameFromUrl(model.url), url: model.url }, ...Object.entries(model.storeUrls || {}).map(([name, url]) => ({ name, url }))];

    return exactStores.map((store, index) => ({
      name: store.name,
      price: model.basePrice + storageDelta(variantIndex.storage) + index * 110 + variantIndex.colorIndex * 35,
      shipping: 0,
      rating: storeRatings[store.name] || 4.2,
      delivery: index + 1,
      stock: true,
      url: store.url
    }));
  }

  window.phoneModels = data.map((model) => {
    const variants = [];

    model.colors.forEach((color, colorIndex) => {
      model.storages.forEach((storage) => {
        variants.push({
          id: `${model.id}-${storage.toLowerCase()}-${color.toLowerCase()}`,
          color,
          colorHex: colorHex[color] || "#d8dde3",
          storage,
          image: model.image,
          offers: buildOffers(model, { storage, colorIndex })
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
