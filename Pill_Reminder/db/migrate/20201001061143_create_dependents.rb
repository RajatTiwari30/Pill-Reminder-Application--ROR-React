class CreateDependents < ActiveRecord::Migration[6.0]
  def change
    create_table :dependents do |t|
      t.string :relation
      t.string :name
      t.string :email
      t.string :contact
      t.string :bldgrp
      t.date :dob
      t.string :weight
      t.string :height

      t.timestamps
    end
  end
end
