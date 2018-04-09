const fetch = require("node-fetch");
const fs = require("fs");
const baseUrl = "https://hacker-news.firebaseio.com/v0";

function writeToFile(data, type) {
  fs.readFile(`${type}.json`, (err, fileContent) => {
    let json = JSON.parse(fileContent);
    json.push(data);
    fs.writeFile(`${type}.json`, JSON.stringify(json, null, 2), err => {
      if (err) {
        console.log("Err: ", err);
      } else {
        console.log("done");
      }
    });
  });
}

async function getComment(item, storyId) {
  const comment = await fetch(`${baseUrl}/item/${item}.json`)
    .then(res => res.json())
    .then(json => {
      if (json) {
        json.story_id = storyId;
        writeToFile();
      }
    })
    .catch(error => {
      return console.log(error);
    });
  return comment;
}

function getUser(id) {
  fetch(`${baseUrl}/user/${id}.json`)
    .then(res => res.json())
    .then(json => {
      console.log("user ", [json]);
      if (json) {
        writeToFile(json, "users");
      }
    })
    .catch(err => {
      console.log(err);
    });
}

async function getComments(items, storyId) {
  items.forEach(item => {
    getComment(item, storyId);
  });
}

async function getStory(storyId) {
  const story = await fetch(`${baseUrl}/item/${storyId}.json`)
    .then(res => res.json())
    .then(json => {
      if (json["kids"] && json["kids"].length) {
        // story.comments = await getComments(json["kids"], storyId);
      }
    })
    .catch(error => {
      return console.log(error);
    });

  return story;
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
  // Promise.all(stories).then(data => {
  //   writeToFile(data, "stories");
  // });
});

[16793749, 16793233, 16793180, 16792479, 16792961, 16792756, 16792371].map(
  id => {
    getStory(id);
  }
);
