class ElementsData {
  constructor() {
    this.elementsList = [
      {
        name: "water",
        foundElement: true,
        imgSrc: "/images/water.png",
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
        imgSrc: "/images/fire.png",
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
        imgSrc: "/images/air.png",
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
        imgSrc: "/images/earth.png",
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
        imgSrc: "/images/steam.png",
        combinations: [],
      },
      { 
        name: "mud",
        foundElement: false,
        imgSrc: "/images/mud.png",
        combinations: [],
      },
      {
        name: "mist",
        foundElement: false,
        imgSrc: "/images/mist.png",
        combinations: [],
      },
      {
        name: "lava",
        foundElement: false,
        imgSrc: "/images/lava.png",
        combinations: [],
      },
      {
        name: "smoke",
        foundElement: false,
        imgSrc: "/images/smoke.png",
        combinations: [],
      },
      {
        name: "dust",
        foundElement: false,
        imgSrc: "/images/dust.png",
        combinations: [],
      },
    ];
  }
}
