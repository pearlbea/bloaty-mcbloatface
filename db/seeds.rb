data = JSON.parse(File.read('db/hn.json'));
# Data looks like this
# {
#   users: User[],
#   storiesWithComments: StoryWithComments[]
# }

# data['storiesWithComments']
#

# def create_comment(comment)
#   Comment.create(
#     id: comment['id'],user.
#     by: comment['by'],
#     parent_id: comment['parent'],
#     title: comment['title'],
#     time: comment['time'],
#     text: comment['text'],
#     url: comment['url']
#   )
# end
#
# def create_comments(comments)
#   comments.each do |comment|
#     create_comment(comment)
#   end
# end
#
# stories.each do |story|
#   Story.create(
#     id: story['id'],
#     by: story['by'],
#     time: Time.at(story['time']),
#     title: story['title'],
#     url: story['url'],
#     comment_count: story['descendants'],
#     score: story['score']
#   )
# end

# def create_story(story)
#   Story.find_or_create_by(id: story['id']) do |s|
#     s.by = story['by']
#
#   end
# end

def create_user(user)
  User.find_or_create_by(username: user['id']) do |u|
    u.karma = user['karma']
    u.about = user['about']
    u.created_at = Time.at(user['created'])
  end
end

data['users'].each do |user|
  create_user(user)
end

# data['storiesWithComments'].each do |story|
#   create_story(story)
# end
