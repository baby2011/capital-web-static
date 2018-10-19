import axios from "axios";
import urlUtil from "./url";
import app from "../main";

const request = options => {
  return axios({
    withCredentials: true,
    responseType: "json",
    ...options
  })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.data;
    })
    .then(res => {
      if (res.code !== 200) {
        throw new Error(res.data.msg);
      }
      return res.data;
    })
    .catch(e => {
      app.$message({
        type: "error",
        message: e.message
      });
      throw e;
    });
};

const get = (url, options) => {
  return request({
    url,
    method: "GET",
    params: options && options.params
  });
};

const post = (url, options) => {
  return request({
    url,
    method: "POST",
    params: options && options.params,
    data: options && options.data
  });
};

exports.getBannerList = params => {
  return get(urlUtil.getBannerList, {
    params: params
  });
};

exports.createBanner = params => {
  return post(urlUtil.createBanner, {
    data: params
  });
};
exports.updateBanner = params => {
  return post(urlUtil.updateBanner, {
    data: params
  });
};

exports.deleteBanner = params => {
  return post(urlUtil.deleteBanner, {
    data: params
  });
};

exports.getPortfolioList = params => {
  return get(urlUtil.getPortfolioList, {
    params: params
  });
};

exports.createPortfolio = params => {
  return post(urlUtil.createPortfolio, {
    data: params
  });
};
exports.updatePortfolio = params => {
  return post(urlUtil.updatePortfolio, {
    data: params
  });
};
exports.deletePortfolio = params => {
  return post(urlUtil.deletePortfolio, {
    data: params
  });
};
exports.login = params => {
  return post(urlUtil.login, {
    data: params
  });
};
exports.logout = params => {
  return post(urlUtil.logout, {
    data: params
  });
};

exports.getTeamList = params => {
  return get(urlUtil.getTeamList, {
    params: params
  });
};

exports.createTeam = params => {
  return post(urlUtil.createTeam, {
    data: params
  });
};
exports.updateTeam = params => {
  return post(urlUtil.updateTeam, {
    data: params
  });
};
exports.deleteTeam = params => {
  return post(urlUtil.deleteTeam, {
    data: params
  });
};

exports.getCommunityList = params => {
  return get(urlUtil.getCommunityList, {
    params: params
  });
};

exports.createCommunity = params => {
  return post(urlUtil.createCommunity, {
    data: params
  });
};
exports.updateCommunity = params => {
  return post(urlUtil.updateCommunity, {
    data: params
  });
};
exports.deleteCommunity = params => {
  return post(urlUtil.deleteCommunity, {
    data: params
  });
};
