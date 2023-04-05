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
      last_name: '1',
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

    i = 1
    while i < 6 do
      Experience.create!({
        title: Faker::Games::LeagueOfLegends.rank,
        company: Faker::Games::LeagueOfLegends.location,
        description: Faker::Games::LeagueOfLegends.quote,
        start_month: i,
        start_year: 2019,
        user_id: i,
        location: Faker::Address.country,
        end_month: i+2,
        end_year: 2021
      })
      i += 1
    end
  
    puts "Done!"
  end