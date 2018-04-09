class Comment < ApplicationRecord
  belongs_to :comment, optional: true
  belongs_to :story
  belongs_to :user
  has_many :comments
end
