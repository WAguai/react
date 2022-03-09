import { ADDPHOTO,ADDSCRAPBOOK } from '../constant';
const initeState=[
  {
    name:'military',
    photos:
    [
      {
        id: '-1',
        name: 'image.png',
        url: 'https://cn.bing.com/images/search?view=detailV2&ccid=wqNSsGBw&id=E7CF8D477E08B81BA067096A9FB26DEC4371B023&thid=OIP.wqNSsGBwoZfnBHUDq-En9gHaE7&mediaurl=https%3a%2f%2fwww.jxycu.edu.cn%2f_upload%2farticle%2fimages%2f15%2f3e%2fe7af238246ffb8d9edea44a0a604%2fbd3a6e1d-f6a0-4fe0-a2a4-5216053954ca_d.jpg&exph=2259&expw=3389&q=%e5%86%9b%e8%ae%ad&simid=608041586922639097&FORM=IRPRST&ck=A229BB526553CBB7C86A4973034AD47A&selectedIndex=6&ajaxhist=0&ajaxserp=0'
      },
      {
        id: '-2',
        name: 'image.png',
        url: 'https://cn.bing.com/images/search?view=detailV2&ccid=9wnM97gh&id=77742CC109D8B733C036D1DDDBAA5F2AFF2C072F&thid=OIP.9wnM97gh7p2sl0TDrns7LAHaE8&mediaurl=https%3A%2F%2Ftse1-mm.cn.bing.net%2Fth%2Fid%2FR-C.f709ccf7b821ee9dac9744c3ae7b3b2c%3Frik%3DLwcs%252fypfqtvd0Q%26riu%3Dhttp%253a%252f%252fwww.gxltu.edu.cn%252fFile%252fArticlesImage%252f2020-09-30%252f1601431177209d0a7dd08-70f5-4348-b260-52f528a359fc.jpg%26ehk%3D8Pa2xrGe%252fbvj2iGoAbfow4Z0YeBVRtRfbnQkwzLoAqI%253d%26risl%3D%26pid%3DImgRaw%26r%3D0&exph=720&expw=1080&q=%e5%86%9b%e8%ae%ad&simid=607999573549585660&form=IRPRST&ck=4AC654BD9F724C64FE34A8B3FE4F8739&selectedindex=8&ajaxhist=0&ajaxserp=0&vt=0&sim=11',
      },
    ]
  },
  {
    name:'days',
    photos:
    [
      {
        id: '-1',
        name: 'image.png',
        url: 'https://tse1-mm.cn.bing.net/th/id/R-C.74baec1ee90de532e08b3ecd13ff35f3?rik=pQc%2b6VhhlmdbxQ&riu=http%3a%2f%2fwww.desktx.com%2fd%2ffile%2fwallpaper%2fscenery%2f20161110%2fcd9f4edc0bc91edede351d42e2e2d0bf.jpg&ehk=bYQRTmIzO36fCBMlabk%2f%2fg%2bNvj1bZgxRUJBQyEk0R%2f8%3d&risl=&pid=ImgRaw&r=0',
      },
    ]
  },
]
export default function photos(preState=initeState,action){
  const {type,data}=action
  switch (type) {
    case ADDPHOTO:
      const {scrapbookName}=action
      const newState=preState.map((obj)=>{
        if(obj.name===scrapbookName){
          console.log(obj)
          return {
            name:obj.name,
            photos:[...obj.photos,data]
          }
        }
        else 
          return obj
      })
      return newState 
    case ADDSCRAPBOOK:
      return [...preState,{name:data,photos:[]}]
    default:
      return preState
  }
}