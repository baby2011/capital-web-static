const URL = {
  domain: "//localhost:8080",
  getBannerList: "/api/getBannerList",
  createBanner: '/api/createBanner',
  updateBanner: '/api/updateBanner',
  deleteBanner: '/api/deleteBanner',
  getPortfolioList: '/api/getPortfolioList',
  createPortfolio: '/api/createPortfolio',
  updatePortfolio: '/api/updatePortfolio',
  deletePortfolio: '/api/deletePortfolio'
};

let domain;

if (location.host.match(/localhost/)) {
  domain = "//localhost:8080";
} else {
  domain = "//" + location.host;
}

URL.domain = domain;
Object.keys(URL).forEach(name => {
  if (!URL[name].match(/^https?|\/\//)) {
    URL[name] = domain + URL[name];
  }
});

export default URL;
