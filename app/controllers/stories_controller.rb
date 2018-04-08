class StoriesController < ApplicationController
  def index
    @stories = Story.includes(:comments)
  end

  def show
    @story = Story.find(params[:id])
  end
end
