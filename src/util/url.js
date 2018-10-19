const URL = {
  domain: "//localhost:8080",
  getBannerList: "/api/getBannerList",
  createBanner: "/api/createBanner",
  updateBanner: "/api/updateBanner",
  deleteBanner: "/api/deleteBanner",
  getPortfolioList: "/api/getPortfolioList",
  createPortfolio: "/api/createPortfolio",
  updatePortfolio: "/api/updatePortfolio",
  deletePortfolio: "/api/deletePortfolio",
  getTeamList: "/api/getTeamList",
  createTeam: "/api/createTeam",
  updateTeam: "/api/updateTeam",
  deleteTeam: "/api/deleteTeam",
  getCommunityList: "/api/getCommunityList",
  createCommunity: "/api/createCommunity",
  updateCommunity: "/api/updateCommunity",
  deleteCommunity: "/api/deleteCommunity",
  login: "/api/login",
  logout: "/api/logout"
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
