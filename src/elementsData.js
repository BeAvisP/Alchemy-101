class ElementsData {
  constructor() {
    this.elementsList = [
      {
        name: "water",
        foundElement: true,
        imgSrc: "assets/images/water-drop.png",
        combinations: [
          {
            element: "fire",
            result: "steam",
          },
          {
            element: "earth",
            result: "mud",
          },
          {
            element: "air",
            result: "mist",
          },
        ],
      },
      {
        name: "fire",
        foundElement: true,
        imgSrc: "assets/images/fire.png",
        combinations: [
          {
            element: "water",
            result: "steam",
          },
          {
            element: "earth",
            result: "lava",
          },
          {
            element: "air",
            result: "smoke",
          },
        ],
      },
      {
        name: "air",
        foundElement: true,
        imgSrc: "assets/images/wind-slap.png",
        combinations: [
          {
            element: "water",
            result: "mist",
          },
          {
            element: "earth",
            result: "dust",
          },
          {
            element: "fire",
            result: "smoke",
          },
        ],
      },
      {
        name: "earth",
        foundElement: true,
        imgSrc: "assets/images/stone-block.png",
        combinations: [
          {
            element: "water",
            result: "mud",
          },
          {
            element: "air",
            result: "dust",
          },
          {
            element: "fire",
            result: "lava",
          },
        ],
      },
      {
        name: "steam",
        foundElement: false,
        imgSrc: "assets/images/steam.png",
        combinations: [],
      },
      { 
        name: "mud",
        foundElement: false,
        imgSrc: "assets/images/mud.png",
        combinations: [],
      },
      {
        name: "mist",
        foundElement: false,
        imgSrc: "assets/images/mist.png",
        combinations: [],
      },
      {
        name: "lava",
        foundElement: false,
        imgSrc: "assets/images/lava.png",
        combinations: [],
      },
      {
        name: "smoke",
        foundElement: false,
        imgSrc: "assets/images/smoke.png",
        combinations: [],
      },
      {
        name: "dust",
        foundElement: false,
        imgSrc: "assets/images/dust.png",
        combinations: [],
      },
    ];
  }
}
