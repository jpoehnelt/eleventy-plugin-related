const axios = require("axios");
const fs = require("fs");
const path = require("path");

const CACHE_DIR = path.join(__dirname, "..", "..", ".cache");
const CACHE_FILE = path.join(CACHE_DIR, "stories.json");

const MAX_STORIES = 100;
const MAX_COMMENTS = 5;

module.exports = async function () {
  if (fs.existsSync(CACHE_FILE)) {
    return JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
  }

  const topStories = (
    await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json")
  ).data.slice(0, MAX_STORIES);

  console.log("Fetching stories");
  const stories = (
    await axios.all(
      topStories.map((id) =>
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      )
    )
  ).map((r) => r.data);

  console.log("Fetching comments");
  await Promise.all(
    stories.map(async (s) => {
      s.comments = (
        await axios.all(
          (s.kids?.slice(0, MAX_COMMENTS) ?? []).map((kid) =>
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${kid}.json`)
          )
        )
      ).map((r) => r.data);
    })
  );

  try {
    fs.mkdirSync(CACHE_DIR);
  } catch (_) {
    console.log(`${CACHE_DIR} already exists`);
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(stories, null, 2));

  return stories;
};
