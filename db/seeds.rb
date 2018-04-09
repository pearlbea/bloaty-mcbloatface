data = JSON.parse(File.read('db/hn.json'));
# Data looks like this
# {
#   users: User[],
#   storiesWithComments: StoryWithComments[]
# }

def create_comment(comment, story)
  Comment.find_or_create_by(id: comment['id']) do |c|
    c.story = story
    c.user = User.find_by(username: comment['by'])
    c.comment = Comment.find(comment['parent']) rescue nil
    c.text = comment['text']
    c.created_at = Time.at(comment['time'])
  end
end

def create_story(story)
  Story.find_or_create_by(id: story['id']) do |s|
    s.user = User.find_by(username: story['by'])
    s.title = story['title']
    s.url = story['url']
    s.score = story['score']
    s.created_at = Time.at(story['time'])
  end
end

def create_user(user)
  User.find_or_create_by(username: user['id']) do |u|
    u.karma = user['karma']
    u.about = user['about']
    u.created_at = Time.at(user['created'])
  end
end

puts 'Seeding users'

data['users'].each do |user|
  create_user(user)
end

data['storiesWithComments'].each do |story_with_comments|
  puts 'Seeding story'
  story = create_story(story_with_comments['story'])
  story_with_comments['comments'].compact.each do |comment|
    create_comment(comment, story)
  end
end
