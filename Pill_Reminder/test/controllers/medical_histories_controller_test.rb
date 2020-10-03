require 'test_helper'

class MedicalHistoriesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @medical_history = medical_histories(:one)
  end

  test "should get index" do
    get medical_histories_url, as: :json
    assert_response :success
  end

  test "should create medical_history" do
    assert_difference('MedicalHistory.count') do
      post medical_histories_url, params: { medical_history: { doctor: @medical_history.doctor, dosageAmt: @medical_history.dosageAmt, dosageFrequency: @medical_history.dosageFrequency, dosageTime: @medical_history.dosageTime, eNotify: @medical_history.eNotify, endDate: @medical_history.endDate, illness: @medical_history.illness, medicine: @medical_history.medicine, startDate: @medical_history.startDate } }, as: :json
    end

    assert_response 201
  end

  test "should show medical_history" do
    get medical_history_url(@medical_history), as: :json
    assert_response :success
  end

  test "should update medical_history" do
    patch medical_history_url(@medical_history), params: { medical_history: { doctor: @medical_history.doctor, dosageAmt: @medical_history.dosageAmt, dosageFrequency: @medical_history.dosageFrequency, dosageTime: @medical_history.dosageTime, eNotify: @medical_history.eNotify, endDate: @medical_history.endDate, illness: @medical_history.illness, medicine: @medical_history.medicine, startDate: @medical_history.startDate } }, as: :json
    assert_response 200
  end

  test "should destroy medical_history" do
    assert_difference('MedicalHistory.count', -1) do
      delete medical_history_url(@medical_history), as: :json
    end

    assert_response 204
  end
end
