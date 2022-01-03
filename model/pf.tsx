import { Graph } from "@antv/x6";
const bgColor = "white";
const lineColor = "black";
const shapeWidth = 100;
const shapeHeight = 50;

var body = {
  fill: bgColor,
  stroke: lineColor,
  strokeWidth: 2
};
var portAttrs = {
  circle: {
    r: 4,
    magnet: true,
    stroke: "transparent",
    strokeWidth: 1,
    fill: "transparent"
    // style: {
    //   visibility: "hidden"
    // }
  }
};
const ports = {
  groups: {
    top: {
      position: "top",
      attrs: portAttrs
    },
    right: {
      position: "right",
      attrs: portAttrs
    },
    bottom: {
      position: "bottom",
      attrs: portAttrs
    },
    left: {
      position: "left",
      attrs: portAttrs
    }
  },
  items: [
    {
      group: "top"
    },
    {
      group: "right"
    },
    {
      group: "bottom"
    },
    {
      group: "left"
    }
  ]
};

Graph.registerNode("Machine", {
  inherit: "polygon",
  width: shapeWidth,
  height: shapeHeight,
  label: "polygon",
  points: [
    [0, 0],
    [shapeWidth, 0],
    [shapeWidth, shapeHeight],
    [0, shapeHeight],
    [0, 0],
    [shapeWidth * 0.26, 0],
    [shapeWidth * 0.26, shapeHeight],
    [shapeWidth * 0.13, shapeHeight],
    [shapeWidth * 0.13, 0]
  ],
  attrs: {
    body: {
      ...body
    }
  },
  ports: { ...ports }
});
Graph.registerNode("DesignDomain", {
  inherit: "polygon",
  width: shapeWidth,
  height: shapeHeight,
  points: [
    [0, 0],
    [shapeWidth, 0],
    [shapeWidth, shapeHeight],
    [0, shapeHeight],
    [0, 0],
    [shapeWidth * 0.13, 0],
    [shapeWidth * 0.13, shapeHeight],
    [0, shapeHeight]
  ],
  attrs: {
    body: {
      ...body
    }
  },
  ports: { ...ports }
});
Graph.registerNode("Requirement", {
  inherit: "ellipse",
  width: 90,
  height: 60,

  attrs: {
    body: {
      fill: bgColor,
      stroke: lineColor,
      strokeWidth: 2,
      strokeDasharray: "5,5"
    }
  }
});
Graph.registerNode("GivenDomain", {
  inherit: "rect",
  width: shapeWidth,
  height: shapeHeight,
  attrs: {
    body: { ...body }
  },
  ports: { ...ports }
});
Graph.registerNode("Entity", {
  inherit: "ellipse",
  width: 90,
  height: 60,
  attrs: {
    body: { ...body }
  }
});
