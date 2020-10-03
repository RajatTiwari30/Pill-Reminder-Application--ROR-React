require 'test_helper'

class DependentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @dependent = dependents(:one)
  end

  test "should get index" do
    get dependents_url, as: :json
    assert_response :success
  end

  test "should create dependent" do
    assert_difference('Dependent.count') do
      post dependents_url, params: { dependent: { bldgrp: @dependent.bldgrp, contact: @dependent.contact, dob: @dependent.dob, email: @dependent.email, height: @dependent.height, name: @dependent.name, relation: @dependent.relation, weight: @dependent.weight } }, as: :json
    end

    assert_response 201
  end

  test "should show dependent" do
    get dependent_url(@dependent), as: :json
    assert_response :success
  end

  test "should update dependent" do
    patch dependent_url(@dependent), params: { dependent: { bldgrp: @dependent.bldgrp, contact: @dependent.contact, dob: @dependent.dob, email: @dependent.email, height: @dependent.height, name: @dependent.name, relation: @dependent.relation, weight: @dependent.weight } }, as: :json
    assert_response 200
  end

  test "should destroy dependent" do
    assert_difference('Dependent.count', -1) do
      delete dependent_url(@dependent), as: :json
    end

    assert_response 204
  end
end
