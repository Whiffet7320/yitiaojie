<template>
  <div id="viewer" class="body"></div>
</template>
<script>
import { Viewer } from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";
import { MarkersPlugin } from "photo-sphere-viewer/dist/plugins/markers";
import "photo-sphere-viewer/dist/plugins/markers.css";
import axios from "axios";
export default {
  data() {
    return {
      viewer: "",
      imgurl1:
        "https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1640245384594.jpeg",
      imageloading: [
        {
          imgurl:
            "https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1640245384594.jpeg",
          marker: [
            {
              id: "image1",
              image:
                "https://img1.baidu.com/it/u=492371388,975554716&fm=26&fmt=auto",
              width: 200,
              height: 100,
              longitude: -0.6,
              latitude: 0,
              anchor: "bottom center",
              className: "markers",
              tooltip: {
                content: "欢迎进入建材一条街",
                position: "bottom left"
              },
              visible: true
            }
          ]
        },
        {
          imgurl:
            "https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1640245384594.jpeg",
          marker: [
            // {
            //   id: "circle2",
            //   tooltip: "男鞋",
            //   // circle: 30,
            //   width: 30,
            //   height: 30,
            //   image: require("../assets/pin1.png"),
            //   // svgStyle: {
            //   //   fill: 'rgba(0,0,0,0.5)',
            //   //   stroke: 'yellow',
            //   //   strokeWidth: '50px'
            //   // },
            //   longitude: -2.5,
            //   latitude: 0.15,
            //   anchor: "center right"
            // },
            // {
            //   id: "circle1",
            //   tooltip: "女鞋",
            //   width: 30,
            //   height: 30,
            //   image: require("../assets/pin1.png"),
            //   longitude: -3.5,
            //   latitude: 0.15,
            //   anchor: "center right"
            // },
            // {
            //   id: "text",
            //   tooltip: "女鞋",
            //   longitude: 0,
            //   latitude: 0,
            //   html: `HTML <a href="javascript:;" onclick="console.log('aa')">markerd</a> ♥`,
            //   style: {
            //     maxWidth: "100px",
            //     color: "white",
            //     fontSize: "20px",
            //     fontFamily: "Helvetica, sans-serif",
            //     textAlign: "center"
            //   },
            //   anchor: "bottom right"
            // },
            // {
            //   id: "circle12",
            //   tooltip: "帽子",
            //   circle: 30,
            //   // image: '../assets/pin1.png',
            //   svgStyle: {
            //     fill: "rgba(0,0,0,0.5)",
            //     stroke: "yellow",
            //     strokeWidth: "50px"
            //   },
            //   longitude: -3.2,
            //   latitude: 0.15,
            //   anchor: "center right"
            // }
          ]
        }
      ]
    };
  },
  async created() {
    const res = await axios.post("https://rushifu.hxqhhhh.shop/admin/login", {
      phone: "admin",
      password: "admin"
    });
    const res2 = await axios.get("https://rushifu.hxqhhhh.shop/admin/banners", {
      headers: {
        Authorization: `Bearer ${res.data.data.token_info.access_token}`
      },
      params: {
        limit: 100,
        page: 1,
        position: 6
      }
    });
    console.log(res2.data.data.data);
    // this.imageloading[0].marker =
    res2.data.data.data.forEach((ele, i) => {
      this.$set(this.imageloading[0].marker, i, {
        id: `text${i}`,
        tooltip: ele.name,
        jump: ele.jump,
        jump_type: ele.jump_type,
        eleID: ele.id,
        longitude: `${i}.3`,
        latitude: 0.1,
        html: `<span onclick="console.log('aa')">${ele.name}</span>`,
        style: {
          maxWidth: "100px",
          color: "white",
          background: "rgba(0,0,0, 0.7)",
          borderRadius: "10px",
          fontSize: "20px",
          fontFamily: "Helvetica, sans-serif",
          textAlign: "center",
          padding: "10px"
        },
        anchor: "bottom right"
      });
    });
  },
  methods: {
    initPhotoSphere: function(c) {
      const viewers = new Viewer({
        // Container
        container: document.getElementById("viewer"),
        panorama: c.imgurl,
        navbar: false,
        size: {
          width: "100%",
          height: "100vh"
        },
        plugins: [
          [
            MarkersPlugin,
            {
              // time_anim: false,
              // fisheye:true,
              // scale: 1,
              markers: c.marker
            }
          ]
        ]
      });

      const MarkersPlugins = viewers.getPlugin(MarkersPlugin);
      viewers.setPanorama(this.imgurl1).then(() => {
        MarkersPlugins.setMarkers(this.imageloading[0].marker);
      });
      if (MarkersPlugins) {
        MarkersPlugins.on("select-marker", (e, marker) => {
          console.log(marker);

          const markerid = marker.id;
          if (markerid === "image1") {
            viewers.setPanorama(this.imgurl1).then(() => {
              MarkersPlugins.setMarkers(this.imageloading[0].marker);

              MarkersPlugins.on("select-marker", (e, marker) => {
                if (marker.id === "image3") {
                  viewers.setPanorama(this.imageloading[0].imgurl).then(() => {
                    MarkersPlugins.setMarkers(this.imageloading[0].marker);
                  });
                }
              });
            });
          }

          if (marker.config.jump_type == 0) {
            // 网页
            this.wx.miniProgram.navigateTo({
              url: `/pages/index/h5/h5?url=${marker.config.jump}`
            });
          } else if (marker.config.jump_type == 2) {
            // 如商城
            this.wx.miniProgram.navigateTo({
              url: "/pages/index/rushangcheng/rushangcheng"
            });
          } else if (marker.config.jump_type == 3) {
            // 转盘
            this.wx.miniProgram.navigateTo({
              url: "/pages/index/zhuanpan/zhuanpan"
            });
          } else if (marker.config.jump_type == 4) {
            // 商品
            this.wx.miniProgram.navigateTo({
              url: `/pages/index/shangpinxiangqin/shangpinxiangqin?id=${marker.config.eleID}`
            });
          } else if (marker.config.jump_type == 5) {
            // 建材街道
            this.wx.miniProgram.navigateTo({
              url: `/pages/index/jiancaijiedao/jiancaijiedao?id=${marker.config.eleID}`
            });
          } else if (marker.config.jump_type == 6) {
            // 商品分类
            this.wx.miniProgram.navigateTo({
              url: `/pages/index/rushangcheng/rushangcheng?id=${marker.config.jump}`
            });
          }

          // if (markerid === "circle2") {
          //   this.wx.miniProgram.navigateTo({
          //     url: "/pages/fenlei/fenlei?id=男鞋"
          //   });
          //   console.log(111);
          // } else if (markerid === "text") {
          //   this.wx.miniProgram.navigateTo({
          //     url: "/pages/fenlei/fenlei?id=女鞋"
          //   });
          // } else if (markerid === "circle12") {
          //   this.wx.miniProgram.navigateTo({
          //     url: "/pages/fenlei/fenlei?id=帽子"
          //   });
          // }
        });
      }
      // markersPlugin.on('select-marker', (e, marker) => {
      //   if (marker.id === 'image1') {
      //     viewers.setPanorama(require('../assets/999.jpg')).then(() => {
      //       markersPlugin.setMarkers(this.imageloading[1].marker)
      //
      //       markersPlugin.on('select-marker', (e, marker) => {
      //         if (marker.id === 'image3') {
      //           viewers.setPanorama(this.imageloading[0].imgurl).then(() => {
      //             markersPlugin.setMarkers(this.imageloading[0].marker)
      //           })
      //         }
      //       })
      //     })
      //   }
      //   if (marker.id === 'image2') {
      //     //  alert(e);
      //     viewers.setPanorama(require('../assets/0200.jpg')).then(() => {
      //       markersPlugin.setMarkers(this.imageloading[1].marker)
      //
      //       markersPlugin.on('select-marker', (e, marker) => {
      //         if (marker.id === 'image3') {
      //           viewers.setPanorama(this.imageloading[0].imgurl).then(() => {
      //             markersPlugin.setMarkers(this.imageloading[0].marker)
      //           })
      //         }
      //       })
      //     })
      //   }
      // })
    }
  },
  mounted() {
    this.initPhotoSphere(this.imageloading[0]);
    //   this.viewer = new Viewer({
    //     container: document.querySelector('#viewer'),
    //     panorama: this.imgurl1,
    //     size: {
    //       width: '100%',
    //       height: '99vh'
    //     },
    //     // autoload: true,
    //     navbar: false, // 下面导航栏不显示
    //     plugins: [
    //       [MarkersPlugin, {
    //         markers: [
    //           {
    //             id: 'circle2',
    //             tooltip: '男鞋',
    //             // circle: 30,
    //             width: 30,
    //             height: 30,
    //             image: require('../assets/pin1.png'),
    //             // svgStyle: {
    //             //   fill: 'rgba(0,0,0,0.5)',
    //             //   stroke: 'yellow',
    //             //   strokeWidth: '50px'
    //             // },
    //             longitude: -2.5,
    //             latitude: 0.15,
    //             anchor: 'center right'
    //           },
    //           {
    //             id: 'circle1',
    //             tooltip: '女鞋',
    //             width: 30,
    //             height: 30,
    //             image: require('../assets/pin1.png'),
    //             longitude: -3,
    //             latitude: 0.15,
    //             anchor: 'center right'
    //           },
    //           {
    //             id: 'circle12',
    //             tooltip: '帽子',
    //             circle: 30,
    //             // image: '../assets/pin1.png',
    //             svgStyle: {
    //               fill: 'rgba(0,0,0,0.5)',
    //               stroke: 'yellow',
    //               strokeWidth: '50px'
    //             },
    //             longitude: -3.2,
    //             latitude: 0.15,
    //             anchor: 'center right'
    //           }
    //         ]
    //       }]
    //     ]
    //   })
    //   const MarkersPlugins = this.viewer.getPlugin(MarkersPlugin)
    //   if (MarkersPlugins) {
    //     MarkersPlugins.on('select-marker', (e, marker) => {
    //       console.log(e, marker)
    //       const markerid = marker.id
    //       if (markerid === 'circle2') {
    //         this.wx.miniProgram.navigateTo({ url: '/pages/fenlei/fenlei?id=男鞋' })
    //         console.log(111)
    //       } else if (markerid === 'circle1') {
    //         this.wx.miniProgram.navigateTo({ url: '/pages/fenlei/fenlei?id=女鞋' })
    //       } else if (markerid === 'circle12') {
    //         this.wx.miniProgram.navigateTo({ url: '/pages/fenlei/fenlei?id=帽子' })
    //       }
    //     })
    //   }
  }
};
</script>
<style>
body {
  overflow: hidden;
}
</style>
