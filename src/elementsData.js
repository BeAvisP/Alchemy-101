class ElementsData {
  constructor() {
    this.elementsList = [
      {
        name: "water",
        foundElement: true,
        imgSrc: "assets/images/water.png",
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
          {
            element: "cloud",
            result: "rain"
          }
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
          {
            element: "mud",
            result: "brick",
          },
          {
            element: "dust",
            result: "gunpowder"
          }
        ],
      },
      {
        name: "air",
        foundElement: true,
        imgSrc: "assets/images/air.png",
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
          {
            element: "lava",
            result: "stone",
          },
          {
            element: "air",
            result: "sand"
          },
          {
            element: "steam",
            result: "cloud"
          }
        ],
      },
      {
        name: "earth",
        foundElement: true,
        imgSrc: "assets/images/earth.png",
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
          {
            element: "rain",
            result: "plant"
          },
          {
            element: "lava",
            result: "volcano"
          }
        ],
      },
      {
        name: "steam",
        foundElement: false,
        imgSrc: "assets/images/steam.png",
        combinations: [
          {
            element: "air",
            result: "cloud"
          }
        ],
      },
      { 
        name: "mud",
        foundElement: false,
        imgSrc: "assets/images/mud.png",
        combinations: [
          {
            element: "fire",
            result: "brick",
          },
        ],
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
        combinations: [
          {
            element: "air",
            result: "stone"
          },
          {
            element: "earth",
            result: "volcano"
          }
        ],
      },
      {
        name: "smoke",
        foundElement: false,
        imgSrc: "assets/images/smoke.png",
        combinations: [
          {
            element: "rain",
            result: "acid rain"
          }
        ],
      },
      {
        name: "dust",
        foundElement: false,
        imgSrc: "assets/images/dust.png",
        combinations: [
          {
            element: "fire",
            result: "gunpowder"
          }
        ],
      },
      { 
        name: "stone",
        foundElement: false,
        imgSrc: "assets/images/stone.png",
        combinations: [
          {
            element: "air",
            result: "sand"
          }
        ],
      },
      {
        name: "sand",
        foundElement: false,
        imgSrc: "assets/images/sand.png",
        combinations: [
          {
            element: "plant",
            result: "cactus"
          }
        ],
      },
      {
        name: "brick",
        foundElement: false,
        imgSrc: "assets/images/brick.png",
        combinations: [],
      },
      {
        name: "cloud",
        foundElement: false,
        imgSrc: "assets/images/cloud.png",
        combinations: [
          {
            element: "water",
            result: "rain"
          }
        ],
      },
      {
        name: "rain",
        foundElement: false,
        imgSrc: "assets/images/rain.png",
        combinations: [
          {
            element: "earth",
            result: "plant"
          },
          {
            element: "smoke",
            result: "acid rain"
          }
        ],
      },
      { 
        name: "plant",
        foundElement: false,
        imgSrc: "assets/images/plant.png",
        combinations: [
          {
            element: "sand",
            result: "cactus"
          }
        ],
      },
      {
        name: "volcano",
        foundElement: false,
        imgSrc: "assets/images/volcano.png",
        combinations: [],
      },
      {
        name: "acid rain",
        foundElement: false,
        imgSrc: "assets/images/acid-rain.png",
        combinations: [],
      },
      {
        name: "gunpowder",
        foundElement: false,
        imgSrc: "assets/images/gunpowder.png",
        combinations: [],
      },
      {
        name: "cactus",
        foundElement: false,
        imgSrc: "assets/images/cactus.png",
        combinations: [],
      },
    ];
  }
}
