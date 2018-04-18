require 'uri'

module StoriesHelper
  def random_cute_animal_image
    [
      'andrew-pons-9713-unsplash.jpg',
      'freddie-marriage-40645-unsplash.jpg',
      'josh-bean-591099-unsplash.jpg',
      'matheus-queiroz-361095-unsplash.jpg'
    ].sample
  end

  def host_name(url)
    URI.parse(url).host if url.present?
  end

  def display_comments(comments)
    obj = Hash.new('obj')
    obj['top'] = []
    comments.each do |comment|
      if comment.comment_id.nil?
        obj['top'] << comment
      else
        obj[comment.comment_id] = [] unless obj.key?(comment.comment_id)
        obj[comment.comment_id] << comment
      end
    end
    obj
  end
end
