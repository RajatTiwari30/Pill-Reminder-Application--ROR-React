# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

connection = ActiveRecord::Base.connection()
# connection.execute("delete from action_text_rich_texts");
connection.execute("delete from active_storage_attachments");
connection.execute("delete from active_storage_blobs");
# connection.execute("delete from friendly_id_slugs");
connection.close()

MedicalHistory.delete_all 
Dependent.delete_all 
User.delete_all 

user1 = User.create({
  name: "Tom",
  email: "test@test.com",
  contact: "1234567890",
  country: "India",
  dob: 20.years.ago,
  password_digest: BCrypt::Password.create('123456')
})


dep1 = Dependent.create!({
  user: user1,
  relation: "Mother",
  name: "Toms mother",
  email: "tm@test.com",
  contact: "4312567897",
  bldgrp: "B+",
  dob: 50.years.ago,
  weight: "60kg",
  height: "145 inch"
})

dep2 = Dependent.create!({
  user: user1,
  relation: "Father",
  name: "Toms Father",
  email: "tf@test.com",
  contact: "3312567897",
  bldgrp: "A+",
  dob: 52.years.ago,
  weight: "65kg",
  height: "155 inch"
})


# MedicalHistory.create!({
#   user: user1,
#   illness: "Fever",
#   drname: "Dr. Strange",
#   medicine: "Paracetomol",
#   startdate: 2.days.ago.to_date,
#   enddate: 10.days.from_now,
#   dosage_amount: "1 dosage",
#   dosage_frequency: "daily-twice",
#   dosage_time: "2pm",
#   email_notify: true
# })

MedicalHistory.create!({
  user: user1,
  illness: "Fever",
  doctor: "Dr. Strange",
  medicine: "Paracetomol",
  startDate: 10.days.ago.to_date,
  # enddate: DateTime.now.prev_day.to_date,
  endDate: DateTime.now.to_date,
  dosageAmt: "1 dosage",
  dosageFrequency: "daily-twice",
  dosageTime: "2pm",
  eNotify: true
})

MedicalHistory.create!({
  user: user1,
  illness: "Fever",
  doctor: "Dr. Strange",
  medicine: "Crocin",
  startDate: 10.days.ago.to_date,
  # enddate: DateTime.now.prev_day.to_date,
  endDate: DateTime.now.to_date,
  dosageAmt: "1 dosage",
  dosageFrequency: "daily-twice",
  dosageTime: "2pm",
  eNotify: true
})


MedicalHistory.create!({
  user: user1,
  illness: "Fever",
  doctor: "Dr. Strange",
  medicine: "Paracetomol",
  startDate: DateTime.now.next.to_date,
  endDate: 4.days.from_now.to_date,
  dosageAmt: "1 dosage",
  dosageFrequency: "daily-twice",
  dosageTime: "2pm",
  eNotify: true
})


MedicalHistory.create!({
  user: user1,
  dependent: dep1,
  illness: "Cough",
  doctor: "Dr. Iron",
  medicine: "Tablet",
  startDate: DateTime.now,
  endDate: 12.days.from_now,
  dosageAmt: "2 dosage",
  dosageFrequency: "daily-twice",
  dosageTime: "1pm",
  eNotify: true
})

MedicalHistory.create!({
  user: user1,
  dependent: dep2,
  illness: "Sore Throat",
  doctor: "Dr. Superman",
  medicine: "Syrup",
  startDate: 10.days.ago.to_date,
  endDate: DateTime.now.prev_day.to_date,
  dosageAmt: "2 dosage",
  dosageFrequency: "daily-thrice",
  dosageTime: "2pm",
  eNotify: true
})

MedicalHistory.create!({
  user: user1,
  dependent: dep2,
  illness: "Joint Pain",
  doctor: "Dr. Superman",
  medicine: "Iodex",
  startDate: DateTime.now.next.to_date,
  endDate: 4.days.from_now.to_date,
  dosageAmt: "2 dosage",
  dosageFrequency: "daily-thrice",
  dosageTime: "2pm",
  eNotify: true
})