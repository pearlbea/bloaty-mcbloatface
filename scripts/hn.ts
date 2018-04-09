import * as fetch from 'node-fetch';
import * as fs from 'fs';
import * as path from 'path';

const baseUrl = "https://hacker-news.firebaseio.com/v0";
const STORIES_TO_GET = 100;

interface StoryWithComments {
  story: Story;
  comments: Comment[];
}

interface StoriesWithCommentsAndUsers {
  storiesWithComments: StoryWithComments[];
  users: User[];
}

interface User {
  created: number;
  id: string;
  karma: number;
  submitted: number[];
}

interface Story {
  by: string;
  descendants: number;
  id: number;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;
}

interface Comment {
  by: string;
  id: number;
  parent: number;
  kids?: number[];
  text: string;
  time: number;
  type: string;
}

function unique(items: any[]) {
  return items.filter((value, index, self) => self.indexOf(value) === index);
}

function writeToFile(data: StoriesWithCommentsAndUsers): boolean {
  const savePath = path.resolve('db', 'hn.json');
  const err = fs.writeFileSync(savePath, JSON.stringify(data, null, 2));
  if (err) {
    console.log("Err: ", err);
  }
  return !!err;
}

async function getComment(commentId: number): Promise<Comment> {
  return fetch(`${baseUrl}/item/${commentId}.json`)
    .then(res => res.json())
    .catch(error => {
      return console.log(error);
    });
}

function getUser(userId: number): Promise<User> {
  return fetch(`${baseUrl}/user/${userId}.json`)
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });
}

async function getUsers(storiesWithComments: StoryWithComments[]): Promise<StoriesWithCommentsAndUsers> {
  let userIds = [];
  storiesWithComments.forEach(({ story, comments }) => {
    if (story) {
      userIds.push(story.by);
    }
    comments.forEach(comment => { if (comment) { userIds.push(comment.by) } });
  });
  return {
    storiesWithComments,
    users: await Promise.all(unique(userIds).map(getUser))
  };
}

async function getComments(stories: Story[]): Promise<StoryWithComments[]> {
  const work = stories.map(async story => {
    return { story, comments: await getCommentsByIds(story.kids || []) };
  });
  return Promise.all(work);
}

async function getCommentsByIds(commentIds: number[]): Promise<Comment[]> {
  const comments = await Promise.all(commentIds.map(getComment));
  const kidIds = comments.reduce((accumulator, comment) => {
    return comment ? accumulator.concat(comment.kids || []) : accumulator;
  }, []);
  if (kidIds.length === 0) { return comments; }
  console.log(`Getting ${kidIds.length} kids from ${commentIds.length} comments`);
  return comments.concat(await getCommentsByIds(kidIds));
}

function getStories(storyIds: number[]): Promise<Story[]> {
  return Promise.all(storyIds.map(getStory));
}

function getStory(storyId: number): Promise<Story> {
  return fetch(`${baseUrl}/item/${storyId}.json`)
    .then(res => res.json())
    .catch(error => {
      return console.log(error);
    });
}

function getStoryIds(): Promise<number[]> {
  return fetch(`${baseUrl}/topstories.json`)
    .then(res => res.json())
    .then(ids => ids.slice(0, STORIES_TO_GET))
    .catch(err => {
      console.log(err);
    });
}

function log(label: string, data: Story[]);
function log(label: string, data: number[]);
function log(label: string, data: StoryWithComments[]);
function log(label: string, data: StoriesWithCommentsAndUsers);
function log(label: string, data: any) {
  if (data.users) {
    console.log(`${label} ${data.users.length}`);
  } else if (data[0].comments) {
    const count: number = data.reduce((accumulator, current) => accumulator + current.comments.length, 0);
    console.log(`${label} ${count}`);
  } else {
    console.log(`${label} ${data.length}`);
  }
  return data;
}

console.log('Getting HN data');

getStoryIds()
  .then(ids => log('StoryIds', ids))
  .then(getStories)
  .then(stories => log('Stories', stories))
  .then(getComments)
  .then(datas => log('Comments', datas))
  .then(getUsers)
  .then(datas => log('Users', datas))
  .then(writeToFile)
  .then(() => console.log('Finished getting HN data'));
