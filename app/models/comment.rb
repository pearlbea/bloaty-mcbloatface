class Comment < ApplicationRecord
  belongs_to :story
  belongs_to :comment, optional: true
  has_many :comments
end
