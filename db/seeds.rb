ApplicationRecord.transaction do 
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    User.destroy_all
  
    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!('users')
  
    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      phone_number: '+123456789', 
      email: 'demo@user.io', 
      first_name: 'Demo',
      last_name: '1',
      password: 'password'
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
            password: 'password'
        }) 
    end
  
    puts "Done!"
  end