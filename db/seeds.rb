# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

5.times do |i|
  Event.create(
    title: "Chess tournament ##{i}",
    start_time: 2.days.from_now,
    end_time: 3.days.from_now,
    kind: "chess",
    location: "Culture center 'Vesna'",
    description: "Try to win!"
  )
end

5.times do |i|
  Event.create(
    title: "Soccer game ##{i}",
    start_time: Time.zone.now.end_of_week.at_middle_of_day,
    kind: "soccer",
    location: "Khadi Taktash Str., 89",
    description: "Do you want to play soccer this weekend? Join us!"
  )
end

User.create(first_name: "Darth", last_name: "Vader", email: "darth.vader@example.com", password: "12345678")
