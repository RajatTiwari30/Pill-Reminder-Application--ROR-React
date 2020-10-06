class MedicalHistoriesController < ApplicationController
  before_action :set_medical_history, only: [:show, :update, :destroy]
  before_action :validate_user!, except: [:index, :new, :create, :update, :show, :get_for_self, :get_for_dependents, :get_self_and_dependents]
  # GET /medical_histories
  def index
    @medical_histories = MedicalHistory.all

    render json: @medical_histories
  end

    # GET /medical_histories/1/edit
  def edit
  end
  # GET /medical_histories/1
  def show
    render json: @medical_history
  end

  # POST /medical_histories
  def create
    @medical_history = MedicalHistory.new(medical_history_params)

    if @medical_history.save
      render json: @medical_history, status: :created, location: @medical_history
    else
      render json: @medical_history.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /medical_histories/1
  def update
    if @medical_history.update(medical_history_params)
      render json: @medical_history
    else
      render json: @medical_history.errors, status: :unprocessable_entity
    end
  end

  # DELETE /medical_histories/1
  def destroy
    @medical_history.destroy
    respond_to do |format|
    format.json {render json: {id: @medical_history.id}, status: :ok }
    end
  end

  def get_for_self
    user_id = params[:user_id]

    # for today
    @medical_histories = MedicalHistory
          .where(user_id: user_id, dependent_id: 0, eNotify: 'true')
          .where("? BETWEEN startDate AND endDate", DateTime.now.to_date)
          .order(:startDate, :asc)
    
    render json: @medical_histories
  end

  def get_for_dependents
    user_id = params[:user_id]
    @medical_histories = [];

    @medical_histories_today =  MedicalHistory
        .where.not(dependent_id: nil)
        .where(user_id: user_id)
        .where("? BETWEEN startDate AND endDate", DateTime.now.to_date)

    ids = []
    
    @medical_histories_today.all.map do |record|
      ids << record.dependent_id
    end

    @medical_history_tomorrow = MedicalHistory
      .where.not(dependent_id: nil)
      .where(user_id: user_id)
      .where("? BETWEEN startDate AND endDate",  DateTime.now.next_day.to_date)
      .where("dependent_id not in (?)", ids)
      .order(:startDate, :asc) 

    @medical_history_tomorrow = @medical_history_tomorrow || []
  
    @medical_histories = @medical_histories_today +  @medical_history_tomorrow

    render json: @medical_histories
  end

  # todo
  def get_self_and_dependents
    user_id = params[:user_id]
    @medical_histories = MedicalHistory.where(user_id: user_id)

    render json: @medical_histories
  end

  def get_all_for_self
    user_id = params[:user_id]
    @medical_histories = MedicalHistory.where(user_id: user_id, dependent_id: nil)

    render json: @medical_histories
  end

  def get_all_for_dep
    user_id = params[:user_id]
    @medical_histories = MedicalHistory.where(user_id: user_id).where.not(dependent_id: nil)

    render json: @medical_histories
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_medical_history
      @medical_history = MedicalHistory.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def medical_history_params
      params.require(:medical_history).permit(:illness, :doctor, :medicine, :startDate, :endDate, :dosageAmt, :dosageFrequency, :dosageTime, :eNotify,  :user_id, :dependent_id)
    end
end
