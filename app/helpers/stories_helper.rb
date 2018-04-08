require 'uri'

module StoriesHelper
  def host_name(url)
    URI.parse(url).host if url.present?
  end
end
