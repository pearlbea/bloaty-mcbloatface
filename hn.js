const fetch = require("node-fetch");
const fs = require("fs");
const baseUrl = "https://hacker-news.firebaseio.com/v0";

async function getComment(item) {
  const comment = await fetch(`${baseUrl}/item/${item}.json`)
    .then(res => res.json())
    .then(json => {
      return json;
    })
    .catch(error => {
      return console.log(error);
    });
  return comment;
}

async function getStory(storyId) {
  const story = await fetch(`${baseUrl}/item/${storyId}.json`)
    .then(res => res.json())
    .then(json => {
      if (json["kids"]) {
        getComments(json["kids"]);
      }
      return json;
    })
    .catch(error => {
      return console.log(error);
    });
  return story;
}

function writeToFile(data, type) {
  fs.readFile(`${type}.json`, (err, fileContent) => {
    let json = JSON.parse(fileContent);
    json.push(data);
    fs.writeFile(`${type}.json`, JSON.stringify(json, null, 2), err => {
      if (err) {
        console.log(err);
      } else {
        console.log("done");
      }
    });
  });
}

async function getComments(items) {
  const comments = items.map(getComment);
  Promise.all(comments).then(data => {
    writeToFile(data, "comments");
  });
}

async function getStories() {
  const story_ids = await fetch(`${baseUrl}/topstories.json`)
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });
  return story_ids;
}

getStories().then(ids => {
  const stories = ids.map(getStory);
  Promise.all(stories).then(data => {
    console.log(data);
  });
});
