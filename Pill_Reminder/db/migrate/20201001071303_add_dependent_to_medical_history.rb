class AddDependentToMedicalHistory < ActiveRecord::Migration[6.0]
  def change
    add_column :medical_histories, :dependent_id, :integer
  end
end
