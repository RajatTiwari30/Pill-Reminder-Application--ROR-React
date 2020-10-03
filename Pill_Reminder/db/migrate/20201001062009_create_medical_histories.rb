class CreateMedicalHistories < ActiveRecord::Migration[6.0]
  def change
    create_table :medical_histories do |t|
      t.string :illness
      t.string :doctor
      t.string :medicine
      t.date :startDate
      t.date :endDate
      t.string :dosageAmt
      t.string :dosageFrequency
      t.time :dosageTime
      t.boolean :eNotify

      t.timestamps
    end
  end
end
