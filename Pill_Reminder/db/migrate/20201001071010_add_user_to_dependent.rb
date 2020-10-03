class AddUserToDependent < ActiveRecord::Migration[6.0]
  def change
    add_column :dependents, :user_id, :integer
  end
end
