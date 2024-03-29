const path = require("path");

module.exports = {
  title: "Leo's Blog",
  description: "",
  dest: "public",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  theme: "reco",
  themeConfig: {
    nav: [
      {
        text: "Home",
        link: "/",
        icon: "reco-home",
      },
      {
        text: "TimeLine",
        link: "/timeline/",
        icon: "reco-date",
      },
      // {
      //   "text": "Docs",
      //   "icon": "reco-message",
      //   "items": [
      //     {
      //       "text": "vuepress-reco",
      //       "link": "/docs/theme-reco/"
      //     }
      //   ]
      // },
      {
        text: "Contact",
        icon: "reco-message",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/Leo3030",
            icon: "reco-github",
          },
        ],
      },
    ],
    // sidebar: {
    //   "/docs/theme-reco/": ["", "theme", "plugin", "api"],
    // },
    type: "blog",
    blogConfig: {
      // category: {
      //   location: 2,
      //   text: "Category",
      // },
      tag: {
        location: 2,
        text: "Tag",
      },
    },
    // friendLink: [
    //   {
    //     title: "午后南杂",
    //     desc: "Enjoy when you can, and endure when you must.",
    //     email: "1156743527@qq.com",
    //     link: "https://www.recoluan.com",
    //   },
    //   {
    //     title: "vuepress-theme-reco",
    //     desc: "A simple and beautiful vuepress Blog & Doc theme.",
    //     avatar:
    //       "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
    //     link: "https://vuepress-theme-reco.recoluan.com",
    //   },
    // ],
    logo: "/logo.png",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    author: "Leo Tang",
    authorAvatar: "/avatar.jpg",
    startYear: "2024",
  },
  markdown: {
    lineNumbers: true,
  },
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 8192,
        name: "images/[name].[hash:8].[ext]",
      })
      .end();
  },
};
