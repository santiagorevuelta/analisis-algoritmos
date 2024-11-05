const projectiles = [
    {
        id: 1,
        name: "Crosman 760 Pumpmaster",
        mass: 0.00035,
        velocity: 175,
        energy: 7,
        image: "https://www.crosman.com/media/catalog/product/cache/257289cda64115c93f452b88c1fedc12/7/6/760b_01.20201210214359.png",
        message: "Bajo riesgo: Este proyectil tiene una energía muy baja, lo que significa que es poco probable que cause más que moretones o lesiones leves. Ideal para prácticas de tiro recreativo."
    },
    {
        id: 2,
        name: "Tippmann Cronus",
        mass: 0.003,
        velocity: 90,
        energy: 12,
        image: "https://m.media-amazon.com/images/I/51dNDEtTOlL._AC_UF1000,1000_QL80_.jpg",
        message: "Bajo riesgo: Con una energía limitada, este proyectil podría causar solo pequeñas lesiones o irritaciones en la piel. Es más adecuado para juegos y deportes de aire comprimido."
    },
    {
        id: 3,
        name: "Gamo Whisper Fusion Mach 1",
        mass: 0.0005,
        velocity: 305,
        energy: 24,
        image: "https://m.media-amazon.com/images/I/41EI04oEOCL.jpg",
        message: "Bajo riesgo: Aunque esta bala tiene una energía baja, puede provocar moretones y rasguños. Es adecuada para la práctica de tiro, pero no es una amenaza seria."
    },
    {
        id: 4,
        name: "Umarex Beretta M92FS",
        mass: 0.00048,
        velocity: 130,
        energy: 4,
        image: "https://huntersproshops.com/wp-content/uploads/2023/07/Umarex-Beretta-M92A1.jpg",
        message: "Bajo riesgo: Este proyectil tiene una energía muy baja, lo que limita su capacidad de causar daño. Podría causar algunas molestias menores, pero no es un arma letal."
    },
    {
        id: 5,
        name: "Ruger 10/22 (.22 LR)",
        mass: 0.0026,
        velocity: 370,
        energy: 178,
        image: "https://ruger.com/products/1022Tactical/images/31184.jpg",
        message: "Riesgo moderado: Con una energía suficiente para penetrar la piel, este proyectil puede causar lesiones considerables. Si bien no es letal, puede provocar daños serios en situaciones cercanas."
    },
    {
        id: 6,
        name: "Glock 19 (9mm)",
        mass: 0.008,
        velocity: 375,
        energy: 562,
        image: "https://assets.basspro.com/image/list/fn_select:jq:first(.%5B%5D%7Cselect(.public_id%20%7C%20endswith(%22main%22)))/997815.json",
        message: "Alerta: Este proyectil tiene una energía considerable, lo que aumenta su capacidad para causar daños severos a tejidos blandos y órganos. Su uso debe ser tratado con extrema precaución."
    },
    {
        id: 7,
        name: "AR-15 (.223 Remington)",
        mass: 0.004,
        velocity: 975,
        energy: 1900,
        image: "https://simac.fr/files/bibliotheque-simac/photos-produits/SHC4101-03.jpg?v=2023-06-21%2009%3A40%3A27",
        message: "Alerta: Con una energía elevada, este proyectil es capaz de causar daños significativos a órganos internos y puede ser potencialmente letal en caso de impacto directo. Su uso debe ser justificado."
    },
    {
        id: 8,
        name: "Remington 700 (.308 Winchester)",
        mass: 0.0097,
        velocity: 820,
        energy: 3263,
        image: "https://www.remarms.com/assets/imagesRA/700%20SPS/Rem%20Model%20700%20SPS_right.png",
        message: "Alerta: Este proyectil posee una energía alta, lo que lo convierte en un arma extremadamente peligrosa. Puede causar daños graves, incluyendo perforaciones a través de tejidos y huesos, y potencialmente ser letal."
    },
    {
        id: 9,
        name: "Mossberg 500 (calibre 12)",
        mass: 0.034,
        velocity: 400,
        energy: 2720,
        image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/PEO_Mossberg_590A1.jpg",
        message: "Alerta: Con su alta energía, este proyectil tiene el potencial de causar heridas severas y daños irreparables. Se considera un arma de defensa efectiva y peligrosa."
    },
    {
        id: 10,
        name: "Barrett M82 (.50 BMG)",
        mass: 0.0467,
        velocity: 853,
        energy: 16956,
        image: "https://barrett.net/wp-content/uploads/2020/11/model-82a1-product-img.jpg",
        message: "Alerta: Con una energía extremadamente alta, este proyectil es capaz de causar destrucción masiva. Puede atravesar vehículos blindados y causar daños catastróficos a cualquier objetivo."
    },
    {
        id: 11,
        name: "CZ 550 Safari Magnum",
        mass: 0.0194,
        velocity: 800,
        energy: 6200,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgBIJi3S9GaJANDq1sT1KYllWKI_FGF5Nh2Q&s",
        message: "Alerta: Este proyectil presenta una energía alta, lo que significa que puede causar daños severos a los órganos internos. Su uso está destinado a situaciones de caza y defensa en escenarios extremos."
    },
    {
        id: 12,
        name: "Winchester Model 70 (.458 Lott)",
        mass: 0.0324,
        velocity: 790,
        energy: 10120,
        image: "https://images.gunsinternational.com/listings_sub/acc_6903/gi_100979425/Winchester-Custom-70-458-Lott-caliber_100979425_6903_3BAA4BF17FB60B52.jpg",
        message: "Alerta: Con su energía extremadamente alta, este proyectil es devastador. Tiene el potencial de causar daños catastróficos y es una herramienta letal en situaciones de caza mayor."
    },
];

export default projectiles;
