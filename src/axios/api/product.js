import instance from "../axios";

//sku模块
//sku列表的接口
///admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) =>
  instance({ url: `/admin/product/list/${page}/${limit}`, method: "get" });

//上架
///admin/product/onSale/{skuId}
export const reqSale = (skuId) =>
  instance({ url: `/admin/product/onSale/${skuId}`, method: "get" });

//下架
///admin/product/cancelSale/{skuId}
export const reqCancel = (skuId) =>
  instance({ url: `/admin/product/cancelSale/${skuId}`, method: "get" });

//获取SKU详情的接口
///admin/product/getSkuById/{skuId}  get
export const reqSkuById = (skuId) =>
  instance({ url: `/admin/product/getSkuById/${skuId}`, method: "get" });

//获取SPU列表数据的接口
///admin/product/{page}/{limit}   get   page limit category3Id
export const reqSpuList = (page, limit, category3Id) =>
  instance({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });

//获取SPU信息
///admin/product/getSpuById/{spuId}   get
export const reqSpu = (spuId) =>
  instance({ url: `/admin/product/getSpuById/${spuId}`, method: "get" });

//获取品牌的信息
///admin/product/baseTrademark/getTrademarkList  get
export const reqTradeMark = () =>
  instance({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: "get",
  });

//获取SPU图标的接口
///admin/product/spuImageList/{spuId}  get
export const reqSpuImageList = (spuId) =>
  instance({ url: `/admin/product/spuImageList/${spuId}`, method: "get" });

//获取平台全部销售属性----整个平台销售属性一共三个
//GET /admin/product/baseSaleAttrList

export const reqBaseSaleAttrList = () =>
  instance({ url: "/admin/product/baseSaleAttrList", method: "get" });

//修改SPU||添加SPU：对于修改或者添加，携带给服务器参数大致一样的，唯一的区别就是携带的参数是否带id
export const reqAddOrUpdateSpu = (spuInfo) => {
  //携带的参数带有id----修改spu
  if (spuInfo.id) {
    return instance({
      url: "/admin/product/updateSpuInfo",
      method: "post",
      data: spuInfo,
    });
  } else {
    //携带的参数不带id---添加SPU
    return instance({
      url: "/admin/product/saveSpuInfo",
      method: "post",
      data: spuInfo,
    });
  }
};

//删除SPU
///admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) =>
  instance({ url: `/admin/product/deleteSpu/${spuId}`, method: "delete" });

//获取图片的数据
///admin/product/spuImageList/{spuId}  get
export const reqSpuImageLIst = (spuId) =>
  instance({ url: `/admin/product/spuImageList/${spuId}`, method: "get" });

//获取销售属性的数据
///admin/product/spuSaleAttrList/{spuId}  get
export const reqSpuSaleAttrList = (spuId) =>
  instance({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: "get" });

//获取平台属性的数据
//GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) =>
  instance({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });

//添加SKU
///admin/product/saveSkuInfo  post
export const reqAddSku = (skuInfo) =>
  instance({
    url: "/admin/product/saveSkuInfo",
    method: "post",
    data: skuInfo,
  });

//获取SKU列表数据的接口
//GET /admin/product/findBySpuId/{spuId}
export const reqSkuLists = (spuId) =>
  instance({ url: `/admin/product/findBySpuId/${spuId}`, method: "get" });

// //平台属性管理模块请求文件
// import instance from "@/utils/instance";

//获取一级分类数据接口
///admin/product/getCategory1   get
export const reqCategory1List = () =>
  instance({ url: "/admin/product/getCategory1", method: "get" });

//获取二级分类数据接口
//admin/product/getCategory2/{category1Id} get
export const reqCategory2List = (category1Id) =>
  instance({
    url: `/admin/product/getCategory2/${category1Id}`,
    method: "get",
  });

//获取三级分类数据接口
///admin/product/getCategory3/{category2Id}  get
export const reqCategory3List = (category2Id) =>
  instance({
    url: `/admin/product/getCategory3/${category2Id}`,
    method: "get",
  });

//获取平台属性接口
///admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}  get
export const reqAttrList = (category1Id, category2Id, category3Id) =>
  instance({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });

//添加属性与属性值接口
///admin/product/saveAttrInfo  post
export const reqAddOrUpdateAttr = (data) =>
  instance({ url: "/admin/product/saveAttrInfo", method: "post", data });

//这个模块主要获取的是品牌管理的数据的模块
// import instance from "@/utils/instance";
// //获取品牌列表接口
// ///admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) =>
  instance({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });

//处理添加品牌
//新增品牌: /admin/product/baseTrademark/save   post  携带两个参数：品牌名称、品牌logo
//切记：对于新增的品牌，给服务器传递数据，不需要传递ID，ID是由服务器生成

//修改品牌的
//修改品牌 /admin/product/baseTrademark/update   put   携带三个参数：id、品牌名称、品牌logo
//切记：对于修改某一个品牌的操作，前端携带的参数需要带上id，你需要告诉服务器修改的是哪一个品牌

export const reqAddOrUpdateTradeMark = (tradeMark) => {
  //带给服务器数据携带ID---修改
  if (tradeMark.id) {
    return instance({
      url: "/admin/product/baseTrademark/update",
      method: "put",
      data: tradeMark,
    });
  } else {
    //新增品牌
    return instance({
      url: "/admin/product/baseTrademark/save",
      method: "post",
      data: tradeMark,
    });
  }
};
//删除品牌
///admin/product/baseTrademark/remove/{id}  delete

export const reqDeleteTradeMark = (id) =>
  instance({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete",
  });
