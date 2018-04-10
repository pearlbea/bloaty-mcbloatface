class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @user.to_json }
    end
  end

  def index
    @users = User.limit(100)
    respond_to do |format|
      format.html
      format.json { render json: @users.to_json }
    end
  end

  def stories
    @user = User.find(params[:id])
    respond_to do |format|
      format.html
      format.json { render json: @user.stories.to_json }
    end
  end
end
