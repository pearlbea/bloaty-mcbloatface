stories = JSON.parse(File.read('db/stories.json'));
# comments = JSON.parse(File.read('db/comments.json'));

def create_comment(comment)
  Comment.create(
    id: comment['id'],
    by: comment['by'],
    parent_id: comment['parent'],
    title: comment['title'],
    time: comment['time'],
    text: comment['text'],
    url: comment['url']
  )
end

def create_comments(comments)
  comments.each do |comment|
    create_comment(comment)
  end
end

stories.each do |story|
  Story.create(
    id: story['id'],
    by: story['by'],
    time: Time.at(story['time']),
    title: story['title'],
    url: story['url'],
    comment_count: story['descendants'],
    score: story['score']
  )
end

# create_comments(comments);
