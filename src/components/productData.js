import lakshmi3 from "../assets/products/3lakshmi.jpg";

const p = (id, name, netRate, price, image, count) => ({ id, name, netRate, price, image, count });
const img = (n) => `/products/${n}`;

const productData = [
  {
    category: "SOUND CRACKERS",
    products: [
      p(33, "3 1/2\" Lakshmi Crackers", 75, 15, lakshmi3, "1 pkt (5 pcs)"),
      p(34, "4\" Lakshmi Crackers", 110, 22, img("4lakshmi.jpg"), "1 pkt (5 pcs)"),
      p(37, "4\" Gold Lakshmi Crackers", 180, 36, img("4lakshmigold.jpg"), "1 pkt (5 pcs)"),
      p(38, "5\" Bahubali Crackers", 260, 52, img("5inchlakshmi.jpg"), "1 pkt (5 pcs)"),
      p(39, "6\" Jallikattu Crackers", 300, 60, img("6inchlakshmi.jpg"), "1 pkt (5 pcs)"),
      p(36, "4\" Lakshmi Deluxe Crackers", 170, 34, img("4lakhmideluxe.jpg"), "1 pkt (5 pcs)"),
      p(276, "Best Rider", 450, 90, img("placeholder.jpg"), "1 pkt (5 pcs)"),  // NEW
      p(32, "2 3/4\" Kuruvi Crackers", 50, 10, img("kuruvi.jpg"), "1 pkt (5 pcs)"),
    ],
  },
  {
    category: "FLOWER POTS",
    products: [
      p(61, "Flower Pots Big", 350, 70, img("flowerpotsbig.jpg"), "1 box (10 pcs)"),
      p(62, "Flower Pots Special", 450, 90, img("flowerpotsspecia.jpg"), "1 box (10 pcs)"),
      p(63, "Flower Pots Ashoka", 600, 120, img("flowerpotsashoka.jpg"), "1 box (10 pcs)"),
      p(65, "Flower Pots Super Deluxe (5pcs)", 900, 180, img("flowerpotsdeluxe5pcs.jpg"), "1 box (5 pcs)"),
      p(64, "Colour Koti", 1000, 200, img("flowerpotscolourkotti.jpg"), "1 box (10 pcs)"),
      p(68, "Colour Koti Deluxe", 1600, 320, img("flowerPotcolourkottideluxe.jpg"), "1 box (10 pcs)"),
      p(277, "Tricolour Mini (5pcs)", 1000, 200, img("placeholder.jpg"), "1 box (5 pcs)"),  // NEW
      p(201, "Tricolour (5pcs)", 1400, 280, img("placeholder.jpg"), "1 box (5 pcs)"),
    ],
  },
  {
    category: "GROUND CHAKKAR'S",
    products: [
      p(70, "Ground Chakkar Big", 200, 40, img("groundchackerbig.jpg"), "1 box (10 pcs)"),
      p(278, "Ground Chakkar Big (25 Pcs)", 500, 100, img("placeholder.jpg"), "1 box (25 pcs)"),  // NEW
      p(71, "Ground Chakkar Special", 400, 80, img("groundchackerspecial.jpg"), "1 box (10 pcs)"),
      p(202, "Ground Chakkar Ashoka", 310, 62, img("placeholder.jpg"), "1 box (10 pcs)"),
      p(72, "Ground Chakkar Deluxe", 700, 140, img("groundchackerdeluxe.jpg"), "1 box (10 pcs)"),
      p(73, "Wire Chakkar", 850, 170, img("discowheel.jpg"), "1 box (10 pcs)"),
    ],
  },
  {
    category: "SPINNER CHAKKAR'S",
    products: [
      p(74, "Spinner Big", 250, 50, img("spinnerwheel.jpg"), "1 box (10 pcs)"),
      p(203, "Spinner Special", 530, 106, img("placeholder.jpg"), "1 box (10 pcs)"),
      p(75, "Spinner Deluxe", 1000, 200, img("spinnerdeluxe.jpg"), "1 box (10 pcs)"),
    ],
  },
  {
    category: "PENCIL",
    products: [
      p(279, "La-La Mega Crackling Candle (6pcs)", 850, 170, img("placeholder.jpg"), "1 box (6 pcs)"),  // NEW
      p(280, "Minions Mega Crackling Candle (3pcs)", 850, 170, img("placeholder.jpg"), "1 box (3 pcs)"),  // NEW
      p(281, "Goodly Mega Crackling Candle (3pcs)", 850, 170, img("placeholder.jpg"), "1 box (3 pcs)"),  // NEW
      p(282, "Pop&Hot Mega Crackling Candle (3pcs)", 800, 160, img("placeholder.jpg"), "1 box (3 pcs)"),  // NEW
    ],
  },
  {
    category: "TWINKLING STAR",
    products: [
      p(79, "1 1/2\" Twinkling Star", 120, 24, img("1½twinklingstar.jpg"), "1 box (10 pcs)"),
      p(80, "4\" Twinkling Star", 350, 70, img("4feettwinklingstar.jpg"), "1 box (10 pcs)"),
    ],
  },
  {
    category: "BIJILI",
    products: [
      p(274, "Red Bijili", 165, 33, img("placeholder.jpg"), "1 box (10 pcs)"),
      p(275, "Straiped Bijili", 185, 37, img("placeholder.jpg"), "1 box (10 pcs)"),
    ],
  },
  {
    category: "ROCKET",
    products: [
      p(82, "Baby Rocket", 270, 54, img("babyrocket.jpg"), "1 box (10 pcs)"),
      p(84, "Lunik Rocket", 600, 120, img("lunicrocket.jpg"), "1 box (5 pcs)"),
      p(283, "2 Sound Rocket", 650, 130, img("placeholder.jpg"), "1 box (10 pcs)"),  // NEW
      p(86, "Whizzling Rocket", 950, 190, img("whistlilngrocket.jpg"), "1 box (10 pcs)"),
    ],
  },
  {
    category: "BOMB",
    products: [
      p(54, "Bullet Bomb", 150, 30, img("bavet.jpg"), "1 box (10 pcs)"),
      p(55, "Hydro Bomb", 375, 75, img("hydrobomb.jpg"), "1 box (10 pcs)"),
      p(56, "King of King", 550, 110, img("kingofkingbomb.jpg"), "1 box (10 pcs)"),
      p(57, "Classic Bomb", 650, 130, img("classicBomb.jpg"), "1 box (10 pcs)"),
      p(59, "Digital Bomb", 1250, 250, img("digitalbomb.jpg"), "1 box (10 pcs)"),
      p(284, "Pokhran Bomb", 2000, 400, img("placeholder.jpg"), "1 box (10 pcs)"),  // NEW
    ],
  },
  {
    category: "PAPER BOMB",
    products: [
      p(92, "1/4 Kg Paper Bomb", 260, 52, img("rowdy250gm.jpg"), "1 box (2 pcs)"),
      p(93, "1/2 Kg Paper Bomb", 520, 104, img("rowdy500gm.jpg"), "1 box (2 pcs)"),
      p(94, "1 Kg Paper Bomb", 1040, 208, img("rowdy1000gm.jpg"), "1 box (2 pcs)"),
    ],
  },
  {
    category: "GIANT CRACKERS",
    products: [
      p(208, "0.28 Runner Crackers", 75, 15, img("placeholder.jpg"), "1 pkt (5 pcs)"),
      p(209, "0.24 Deluxe Crackers", 220, 44, img("placeholder.jpg"), "1 pkt (5 pcs)"),
      p(210, "0.50 Deluxe Crackers", 550, 110, img("placeholder.jpg"), "1 pkt (5 pcs)"),
      p(211, "100 Deluxe Crackers", 1100, 220, img("placeholder.jpg"), "1 pkt (5 pcs)"),
    ],
  },
  {
    category: "GARLAND CRACKERS",
    products: [
      p(212, "100 US", 230, 46, img("placeholder.jpg"), "1 pkt"),
      p(213, "200 US", 460, 92, img("placeholder.jpg"), "1 pkt"),
      p(214, "1K HC", 900, 180, img("placeholder.jpg"), "1 pkt"),
      p(215, "2K HC", 1800, 360, img("placeholder.jpg"), "1 pkt"),
      p(216, "5K HC", 4300, 860, img("placeholder.jpg"), "1 pkt"),
      p(217, "10K HC", 8600, 1720, img("placeholder.jpg"), "1 pkt"),
      p(218, "1K FC", 1600, 320, img("placeholder.jpg"), "1 pkt"),
      p(219, "2K FC", 3200, 640, img("placeholder.jpg"), "1 pkt"),
      p(220, "5K FC", 7000, 1400, img("placeholder.jpg"), "1 pkt"),
      p(221, "10K FC", 15100, 3020, img("placeholder.jpg"), "1 pkt"),
    ],
  },
  {
    category: "MEGA AERIAL SERIES",
    products: [
      p(147, "Chotta Fancy", 230, 46, img("chottafancy.jpg"), "1 box (2 pcs)"),
      p(151, "2\" Single Fancy", 600, 120, img("2inchfancy1pcs.jpg"), "1 box (1 pcs)"),
      p(152, "2\" Single Fancy (3pcs)", 1250, 250, img("2inch3pcs.jpg"), "1 box (3 pcs)"),
      p(153, "3 1/2\" Single Fancy", 1280, 256, img("3½fancy.jpg"), "1 box (1 pcs)"),
      p(224, "3 1/2\" Nayagara Falls Fancy", 1600, 320, img("placeholder.jpg"), "1 box (1 pcs)"),
      p(285, "3 1/2\" Double Ball", 2100, 420, img("placeholder.jpg"), "1 box (2 pcs)"),  // NEW
      p(286, "4\" Single Fancy", 2000, 400, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(287, "4\" 12 Step Fancy", 1950, 390, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(154, "4\" Fancy (2pcs)", 4200, 840, img("4fancy.jpg"), "1 box (2 pcs)"),
      p(159, "5\" Fancy (2pcs)", 5600, 1120, img("5inchfancy.jpg"), "1 box (2 pcs)"),
      p(225, "6\" Turbo Fancy", 3800, 760, img("placeholder.jpg"), "1 box (2 pcs)"),
    ],
  },
  {
    category: "SPECIAL COLOUR FANCY",
    products: [
      p(288, "3 1/2\" Purple", 2100, 420, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(289, "3 1/2\" Violet", 2100, 420, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(290, "3 1/2\" Blue", 2100, 420, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(291, "5\" Neon Orange (2pcs)", 5500, 1100, img("placeholder.jpg"), "1 box (2 pcs)"),  // NEW
      p(292, "5\" Neon Blue (2pcs)", 5500, 1100, img("placeholder.jpg"), "1 box (2 pcs)"),  // NEW
      p(293, "5\" Neon Pink (2pcs)", 5500, 1100, img("placeholder.jpg"), "1 box (2 pcs)"),  // NEW
      p(294, "5\" Neon Violet (2pcs)", 5500, 1100, img("placeholder.jpg"), "1 box (2 pcs)"),  // NEW
    ],
  },
  {
    category: "WHIZLING SERIES",
    products: [
      p(226, "Music Rip", 2200, 440, img("placeholder.jpg"), "1 box (1 pcs)"),
      p(171, "25 Whizling Shots", 3800, 760, img("wizzlingshot.jpg"), "1 box (1 pcs)"),
    ],
  },
  {
    category: "SPEED SERIES",
    products: [
      p(162, "12 Shot Rider & Crackling", 800, 160, img("12shotcracking.jpg"), "1 box (1 pcs)"),
      p(163, "12 Shot Multi Colour", 1300, 260, img("12shotmulticolour.jpg"), "1 box (1 pcs)"),
      p(164, "25 Shot Rider & Crackling", 1300, 260, img("25shotcracking.jpg"), "1 box (1 pcs)"),
      p(227, "30 Shot Multicolour I", 2225, 445, img("placeholder.jpg"), "1 box (1 pcs)"),
      p(228, "60 Shot Multicolour II", 4450, 890, img("placeholder.jpg"), "1 box (1 pcs)"),
      p(165, "30 Shot Multicolour & Crackling", 2450, 490, img("30shotmulticolour.jpg"), "1 box (1 pcs)"),
      p(166, "60 Shot Multicolour & Crackling", 4900, 980, img("60shotmulticolour.jpg"), "1 box (1 pcs)"),
      p(167, "120 Shot Multicolour & Crackling", 9800, 1960, img("120shotmulticolour.jpg"), "1 box (1 pcs)"),
      p(168, "240 Shot Multicolour & Crackling", 17500, 3500, img("240shotmulticolour.jpg"), "1 box (1 pcs)"),
      p(169, "520 Shot Multicolour & Crackling", 40745, 8149, img("500shotmulticolour.jpg"), "1 box (1 pcs)"),
      p(229, "10*10 Celebration Moments", 19530, 3906, img("placeholder.jpg"), "1 box (1 pcs)"),
    ],
  },
  {
    category: "KID'S SPECIAL",
    products: [
      p(230, "Dora Singer (5pcs)", 800, 160, img("placeholder.jpg"), "1 box (5 pcs)"),
      p(107, "Water Queen", 900, 180, img("waterqueen.jpg"), "1 box (3 pcs)"),
      p(111, "Lolli Pop (5pcs)", 1100, 220, img("lolipop.jpg"), "1 box (5 pcs)"),
      p(295, "Kit Kat", 160, 32, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(118, "Bambaram", 600, 120, img("bamparam.jpg"), "1 box (2 pcs)"),
      p(116, "Helicopter (5pcs)", 450, 90, img("helicopter.jpg"), "1 box (5 pcs)"),
      p(104, "Peacock Feather (5pcs)", 550, 110, img("peacockfeather.jpg"), "1 box (5 pcs)"),
      p(117, "Dancing Butterfly", 450, 90, img("butterfly.jpg"), "1 box (2 pcs)"),
      p(114, "Photo Flash (5pcs)", 350, 70, img("photoflash.jpg"), "1 box (5 pcs)"),
      p(231, "7 Shot (5pcs)", 550, 110, img("placeholder.jpg"), "1 box (5 pcs)"),
      p(119, "Mega Siren (3pcs)", 900, 180, img("siren.jpg"), "1 box (3 pcs)"),
      p(101, "Mega Peacock", 800, 160, img("megapeacock.jpg"), "1 box (2 pcs)"),
      p(103, "Bada Peacock", 2250, 450, img("badapeacock.jpg"), "1 box (2 pcs)"),
      p(296, "Mini Siren (5pcs)", 950, 190, img("placeholder.jpg"), "1 box (5 pcs)"),  // NEW
      p(297, "Cylinder (2pcs)", 1500, 300, img("placeholder.jpg"), "1 box (2 pcs)"),  // NEW
    ],
  },
  {
    category: "90'S KIDS SPECIAL",
    products: [
      p(232, "Penta Park (5-in-1)", 850, 170, img("placeholder.jpg"), "1 box (5 pcs)"),
      p(78, "4x4 Wheel (5pcs)", 750, 150, img("4x4 Wheel.jpg"), "1 box (5 pcs)"),
      p(233, "Old is Gold (25pcs)", 1000, 200, img("placeholder.jpg"), "1 box (25 pcs)"),
      p(98, "Money in Bank (3pcs)", 650, 130, img("moneyinbank3pcs.jpg"), "1 box (3 pcs)"),
      p(234, "King of Hitler", 750, 150, img("placeholder.jpg"), "1 box (2 pcs)"),
      p(298, "Pistol 5G (2pcs)", 1200, 240, img("placeholder.jpg"), "1 box (2 pcs)"),  // NEW
      p(236, "90'S Watts (3pcs)", 650, 130, img("placeholder.jpg"), "1 box (3 pcs)"),
      p(121, "Colour Smoke (3pcs)", 650, 130, img("colorsmoke.jpg"), "1 box (3 pcs)"),
      p(237, "Tin Fountain", 450, 90, img("placeholder.jpg"), "1 box (2 pcs)"),
      p(235, "Top Gun (5pcs)", 1100, 220, img("placeholder.jpg"), "1 box (5 pcs)"),
      p(238, "Toy Kimi Shower (2pcs)", 750, 150, img("placeholder.jpg"), "1 box (2 pcs)"),
    ],
  },
  {
    category: "MEGA FOUNTAIN",
    products: [
      p(239, "2 1/4\" Mini Fountain (5pcs)", 550, 110, img("placeholder.jpg"), "1 box (5 pcs)"),
      p(240, "4\" Tango Fountain (1pcs)", 300, 60, img("placeholder.jpg"), "1 box (1 pcs)"),
      p(299, "G-Green Fountain (6pcs)", 1050, 210, img("placeholder.jpg"), "1 box (6 pcs)"),  // NEW
      p(300, "Be-Light Fountain (6pcs)", 1050, 210, img("placeholder.jpg"), "1 box (6 pcs)"),  // NEW
      p(301, "Mr.Happy Fountain (6pcs)", 1050, 210, img("placeholder.jpg"), "1 box (6 pcs)"),  // NEW
      p(302, "Split Fountain (6pcs)", 1050, 210, img("placeholder.jpg"), "1 box (6 pcs)"),  // NEW
      p(303, "Red Fountain (6pcs)", 1050, 210, img("placeholder.jpg"), "1 box (6 pcs)"),  // NEW
      p(304, "Jumbo Green Fountain", 1000, 200, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(305, "Jumbo Red Fountain", 1000, 200, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(306, "Jumbo Silver Fountain", 1000, 200, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(307, "Jumbo Gold Fountain", 1000, 200, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(308, "Jumbo Red & Green Fountain", 1000, 200, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(309, "Dup-Tip (5pcs)", 800, 160, img("placeholder.jpg"), "1 box (5 pcs)"),  // NEW
      p(310, "Mad Angles", 1350, 270, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(311, "Sword", 800, 160, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(312, "Fish Fountain", 850, 170, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(313, "Ditdo Jumping Chakkar", 800, 160, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(314, "Popcorn Fountain", 750, 150, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(259, "Hello Kitty Bus", 1400, 280, img("placeholder.jpg"), "1 box (1 pcs)"),
      p(260, "Paris Tower", 600, 120, img("placeholder.jpg"), "1 box (1 pcs)"),
    ],
  },
  {
    category: "COLOUR CRACKLING FOUNTAIN",
    products: [
      p(246, "Red Apple (5pcs)", 1000, 200, img("placeholder.jpg"), "1 box (5 pcs)"),
      p(247, "Carnival FunFair (5pcs)", 1000, 200, img("placeholder.jpg"), "1 box (5 pcs)"),
      p(248, "Mr. Big (5pcs)", 1000, 200, img("placeholder.jpg"), "1 box (5 pcs)"),
      p(249, "Tooty Fruity (5pcs)", 1000, 200, img("placeholder.jpg"), "1 box (5 pcs)"),
      p(250, "Bingo Music (5pcs)", 1000, 200, img("placeholder.jpg"), "1 box (5 pcs)"),
      p(251, "Party Night (5pcs)", 1000, 200, img("placeholder.jpg"), "1 box (5 pcs)"),
      p(253, "Ultra Voltage (2pcs)", 1050, 210, img("placeholder.jpg"), "1 box (2 pcs)"),
      p(252, "Cock Fight (2pcs)", 1050, 210, img("placeholder.jpg"), "1 box (2 pcs)"),
      p(254, "Mojito (2pcs)", 1050, 210, img("placeholder.jpg"), "1 box (2 pcs)"),
      p(255, "Pride Popcorn (2pcs)", 1050, 210, img("placeholder.jpg"), "1 box (2 pcs)"),
      p(99, "Peacock Popcorn (2pcs)", 1050, 210, img("peacock.jpg"), "1 box (2 pcs)"),
      p(256, "Lollipop (2pcs)", 1050, 210, img("lolipop.jpg"), "1 box (2 pcs)"),
      p(315, "Karoke Night (2 step Fountain)", 800, 160, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(316, "Jazz Music (2 step Fountain)", 800, 160, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(317, "Dr. Pepper (2 step Fountain)", 800, 160, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(318, "Big Bang (2 step Fountain)", 800, 160, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(257, "Mr. Bean (3 step Fountain)", 1125, 225, img("placeholder.jpg"), "1 box (1 pcs)"),
      p(258, "Sizzling Logo (3 step Fountain)", 1125, 225, img("placeholder.jpg"), "1 box (1 pcs)"),
      p(269, "Jumbo Crackling Fountain (3pcs)", 1600, 320, img("placeholder.jpg"), "1 box (3 pcs)"),
    ],
  },
  {
    category: "SPECIAL FOUNTAIN",
    products: [
      p(319, "Jungle Series", 1175, 235, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(320, "Sun Light (5pcs)", 550, 110, img("placeholder.jpg"), "1 box (5 pcs)"),  // NEW
      p(321, "Moon Light (5pcs)", 550, 110, img("placeholder.jpg"), "1 box (5 pcs)"),  // NEW
      p(322, "Star Light (5pcs)", 550, 110, img("placeholder.jpg"), "1 box (5 pcs)"),  // NEW
      p(323, "Vel Candle (2pcs)", 1200, 240, img("placeholder.jpg"), "1 box (2 pcs)"),  // NEW
      p(324, "Teensy Multicolour Fountain (5pcs)", 1125, 225, img("placeholder.jpg"), "1 box (5 pcs)"),  // NEW
    ],
  },
  {
    category: "GUJARAT FLOWER POTS",
    products: [
      p(325, "Tim-Tom (5pcs)", 1450, 290, img("placeholder.jpg"), "1 box (5 pcs)"),  // NEW
      p(326, "2 in 1 (5pcs)", 2820, 564, img("placeholder.jpg"), "1 box (5 pcs)"),  // NEW
      p(327, "Jasmine (5pcs)", 2560, 512, img("placeholder.jpg"), "1 box (5 pcs)"),  // NEW
    ],
  },
  {
    category: "COLOUR MATCHES",
    products: [
      p(328, "Mega Laptop 5 in 1", 750, 150, img("placeholder.jpg"), "1 box (1 pcs)"),  // NEW
      p(273, "Mega Laptop 10 in 1", 1300, 260, img("placeholder.jpg"), "1 box (1 pcs)"),
    ],
  },
  {
    category: "SPARKLERS",
    products: [
      p(5, "10 Cm Electric Sparklers", 85, 17, img("10cmelectric.jpg"), "1 box (10 pcs)"),
      p(6, "10 CM Colour Sparklers", 95, 19, img("10cmcolour.jpg"), "1 box (10 pcs)"),
      p(7, "10 Cm Green Sparklers", 105, 21, img("10cmgreensparklers.jpg"), "1 box (10 pcs)"),
      p(8, "10 Cm Red Sparklers", 120, 24, img("10cmredsparklers.jpg"), "1 box (10 pcs)"),
      p(13, "15 Cm Electric Sparklers", 185, 37, img("15cm electric.jpg"), "1 box (10 pcs)"),
      p(14, "15 Cm Colour Sparklers", 200, 40, img("15cmcolour.jpg"), "1 box (10 pcs)"),
      p(15, "15 Cm Green Sparklers", 230, 46, img("15cmgreen.jpg"), "1 box (10 pcs)"),
      p(16, "15 Cm Red Sparklers", 245, 49, img("15cmred.jpg"), "1 box (10 pcs)"),
      p(17, "30 CM Electric Sparklers (5pcs)", 185, 37, img("30cmelectric.jpg"), "1 box (5 pcs)"),
      p(18, "30 Cm Colour Sparklers (5pcs)", 200, 40, img("30cmcolour.jpg"), "1 box (5 pcs)"),
      p(19, "30 Cm Green Sparklers (5pcs)", 230, 46, img("30cmgreen.jpg"), "1 box (5 pcs)"),
      p(20, "30 Cm Red Sparklers (5pcs)", 245, 49, img("30cmred.jpg"), "1 box (5 pcs)"),
      p(21, "50 Cm Electric Sparklers (5pcs)", 800, 160, img("50cmelectric.jpg"), "1 box (5 pcs)"),
      p(22, "50 Cm Colour Sparklers (5pcs)", 900, 180, img("50cmcolour.jpg"), "1 box (5 pcs)"),
      p(25, "Rotating Sparklers", 1050, 210, img("spinningsparklers.jpg"), "1 box (10 pcs)"),
    ],
  },
  {
    category: "GIFT BOXES",
    products: [
      p(329, "15 Items", null, null, img("placeholder.jpg"), "1 box (15 Items)"),  // NEW
      p(172, "20 Items", 2600, 520, img("21items.jpg"), "1 box (20 Items)"),
      p(173, "25 Items", 3300, 660, img("25Items.jpg"), "1 box (25 Items)"),
      p(174, "30 Items", 4000, 800, img("30items.jpg"), "1 box (30 Items)"),
      p(175, "35 Items", 5000, 1000, img("35items.jpg"), "1 box (35 Items)"),
      p(176, "40 Items", 6500, 1300, img("40items.jpg"), "1 box (40 Items)"),
      p(177, "45 Items", 8000, 1600, img("45items.jpg"), "1 box (45 Items)"),
      p(178, "50 Items", 9500, 1900, img("50items.jpg"), "1 box (50 Items)"),
      p(330, "55 Items", null, null, img("placeholder.jpg"), "1 box (55 Items)"),  // NEW
      p(331, "60 Items", null, null, img("placeholder.jpg"), "1 box (60 Items)"),  // NEW
    ],
  },
];

export default productData;