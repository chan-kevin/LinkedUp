ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
    Experience.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
    ApplicationRecord.connection.reset_pk_sequence!('experiences')
  
    puts "Creating users..."
    puts "Creating experiences..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      phone_number: '+123456789', 
      email: 'demo@user.io', 
      first_name: 'Demo',
      last_name: 'User',
      password: 'password',
      about: Faker::Quote.matz,
      location: Faker::Address.country
    )


  
    # More users
    # phone_numbers = []
    5.times do 
        # phone_number = Faker::PhoneNumber.cell_phone_in_e164
        # while phone_numbers.include?(phone_number)
        #     phone_number = Faker::PhoneNumber.cell_phone_in_e164
        # end
        # phone_numbers << phone_number
    
        # puts "Generated phone number: #{phone_number}"
    
        User.create!({
            phone_number: Faker::PhoneNumber.unique.cell_phone_in_e164,
            email: Faker::Internet.unique.email,
            first_name: Faker::Name.first_name,
            last_name: Faker::Name.last_name,
            about: Faker::Quote.matz,
            location: Faker::Address.country,
            password: 'password'
        }) 
    end

    months = ["January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December"]

    i = 1
    while i < 7 do
      5.times do 
        start_year = rand(1990..2021)
        end_year = rand(start_year..2022)

        skills = '';
        3.times do 
          skills += + Faker::Job.key_skill + ' · '
        end

        Experience.create!({
          title: Faker::Job.unique.title,
          company: Faker::Company.unique.name,
          description: Faker::Company.unique.bs,
          start_month: months[rand(months.length)],
          start_year: start_year,
          user_id: i,
          location: Faker::Address.unique.country,
          end_month: months[rand(months.length)],
          end_year: end_year,
          skills: skills,
          logo: Faker::Company.logo
        })
      end

      education_start_year = rand(1980..2018)
      education_end_year = education_start_year + 4

      Education.create!({
        school: Faker::Educator.unique.university,
        degree: Faker::Educator.degree,
        user_id: i,
        start_month: months[rand(months.length)],
        start_year: education_start_year,
        end_month: months[rand(months.length)],
        end_year: education_end_year
      })
      i += 1
    end
  
    puts "Done!"
  end