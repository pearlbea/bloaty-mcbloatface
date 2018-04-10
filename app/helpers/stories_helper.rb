require 'uri'

module StoriesHelper
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
