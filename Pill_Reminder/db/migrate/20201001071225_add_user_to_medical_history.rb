class AddUserToMedicalHistory < ActiveRecord::Migration[6.0]
  def change
    add_column :medical_histories, :user_id, :integer
  end
end
