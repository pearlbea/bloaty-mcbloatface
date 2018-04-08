
stories = JSON.parse(File.read('db/stories.json'))
# comments = JSON.parse(File.read('db/comments.json'))

def create_comment(comment, story_id)
  Comment.create(
    id: comment['id'],
    by: comment['by'],
    story_id: story_id,
    title: comment['title'],
    time: comment['time'],
    text: comment['text'],
    url: comment['url'],
    comment_id: comment['parent']
  )
end

def create_comments(comments, story_id)
  comments.each do |comment|
    create_comment(comment, story_id)
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

  # create_comments(comments, story['id'])
end
