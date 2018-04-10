class Comment < ApplicationRecord
  belongs_to :comment, optional: true
  belongs_to :story, counter_cache: true
  belongs_to :user, counter_cache: true
  has_many :comments
end
