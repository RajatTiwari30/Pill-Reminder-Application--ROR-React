class DependentsController < ApplicationController
  before_action :set_dependent, only: [:show, :update, :destroy]
  before_action :validate_user!, except: [:index, :new, :create, :update, :show]
  # GET /dependents
  def index
    @dependents = Dependent.all

    render json: @dependents
  end

    # GET /dependents/1/edit
  def edit
  end

  # GET /dependents/1
  def show
    render json: @dependent
  end

  # POST /dependents
  def create
    @dependent = Dependent.new(dependent_params)

    if @dependent.save
      render json: @dependent, status: :created, location: @dependent
    else
      render json: @dependent.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /dependents/1
  def update
    if @dependent.update(dependent_params)
      render json: @dependent
    else
      render json: @dependent.errors, status: :unprocessable_entity
    end
  end

  # DELETE /dependents/1
  def destroy
    @dependent.destroy
  end


  def get_all_dependents
    user_id = params[:user_id]
    @dependents = Dependent.where(user_id: user_id)

    render json: @dependents
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dependent
      @dependent = Dependent.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def dependent_params
      params.require(:dependent).permit(:relation, :name, :email, :contact, :bldgrp, :dob, :weight, :height, :user_id)
    end
end
