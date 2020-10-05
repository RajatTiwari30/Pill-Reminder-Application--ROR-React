class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  before_action :validate_user!, except: [:index, :new, :edit, :create, :update, :show]
  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  def new
    @user = User.new

    render json: @user
  end

  # GET /users/1/edit
  def edit
  end

  # GET /users/1
  def show
    render json: @user
  end

   # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :email, :contact, :country, :dob, :password, :password_confirmation, :profile_image, :height, :weight, :bldgrp)
    end
end
