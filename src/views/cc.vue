<template>
  <div id="viewer" class="body">
  </div>
</template>
<script>
import { Viewer } from 'photo-sphere-viewer'
import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
import { MarkersPlugin } from 'photo-sphere-viewer/dist/plugins/markers'
import 'photo-sphere-viewer/dist/plugins/markers.css'

export default {
  data () {
    return {
      viewer: '',
      imgurl1: 'https://rushifu-test.oss-cn-hangzhou.aliyuncs.com/1636964618281.jpeg',
      imageloading: [
        {
          imgurl: require('../assets/0999.jpg'),
          marker: [
            {
              id: 'image1',
              image: require('../assets/pin1.png'),
              width: 35,
              height: 35,
              longitude: 2,
              latitude: 0,
              anchor: 'bottom center',
              className: 'markers',
              tooltip: {
                content: '欢迎进入下一场景',
                position: 'bottom left'
              },
              visible: true
            }
          ]
        },
        {
          imgurl: '../assets/999.jpg',
          marker: [
            {
              id: 'circle2',
              tooltip: '男鞋',
              // circle: 30,
              width: 30,
              height: 30,
              image: require('../assets/pin1.png'),
              // svgStyle: {
              //   fill: 'rgba(0,0,0,0.5)',
              //   stroke: 'yellow',
              //   strokeWidth: '50px'
              // },
              longitude: -2.5,
              latitude: 0.15,
              anchor: 'center right'
            },
            {
              id: 'circle1',
              tooltip: '女鞋',
              width: 30,
              height: 30,
              image: require('../assets/pin1.png'),
              longitude: -3,
              latitude: 0.15,
              anchor: 'center right'
            },
            {
              id: 'circle12',
              tooltip: '帽子',
              circle: 30,
              // image: '../assets/pin1.png',
              svgStyle: {
                fill: 'rgba(0,0,0,0.5)',
                stroke: 'yellow',
                strokeWidth: '50px'
              },
              longitude: -3.2,
              latitude: 0.15,
              anchor: 'center right'
            }
          ]
        }
      ]
    }
  },
  methods: {
    initPhotoSphere: function (c) {
      const viewers = new Viewer({
        // Container
        container: document.getElementById('viewer'),
        panorama: c.imgurl,
        navbar: true,
        size: {
          width: '100%',
          height: '100vh'
        },
        plugins: [
          [MarkersPlugin, {
            // time_anim: false,
            // fisheye:true,
            scale: 1,
            markers: c.marker
          }]
        ]
      })

      viewers.on('position-updated', function (po) {
        var span1 = document.getElementById('long')
        span1.innerHTML = po.args[0].longitude

        var span2 = document.getElementById('lat')
        span2.innerHTML = po.args[0].latitude
      })

      const markersPlugin = viewers.getPlugin(MarkersPlugin)

      markersPlugin.on('select-marker', (e, marker) => {
        if (marker.id === 'image1') {
          viewers.setPanorama(require('../assets/999.jpg')).then(() => {
            markersPlugin.setMarkers(this.imageloading[1].marker)

            markersPlugin.on('select-marker', (e, marker) => {
              if (marker.id === 'image3') {
                viewers.setPanorama(this.imageloading[0].imgurl).then(() => {
                  markersPlugin.setMarkers(this.imageloading[0].marker)
                })
              }
            })
          })
        }
        if (marker.id === 'image2') {
          //  alert(e);
          viewers.setPanorama(require('../assets/0200.jpg')).then(() => {
            markersPlugin.setMarkers(this.imageloading[1].marker)

            markersPlugin.on('select-marker', (e, marker) => {
              if (marker.id === 'image3') {
                viewers.setPanorama(this.imageloading[0].imgurl).then(() => {
                  markersPlugin.setMarkers(this.imageloading[0].marker)
                })
              }
            })
          })
        }
      })
    }
  },
  mounted () {
    this.initPhotoSphere(this.imageloading[0])
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
}
</script>
<style>
body{
  overflow: hidden;
}
</style>
