import React from "react";
import { Graph, Addon, Shape, View } from "@antv/x6";
import "./app.css";
import "../model/pf";
import "@antv/x6-react-components/es/menu/style/index.css";
import "@antv/x6-react-components/es/toolbar/style/index.css";
import "antd/dist/antd.css";
import { Menu, Toolbar, ContextMenu } from "@antv/x6-react-components";
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  RedoOutlined,
  UndoOutlined,
  DeleteOutlined,
  BoldOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  SaveFilled
} from "@ant-design/icons";
import { message } from "antd";
import "@antv/x6-react-components/es/menu/style/index.css";
import "@antv/x6-react-components/es/dropdown/style/index.css";
import "@antv/x6-react-components/es/context-menu/style/index.css";
import { exportJSON } from "../utils/pfUtils";
const { Stencil } = Addon;
const Group = Toolbar.Group;
const Item = Toolbar.Item;
interface doState {
  canUndo: boolean;
  canRedo: boolean;
}
export default class Example extends React.Component {
  private container: HTMLDivElement;
  private stencilContainer: HTMLDivElement;
  private graph: Graph;
  private view: View;
  state: doState = {
    canRedo: false,
    canUndo: false
  };
  onClick = (name: string) => {
    if (name === "save") this.saveJson();
    console.log(this.state.canRedo);
    message.success(`${name} clicked`, 10);
    debugger;
  };
  saveJson() {
    exportJSON(this.graph);
  }

  renderZoomDropdown() {
    const MenuItem = Menu.Item; // eslint-disable-line
    const Divider = Menu.Divider; // eslint-disable-line
    return (
      <Menu>
        <MenuItem name="resetView" hotkey="Cmd+H">
          Reset View
        </MenuItem>
        <MenuItem name="fitWindow" hotkey="Cmd+Shift+H">
          Fit Window
        </MenuItem>
        <Divider />
        <Divider />
        <MenuItem name="25">25%</MenuItem>
        <MenuItem name="50">50%</MenuItem>
        <MenuItem name="75">75%</MenuItem>
        <MenuItem name="100">100%</MenuItem>
        <MenuItem name="125">125%</MenuItem>
        <MenuItem name="150">150%</MenuItem>
        <MenuItem name="200">200%</MenuItem>
        <MenuItem name="300">300%</MenuItem>
        <MenuItem name="400">400%</MenuItem>
        <MenuItem name="400">400%</MenuItem>
      </Menu>
    );
  }
  componentDidMount() {
    this.graph = new Graph({
      container: this.container,
      grid: true,
      connecting: {
        snap: true,
        allowBlank: false,
        // allowPort: false,
        allowEdge: false,
        highlight: true
      },
      snapline: {
        enabled: true,
        sharp: true
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: true
      },
      resizing: true,
      history: true
      // minimap: {save
      //   enabled: true,
      //   container: this.container
      //   // position: {
      //   //   x: 200,
      //   //   y: 300
      //   // }
      // }
    });
    this.graph.on("cell:dblclick", ({ cell, e }) => {
      cell.addTools([
        {
          name: cell.isEdge() ? "edge-editor" : "node-editor",
          args: {
            event: e
          }
        }
      ]);
    });
    // this.graph.on("edge:mouseenter", ({ cell }) => {
    //   cell.addTools([
    //     {
    //       name: "source-arrowhead"
    //     },
    //     {
    //       name: "target-arrowhead",
    //       args: {
    //         attrs: {
    //           fill: "red"
    //         }
    //       }
    //     }
    //   ]);
    // });
    this.graph.on("edge:added", ({ edge, e }) => {
      const source = this.graph.getCellById(edge.getSourceCellId());
      var myStokeDasharray = "5,0";
      if (source.shape === "Requirement") {
        myStokeDasharray = "5,5";
      }
      edge.attr({
        line: {
          strokeDasharray: myStokeDasharray,
          targetMarker: ""
        }
      });
      console.log(source.shape);
      //无法获取targetcell
      // console.log('aaa: '+edge.id);
      // const myedge = this.graph.getCellById(edge.id);
      // // console.log('bbb: '+myedge.id);
      // console.log(myedge);
      console.log(edge);
      console.log("sour: " + edge.getSourceCellId());
      console.log("targ: " + edge.getTargetCellId());
      // console.log(123);
      // const target = this.graph.getCellById(edge.source.cell);
      // console.log(target.id);
    });
    this.graph.on("edge:mouseleave", ({ cell }) => {
      cell.removeTools();
    });
    this.graph.on("cell:click", ({ view }) => {
      this.view = view;
    });
    this.graph.history.on("change", () => {
      this.setState({
        canRedo: this.graph.history.canRedo(),
        canUndo: this.graph.history.canUndo()
      });
    });
    const stencil = new Stencil({
      title: "Components",
      target: this.graph,
      search(cell, keyword) {
        return cell.shape.indexOf(keyword) !== -1;
      },
      placeholder: "Search by shape name",
      notFoundText: "Not Found",
      collapsable: true,
      stencilGraphWidth: 250,
      stencilGraphHeight: 300,
      groups: [
        {
          name: "group1",
          title: "Group(Collapsable)"
        }
      ]
    });

    this.stencilContainer.appendChild(stencil.container);
    const machine = this.graph.createNode({
      shape: "Machine",
      attrs: {
        text: { text: "Machine" }
      }
    });
    const designDomain = this.graph.createNode({
      shape: "DesignDomain",
      attrs: {
        text: { text: "Design" }
      }
    });
    const requirement = this.graph.createNode({
      shape: "Requirement",
      attrs: {
        text: { text: "Requirement" }
      }
    });
    const givenDomain = this.graph.createNode({
      shape: "GivenDomain",
      attrs: {
        text: { text: "GivenDomain" }
      }
    });
    const entity = this.graph.createNode({
      shape: "Entity",
      attrs: {
        text: { text: "Entity" }
      }
    });

    stencil.load(
      [machine, designDomain, givenDomain, entity, requirement],
      "group1"
    );
    // stencil.load([c2.clone(), r2, r3, c3], "group2");
  }

  onUndo = () => {
    this.graph.history.undo();
  };
  onRedo = () => {
    this.graph.history.redo();
  };
  onDelete = () => {
    this.view.cell.remove();
  };
  refContainer = (container: HTMLDivElement) => {
    this.container = container;
  };

  refStencil = (container: HTMLDivElement) => {
    this.stencilContainer = container;
  };

  render() {
    return (
      <div>
        <div style={{ padding: 0 }}>
          <div style={{ background: "#f5f5f5", paddingRight: 0 }}>
            <Toolbar
              hoverEffect={true}
              size="big"
              onClick={this.onClick}
              extra={<span>Extra Component</span>}
            >
              <Group>
                <Item
                  name="zoom"
                  tooltipAsTitle={true}
                  tooltip="Zoom (Alt+Mousewheel)"
                  dropdown={this.renderZoomDropdown()}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 40,
                      textAlign: "right"
                    }}
                  >
                    100%
                  </span>
                </Item>
              </Group>
              <Group>
                <Item
                  name="zoomIn"
                  tooltip="Zoom In (Cmd +)"
                  icon={<ZoomInOutlined />}
                />
                <Item
                  name="zoomOut"
                  tooltip="Zoom Out (Cmd -)"
                  icon={<ZoomOutOutlined />}
                />
              </Group>
              <Group>
                <Item name="save" tooltip="save" icon={<SaveFilled />} />
              </Group>
              <Group>
                <Item
                  name="undo"
                  tooltip="Undo (Cmd + Z)"
                  onClick={this.onUndo}
                  disabled={!this.state.canUndo}
                  icon={<UndoOutlined />}
                />
                <Item
                  name="redo"
                  tooltip="Redo (Cmd + Shift + Z)"
                  onClick={this.onRedo}
                  disabled={!this.state.canRedo}
                  icon={<RedoOutlined />}
                />
              </Group>
              <Group>
                <Item
                  name="delete"
                  icon={<DeleteOutlined />}
                  onClick={this.onDelete}
                  disabled={false}
                  tooltip="Delete (Delete)"
                />
              </Group>
              <Group>
                <Item
                  name="bold"
                  icon={<BoldOutlined />}
                  active={true}
                  tooltip="Bold (Cmd + B)"
                />
                <Item
                  name="italic"
                  icon={<ItalicOutlined />}
                  tooltip="Italic (Cmd + I)"
                />
                <Item
                  name="strikethrough"
                  icon={<StrikethroughOutlined />}
                  tooltip="Strikethrough (Cmd + Shift + x)"
                />
                <Item
                  name="underline"
                  icon={<UnderlineOutlined />}
                  tooltip="Underline (Cmd + U)"
                />
              </Group>
            </Toolbar>
          </div>
        </div>

        <div className="app" style={{ padding: 0 }}>
          <div className="app-stencil" ref={this.refStencil} />
          <div className="app-content" ref={this.refContainer} />
        </div>
      </div>
    );
  }
}
