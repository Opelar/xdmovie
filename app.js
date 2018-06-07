const charset = require("superagent-charset");
const request = charset(require("superagent"));
const cheerio = require("cheerio");

const xiaopian = "https://www.xiaopian.com";

request
  .get(xiaopian)
  .charset()
  .end((err, res) => {
    if (err) {
      console.log(err);
    }
    // console.log(res.text);
    filterData(res.text);
  });

const filterData = html => {
  const $ = cheerio.load(html);
  const listTop = $(".co_area2");
  let homeData = [];

  listTop.each(function(idx, ele) {
    let o = {};
    let $title = $(this)
      .find(".title_all")
      .find("span");
    // title
    let title = $title.text();
    // movies
    let movies = $(this)
      .find(".co_content222")
      .find("li");
    let arr = [];

    movies.each(function(i, element) {
      let obj = {};
      obj.movieName = $(this)
        .children("a")
        .text();
      obj.movieUrl = $(this)
        .children("a")
        .attr("href");
      obj.cTime = $(this)
        .children("span")
        .text();
      arr.push(obj);
    });

    o.title = title;
    o.movies = arr;

    homeData.push(o);
  });
};

