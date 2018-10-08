import axios from "axios";
import urlUtil from "./url";
import app from "../main";

const get = (url, options) => {
  return axios(url, {
    method: "GET",
    params: options && options.params,
    responseType: "json"
  })
    .then(response => {
      return response.data;
    })
    .then(data => {
      if (data.code !== 200) {
        throw new Error(data.data.msg);
      }
      return data.data;
    })
    .catch(e => {
      app.$message({
        type: "error",
        message: e.message
      });
      throw e;
    });
};

const post = (url, options) => {
  return axios(url, {
    method: "POST",
    params: options && options.params,
    data: options && options.data,
    responseType: "json"
  })
    .then(response => {
      return response.data;
    })
    .then(data => {
      if (data.code !== 200) {
        throw new Error(data.data.msg);
      }
      return data.data;
    })
    .catch(e => {
      app.$message({
        type: "error",
        message: e.message
      });
      throw e;
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
  })
}