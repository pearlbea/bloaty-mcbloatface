class StoriesController < ApplicationController
  def index
    @stories = Story.includes(:comments, :user)
  end

  def show
    @story = Story.find(params[:id])
  end
end
